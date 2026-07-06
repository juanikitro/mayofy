import { readFile } from "node:fs/promises";
import { businessDatasetSchema, type Business } from "./business-schema.js";

export async function loadBusinesses(filePath: string): Promise<Business[]> {
  const raw = await readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  return businessDatasetSchema.parse(parsed);
}

export function approvedBusinesses(businesses: Business[]): Business[] {
  return businesses.filter((business) => business.approved_for_generation);
}
