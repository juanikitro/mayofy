// Captura screenshots desktop/mobile de landings servidas localmente.
// Scrollea toda la página antes de capturar para disparar reveals por IntersectionObserver.
//
// Uso:
//   node scripts/capture-golden-screenshots.mjs --base-url http://localhost:4173 \
//     --out output/screenshots/golden-samples/<run> --slugs "slug-1|slug-2|slug-3"

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

function valueAfter(flag, fallback) {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const baseUrl = valueAfter("--base-url", "http://localhost:4173");
const outDir = valueAfter("--out", "output/screenshots/golden-samples/run");
const slugs = valueAfter("--slugs", "")
  .split(/[|,]/)
  .map((slug) => slug.trim())
  .filter(Boolean);

if (slugs.length === 0) {
  console.error("Faltan slugs: --slugs \"slug-1|slug-2\"");
  process.exit(1);
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
}

const browser = await chromium.launch();
await mkdir(outDir, { recursive: true });

for (const slug of slugs) {
  for (const [label, viewport] of Object.entries(VIEWPORTS)) {
    // reducedMotion fuerza el estado final de reveals/animaciones: el PNG documenta contenido, no motion.
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    const url = `${baseUrl.replace(/\/$/, "")}/${slug}/`;
    await page.goto(url, { waitUntil: "networkidle" });
    await scrollThrough(page);
    const file = path.join(outDir, `${slug}-${label}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`ok ${file}`);
    await page.close();
  }
}

await browser.close();
