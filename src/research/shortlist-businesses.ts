import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Business } from "../content/business-schema.js";
import { businessDatasetSchema } from "../content/business-schema.js";
import { loadBusinesses } from "../content/load-businesses.js";

type Args = {
  input: string;
  out: string;
  limit: number;
  terms: string[];
  title: string;
};

type ScoredBusiness = {
  business: Business;
  score: number;
  reasons: string[];
};

const strongVehicleTerms = [
  "lavadero",
  "detailing",
  "lubricentro",
  "taller",
  "gomeria",
  "gomería",
  "polarizado",
  "audio",
  "repuesto",
  "chapa",
  "pintura",
  "vehicular",
  "auto",
  "moto",
  "cubierta",
  "lubricante",
];

function splitList(value: string): string[] {
  return value
    .split(/[|,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseArgs(argv: string[]): Args {
  const valueAfter = (flag: string, fallback: string): string => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] : fallback;
  };

  return {
    input: valueAfter("--input", "data/intake/tandil-candidates.json"),
    out: valueAfter("--out", "data/intake/tandil-shortlist.json"),
    limit: Number(valueAfter("--limit", "10")),
    terms: splitList(valueAfter("--terms", strongVehicleTerms.join("|"))),
    title: valueAfter("--title", "Shortlist"),
  };
}

function normalizedKey(business: Business): string {
  return `${business.name}|${business.address}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function segmentStrength(business: Business, terms: string[]): number {
  const haystack = `${business.name} ${business.category} ${business.main_product_or_service}`.toLowerCase();
  return terms.some((term) => haystack.includes(term.toLowerCase())) ? 1 : 0;
}

function scoreBusiness(business: Business, terms: string[]): ScoredBusiness {
  const reasons: string[] = [];
  let score = 0;

  if (!business.has_own_website) {
    score += 20;
    reasons.push("sin websiteUri");
  }
  if (business.rating.value >= 4.7) {
    score += 18;
    reasons.push("rating muy alto");
  } else if (business.rating.value >= 4.3) {
    score += 12;
    reasons.push("rating alto");
  }

  score += Math.min(18, Math.log10(Math.max(business.rating.reviews_count, 1)) * 9);
  if (business.rating.reviews_count >= 25) reasons.push("volumen de reseñas bueno");
  if (business.reviews.length >= 3) {
    score += 16;
    reasons.push("3 reseñas disponibles");
  }
  if (business.photos.length > 0) {
    score += 12;
    reasons.push("fotos disponibles");
  }
  if (business.phone) {
    score += 6;
    reasons.push("telefono disponible");
  }
  if (business.opening_hours.raw) {
    score += 6;
    reasons.push("horarios disponibles");
  }
  if (segmentStrength(business, terms)) {
    score += 14;
    reasons.push("rubro coincide con la busqueda");
  }
  score += business.data_quality_score * 10;

  if (business.missing_data_reason) {
    score -= 8;
    reasons.push(`datos faltantes: ${business.missing_data_reason}`);
  }

  return {
    business,
    score: Number(score.toFixed(2)),
    reasons,
  };
}

function isEligible(business: Business): boolean {
  return (
    !business.has_own_website &&
    business.rating.value >= 4.3 &&
    business.rating.reviews_count >= 10 &&
    business.reviews.length >= 3 &&
    business.photos.length > 0 &&
    business.address.length > 0
  );
}

function dedupe(scored: ScoredBusiness[]): ScoredBusiness[] {
  const bestByKey = new Map<string, ScoredBusiness>();

  for (const item of scored) {
    const key = normalizedKey(item.business);
    const existing = bestByKey.get(key);
    if (!existing || item.score > existing.score) {
      bestByKey.set(key, item);
    }
  }

  return [...bestByKey.values()];
}

function renderReport(scored: ScoredBusiness[], title: string): string {
  const lines = [`# ${title}`, "", `Generated at: ${new Date().toISOString()}`, ""];

  for (const [index, item] of scored.entries()) {
    lines.push(`${index + 1}. ${item.business.name}`);
    lines.push(`   - Score: ${item.score}`);
    lines.push(`   - Rating: ${item.business.rating.value} (${item.business.rating.reviews_count} reseñas)`);
    lines.push(`   - Category: ${item.business.category}`);
    lines.push(`   - Address: ${item.business.address}`);
    lines.push(`   - Reasons: ${item.reasons.join("; ")}`);
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const candidates = await loadBusinesses(args.input);
  const scored = dedupe(candidates.filter(isEligible).map((business) => scoreBusiness(business, args.terms))).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.business.rating.value !== a.business.rating.value) return b.business.rating.value - a.business.rating.value;
    return b.business.rating.reviews_count - a.business.rating.reviews_count;
  });

  if (scored.length < args.limit) {
    throw new Error(`Only ${scored.length} eligible candidate(s), need ${args.limit}. Run search again with a higher limit or lower filters.`);
  }

  const shortlist = scored.slice(0, args.limit).map((item) => ({
    ...item.business,
    approved_for_generation: false,
    missing_data_reason: item.business.missing_data_reason,
  }));

  const parsed = businessDatasetSchema.parse(shortlist);
  await mkdir(path.dirname(args.out), { recursive: true });
  await writeFile(args.out, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  await writeFile(args.out.replace(/\.json$/i, ".report.md"), renderReport(scored.slice(0, args.limit), args.title), "utf8");

  console.log(`Wrote ${parsed.length} shortlisted business(es) to ${args.out}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
