import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { Business } from "../content/business-schema.js";
import { businessDatasetSchema } from "../content/business-schema.js";
import { loadBusinesses } from "../content/load-businesses.js";

const maxPhotoBytes = 15 * 1024 * 1024;

const researchManifestSchema = z.object({
  businesses: z.array(z.object({
    slug: z.string().min(1),
    profile_url: z.string().url(),
    match_evidence: z.array(z.object({
      source_url: z.string().url(),
      note: z.string().min(1),
    })).min(1),
    photos: z.array(z.object({
      media_url: z.string().url(),
      source_url: z.string().url(),
      type: z.enum(["facade", "interior", "logo", "product", "other"]).default("other"),
    })).min(1).max(3),
  })),
});

type ResearchManifest = z.infer<typeof researchManifestSchema>;

type Args = {
  input: string;
  research: string;
  out: string;
  assetsDir: string;
};

function requiredValue(argv: string[], flag: string): string {
  const index = argv.indexOf(flag);
  const value = index >= 0 ? argv[index + 1] : "";
  if (!value || value.startsWith("--")) {
    throw new Error(`Usage: tsx src/research/enrich-instagram.ts --input <candidates.json> --research <instagram-research.json> --out <enriched.json> --assets-dir <assets-dir> (missing ${flag})`);
  }
  return value;
}

function parseArgs(argv: string[]): Args {
  return {
    input: requiredValue(argv, "--input"),
    research: requiredValue(argv, "--research"),
    out: requiredValue(argv, "--out"),
    assetsDir: requiredValue(argv, "--assets-dir"),
  };
}

function isInstagramUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ["instagram.com", "www.instagram.com"].includes(url.hostname) && url.pathname !== "/";
  } catch {
    return false;
  }
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isInsideRoot(root: string, target: string): boolean {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function extensionFor(contentType: string | null): string {
  if (contentType?.includes("png")) return "png";
  if (contentType?.includes("webp")) return "webp";
  if (contentType?.includes("jpeg") || contentType?.includes("jpg")) return "jpg";
  throw new Error(`Unsupported image content type: ${contentType ?? "missing"}.`);
}

async function downloadImage(url: string): Promise<{ bytes: Uint8Array; extension: string }> {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Image download failed with ${response.status}.`);
  }

  const length = Number(response.headers.get("content-length") ?? "0");
  if (length > maxPhotoBytes) {
    throw new Error(`Image is larger than ${maxPhotoBytes} bytes.`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length === 0 || bytes.length > maxPhotoBytes) {
    throw new Error(`Image size must be between 1 and ${maxPhotoBytes} bytes.`);
  }

  return { bytes, extension: extensionFor(response.headers.get("content-type")) };
}

function validationErrors(manifest: ResearchManifest, businesses: Business[]): string[] {
  const knownSlugs = new Set(businesses.map((business) => business.slug));
  const seenSlugs = new Set<string>();
  const errors: string[] = [];

  for (const entry of manifest.businesses) {
    if (!knownSlugs.has(entry.slug)) errors.push(`${entry.slug}: does not exist in input dataset.`);
    if (seenSlugs.has(entry.slug)) errors.push(`${entry.slug}: appears more than once in Instagram research.`);
    seenSlugs.add(entry.slug);
    if (!isInstagramUrl(entry.profile_url)) errors.push(`${entry.slug}: profile_url must be a public https Instagram profile URL.`);
    for (const evidence of entry.match_evidence) {
      if (!isHttpsUrl(evidence.source_url)) errors.push(`${entry.slug}: match evidence must use https URLs.`);
    }
    for (const photo of entry.photos) {
      if (!isHttpsUrl(photo.media_url)) errors.push(`${entry.slug}: media_url must use https.`);
      if (!isInstagramUrl(photo.source_url)) errors.push(`${entry.slug}: photo source_url must be an Instagram post or profile URL.`);
    }
  }

  return errors;
}

async function enrichBusiness(business: Business, entry: ResearchManifest["businesses"][number], assetsDir: string): Promise<Business> {
  const businessAssetsDir = path.join(assetsDir, business.slug);
  const instagramPhotos: Business["photos"] = [];

  for (const [index, photo] of entry.photos.entries()) {
    try {
      const { bytes, extension } = await downloadImage(photo.media_url);
      const target = path.join(businessAssetsDir, `instagram-${index + 1}.${extension}`);
      await mkdir(businessAssetsDir, { recursive: true });
      await writeFile(target, bytes);
      instagramPhotos.push({
        url: path.relative(process.cwd(), target).replaceAll("\\", "/"),
        type: photo.type,
        source_url: photo.source_url,
        usage_status: "allowed",
        captured_at: new Date().toISOString(),
        permission_notes: "Demo research: public Instagram photo from a verified business profile.",
      });
    } catch (error) {
      console.warn(`${business.slug}: Instagram photo ${index + 1} was skipped: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (instagramPhotos.length === 0) {
    console.warn(`${business.slug}: no Instagram photos were downloaded; keeping the existing photo sources.`);
    return business;
  }

  const capturedAt = new Date().toISOString();
  return {
    ...business,
    photos: [...instagramPhotos, ...business.photos],
    verification: {
      source_records: [
        ...business.verification.source_records,
        {
          label: "Instagram public profile",
          url: entry.profile_url,
          captured_at: capturedAt,
          notes: entry.match_evidence.map((evidence) => evidence.note).join(" | "),
        },
      ],
      field_evidence: [
        ...business.verification.field_evidence,
        {
          field: "photos",
          source_url: entry.profile_url,
          notes: `Instagram profile verified for ${business.name}. ${entry.match_evidence.map((evidence) => evidence.note).join(" | ")}`,
        },
      ],
    },
  };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const repositoryRoot = path.resolve(process.cwd());
  const assetsDir = path.resolve(args.assetsDir);
  if (!isInsideRoot(repositoryRoot, assetsDir)) {
    throw new Error(`--assets-dir must stay inside the repository: ${args.assetsDir}`);
  }

  const [businesses, rawManifest] = await Promise.all([
    loadBusinesses(args.input),
    readFile(args.research, "utf8"),
  ]);
  const manifest = researchManifestSchema.parse(JSON.parse(rawManifest));
  const errors = validationErrors(manifest, businesses);
  if (errors.length > 0) {
    throw new Error(`Invalid Instagram research:\n- ${errors.join("\n- ")}`);
  }

  const bySlug = new Map(manifest.businesses.map((entry) => [entry.slug, entry]));
  const enriched: Business[] = [];
  for (const business of businesses) {
    const entry = bySlug.get(business.slug);
    enriched.push(entry ? await enrichBusiness(business, entry, assetsDir) : business);
  }

  const parsed = businessDatasetSchema.parse(enriched);
  await mkdir(path.dirname(args.out), { recursive: true });
  await writeFile(args.out, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  console.log(`Wrote ${parsed.length} candidate(s) to ${args.out}; enriched ${manifest.businesses.length} Instagram profile(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
