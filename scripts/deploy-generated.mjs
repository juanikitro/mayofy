#!/usr/bin/env node

import { access, appendFile, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

function argValue(argv, flag) {
  const index = argv.indexOf(flag);
  if (index < 0) {
    return null;
  }
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function requiredRunName(argv) {
  const runName = argValue(argv, "--session") ?? argValue(argv, "--run") ?? argv[2];
  if (!runName) {
    throw new Error("Usage: node scripts/deploy-generated.mjs --session <run>");
  }
  if (!/^[a-z0-9][a-z0-9-]*$/u.test(runName)) {
    throw new Error("Run name must be a slug containing only lowercase letters, numbers, and hyphens.");
  }
  return runName;
}

async function readManifest(outDir) {
  const manifestPath = path.join(outDir, "manifest.json");
  let raw;
  try {
    raw = await readFile(manifestPath, "utf8");
  } catch (error) {
    throw new Error(`Missing ${manifestPath}. Generation must complete successfully before deploy.`);
  }

  const manifest = JSON.parse(raw);
  if (!Array.isArray(manifest.sites)) {
    throw new Error(`${manifestPath} must contain a sites array.`);
  }
  return manifest;
}

function safeSiteDir(outDir, directory) {
  if (!directory || typeof directory !== "string") {
    throw new Error("Manifest site is missing directory.");
  }

  const resolvedOutDir = path.resolve(outDir);
  const resolvedSiteDir = path.resolve(outDir, directory);
  const relative = path.relative(resolvedOutDir, resolvedSiteDir);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to deploy directory outside ${outDir}: ${directory}`);
  }
  return resolvedSiteDir;
}

function markdownCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function deploymentUrl(stdout) {
  const lines = stdout
    .trim()
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.reverse().find((line) => /^https?:\/\//u.test(line)) ?? stdout.trim();
}

function vercelBaseArgs() {
  return ["--yes", "vercel@54.21.1"];
}

function vercelAuthArgs({ token, scope }) {
  const args = [`--token=${token}`, "--non-interactive"];
  if (scope) {
    args.push("--scope", scope);
  }
  return args;
}

function runCommand(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { ...options, windowsHide: true });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      reject(new Error(stderr.trim() || stdout.trim() || `${command} exited with code ${code}`));
    });
  });
}

async function runVercel(args, options) {
  const npx = process.platform === "win32" ? "npx.cmd" : "npx";
  return runCommand(npx, [...vercelBaseArgs(), ...args], {
    ...options,
    env: process.env,
  });
}

async function writeSummary(runName, results) {
  const lines = [
    `# Vercel deployments for \`${runName}\``,
    "",
    "| Business | Slug | Service | Rating | Project | Status | URL |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...results.map((result) => {
      const url = result.url ? `[${markdownCell(result.url)}](${result.url})` : "";
      return `| ${markdownCell(result.business)} | \`${markdownCell(result.slug)}\` | ${markdownCell(result.service)} | ${markdownCell(result.rating)} | \`${markdownCell(result.project)}\` | ${markdownCell(result.status)} | ${url} |`;
    }),
    "",
  ];

  const body = `${lines.join("\n")}\n`;
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, body, "utf8");
  } else {
    console.log(body);
  }
}

async function projectExists({ token, scope, projectName }) {
  try {
    await runVercel(["project", "inspect", projectName, ...vercelAuthArgs({ token, scope })]);
    return true;
  } catch {
    return false;
  }
}

async function ensureProject({ token, scope, projectName }) {
  if (await projectExists({ token, scope, projectName })) {
    console.log(`Project ${projectName} already exists.`);
    return;
  }

  try {
    await runVercel(["project", "add", projectName, ...vercelAuthArgs({ token, scope })]);
    console.log(`Created project ${projectName}.`);
  } catch (error) {
    if (await projectExists({ token, scope, projectName })) {
      console.log(`Project ${projectName} already exists.`);
      return;
    }
    throw error;
  }
}

async function linkProject({ token, scope, siteDir, projectName }) {
  await runVercel(["link", "--cwd", siteDir, "--project", projectName, "--yes", ...vercelAuthArgs({ token, scope })]);
}

async function deployLinkedProject({ token, scope, siteDir }) {
  const { stdout } = await runVercel(["deploy", "--cwd", siteDir, "--prod", "--yes", ...vercelAuthArgs({ token, scope })]);
  const url = deploymentUrl(stdout);
  if (!url) {
    throw new Error(`Vercel did not print a deployment URL for ${siteDir}.`);
  }
  return url;
}

async function deploySite({ token, scope, siteDir, projectName }) {
  await access(siteDir);
  await ensureProject({ token, scope, projectName });
  await linkProject({ token, scope, siteDir, projectName });
  return deployLinkedProject({ token, scope, siteDir });
}

async function main() {
  const runName = requiredRunName(process.argv);
  const token = process.env.VERCEL_TOKEN?.trim();
  if (!token) {
    throw new Error(
      "Missing VERCEL_TOKEN. Create a token at https://vercel.com/account/tokens and add it as the repository secret VERCEL_TOKEN.",
    );
  }

  const outDir = path.join("generated", runName);
  const manifest = await readManifest(outDir);
  const scope = process.env.VERCEL_SCOPE?.trim() || null;
  const results = [];

  for (const site of manifest.sites) {
    if (!site.slug || !site.name) {
      throw new Error("Each manifest site must include slug and name.");
    }

    const projectName = `local-${site.slug}`;
    const siteDir = safeSiteDir(outDir, site.directory);
    console.log(`Deploying ${site.name} (${site.slug}) as ${projectName}...`);

    try {
      const url = await deploySite({ token, scope, siteDir, projectName });
      results.push({
        business: site.name,
        slug: site.slug,
        service: site.service ?? "",
        rating: site.rating ?? "",
        project: projectName,
        status: "deployed",
        url,
      });
      console.log(`Deployed ${site.slug}: ${url}`);
    } catch (error) {
      results.push({
        business: site.name,
        slug: site.slug,
        service: site.service ?? "",
        rating: site.rating ?? "",
        project: projectName,
        status: "failed",
        url: "",
      });
      await writeSummary(runName, results);
      throw error;
    }
  }

  await writeSummary(runName, results);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
