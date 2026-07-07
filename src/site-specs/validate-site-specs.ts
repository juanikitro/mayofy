import { ZodError } from "zod";
import { approvedBusinesses, loadBusinesses } from "../content/load-businesses.js";
import { loadSiteSpecs } from "./load-site-specs.js";
import { siteSpecDatasetSchema, type SiteSpec } from "./schema.js";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { exitForIssues, printReport, type ValidationIssue } from "../validators/report.js";

type Args = {
  businessesPath: string;
  specsPath: string;
};

const forbiddenVisibleTerms = [
  /\bIA\b/u,
  /\bAI\b/u,
  /\bgenerad[oa]s?\b/iu,
  /\bhecho\s+con\s+ia\b/iu,
  /\bcreado\s+con\s+ia\b/iu,
];

const weakCopyPatterns = [
  /soluciones integrales/iu,
  /calidad garantizada/iu,
  /experiencia unica/iu,
  /servicio de excelencia/iu,
  /mejor opcion/iu,
  /profesionales altamente capacitados/iu,
  /atencion personalizada de calidad/iu,
  /tu mejor aliado/iu,
  /compromiso con la excelencia/iu,
];

const metaCopyPatterns = [
  /\bla\s+p[aá]gina\s+(debe|puede|tiene|convierte|ayuda)/iu,
  /\beste\s+sitio\s+(puede|debe|ayuda)/iu,
  /\blanding\s+(puede|debe|para)/iu,
  /\btemplate\b/iu,
  /\bplaceholder\b/iu,
];

function isInsideRoot(root: string, target: string): boolean {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function directoryExists(dir: string): Promise<boolean> {
  try {
    return (await stat(dir)).isDirectory();
  } catch {
    return false;
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

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

function visibleSpecText(spec: SiteSpec): string {
  const commercial = spec.commercial
    ? [
        spec.commercial.customer_type,
        spec.commercial.hero_claim,
        spec.commercial.editable_note ?? "",
        ...spec.commercial.trust_bar.flatMap((item) => [item.label ?? "", item.title, item.body, item.meta ?? ""]),
        ...spec.commercial.service_cards.flatMap((item) => [item.label ?? "", item.title, item.body, item.meta ?? ""]),
        ...spec.commercial.why_choose.flatMap((item) => [item.label ?? "", item.title, item.body, item.meta ?? ""]),
        ...spec.commercial.packages.flatMap((item) => [item.name, item.price_label, item.body, ...item.items]),
        ...spec.commercial.gallery.flatMap((item) => [item.label ?? "", item.title, item.body, item.meta ?? ""]),
        ...spec.commercial.process.flatMap((item) => [item.step, item.title, item.body]),
        spec.commercial.final_cta.title,
        spec.commercial.final_cta.body,
        spec.commercial.final_cta.primary_label,
        spec.commercial.final_cta.secondary_label,
      ]
    : [];

  const creative = spec.creative
    ? [
        spec.creative.concept,
        spec.creative.audience,
        spec.creative.visual_direction,
        spec.creative.hero_angle,
        ...spec.creative.hero_cards.flatMap((card) => [card.label, card.value, card.note ?? ""]),
        ...spec.creative.sections.flatMap((section) => [
          section.eyebrow,
          section.title,
          section.body,
          section.callout ?? "",
          ...section.items.flatMap((item) => [item.label, item.value, item.note ?? ""]),
        ]),
      ]
    : [];

  return [
    spec.headline,
    spec.subheadline,
    spec.primary_cta,
    spec.secondary_cta,
    ...spec.service_tags,
    ...spec.proof_points,
    spec.resource_title,
    ...spec.resource_items,
    spec.review_heading,
    spec.contact_heading,
    ...commercial,
    ...creative,
  ].join("\n");
}

function designBriefText(spec: SiteSpec): string {
  if (!spec.design_brief) {
    return "";
  }

  return [
    spec.design_brief.market_position,
    spec.design_brief.visual_thesis,
    spec.design_brief.copy_voice,
    spec.design_brief.layout_signature,
    spec.design_brief.asset_plan,
    ...spec.design_brief.ai_fill_plan.copy,
    ...spec.design_brief.ai_fill_plan.imagery,
    ...spec.design_brief.ai_fill_plan.boundaries,
    ...spec.design_brief.anti_patterns,
    ...spec.design_brief.rewrite_targets,
  ].join("\n");
}

async function loadRawSpecs(filePath: string): Promise<SiteSpec[] | null> {
  const raw = await readFile(filePath, "utf8");
  return siteSpecDatasetSchema.parse(JSON.parse(raw));
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const issues: ValidationIssue[] = [];
  const businesses = approvedBusinesses(await loadBusinesses(args.businessesPath));
  let specs: SiteSpec[] = [];
  let specsByBusiness = new Map<string, SiteSpec>();

  try {
    specs = (await loadRawSpecs(args.specsPath)) ?? [];
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

  if (specs.length !== businesses.length) {
    issues.push({ code: "spec_count", message: `Expected ${businesses.length} specs, found ${specs.length}.` });
  }

  const expectedBusinessIds = new Set(businesses.map((business) => business.id));
  const expectedSlugsById = new Map(businesses.map((business) => [business.id, business.slug]));
  const seenCompositions = new Map<string, number>();
  const seenMoods = new Map<string, number>();

  for (const spec of specs) {
    if (!expectedBusinessIds.has(spec.business_id)) {
      issues.push({ code: "unknown_business", message: `${spec.slug}: spec business_id does not exist in approved dataset.` });
    }

    const expectedSlug = expectedSlugsById.get(spec.business_id);
    if (expectedSlug && expectedSlug !== spec.slug) {
      issues.push({ code: "slug_mismatch", message: `${spec.business_id}: expected slug ${expectedSlug}, found ${spec.slug}.` });
    }

    const text = visibleSpecText(spec);
    for (const pattern of forbiddenVisibleTerms) {
      if (pattern.test(text)) {
        issues.push({ code: "forbidden_text", message: `${spec.slug}: visible spec text contains forbidden term ${pattern}.` });
      }
    }
    for (const pattern of weakCopyPatterns) {
      if (pattern.test(text)) {
        issues.push({ code: "weak_copy", message: `${spec.slug}: visible spec text contains generic phrase ${pattern}.` });
      }
    }
    for (const pattern of metaCopyPatterns) {
      if (pattern.test(text)) {
        issues.push({ code: "meta_copy", message: `${spec.slug}: visible spec text sounds like generator instructions instead of customer-facing copy: ${pattern}.` });
      }
    }

    if (!spec.conversion_template) {
      issues.push({ code: "missing_conversion_template", message: `${spec.slug}: missing conversion_template; future/remake specs should choose a proven conversion structure.` });
    }

    if (!spec.design_brief) {
      issues.push({ code: "missing_design_brief", message: `${spec.slug}: missing design_brief; future/remake specs need a visual thesis, AI fill plan, anti-patterns and rewrite targets.` });
    } else {
      const briefText = designBriefText(spec);
      const hasAiCopyPlan = spec.design_brief.ai_fill_plan.copy.some((item) => /copy|microcopy|secci[oó]n|cta|paquete|rese[ñn]a/iu.test(item));
      const hasAiImagePlan = spec.design_brief.ai_fill_plan.imagery.some((item) => /imagen|foto|escena|textura|visual|herramienta|producto/iu.test(item));
      const hasNoFakeDataBoundary = spec.design_brief.ai_fill_plan.boundaries.some((item) =>
        /no\s+inventar.*(precio|stock|marca|a[nñ]o|premio|garant|servicio|rese[ñn]a)/iu.test(item),
      );

      if (spec.design_brief.visual_thesis.length < 80) {
        issues.push({ code: "thin_visual_thesis", message: `${spec.slug}: design_brief.visual_thesis is too thin to guide a real UI direction.` });
      }
      if (spec.design_brief.layout_signature.length < 80) {
        issues.push({ code: "thin_layout_signature", message: `${spec.slug}: design_brief.layout_signature should describe the conversion template's actual structure.` });
      }
      if (!hasAiCopyPlan) {
        issues.push({ code: "missing_ai_copy_plan", message: `${spec.slug}: design_brief.ai_fill_plan.copy must say how AI should enrich weak source data.` });
      }
      if (!hasAiImagePlan) {
        issues.push({ code: "missing_ai_image_plan", message: `${spec.slug}: design_brief.ai_fill_plan.imagery must say how AI should safely add non-specific visuals.` });
      }
      if (!hasNoFakeDataBoundary) {
        issues.push({ code: "missing_ai_boundary", message: `${spec.slug}: AI fill plan must explicitly block invented prices, stock, brands, years, awards, guarantees, services or reviews.` });
      }
      if (!/hero|foto|imagen|visual|cta|oferta|consulta|turno|presupuesto/iu.test(briefText)) {
        issues.push({ code: "weak_design_brief", message: `${spec.slug}: design_brief lacks concrete conversion/UI vocabulary.` });
      }
    }

    seenCompositions.set(spec.composition, (seenCompositions.get(spec.composition) ?? 0) + 1);
    seenMoods.set(spec.visual_mood, (seenMoods.get(spec.visual_mood) ?? 0) + 1);

    if (spec.agent_frontend) {
      if (spec.agent_frontend.mode === "framework-build" && !spec.agent_frontend.output_dir) {
        issues.push({ code: "agent_frontend_output", message: `${spec.slug}: framework-build requires output_dir.` });
      }

      const source = spec.agent_frontend.mode === "framework-build" ? spec.agent_frontend.output_dir ?? spec.agent_frontend.source_dir : spec.agent_frontend.source_dir;
      const sourceDir = path.resolve(process.cwd(), source);
      if (!isInsideRoot(process.cwd(), sourceDir)) {
        issues.push({ code: "agent_frontend_path", message: `${spec.slug}: agent_frontend source must stay inside the repo.` });
      } else if (!(await directoryExists(sourceDir))) {
        issues.push({ code: "agent_frontend_missing", message: `${spec.slug}: agent_frontend source directory does not exist: ${source}.` });
      } else if (!(await fileExists(path.join(sourceDir, "index.html")))) {
        issues.push({ code: "agent_frontend_index", message: `${spec.slug}: agent_frontend source must contain index.html.` });
      }
    }
  }

  for (const business of businesses) {
    if (!specsByBusiness.has(business.id)) {
      issues.push({ code: "missing_spec", message: `${business.slug}: missing site spec.` });
    }
  }

  if (seenCompositions.size < 4 && businesses.length >= 8) {
    issues.push({ code: "low_composition_variety", message: `Expected at least 4 composition types, found ${seenCompositions.size}.` });
  }

  if (seenMoods.size < 3 && businesses.length >= 8) {
    issues.push({ code: "low_mood_variety", message: `Expected at least 3 visual moods, found ${seenMoods.size}.` });
  }

  printReport("Site spec validation", issues);
  exitForIssues(issues);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
