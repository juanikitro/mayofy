import type { Business } from "../content/business-schema.js";
import { composeLocalSiteSpec } from "./local-composer.js";
import { siteSpecSchema, type SiteSpec } from "./schema.js";

type ResponsesApiResult = {
  status?: string;
  output_text?: string;
};

const responseSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    business_id: { type: "string" },
    slug: { type: "string" },
    visual_mood: { enum: ["roadside-urgent", "workshop-trust", "precision-service", "neighborhood-direct", "fleet-utility"] },
    composition: { enum: ["split-command", "poster-bay", "route-card", "service-ledger", "photo-board"] },
    headline: { type: "string" },
    subheadline: { type: "string" },
    primary_cta: { type: "string" },
    secondary_cta: { type: "string" },
    service_tags: { type: "array", minItems: 3, maxItems: 5, items: { type: "string" } },
    proof_points: { type: "array", minItems: 3, maxItems: 4, items: { type: "string" } },
    resource_title: { type: "string" },
    resource_items: { type: "array", minItems: 3, maxItems: 4, items: { type: "string" } },
    review_heading: { type: "string" },
    contact_heading: { type: "string" },
    image_prompt: { type: "string" },
    design_notes: { type: "string" },
  },
  required: [
    "business_id",
    "slug",
    "visual_mood",
    "composition",
    "headline",
    "subheadline",
    "primary_cta",
    "secondary_cta",
    "service_tags",
    "proof_points",
    "resource_title",
    "resource_items",
    "review_heading",
    "contact_heading",
    "image_prompt",
    "design_notes",
  ],
};

function promptForBusiness(business: Business, localFallback: SiteSpec): string {
  return JSON.stringify(
    {
      instruction:
        "Generate a high-quality site specification in Spanish argentino for a real local business landing page. Use only verified input data. Do not invent services, awards, years, guarantees or claims. Avoid generic AI phrases. Make it feel designed for the automotive/local service domain.",
      business,
      baseline_spec: localFallback,
    },
    null,
    2,
  );
}

export async function composeOpenAISiteSpec(business: Business, index: number): Promise<SiteSpec> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required for OpenAI site composition.");
  }

  const fallback = composeLocalSiteSpec(business, index);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_SITE_MODEL ?? "gpt-5-mini",
      input: [
        {
          role: "system",
          content:
            "You are a senior Spanish-speaking brand strategist and web art director. Return only valid JSON matching the schema.",
        },
        {
          role: "user",
          content: promptForBusiness(business, fallback),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "site_spec",
          strict: true,
          schema: responseSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI site composition failed ${response.status}: ${body}`);
  }

  const json = (await response.json()) as ResponsesApiResult;
  if (json.status && json.status !== "completed") {
    throw new Error(`OpenAI site composition did not complete: ${json.status}`);
  }
  if (!json.output_text) {
    throw new Error("OpenAI site composition returned no output_text.");
  }

  return siteSpecSchema.parse(JSON.parse(json.output_text));
}
