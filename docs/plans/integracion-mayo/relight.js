// Warm key light on a Mayo strip: a rim on the silhouette side facing the light
// plus a soft warm wash across her body toward that side. Alpha is untouched.
// usage: node relight.js <repoRoot> <name> <dir:+1|-1> <r,g,b> <rim> <wash> <outDir|--write>
const path = require("node:path");
const [root, name, dirS, colS, rimS, washS, out] = process.argv.slice(2);
const sharp = require(path.join(root, "node_modules/sharp"));
const dir = Number(dirS), [lr, lg, lb] = colS.split(",").map(Number);
const RIM = Number(rimS), WASH = Number(washS), C = 640, N = 12;
const base = path.join(root, "public/images/mundo-mayo/70-mayo-" + name + "-tira");

function blur(src, w, h, r) {
  const tmp = new Float32Array(w * h), dst = new Float32Array(w * h);
  for (let y = 0; y < h; y++) { let s = 0; for (let x = -r; x < w + r; x++) {
    s += src[y * w + Math.min(w - 1, Math.max(0, x + r))] - (x - r - 1 >= 0 ? src[y * w + Math.min(w - 1, x - r - 1)] : src[y * w]);
    if (x >= 0 && x < w) tmp[y * w + x] = s / (2 * r + 1); } }
  for (let x = 0; x < w; x++) { let s = 0; for (let y = -r; y < h + r; y++) {
    s += tmp[Math.min(h - 1, Math.max(0, y + r)) * w + x] - (y - r - 1 >= 0 ? tmp[Math.min(h - 1, y - r - 1) * w + x] : tmp[x]);
    if (y >= 0 && y < h) dst[y * w + x] = s / (2 * r + 1); } }
  return dst;
}

(async () => {
  const { data, info } = await sharp(base + ".webp").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  for (let f = 0; f < N; f++) {
    const a = new Float32Array(C * C);
    for (let y = 0; y < C; y++) for (let x = 0; x < C; x++) a[y * C + x] = data[(y * W + f * C + x) * 4 + 3] / 255;
    let x0 = C, x1 = 0;
    for (let y = 0; y < C; y++) for (let x = 0; x < C; x++) if (a[y * C + x] > 0.5) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); }
    // Rim: how much of the silhouette is missing a few px toward the light.
    const rim = new Float32Array(C * C);
    for (const [k, wgt] of [[5, 0.5], [12, 0.3], [22, 0.2]]) for (let y = 0; y < C; y++) for (let x = 0; x < C; x++) {
      const sx = x + dir * k, sy = y - Math.round(k * 0.35);
      const n = sx < 0 || sx >= C || sy < 0 ? 0 : a[sy * C + sx];
      rim[y * C + x] += wgt * Math.max(0, a[y * C + x] - n);
    }
    const rimB = blur(rim, C, C, 3);
    for (let y = 0; y < C; y++) for (let x = 0; x < C; x++) {
      const i = (y * W + f * C + x) * 4, al = a[y * C + x];
      if (al <= 0) continue;
      const t = Math.min(1, Math.max(0, (x - x0) / Math.max(1, x1 - x0)));
      const side = dir > 0 ? t : 1 - t;
      const wash = WASH * Math.pow(side, 1.6);
      const r = Math.min(1, rimB[y * C + x] * 1.8) * RIM * al;
      for (const [c, l] of [[0, lr], [1, lg], [2, lb]]) {
        let v = data[i + c] / 255;
        v = v * (1 - wash) + v * (l / 255) * 1.35 * wash;      // warm multiply wash
        v = 1 - (1 - v) * (1 - r * l / 255);                     // screen rim
        data[i + c] = Math.round(Math.min(1, v) * 255);
      }
    }
  }
  const img = sharp(data, { raw: { width: W, height: C, channels: 4 } });
  if (out !== "--write") { await img.clone().png().toFile(path.join(out, name + "-relit.png")); return; }
  await img.clone().webp({ quality: 85, alphaQuality: 100 }).toFile(base + ".webp");
  await img.clone().avif({ quality: 60 }).toFile(base + ".avif");
  const cel = (await sharp(base + "-cel.avif").metadata()).height;
  const cells = [];
  for (let f = 0; f < N; f++) cells.push({ input: await img.clone().extract({ left: f * C, top: 0, width: C, height: C }).resize(cel, cel, { kernel: "lanczos3" }).png().toBuffer(), left: f * cel, top: 0 });
  await sharp({ create: { width: cel * N, height: cel, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(cells).avif({ quality: 64 }).toFile(base + "-cel.avif.tmp");
  require("node:fs").renameSync(base + "-cel.avif.tmp", base + "-cel.avif");
})().catch((e) => { console.error(e); process.exitCode = 1; });
