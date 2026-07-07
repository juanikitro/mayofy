import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { resolveGeneratedDir } from "../generated-output.js";

type SiteRecord = {
  slug: string;
  name: string;
  directory: string;
};

type Manifest = {
  sites: SiteRecord[];
};

async function main(): Promise<void> {
  const outDir = resolveGeneratedDir(process.argv, { positionalIndex: 2, fallbackSession: "tandil" });
  const manifest = JSON.parse(await readFile(path.join(outDir, "manifest.json"), "utf8")) as Manifest;

  const deploys = manifest.sites.map((site) => ({
    business: site.name,
    slug: site.slug,
    project_name: `local-${site.slug}`,
    cwd: path.join(outDir, site.directory),
    command: `vercel deploy ${path.join(outDir, site.directory)} --prod --name local-${site.slug}`,
    status: "planned",
  }));

  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "deploy-plan.json"), `${JSON.stringify({ deploys }, null, 2)}\n`, "utf8");
  console.log(`Wrote deploy plan for ${deploys.length} site(s) to ${path.join(outDir, "deploy-plan.json")}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
