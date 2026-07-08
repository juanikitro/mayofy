import { z } from "zod";

export const archetypeIds = [
  "automotive-premium-dark",
  "local-clean-service",
  "industrial-garage",
  "minimal-professional",
  "bold-hero-photo",
  "cards-and-services",
  "classic-neighborhood-business",
  "modern-conversion-landing",
] as const;

export const photoTypes = ["facade", "interior", "logo", "product", "other"] as const;
export const usageStatuses = ["allowed", "unknown", "needs_permission"] as const;

const sourceUrl = z.string().min(1);

const ratingSchema = z.object({
  value: z.number().min(0).max(5),
  reviews_count: z.number().int().min(0),
  source_url: sourceUrl,
});

const reviewSchema = z.object({
  text: z.string().min(1),
  author: z.string().min(1).nullable(),
  rating: z.number().min(0).max(5),
  source_url: sourceUrl,
});

const photoSchema = z.object({
  url: sourceUrl,
  type: z.enum(photoTypes),
  source_url: sourceUrl,
  usage_status: z.enum(usageStatuses),
  captured_at: z.string().min(1).optional(),
  permission_notes: z.string().min(1).optional(),
});

const fieldEvidenceSchema = z.object({
  field: z.enum([
    "name",
    "address",
    "city",
    "phone",
    "opening_hours",
    "rating",
    "reviews",
    "photos",
    "website_check",
    "main_product_or_service",
    "category",
    "neighborhood_or_area",
  ]),
  source_url: sourceUrl,
  notes: z.string().min(1).optional(),
});

const sourceRecordSchema = z.object({
  label: z.string().min(1),
  url: sourceUrl,
  captured_at: z.string().min(1),
  notes: z.string().min(1).optional(),
});

export const businessSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.string().min(1),
  is_vehicle_related: z.boolean(),
  address: z.string().min(1),
  city: z.string().min(1).optional(),
  neighborhood_or_area: z.string().min(1).nullable(),
  phone: z.string().min(1).nullable(),
  opening_hours: z.object({
    raw: z.string().min(1).nullable(),
    structured: z.record(z.unknown()),
  }),
  rating: ratingSchema,
  reviews: z.array(reviewSchema),
  main_product_or_service: z.string().min(1),
  photos: z.array(photoSchema),
  has_own_website: z.boolean(),
  website_check: z.object({
    checked_sources: z.array(sourceUrl),
    evidence: z.array(z.string().min(1)),
    notes: z.string().min(1),
  }),
  data_quality_score: z.number().min(0).max(1),
  missing_data_reason: z.string().min(1).nullable(),
  approved_for_generation: z.boolean().default(false),
  is_mock: z.boolean().default(false),
  verification: z.object({
    source_records: z.array(sourceRecordSchema),
    field_evidence: z.array(fieldEvidenceSchema),
  }),
  brand: z
    .object({
      palette: z.object({
        source: z.enum(["logo", "facade", "photo", "manual", "unknown"]),
        captured_from: sourceUrl.nullable(),
        dominant: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        supporting: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/)).min(1),
      }),
      typography: z.object({
        primary: z.string().min(1),
        secondary: z.string().min(1),
      }),
    })
    .optional(),
  site_plan: z
    .object({
      archetype: z.enum(archetypeIds),
      position: z.number().int().positive().optional(),
      rationale: z.string().min(1).optional(),
    })
    .optional(),
});

export const businessDatasetSchema = z.array(businessSchema);

export type Business = z.infer<typeof businessSchema>;
export type ArchetypeId = (typeof archetypeIds)[number];
