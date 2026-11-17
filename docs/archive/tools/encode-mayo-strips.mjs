// Re-encode the painted Mayo sprite strips (70-mayo-<slot>-tira) at a smaller
// cell size, keeping alpha, cell order and the full frame (no cropping).
//
// Usage (from a temp folder with sharp installed: `npm init -y && npm i sharp`):
//   node encode.mjs --out <dir> [--cell 640] [--avif 52] [--webp 80] <strip.png|.avif|.webp>...
//
// Each input is a horizontal strip of square cells (strip = N*cell x cell).
// The script derives N from the source aspect ratio, resizes with Lanczos3
// (sharp premultiplies alpha before resampling, so no dark fringes) without
// enlarging, and writes `<basename>.avif` and `<basename>.webp` into --out.
import sharp from "sharp";
import { basename, extname, join } from "node:path";
import { mkdir, stat } from "node:fs/promises";

const args = process.argv.slice(2);
const opt = { out: "out", cell: 640, avif: 52, webp: 80 };
const inputs = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--out") opt.out = args[++i];
  else if (a === "--cell") opt.cell = Number(args[++i]);
  else if (a === "--avif") opt.avif = Number(args[++i]);
  else if (a === "--webp") opt.webp = Number(args[++i]);
  else inputs.push(a);
}
if (inputs.length === 0) {
  console.error("No input strips given.");
  process.exit(1);
}
await mkdir(opt.out, { recursive: true });

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

for (const src of inputs) {
  const meta = await sharp(src).metadata();
  const cells = Math.round(meta.width / meta.height);
  const width = cells * opt.cell;
  const name = basename(src, extname(src));
  // Decode once to raw pixels so both encoders share the same resample.
  const resized = await sharp(src)
    .ensureAlpha()
    .resize({ width, height: opt.cell, fit: "fill", kernel: "lanczos3", withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const base = () => sharp(resized.data, { raw: resized.info });

  const avifPath = join(opt.out, `${name}.avif`);
  const webpPath = join(opt.out, `${name}.webp`);
  await base().avif({ quality: opt.avif, effort: 9, chromaSubsampling: "4:4:4" }).toFile(avifPath);
  await base().webp({ quality: opt.webp, alphaQuality: 100, effort: 6, smartSubsample: true }).toFile(webpPath);

  const [a, w] = await Promise.all([stat(avifPath), stat(webpPath)]);
  console.log(`${name}: ${cells} cells -> ${width}x${opt.cell}  avif(q${opt.avif}) ${kb(a.size)}  webp(q${opt.webp}) ${kb(w.size)}`);
}
