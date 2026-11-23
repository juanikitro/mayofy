/*
 * Turns a raw screenshot into the responsive files a case study serves:
 * <out>-<width>.avif, .webp and .jpg for every width, so the page can offer
 * them through <picture> (see CaseShot in src/components/world/case-shot.tsx).
 *
 *   node scripts/case-captures.mjs <source.png> <public/images/proyectos/<slug>/<name>> \
 *     [--widths 800,1280,1680] [--trim right,top,bottom,left]
 *
 * --trim cuts pixels off the edges first (a browser scrollbar, a window
 * border). Widths larger than the trimmed source are skipped, never upscaled.
 * Prints the files written and the size the page should declare.
 * Client names, amounts and personal data must be blurred in the source
 * before it gets here (docs/plans/2026-11-23-casos.md, "Capturas").
 */
import sharp from "sharp";

const [source, out, ...flags] = process.argv.slice(2);
if (!source || !out) {
  console.error("usage: node scripts/case-captures.mjs <source.png> <out-prefix> [--widths 800,1280] [--trim r,t,b,l]");
  process.exit(1);
}

const flag = (name, fallback) => {
  const at = flags.indexOf(`--${name}`);
  return at === -1 ? fallback : flags[at + 1];
};
const widths = flag("widths", "800,1280,1680").split(",").map(Number);
const [right, top, bottom, left] = flag("trim", "0,0,0,0").split(",").map(Number);

const meta = await sharp(source).metadata();
const box = { left, top, width: meta.width - left - right, height: meta.height - top - bottom };
const base = sharp(source).extract(box);

for (const width of widths.filter((w) => w <= box.width)) {
  const resized = base.clone().resize({ width });
  await Promise.all([
    resized.clone().avif({ quality: 55, effort: 6 }).toFile(`${out}-${width}.avif`),
    resized.clone().webp({ quality: 78 }).toFile(`${out}-${width}.webp`),
    resized.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(`${out}-${width}.jpg`),
  ]);
  console.log(`${out}-${width}.{avif,webp,jpg}`);
}
console.log(`trimmed size: ${box.width} x ${box.height}`);
