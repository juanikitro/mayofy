#!/usr/bin/env node

import { access, appendFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

function argValue(argv, flag, fallback = "") {
  const index = argv.indexOf(flag);
  if (index < 0) {
    return fallback;
  }
  const value = argv[index + 1];
  return value && !value.startsWith("--") ? value : fallback;
}

function isZeroSha(value) {
  return /^0{40}$/u.test(value);
}

function git(args) {
  const result = spawnSync("git", args, { encoding: "utf8" });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    return null;
  }
  return result.stdout
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
}

function commitExists(sha) {
  if (!sha || isZeroSha(sha)) {
    return false;
  }
  const result = spawnSync("git", ["rev-parse", "--verify", `${sha}^{commit}`], { encoding: "utf8" });
  if (result.error) {
    throw result.error;
  }
  return result.status === 0;
}

function changedFiles(before, after) {
  if (commitExists(before) && commitExists(after)) {
    const diff = git(["diff", "--name-only", before, after]);
    if (diff) {
      return diff;
    }
  }

  console.log("Falling back to files changed in the latest commit.");
  return git(["diff-tree", "--no-commit-id", "--name-only", "-r", "HEAD"]) ?? [];
}

function runNameFromPath(filePath) {
  const normalized = filePath.replaceAll("\\", "/");

  let match = normalized.match(/^data\/([^/]+)-businesses\.json$/u);
  if (match) {
    return match[1];
  }

  match = normalized.match(/^data\/site-specs\/([^/]+)-site-specs\.json$/u);
  if (match) {
    return match[1];
  }

  match = normalized.match(/^data\/frontends\/([^/]+)\//u);
  if (match) {
    return match[1];
  }

  return null;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function validRunName(runName) {
  return /^[a-z0-9][a-z0-9-]*$/u.test(runName);
}

async function deployableRuns(candidates) {
  const runs = [];
  for (const runName of candidates) {
    if (!validRunName(runName)) {
      console.log(`Skipping ${runName}: run name is not a valid slug.`);
      continue;
    }

    const businessesPath = path.join("data", `${runName}-businesses.json`);
    const specsPath = path.join("data", "site-specs", `${runName}-site-specs.json`);
    if ((await exists(businessesPath)) && (await exists(specsPath))) {
      runs.push(runName);
    } else {
      console.log(`Skipping ${runName}: missing ${businessesPath} or ${specsPath}.`);
    }
  }
  return runs;
}

async function setOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) {
    await appendFile(process.env.GITHUB_OUTPUT, `${name}=${value}\n`, "utf8");
  } else {
    console.log(`${name}=${value}`);
  }
}

async function main() {
  const eventName = argValue(process.argv, "--event-name");
  const manualRun = argValue(process.argv, "--manual-run").trim();
  const before = argValue(process.argv, "--before");
  const after = argValue(process.argv, "--after", "HEAD");

  let runs;
  if (eventName === "workflow_dispatch") {
    runs = manualRun ? [manualRun] : [];
  } else {
    const files = changedFiles(before, after);
    console.log(`Changed files:\n${files.map((file) => `- ${file}`).join("\n") || "(none)"}`);
    const candidates = [...new Set(files.map(runNameFromPath).filter(Boolean))];
    runs = await deployableRuns(candidates);
  }

  runs = [...new Set(runs)].sort();
  const json = JSON.stringify(runs);
  console.log(`Deployable runs: ${json}`);
  await setOutput("runs", json);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
