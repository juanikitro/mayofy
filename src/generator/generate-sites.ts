import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { resolveArchetype } from "../archetypes/index.js";
import { approvedBusinesses, loadBusinesses } from "../content/load-businesses.js";
import { resolveDesign } from "../design/palette.js";
import { flagValue, positionalValue, resolveGeneratedDir } from "../generated-output.js";
import { loadSiteSpecs } from "../site-specs/load-site-specs.js";
import { copyAgentFrontend } from "./agent-frontend.js";
import { renderBusinessPage } from "./html.js";
import { prepareHeroImage } from "./image-assets.js";
import { renderStyles } from "./styles.js";

type Args = {
  datasetPath: string;
  outDir: string;
  allowMock: boolean;
  specsPath: string | null;
  requireRealImages: boolean;
  requireAgentFrontends: boolean;
};

type ManifestSite = {
  slug: string;
  business_id: string;
  name: string;
  archetype: string;
  dominant_color: string;
  primary_font: string;
  hero_image_status: string;
  composition: string | null;
  visual_mood: string | null;
  creative_layout: string | null;
  creative_concept: string | null;
  frontend_mode: "renderer-fallback" | "agent-static" | "agent-framework";
  agent_frontend_source: string | null;
  service: string;
  rating: string;
  directory: string;
};

function parseArgs(argv: string[]): Args {
  const datasetPath = positionalValue(argv, 2) ?? "data/tandil-businesses.json";
  return {
    datasetPath,
    outDir: resolveGeneratedDir(argv, { datasetPath }),
    allowMock: argv.includes("--allow-mock"),
    specsPath: flagValue(argv, "--specs"),
    requireRealImages: argv.includes("--require-real-images"),
    requireAgentFrontends: argv.includes("--require-agent-frontends"),
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderIndexPage(sites: ManifestSite[]): string {
  return `<!doctype html>
<html lang="es-AR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Landings locales generadas</title>
    <style>
      :root {
        color-scheme: light;
        --ink: #141719;
        --muted: #667077;
        --line: #d7dddf;
        --canvas: #f4f0e8;
        --surface: #ffffff;
        --accent: #d84f31;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background:
          linear-gradient(135deg, rgba(216, 79, 49, 0.12), transparent 32%),
          repeating-linear-gradient(90deg, rgba(20, 23, 25, 0.05), rgba(20, 23, 25, 0.05) 1px, transparent 1px, transparent 44px),
          var(--canvas);
        color: var(--ink);
        font-family: "Segoe UI", sans-serif;
      }
      main {
        width: min(1120px, calc(100% - 32px));
        margin: 0 auto;
        padding: 54px 0;
      }
      header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 24px;
        align-items: end;
        margin-bottom: 28px;
      }
      h1 {
        margin: 0;
        max-width: 820px;
        font-size: clamp(2.7rem, 7vw, 6.8rem);
        line-height: 0.92;
        letter-spacing: 0;
      }
      header p {
        max-width: 520px;
        color: var(--muted);
        font-size: 1.05rem;
        line-height: 1.55;
      }
      .count {
        border: 1px solid var(--line);
        background: var(--surface);
        padding: 18px;
        min-width: 160px;
        text-align: right;
      }
      .count strong {
        display: block;
        font-size: 3rem;
        line-height: 1;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }
      a.card {
        display: grid;
        min-height: 220px;
        grid-template-rows: auto 1fr auto;
        gap: 18px;
        color: inherit;
        text-decoration: none;
        border: 1px solid var(--line);
        background: color-mix(in srgb, var(--surface) 92%, transparent);
        padding: 22px;
        transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
      }
      a.card:hover {
        transform: translateY(-3px);
        border-color: var(--accent);
        box-shadow: 0 18px 45px rgba(20, 23, 25, 0.12);
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .meta span {
        border: 1px solid var(--line);
        padding: 6px 9px;
        color: var(--muted);
        font-size: 0.84rem;
        font-weight: 700;
      }
      h2 {
        margin: 0;
        font-size: clamp(1.65rem, 3vw, 2.8rem);
        line-height: 1;
        letter-spacing: 0;
      }
      .concept {
        margin: 0;
        color: var(--muted);
        line-height: 1.5;
      }
      .open {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        border-top: 1px solid var(--line);
        padding-top: 14px;
        font-weight: 800;
      }
      @media (max-width: 780px) {
        header,
        .grid {
          grid-template-columns: 1fr;
        }
        .count {
          text-align: left;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <div>
          <h1>Landings locales generadas</h1>
          <p>Indice local para navegar y comparar las paginas generadas. Cada negocio debe usar una estructura propia segun rubro, datos publicos y direccion creativa.</p>
        </div>
        <div class="count"><strong>${sites.length}</strong><span>paginas</span></div>
      </header>
      <section class="grid" aria-label="Landings generadas">
        ${sites
          .map(
            (site) => `<a class="card" href="./${escapeHtml(site.directory)}/">
              <div class="meta">
                <span>${escapeHtml(site.service)}</span>
                <span>${escapeHtml(site.creative_layout ?? site.composition ?? "layout")}</span>
                <span>${escapeHtml(site.frontend_mode)}</span>
                <span>${escapeHtml(site.rating)}</span>
              </div>
              <div>
                <h2>${escapeHtml(site.name)}</h2>
                <p class="concept">${escapeHtml(site.creative_concept ?? "Landing local generada desde datos verificados.")}</p>
              </div>
              <div class="open"><span>Abrir landing</span><span>/${escapeHtml(site.slug)}</span></div>
            </a>`,
          )
          .join("\n")}
      </section>
    </main>
  </body>
</html>`;
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

  const manifest: ManifestSite[] = [];

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
    if (args.requireAgentFrontends && !spec?.agent_frontend) {
      throw new Error(`${business.slug}: final generation requires agent_frontend. Create an authored frontend or framework export first.`);
    }

    let frontendMode: ManifestSite["frontend_mode"] = "renderer-fallback";
    let agentFrontendSource: string | null = null;

    if (spec?.agent_frontend) {
      const copied = await copyAgentFrontend(spec.agent_frontend, siteDir);
      frontendMode = copied.mode;
      agentFrontendSource = copied.sourceDir;
    }

    const heroImage = await prepareHeroImage(business, siteDir, args.requireRealImages && !args.allowMock);

    if (!spec?.agent_frontend) {
      await writeFile(path.join(siteDir, "index.html"), renderBusinessPage(business, archetype, design, heroImage.heroSrc, spec), "utf8");
      await writeFile(path.join(siteDir, "styles.css"), renderStyles(archetype, design), "utf8");
    }

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
      creative_layout: spec?.creative?.layout ?? null,
      creative_concept: spec?.creative?.concept ?? null,
      frontend_mode: frontendMode,
      agent_frontend_source: agentFrontendSource,
      service: business.main_product_or_service,
      rating: `${business.rating.value.toFixed(1)} (${business.rating.reviews_count})`,
      directory: business.slug,
    });
  }

  await writeFile(path.join(args.outDir, "manifest.json"), `${JSON.stringify({ sites: manifest }, null, 2)}\n`, "utf8");
  await writeFile(path.join(args.outDir, "index.html"), renderIndexPage(manifest), "utf8");
  console.log(`Generated ${manifest.length} site(s) in ${args.outDir}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
