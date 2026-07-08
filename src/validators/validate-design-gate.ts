import { readFile } from "node:fs/promises";
import { ZodError } from "zod";
import { approvedBusinesses, loadBusinesses } from "../content/load-businesses.js";
import { designBriefIssues } from "../site-specs/design-brief-rules.js";
import { loadSiteSpecs } from "../site-specs/load-site-specs.js";
import { siteSpecDatasetSchema, type SiteSpec } from "../site-specs/schema.js";
import { exitForIssues, printReport, type ValidationIssue } from "./report.js";

type Args = {
  businessesPath: string;
  specsPath: string;
};

function parseArgs(argv: string[]): Args {
  const valueAfter = (flag: string, fallback: string): string => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] : fallback;
  };

  return {
    businessesPath: valueAfter("--businesses", "data/tandil-businesses.json"),
    specsPath: valueAfter("--specs", "data/site-specs/tandil-site-specs.json"),
  };
}

async function loadRawSpecs(filePath: string): Promise<SiteSpec[] | null> {
  const raw = await readFile(filePath, "utf8");
  return siteSpecDatasetSchema.parse(JSON.parse(raw));
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const issues: ValidationIssue[] = [];
  const businesses = approvedBusinesses(await loadBusinesses(args.businessesPath));
  let specsByBusiness = new Map<string, SiteSpec>();

  try {
    await loadRawSpecs(args.specsPath);
    specsByBusiness = await loadSiteSpecs(args.specsPath);
  } catch (error) {
    if (error instanceof ZodError) {
      for (const issue of error.issues) {
        issues.push({ code: "schema", message: `${issue.path.join(".")}: ${issue.message}` });
      }
    } else {
      issues.push({ code: "load", message: error instanceof Error ? error.message : String(error) });
    }
  }

  for (const business of businesses) {
    const spec = specsByBusiness.get(business.id);

    if (!spec) {
      issues.push({ code: "missing_spec", message: `${business.slug}: missing site spec.` });
      continue;
    }

    if (!spec.conversion_template) {
      issues.push({ code: "missing_conversion_template", message: `${spec.slug}: missing conversion_template; design gate requires a proven conversion structure.` });
    }

    if (!spec.design_brief) {
      issues.push({ code: "missing_design_brief", message: `${spec.slug}: missing design_brief; design gate requires the design-director brief before generation.` });
      continue;
    }

    if (spec.design_brief.designed_by !== "claude-code") {
      issues.push({
        code: "design_not_claude",
        message: `${spec.slug}: design_brief.designed_by must be "claude-code"; landing design belongs to Claude/design-director, not Codex.`,
      });
    }

    issues.push(...designBriefIssues(spec));
  }

  printReport("Design gate", issues);
  exitForIssues(issues);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
