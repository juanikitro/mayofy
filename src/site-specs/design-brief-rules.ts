import type { ValidationIssue } from "../validators/report.js";
import type { SiteSpec } from "./schema.js";

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

function hasAiCopyPlan(spec: SiteSpec): boolean {
  return spec.design_brief?.ai_fill_plan.copy.some((item) => /copy|microcopy|secci[oó]n|cta|paquete|rese[ñn]a/iu.test(item)) ?? false;
}

function hasAiImagePlan(spec: SiteSpec): boolean {
  return spec.design_brief?.ai_fill_plan.imagery.some((item) => /imagen|foto|escena|textura|visual|herramienta|producto/iu.test(item)) ?? false;
}

function hasNoFakeDataBoundary(spec: SiteSpec): boolean {
  return (
    spec.design_brief?.ai_fill_plan.boundaries.some((item) =>
      /no\s+inventar.*(precio|stock|marca|a[nñ]o|premio|garant|servicio|rese[ñn]a)/iu.test(item),
    ) ?? false
  );
}

export function designBriefIssues(spec: SiteSpec): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!spec.design_brief) {
    return issues;
  }

  const briefText = designBriefText(spec);

  if (spec.design_brief.visual_thesis.length < 80) {
    issues.push({ code: "thin_visual_thesis", message: `${spec.slug}: design_brief.visual_thesis is too thin to guide a real UI direction.` });
  }
  if (spec.design_brief.layout_signature.length < 80) {
    issues.push({ code: "thin_layout_signature", message: `${spec.slug}: design_brief.layout_signature should describe the conversion template's actual structure.` });
  }
  if (!hasAiCopyPlan(spec)) {
    issues.push({ code: "missing_ai_copy_plan", message: `${spec.slug}: design_brief.ai_fill_plan.copy must say how AI should enrich weak source data.` });
  }
  if (!hasAiImagePlan(spec)) {
    issues.push({ code: "missing_ai_image_plan", message: `${spec.slug}: design_brief.ai_fill_plan.imagery must say how AI should safely add non-specific visuals.` });
  }
  if (!hasNoFakeDataBoundary(spec)) {
    issues.push({
      code: "missing_ai_boundary",
      message: `${spec.slug}: AI fill plan must explicitly block invented prices, stock, brands, years, awards, guarantees, services or reviews.`,
    });
  }
  if (!/hero|foto|imagen|visual|cta|oferta|consulta|turno|presupuesto/iu.test(briefText)) {
    issues.push({ code: "weak_design_brief", message: `${spec.slug}: design_brief lacks concrete conversion/UI vocabulary.` });
  }

  return issues;
}
