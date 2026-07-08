import { z } from "zod";

export const visualMoodSchema = z.enum([
  "roadside-urgent",
  "workshop-trust",
  "precision-service",
  "neighborhood-direct",
  "fleet-utility",
]);

export const compositionSchema = z.enum([
  "split-command",
  "poster-bay",
  "route-card",
  "service-ledger",
  "photo-board",
]);

export const creativeLayoutSchema = z.enum([
  "studio-detail",
  "wash-flow",
  "oil-bay",
  "roadside-rescue",
  "bodyshop-craft",
  "parts-counter",
  "mechanic-ledger",
]);

export const creativeTextureSchema = z.enum([
  "polished-glass",
  "water-ripple",
  "oil-label",
  "road-markings",
  "primer-dust",
  "parts-shelf",
  "service-ledger",
]);

export const creativeBlockTypeSchema = z.enum([
  "service-board",
  "process",
  "quote-strip",
  "quick-actions",
  "material-story",
  "metric-grid",
]);

export const conversionTemplateSchema = z.enum([
  "hero-proof-offer",
  "editorial-local-story",
  "visual-menu",
  "service-diagnostic",
  "catalog-counter",
  "urgent-call-first",
]);

export const agentFrontendModeSchema = z.enum(["static-files", "framework-build"]);

export const agentFrontendSchema = z.object({
  mode: agentFrontendModeSchema,
  source_dir: z.string().min(1),
  output_dir: z.string().min(1).optional(),
  build_command: z.string().min(1).optional(),
  libraries: z.array(z.string().min(1)).optional(),
  notes: z.string().min(1),
});

export const commercialToneSchema = z.enum([
  "premium-detailing",
  "urban-custom",
  "practical-workshop",
  "fast-local",
  "parts-counter",
  "bodyshop-craft",
]);

const commercialCardSchema = z.object({
  label: z.string().min(1).optional(),
  title: z.string().min(1),
  body: z.string().min(1),
  meta: z.string().min(1).optional(),
  is_demo: z.boolean().optional(),
});

const commercialPackageSchema = z.object({
  name: z.string().min(1),
  price_label: z.string().min(1),
  body: z.string().min(1),
  items: z.array(z.string().min(1)).min(2).max(5),
  is_demo: z.boolean().optional(),
});

const commercialProcessStepSchema = z.object({
  step: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
});

const commercialFinalCtaSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  primary_label: z.string().min(1),
  secondary_label: z.string().min(1),
});

export const commercialSpecSchema = z.object({
  tone: commercialToneSchema,
  customer_type: z.string().min(1),
  hero_claim: z.string().min(1),
  trust_bar: z.array(commercialCardSchema).min(3).max(5),
  service_cards: z.array(commercialCardSchema).min(3).max(6),
  why_choose: z.array(commercialCardSchema).min(3).max(5),
  packages: z.array(commercialPackageSchema).min(2).max(4),
  gallery: z.array(commercialCardSchema).min(2).max(4),
  process: z.array(commercialProcessStepSchema).min(3).max(5),
  final_cta: commercialFinalCtaSchema,
  editable_note: z.string().min(1).optional(),
});

const creativeCardSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  note: z.string().min(1).optional(),
});

const creativeBlockSchema = z.object({
  type: creativeBlockTypeSchema,
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  items: z.array(creativeCardSchema).min(2).max(5),
  callout: z.string().min(1).optional(),
});

export const creativeSpecSchema = z.object({
  concept: z.string().min(1),
  audience: z.string().min(1),
  visual_direction: z.string().min(1),
  layout: creativeLayoutSchema,
  texture: creativeTextureSchema,
  hero_angle: z.string().min(1),
  hero_cards: z.array(creativeCardSchema).min(2).max(4),
  sections: z.array(creativeBlockSchema).min(3).max(5),
});

// `designed_by` marca la etapa del design-director (ver agents/design-director.md).
// Debe ser "claude-code": el diseno de landings lo hace Claude, no Codex (ver CLAUDE.md / AGENTS.md).
// Es opcional en el schema para no romper el parseo de corridas viejas; el gate `qa:design` lo exige.
export const designedBySchema = z.enum(["claude-code"]);

export const designBriefSchema = z.object({
  designed_by: designedBySchema.optional(),
  market_position: z.string().min(1),
  visual_thesis: z.string().min(1),
  copy_voice: z.string().min(1),
  layout_signature: z.string().min(1),
  asset_plan: z.string().min(1),
  ai_fill_plan: z.object({
    copy: z.array(z.string().min(1)).min(2).max(5),
    imagery: z.array(z.string().min(1)).min(2).max(5),
    boundaries: z.array(z.string().min(1)).min(2).max(6),
  }),
  anti_patterns: z.array(z.string().min(1)).min(3).max(8),
  rewrite_targets: z.array(z.string().min(1)).min(3).max(8),
});

export const siteSpecSchema = z.object({
  business_id: z.string().min(1),
  slug: z.string().min(1),
  visual_mood: visualMoodSchema,
  composition: compositionSchema,
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  primary_cta: z.string().min(1),
  secondary_cta: z.string().min(1),
  service_tags: z.array(z.string().min(1)).min(3).max(5),
  proof_points: z.array(z.string().min(1)).min(3).max(4),
  resource_title: z.string().min(1),
  resource_items: z.array(z.string().min(1)).min(3).max(4),
  review_heading: z.string().min(1),
  contact_heading: z.string().min(1),
  image_prompt: z.string().min(1),
  design_notes: z.string().min(1),
  conversion_template: conversionTemplateSchema.optional(),
  design_brief: designBriefSchema.optional(),
  commercial: commercialSpecSchema.optional(),
  creative: creativeSpecSchema.optional(),
  agent_frontend: agentFrontendSchema.optional(),
});

export const siteSpecDatasetSchema = z.array(siteSpecSchema);

export type SiteSpec = z.infer<typeof siteSpecSchema>;
export type VisualMood = z.infer<typeof visualMoodSchema>;
export type Composition = z.infer<typeof compositionSchema>;
export type CreativeSpec = z.infer<typeof creativeSpecSchema>;
export type CreativeBlockType = z.infer<typeof creativeBlockTypeSchema>;
export type AgentFrontendSpec = z.infer<typeof agentFrontendSchema>;
export type CommercialSpec = z.infer<typeof commercialSpecSchema>;
export type ConversionTemplate = z.infer<typeof conversionTemplateSchema>;
export type DesignBrief = z.infer<typeof designBriefSchema>;
