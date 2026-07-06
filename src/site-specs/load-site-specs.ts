import { readFile } from "node:fs/promises";
import { siteSpecDatasetSchema, type SiteSpec } from "./schema.js";

export async function loadSiteSpecs(filePath: string): Promise<Map<string, SiteSpec>> {
  const raw = await readFile(filePath, "utf8");
  const specs = siteSpecDatasetSchema.parse(JSON.parse(raw));
  return new Map(specs.map((spec) => [spec.business_id, spec]));
}
