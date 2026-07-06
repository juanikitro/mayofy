import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { approvedBusinesses, loadBusinesses } from "../content/load-businesses.js";
import { composeLocalSiteSpec } from "./local-composer.js";
import { composeOpenAISiteSpec } from "./openai-composer.js";
import { siteSpecDatasetSchema, type SiteSpec } from "./schema.js";

type Args = {
  input: string;
  out: string;
  provider: "local" | "openai";
};

function parseArgs(argv: string[]): Args {
  const valueAfter = (flag: string, fallback: string): string => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] : fallback;
  };

  const provider = valueAfter("--provider", "local");
  if (provider !== "local" && provider !== "openai") {
    throw new Error("--provider must be local or openai");
  }

  return {
    input: valueAfter("--input", "data/tandil-businesses.json"),
    out: valueAfter("--out", "data/site-specs/tandil-site-specs.json"),
    provider,
  };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const businesses = approvedBusinesses(await loadBusinesses(args.input));
  const specs: SiteSpec[] = [];

  for (const [index, business] of businesses.entries()) {
    const spec = args.provider === "openai" ? await composeOpenAISiteSpec(business, index) : composeLocalSiteSpec(business, index);
    specs.push(spec);
  }

  const parsed = siteSpecDatasetSchema.parse(specs);
  await mkdir(path.dirname(args.out), { recursive: true });
  await writeFile(args.out, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  console.log(`Wrote ${parsed.length} ${args.provider} site spec(s) to ${args.out}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
