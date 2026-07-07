import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { resolveGeneratedDir } from "../generated-output.js";
import { exitForIssues, printReport, type ValidationIssue } from "./report.js";

type SiteRecord = {
  slug: string;
  business_id: string;
  name: string;
  archetype: string;
  dominant_color: string;
  primary_font: string;
  frontend_mode?: "renderer-fallback" | "agent-static" | "agent-framework";
  agent_frontend_source?: string | null;
  directory: string;
};

type Manifest = {
  sites: SiteRecord[];
};

type Args = {
  outDir: string;
  allowMock: boolean;
  requireAgentFrontends: boolean;
  expectedCount: number;
};

const forbiddenPatterns = [
  /\bIA\b/u,
  /\bAI\b/u,
  /\bgenerad[oa]s?\b/iu,
  /\bhecho\s+con\s+ia\b/iu,
  /\bcreado\s+con\s+ia\b/iu,
];

async function existsDirectory(filePath: string): Promise<boolean> {
  try {
    return (await stat(filePath)).isDirectory();
  } catch {
    return false;
  }
}

async function existsFile(filePath: string): Promise<boolean> {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function readManifest(outDir: string): Promise<Manifest> {
  const raw = await readFile(path.join(outDir, "manifest.json"), "utf8");
  return JSON.parse(raw) as Manifest;
}

function parseArgs(argv: string[]): Args {
  const outDir = resolveGeneratedDir(argv, { positionalIndex: 2, fallbackSession: "tandil" });
  const expectedFlag = argv.indexOf("--expected-count");
  const expectedCount = expectedFlag >= 0 ? Number(argv[expectedFlag + 1]) : 10;

  if (!Number.isInteger(expectedCount) || expectedCount < 1) {
    throw new Error("--expected-count must be a positive integer.");
  }

  return {
    outDir,
    allowMock: argv.includes("--allow-mock"),
    requireAgentFrontends: argv.includes("--require-agent-frontends"),
    expectedCount,
  };
}

function stripTags(html: string): string {
  return html.replace(/<script[\s\S]*?<\/script>/giu, "").replace(/<style[\s\S]*?<\/style>/giu, "").replace(/<[^>]+>/gu, " ");
}

async function validateSites(args: Args): Promise<ValidationIssue[]> {
  const issues: ValidationIssue[] = [];
  const manifest = await readManifest(args.outDir);

  if (!args.allowMock && manifest.sites.length !== args.expectedCount) {
    issues.push({ code: "site_count", message: `Expected ${args.expectedCount} generated sites, found ${manifest.sites.length}.` });
  }

  const names = manifest.sites.map((site) => site.name);
  const archetypeCounts = new Map<string, number>();

  for (const [index, site] of manifest.sites.entries()) {
    archetypeCounts.set(site.archetype, (archetypeCounts.get(site.archetype) ?? 0) + 1);
    const siteDir = path.join(args.outDir, site.directory);

    if (args.requireAgentFrontends && (!site.frontend_mode || site.frontend_mode === "renderer-fallback")) {
      issues.push({ code: "renderer_fallback", message: `${site.slug}: final QA requires an agent-authored frontend.` });
    }

    if (site.frontend_mode && site.frontend_mode !== "renderer-fallback" && !site.agent_frontend_source) {
      issues.push({ code: "agent_frontend_source", message: `${site.slug}: agent-authored frontend is missing source metadata.` });
    }

    if (!(await existsDirectory(siteDir))) {
      issues.push({ code: "missing_site_dir", message: `${site.slug}: directory missing.` });
      continue;
    }

    const html = await readFile(path.join(siteDir, "index.html"), "utf8");
    const visibleText = stripTags(html);
    const imageSources = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/giu)].map((match) => match[1]);

    if (imageSources.length === 0) {
      issues.push({ code: "missing_image", message: `${site.slug}: no image tag found.` });
    }

    for (const src of imageSources) {
      if (src.startsWith("./")) {
        const localPath = path.join(siteDir, src.replace(/^\.\//, ""));
        if (!(await existsFile(localPath))) {
          issues.push({ code: "broken_local_image", message: `${site.slug}: missing local image file ${src}.` });
        }
      }
    }

    if (!html.includes("Creado por JuaniKitro")) {
      issues.push({ code: "footer", message: `${site.slug}: footer must contain exact text.` });
    }

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(visibleText)) {
        issues.push({ code: "forbidden_text", message: `${site.slug}: contains forbidden meta wording (${pattern}).` });
      }
    }

    for (const otherName of names) {
      if (otherName !== site.name && visibleText.includes(otherName)) {
        issues.push({ code: "cross_business_data", message: `${site.slug}: contains another business name: ${otherName}.` });
      }
    }

    const metadata = JSON.parse(await readFile(path.join(siteDir, "site.json"), "utf8")) as { id: string; slug: string; hero_image?: { status: string } };
    if (metadata.id !== site.business_id || metadata.slug !== site.slug) {
      issues.push({ code: "site_metadata", message: `${site.slug}: site.json does not match manifest.` });
    }
    if (!metadata.hero_image?.status) {
      issues.push({ code: "hero_image_metadata", message: `${site.slug}: missing hero image metadata.` });
    }

    const previous = manifest.sites[index - 1];
    if (previous) {
      if (previous.archetype === site.archetype) {
        issues.push({ code: "consecutive_archetype", message: `${previous.slug} and ${site.slug} share ${site.archetype}.` });
      }
      if (previous.dominant_color.toLowerCase() === site.dominant_color.toLowerCase()) {
        issues.push({ code: "consecutive_palette", message: `${previous.slug} and ${site.slug} share dominant color.` });
      }
      if (previous.primary_font === site.primary_font) {
        issues.push({ code: "consecutive_typography", message: `${previous.slug} and ${site.slug} share primary font.` });
      }
    }
  }

  for (const [archetype, count] of archetypeCounts) {
    if (count > 2) {
      issues.push({ code: "archetype_overuse", message: `${archetype} is used ${count} times; max is 2.` });
    }
  }

  const directories = await readdir(args.outDir, { withFileTypes: true });
  const actualSiteDirs = directories.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  if (actualSiteDirs.length !== manifest.sites.length) {
    issues.push({ code: "directory_count", message: `Manifest has ${manifest.sites.length} sites but output has ${actualSiteDirs.length} directories.` });
  }

  return issues;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);

  try {
    const issues = await validateSites(args);
    printReport("Generated site validation", issues);
    exitForIssues(issues);
  } catch (error) {
    printReport("Generated site validation", [{ code: "load", message: error instanceof Error ? error.message : String(error) }]);
    process.exit(1);
  }
}

main();
