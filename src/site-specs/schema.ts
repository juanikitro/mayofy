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
});

export const siteSpecDatasetSchema = z.array(siteSpecSchema);

export type SiteSpec = z.infer<typeof siteSpecSchema>;
export type VisualMood = z.infer<typeof visualMoodSchema>;
export type Composition = z.infer<typeof compositionSchema>;
