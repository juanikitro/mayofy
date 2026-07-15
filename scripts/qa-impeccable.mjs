import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";

const cwd = process.cwd();
const targets = process.argv.slice(2);
if (targets.length === 0 && !existsSync(join(cwd, "generated"))) {
  console.log("no generated/ dir; pass a path, e.g. data/frontends/<run>");
  process.exit(0);
}
if (targets.length === 0) targets.push("generated");

function resolveCliPath() {
  try {
    const require = createRequire(import.meta.url);
    const packagePath = require.resolve("impeccable/package.json");
    return join(dirname(packagePath), "cli", "bin", "cli.js");
  } catch {
    return join(cwd, "node_modules", "impeccable", "cli", "bin", "cli.js");
  }
}

function parseFindings(stdout) {
  const json = stdout.trim();
  if (!json) return [];
  const findings = JSON.parse(json);
  if (!Array.isArray(findings)) {
    throw new TypeError("Detector output was not a JSON array");
  }
  return findings;
}

const result = spawnSync(
  process.execPath,
  [resolveCliPath(), "detect", "--json", ...targets],
  {
    cwd,
    encoding: "utf8",
    shell: false,
    maxBuffer: 50 * 1024 * 1024,
  },
);

console.log(`Scanned targets: ${targets.join(", ")}`);
console.log("Approved goldens are waived via .impeccable/config.json.");

if (result.status !== 0 && result.status !== 2) {
  const error = result.error?.message;
  const stderr = result.stderr?.trim();
  console.error(stderr || error || "IMPECCABLE detector failed.");
  process.exit(result.status ?? 1);
}

let findings;
try {
  findings = parseFindings(result.stdout ?? "");
} catch (error) {
  console.error(`Could not parse detector JSON: ${error.message}`);
  process.exit(1);
}

if (result.status === 0 && findings.length === 0) {
  console.log("No anti-patterns found.");
  process.exit(0);
}

const findingsByFile = new Map();
for (const finding of findings) {
  const file = finding.file || "<unknown file>";
  const fileFindings = findingsByFile.get(file) ?? [];
  fileFindings.push(finding);
  findingsByFile.set(file, fileFindings);
}

for (const [file, fileFindings] of findingsByFile) {
  console.log(`\n${file}`);
  for (const finding of fileFindings) {
    const snippet = String(finding.snippet ?? "").replace(/\s+/g, " ").trim();
    console.log(
      `  line ${finding.line ?? "?"}: [${finding.antipattern ?? "unknown"}] ${snippet}`,
    );
    console.log(`    -> ${finding.description ?? "No description provided."}`);
  }
}

console.log(
  `\n${findings.length} anti-patterns found across ${findingsByFile.size} files`,
);
process.exit(result.status === 2 || findings.length > 0 ? 1 : 0);
