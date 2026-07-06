import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { resolveArchetype } from "../archetypes/index.js";
import { approvedBusinesses, loadBusinesses } from "../content/load-businesses.js";
import { resolveDesign } from "../design/palette.js";
import { loadSiteSpecs } from "../site-specs/load-site-specs.js";
import { renderBusinessPage } from "./html.js";
import { prepareHeroImage } from "./image-assets.js";
import { renderStyles } from "./styles.js";

type Args = {
  datasetPath: string;
  outDir: string;
  allowMock: boolean;
  specsPath: string | null;
  requireRealImages: boolean;
};

function parseArgs(argv: string[]): Args {
  const datasetPath = argv[2] ?? "data/tandil-businesses.json";
  const outFlag = argv.indexOf("--out");
  const specsFlag = argv.indexOf("--specs");
  return {
    datasetPath,
    outDir: outFlag >= 0 ? argv[outFlag + 1] : "generated",
    allowMock: argv.includes("--allow-mock"),
    specsPath: specsFlag >= 0 ? argv[specsFlag + 1] : null,
    requireRealImages: argv.includes("--require-real-images"),
  };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const businesses = approvedBusinesses(await loadBusinesses(args.datasetPath));
  const specs = args.specsPath ? await loadSiteSpecs(args.specsPath) : new Map();

  if (!args.allowMock && businesses.some((business) => business.is_mock)) {
    throw new Error("Refusing to generate final sites from mock data.");
  }

  await rm(args.outDir, { recursive: true, force: true });
  await mkdir(args.outDir, { recursive: true });

  const manifest = [];

  for (const [index, business] of businesses.entries()) {
    const allowedPhoto = business.photos.some((photo) => photo.usage_status === "allowed");
    if (!allowedPhoto) {
      throw new Error(`${business.slug}: no allowed photo available for generation.`);
    }

    const archetype = resolveArchetype(business, index);
    const design = resolveDesign(business, archetype);
    const siteDir = path.join(args.outDir, business.slug);
    await mkdir(siteDir, { recursive: true });
    const spec = specs.get(business.id);
    const heroImage = await prepareHeroImage(business, siteDir, args.requireRealImages && !args.allowMock);

    await writeFile(path.join(siteDir, "index.html"), renderBusinessPage(business, archetype, design, heroImage.heroSrc, spec), "utf8");
    await writeFile(path.join(siteDir, "styles.css"), renderStyles(archetype, design), "utf8");
    await writeFile(
      path.join(siteDir, "site.json"),
      `${JSON.stringify(
        {
          id: business.id,
          name: business.name,
          slug: business.slug,
          archetype: archetype.id,
          palette: {
            dominant: design.dominant,
            accent: design.accent,
            source: design.paletteSource,
          },
          typography: {
            primary: design.primaryFont,
            secondary: design.secondaryFont,
          },
          hero_image: heroImage,
          site_spec: spec ?? null,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    manifest.push({
      slug: business.slug,
      business_id: business.id,
      name: business.name,
      archetype: archetype.id,
      dominant_color: design.dominant,
      primary_font: design.primaryFont,
      hero_image_status: heroImage.status,
      composition: spec?.composition ?? null,
      visual_mood: spec?.visual_mood ?? null,
      directory: business.slug,
    });
  }

  await writeFile(path.join(args.outDir, "manifest.json"), `${JSON.stringify({ sites: manifest }, null, 2)}\n`, "utf8");
  console.log(`Generated ${manifest.length} site(s) in ${args.outDir}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
