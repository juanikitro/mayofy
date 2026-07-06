import { ZodError } from "zod";
import { archetypeIds, type Business } from "../content/business-schema.js";
import { approvedBusinesses, loadBusinesses } from "../content/load-businesses.js";
import { dominantColorKey } from "../design/palette.js";
import { exitForIssues, printReport, type ValidationIssue } from "./report.js";

const requiredEvidenceFields = [
  "name",
  "address",
  "rating",
  "reviews",
  "photos",
  "website_check",
  "main_product_or_service",
  "category",
] as const;

type Args = {
  datasetPath: string;
  strictFinal: boolean;
  allowMock: boolean;
  allowIncomplete: boolean;
};

function parseArgs(argv: string[]): Args {
  return {
    datasetPath: argv[2] ?? "data/tandil-businesses.json",
    strictFinal: argv.includes("--strict-final"),
    allowMock: argv.includes("--allow-mock"),
    allowIncomplete: argv.includes("--allow-incomplete"),
  };
}

function isMockSource(value: string): boolean {
  return value.startsWith("mock://");
}

function evidenceFields(business: Business): Set<string> {
  return new Set(business.verification.field_evidence.map((item) => item.field));
}

function validateBusiness(business: Business, args: Args): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const prefix = business.slug;
  const fields = evidenceFields(business);
  const requireFinalCompleteness = !args.allowIncomplete || business.approved_for_generation;

  if (business.has_own_website) {
    if (requireFinalCompleteness) {
      issues.push({ code: "own_website", message: `${prefix}: has_own_website must be false.` });
    }
  }

  if (!args.allowMock && business.is_mock) {
    issues.push({ code: "mock_data", message: `${prefix}: mock records cannot be used for final validation.` });
  }

  if (!args.allowMock) {
    const sourceValues = [
      business.rating.source_url,
      ...business.reviews.map((review) => review.source_url),
      ...business.photos.flatMap((photo) => [photo.url, photo.source_url]),
      ...business.website_check.checked_sources,
      ...business.verification.source_records.map((record) => record.url),
      ...business.verification.field_evidence.map((record) => record.source_url),
    ];
    if (sourceValues.some(isMockSource)) {
      issues.push({ code: "mock_source", message: `${prefix}: final dataset contains mock:// evidence.` });
    }
  }

  if (requireFinalCompleteness && business.reviews.length < 3) {
    issues.push({ code: "reviews_count", message: `${prefix}: at least 3 literal reviews are required.` });
  }

  if (requireFinalCompleteness && business.photos.filter((photo) => photo.usage_status === "allowed").length === 0) {
    issues.push({ code: "photo_permission", message: `${prefix}: at least one allowed photo is required for generation.` });
  }

  if (requireFinalCompleteness && (business.website_check.checked_sources.length === 0 || business.website_check.evidence.length === 0)) {
    issues.push({ code: "website_check", message: `${prefix}: website absence needs checked sources and evidence.` });
  }

  if (requireFinalCompleteness) {
    for (const field of requiredEvidenceFields) {
      if (!fields.has(field)) {
        issues.push({ code: "missing_evidence", message: `${prefix}: missing field evidence for ${field}.` });
      }
    }
  }

  if (requireFinalCompleteness && business.phone && !fields.has("phone")) {
    issues.push({ code: "missing_phone_evidence", message: `${prefix}: phone is present but has no field evidence.` });
  }

  if (requireFinalCompleteness && business.opening_hours.raw && !fields.has("opening_hours")) {
    issues.push({ code: "missing_hours_evidence", message: `${prefix}: opening hours are present but have no field evidence.` });
  }

  if (business.approved_for_generation && business.data_quality_score < 0.8) {
    issues.push({ code: "low_quality", message: `${prefix}: approved records need data_quality_score >= 0.8.` });
  }

  return issues;
}

function validateDistribution(businesses: Business[], strictFinal: boolean): ValidationIssue[] {
  const approved = approvedBusinesses(businesses);
  const issues: ValidationIssue[] = [];

  if (strictFinal && approved.length !== 10) {
    issues.push({ code: "approved_count", message: `Expected exactly 10 approved businesses, found ${approved.length}.` });
  }

  const archetypeCounts = new Map<string, number>();
  const ordered = [...approved].sort((a, b) => (a.site_plan?.position ?? 999) - (b.site_plan?.position ?? 999));

  for (const [index, business] of ordered.entries()) {
    const archetype = business.site_plan?.archetype ?? archetypeIds[index % archetypeIds.length];
    archetypeCounts.set(archetype, (archetypeCounts.get(archetype) ?? 0) + 1);

    const previous = ordered[index - 1];
    if (!previous) {
      continue;
    }

    const previousArchetype = previous.site_plan?.archetype ?? archetypeIds[(index - 1) % archetypeIds.length];
    if (previousArchetype === archetype) {
      issues.push({ code: "consecutive_archetype", message: `${previous.slug} and ${business.slug} share ${archetype}.` });
    }

    if (previous.brand && business.brand) {
      if (dominantColorKey(previous.brand.palette.dominant) === dominantColorKey(business.brand.palette.dominant)) {
        issues.push({ code: "consecutive_palette", message: `${previous.slug} and ${business.slug} share dominant palette.` });
      }
      if (previous.brand.typography.primary === business.brand.typography.primary) {
        issues.push({ code: "consecutive_typography", message: `${previous.slug} and ${business.slug} share primary typography.` });
      }
    }
  }

  for (const [archetype, count] of archetypeCounts) {
    if (count > 2) {
      issues.push({ code: "archetype_overuse", message: `${archetype} is used ${count} times; max is 2.` });
    }
  }

  return issues;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const issues: ValidationIssue[] = [];
  let businesses: Business[] = [];

  try {
    businesses = await loadBusinesses(args.datasetPath);
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
    issues.push(...validateBusiness(business, args));
  }

  issues.push(...validateDistribution(businesses, args.strictFinal));

  printReport("Dataset validation", issues);
  exitForIssues(issues);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
