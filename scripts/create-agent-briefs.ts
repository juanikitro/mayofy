import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { approvedBusinesses, loadBusinesses } from "../src/content/load-businesses.js";
import { summarizeOpeningHours } from "../src/content/hours.js";
import { buildBusinessProfile } from "../src/content/local-copy.js";
import { siteSpecDatasetSchema } from "../src/site-specs/schema.js";

type Args = {
  input: string;
  specs: string;
  outDir: string;
  city: string;
  segment: string;
};

function parseArgs(argv: string[]): Args {
  const valueAfter = (flag: string, fallback: string): string => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] : fallback;
  };

  return {
    input: valueAfter("--input", "data/tandil-businesses.json"),
    specs: valueAfter("--specs", "data/site-specs/tandil-site-specs.json"),
    outDir: valueAfter("--out", "data/agent-briefs/tandil"),
    city: valueAfter("--city", "Tandil"),
    segment: valueAfter("--segment", "servicios vehiculares"),
  };
}

function fencedJson(value: unknown): string {
  return `\n\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\`\n`;
}

async function loadCurrentSpecs(filePath: string): Promise<Map<string, unknown>> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = siteSpecDatasetSchema.parse(JSON.parse(raw));
    return new Map(parsed.map((spec) => [spec.business_id, spec]));
  } catch {
    return new Map();
  }
}

function renderBrief(params: {
  business: Awaited<ReturnType<typeof loadBusinesses>>[number];
  index: number;
  currentSpec: unknown;
  args: Args;
}): string {
  const { business, index, currentSpec, args } = params;
  const profile = buildBusinessProfile(business);
  const sourceUrls = [
    business.rating.source_url,
    ...business.website_check.checked_sources,
    ...business.photos.map((photo) => photo.source_url),
    ...business.reviews.map((review) => review.source_url),
  ];

  const normalizedSegment = args.segment
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const domainDirection = normalizedSegment.includes("ropa") || normalizedSegment.includes("indumentaria") || normalizedSegment.includes("moda")
    ? "Use apparel/local-retail cues: vidriera, temporada, seleccion de prendas, cercania, ubicacion, formas de contacto. Do not invent brands, prices, stock, sizes or promos."
    : normalizedSegment.includes("vehicul")
      ? "Use automotive/local-service cues: route, workshop, tires, urgency, practical contact, opening hours, location."
      : `Use cues from the ${args.segment} domain and the local retail/service context in ${args.city}.`;

  return `# Site Brief ${index + 1}: ${business.name}

## Goal

Write or refine one \`SiteSpec\` for this business. Use the agent session context and judgement. Do not call the OpenAI API from repo scripts.

## Hard Rules

- Use only verified data below.
- Do not invent services, years, awards, guarantees, prices, certifications, owners, staff, or claims.
- Visible copy must be Spanish argentino, natural, local, commercial, and not exaggerated.
- Avoid generic filler like "soluciones integrales", "calidad garantizada", "experiencia unica", "creado con IA".
- Keep the business name isolated to this one site.
- Make the page feel designed for "${args.segment}" in ${args.city}, not like a SaaS template.

## Business Snapshot

- id: \`${business.id}\`
- slug: \`${business.slug}\`
- name: ${business.name}
- category: ${business.category}
- inferred profile: ${profile.rubro}
- requested segment: ${args.segment}
- city: ${args.city}
- address: ${business.address}
- phone: ${business.phone ?? "null"}
- hours summary: ${summarizeOpeningHours(business.opening_hours.raw)}
- rating: ${business.rating.value} / 5 (${business.rating.reviews_count} reseñas)
- service baseline: ${business.main_product_or_service}

## Useful Real Signals

### Reviews

${business.reviews
  .slice(0, 3)
  .map((review, reviewIndex) => `${reviewIndex + 1}. "${review.text}" — ${review.author ?? "Cliente"} (${review.rating}/5)`)
  .join("\n")}

### Photos

${business.photos
  .slice(0, 3)
  .map((photo, photoIndex) => `${photoIndex + 1}. ${photo.type} | ${photo.usage_status} | ${photo.url}`)
  .join("\n")}

### Sources

${[...new Set(sourceUrls)].map((url) => `- ${url}`).join("\n")}

## Recommended Design Direction

- ${domainDirection}
- Prefer concrete microcopy based on the signals above.
- Vary \`visual_mood\` and \`composition\` across the 10 sites.
- Avoid repeating the same hero rhythm, proof order, and CTA wording from nearby briefs.

## Current Spec, If Any
${fencedJson(currentSpec ?? null)}

## SiteSpec Schema Shape

Return one object with:

- \`business_id\`
- \`slug\`
- \`visual_mood\`: one of \`roadside-urgent\`, \`workshop-trust\`, \`precision-service\`, \`neighborhood-direct\`, \`fleet-utility\`
- \`composition\`: one of \`split-command\`, \`poster-bay\`, \`route-card\`, \`service-ledger\`, \`photo-board\`
- \`headline\`
- \`subheadline\`
- \`primary_cta\`
- \`secondary_cta\`
- \`service_tags\`: 3 to 5 strings
- \`proof_points\`: 3 to 4 strings
- \`resource_title\`
- \`resource_items\`: 3 to 4 strings
- \`review_heading\`
- \`contact_heading\`
- \`image_prompt\`
- \`design_notes\`
`;
}

function renderIndex(businesses: Awaited<ReturnType<typeof loadBusinesses>>, args: Args): string {
  return `# ${args.city} Agent Briefs

Use these briefs from a Codex/Claude session to rewrite the configured site specs file.

- city: ${args.city}
- segment: ${args.segment}
- specs: ${args.specs}

Recommended flow:

\`\`\`powershell
npm run agent:briefs
# Agent edits data/site-specs/tandil-site-specs.json
npm run validate:specs
npm run generate:preview
npm run qa
\`\`\`

Businesses:

${businesses.map((business, index) => `${index + 1}. [${business.name}](./${business.slug}.md)`).join("\n")}
`;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const businesses = approvedBusinesses(await loadBusinesses(args.input));
  const currentSpecs = await loadCurrentSpecs(args.specs);

  await rm(args.outDir, { recursive: true, force: true });
  await mkdir(args.outDir, { recursive: true });

  for (const [index, business] of businesses.entries()) {
    await writeFile(
      path.join(args.outDir, `${business.slug}.md`),
      renderBrief({ business, index, currentSpec: currentSpecs.get(business.id), args }),
      "utf8",
    );
  }

  await writeFile(path.join(args.outDir, "README.md"), renderIndex(businesses, args), "utf8");
  console.log(`Wrote ${businesses.length} agent brief(s) to ${args.outDir}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
