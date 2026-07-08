import { readFile, writeFile } from "node:fs/promises";
import { businessDatasetSchema } from "../src/content/business-schema.js";

type Args = {
  input?: string;
  output: string;
};

function parseArgs(argv: string[]): Args {
  const inputFlag = argv.indexOf("--input");
  const outputFlag = argv.indexOf("--output");
  const output = outputFlag >= 0 ? argv[outputFlag + 1] : null;
  if (!output || output.startsWith("--")) {
    throw new Error("Usage: npm run import:businesses -- --input <verified-export.json> --output <businesses.json>");
  }

  return {
    input: inputFlag >= 0 ? argv[inputFlag + 1] : undefined,
    output,
  };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  if (!args.input) {
    throw new Error("Usage: npm run import:businesses -- --input <verified-export.json> --output <businesses.json>");
  }

  const raw = await readFile(args.input, "utf8");
  const parsed = businessDatasetSchema.parse(JSON.parse(raw));
  await writeFile(args.output, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  console.log(`Imported ${parsed.length} business record(s) into ${args.output}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
