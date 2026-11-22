/*
 * Renders the share cards (Open Graph / Twitter, 1200 x 630 JPEG) into
 * public/og/ from the site's own art, fonts and tokens:
 *
 *   public/og/home.jpg                 home and every page without its own card
 *   public/og/proyectos/<slug>.jpg     one per published case study
 *
 * It opens a page of the running site (so next/font and world.css are loaded),
 * swaps the body for the card and takes a screenshot. Run it again whenever
 * the hero copy, a case study's title or its captures change:
 *
 *   npm run build && npx next start -p 3100
 *   node scripts/og-cards.mjs http://localhost:3100
 *
 * Playwright is not a project dependency: run with any local copy, e.g.
 *   PLAYWRIGHT_DIR=<folder holding node_modules/playwright> node scripts/og-cards.mjs ...
 * or `npx -p playwright@1.61.1 node scripts/og-cards.mjs ...`.
 * Cards stay under ~200 KB so WhatsApp, which drops heavy previews, shows them.
 */
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(process.env.PLAYWRIGHT_DIR ? `${process.env.PLAYWRIGHT_DIR}/` : import.meta.url);
const { chromium } = require("playwright");
const { publishedProjects } = await import(new URL("../src/content/projects.ts", import.meta.url));

const base = process.argv[2] ?? "http://localhost:3100";
const outDir = path.join(root, "public", "og");

const escape = (text) =>
  String(text).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
};

/* Shared frame: the dawn sky of the hero, the wordmark and the domain. */
const css = `
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: var(--sky-dawn-mid); }
  body > *:not(.card) { display: none !important; }
  .card { position: relative; width: 1200px; height: 630px; overflow: hidden; font-family: var(--font-world-sans); color: var(--ink); }
  .card__sky { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; }
  .card__text { position: absolute; left: 76px; top: 72px; bottom: 64px; width: 600px; display: flex; flex-direction: column; }
  .card__brand { font-size: 28px; font-weight: 600; letter-spacing: -0.02em; color: var(--moss); }
  .card__eyebrow { margin-top: auto; font-size: 17px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--moss); }
  .card h1 { margin: 0; font-weight: 600; letter-spacing: -0.03em; line-height: 0.98; text-wrap: balance; }
  .card h1 em { font-family: var(--font-world-serif); font-style: italic; font-weight: 400; font-variation-settings: "opsz" 120, "SOFT" 60; letter-spacing: -0.01em; color: var(--moss); }
  .card__lead { margin: 22px 0 0; font-size: 24px; line-height: 1.3; color: var(--ink-soft); text-wrap: pretty; }
  .card__domain { margin-top: auto; font-size: 22px; font-weight: 600; color: var(--ink); }
`;

/* Home: the floating island with Mayo seated where she is painted (stage.ts, hero anchor). */
const homeCard = () => `
  <style>
    .home .card__text { width: 620px; }
    .home h1 { margin-top: auto; font-size: 60px; }
    .home h1 span { display: block; }
    .home .card__lead { max-width: 470px; }
    .home__plate { position: absolute; width: 1300px; aspect-ratio: 1672 / 941; right: -420px; bottom: -120px; }
    .home__plate > img { position: absolute; inset: 0; width: 100%; height: 100%; }
    .home__mayo { position: absolute; left: 47.73%; top: 62.28%; width: 6.52%; aspect-ratio: 1; overflow: hidden; }
    .home__mayo img { position: absolute; left: 0; top: 0; height: 100%; width: 1200%; max-width: none; }
  </style>
  <div class="world card home">
    <img class="card__sky" src="/images/mundo-mayo/01-hero-escritorio-fondo.webp" alt="">
    <div class="home__plate">
      <img src="/images/mundo-mayo/01-hero-escritorio-isla.webp" alt="">
      <div class="home__mayo"><img src="/images/mundo-mayo/70-mayo-hero-v2-tira.webp" alt=""></div>
    </div>
    <div class="card__text">
      <div class="card__brand">Mayofy</div>
      <h1><span>Webs que <em>venden</em>.</span><span>Sistemas que <em>ordenan</em>.</span></h1>
      <p class="card__lead">Landings, webs con turnos y sistemas a medida para negocios de servicios.</p>
      <div class="card__domain">mayofy.dev</div>
    </div>
  </div>`;

/* Case study: its real captures in the same browser and phone frames as the works index. */
const projectCard = (project) => {
  const shot = project.images[0];
  const phone = project.phoneImage;
  const host = hostOf(project.url) || "mayofy.dev";
  return `
  <style>
    .study .card__text { width: 440px; }
    .study h1 { margin-top: 18px; font-size: 50px; }
    .study__browser { position: absolute; right: 120px; top: 96px; width: 540px; border-radius: 16px; overflow: hidden; background: var(--cream);
      box-shadow: 0 30px 60px -20px oklch(24% 0.05 330 / 45%), 0 0 0 1px oklch(24% 0.03 150 / 10%); }
    .study__bar { display: flex; align-items: center; gap: 8px; height: 38px; padding: 0 16px; font-size: 15px; color: var(--ink-soft); }
    .study__bar i { width: 11px; height: 11px; border-radius: 50%; background: var(--beige-deep); }
    .study__bar span { margin-left: 10px; }
    .study__browser img { display: block; width: 100%; aspect-ratio: 1440 / 900; object-fit: cover; object-position: top; }
    .study__phone { position: absolute; right: 56px; top: 270px; width: 140px; aspect-ratio: 390 / 844; border-radius: 22px; overflow: hidden;
      border: 6px solid var(--ink); background: var(--ink); box-shadow: 0 24px 48px -16px oklch(24% 0.05 330 / 50%); }
    .study__phone img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
  </style>
  <div class="world card study">
    <img class="card__sky" src="/images/mundo-mayo/01-hero-escritorio-fondo.webp" alt="">
    ${shot ? `<div class="study__browser"><div class="study__bar"><i></i><i></i><i></i><span>${escape(host)}</span></div><img src="${shot.src}" alt=""></div>` : ""}
    ${phone ? `<div class="study__phone"><img src="${phone.src}" alt=""></div>` : ""}
    <div class="card__text">
      <div class="card__brand">Mayofy</div>
      <div class="card__eyebrow">Caso · ${escape(project.category)}</div>
      <h1>${escape(project.title)}</h1>
      <div class="card__domain">mayofy.dev</div>
    </div>
  </div>`;
};

async function render(page, markup, file) {
  await page.goto(`${base}/privacidad`, { waitUntil: "load" });
  await page.evaluate(
    ({ css, markup }) => {
      const style = document.createElement("style");
      style.textContent = css;
      document.head.append(style);
      document.body.insertAdjacentHTML("beforeend", markup);
    },
    { css, markup },
  );
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter((img) => img.closest(".card")).map((img) => img.decode().catch(() => {})));
  });
  await mkdir(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file, type: "jpeg", quality: 84 });
  console.log(path.relative(root, file));
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await render(page, homeCard(), path.join(outDir, "home.jpg"));
for (const project of publishedProjects) {
  await render(page, projectCard(project), path.join(outDir, "proyectos", `${project.slug}.jpg`));
}
await browser.close();
