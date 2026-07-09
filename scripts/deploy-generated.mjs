#!/usr/bin/env node

import { access, appendFile, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

function argValue(argv, flag, fallback = null) {
  const index = argv.indexOf(flag);
  if (index < 0) {
    return fallback;
  }
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
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

async function packageProjectName() {
  const raw = await readFile("package.json", "utf8");
  const pkg = JSON.parse(raw);
  return typeof pkg.name === "string" && pkg.name.trim() ? pkg.name.trim() : "ia-landing-generator";
}

function validProjectName(projectName) {
  return /^[a-z0-9][a-z0-9-]*$/u.test(projectName);
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

async function linkProject({ token, scope, deployDir, projectName }) {
  await runVercel(["link", "--cwd", deployDir, "--project", projectName, "--yes", ...vercelAuthArgs({ token, scope })]);
}

async function deployLinkedProject({ token, scope, deployDir }) {
  const { stdout } = await runVercel(["deploy", "--cwd", deployDir, "--prod", "--yes", ...vercelAuthArgs({ token, scope })]);
  const url = deploymentUrl(stdout);
  if (!url) {
    throw new Error(`Vercel did not print a deployment URL for ${deployDir}.`);
  }
  return url;
}

async function writeSummary({ projectName, deployDir, url }) {
  const body = [
    `# Vercel deployment for \`${projectName}\``,
    "",
    `- URL: [${url}](${url})`,
    `- Target: production`,
    `- Output: \`${deployDir}\``,
    `- Catalog: [${url.replace(/\/$/u, "")}/catalog/](${url.replace(/\/$/u, "")}/catalog/)`,
    "",
  ].join("\n");

  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, `${body}\n`, "utf8");
  } else {
    console.log(body);
  }
}

async function main() {
  const token = process.env.VERCEL_TOKEN?.trim();
  if (!token) {
    throw new Error(
      "Missing VERCEL_TOKEN. Create a token at https://vercel.com/account/tokens and add it as the repository secret VERCEL_TOKEN.",
    );
  }

  const deployDir = path.resolve(argValue(process.argv, "--dir", path.join("dist", "vercel-catalog")));
  const projectName = argValue(process.argv, "--project", process.env.VERCEL_PROJECT_NAME?.trim() || (await packageProjectName()));
  const scope = process.env.VERCEL_SCOPE?.trim() || null;

  if (!validProjectName(projectName)) {
    throw new Error(`Invalid Vercel project name: ${projectName}`);
  }

  await access(path.join(deployDir, "index.html"));
  await ensureProject({ token, scope, projectName });
  await linkProject({ token, scope, deployDir, projectName });
  const url = await deployLinkedProject({ token, scope, deployDir });
  await writeSummary({ projectName, deployDir, url });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
