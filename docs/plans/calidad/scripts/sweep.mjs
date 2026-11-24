// node sweep.mjs <config> <WxH> <outDir> [path]
// config: chrome | firefox | firefox-nosda | webkit | iphone
import { chromium, firefox, webkit, devices } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [config, size, outDir, route = "/"] = process.argv.slice(2);
const [w, h] = size.split("x").map(Number);
fs.mkdirSync(outDir, { recursive: true });
const reduced = process.env.REDUCED === "1";

let browser, context;
const ctxOpts = { viewport: { width: w, height: h }, reducedMotion: reduced ? "reduce" : "no-preference" };
if (config === "chrome") browser = await chromium.launch({ channel: "chrome" });
if (config === "firefox") browser = await firefox.launch();
if (config === "firefox-nosda") browser = await firefox.launch({ firefoxUserPrefs: { "layout.css.scroll-driven-animations.enabled": false } });
if (config === "webkit") browser = await webkit.launch();
if (config === "iphone") {
  browser = await webkit.launch();
  context = await browser.newContext({ ...devices["iPhone 15"], reducedMotion: ctxOpts.reducedMotion });
}
context ??= await browser.newContext(ctxOpts);
// WebKit on Windows freezes on Cal.com's embed itself (see calmin.mjs): NOCAL=1 skips it.
if (process.env.NOCAL) await context.route((url) => /(^|\.)cal\.com$/.test(url.hostname), (r) => r.abort());
const page = await context.newPage();
// Never send test visits to the real GA property.
await context.route(/googletagmanager\.com|google-analytics\.com|analytics\.google\.com/, (r) => r.abort());
const errors = [];
page.on("console", (m) => { if (m.type() === "error" || (m.type() === "warning" && !/cookie|Permissions Policy|Layout was forced/.test(m.text()))) errors.push(`${m.type()}: ${m.text().slice(0, 300)}`); });
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message.slice(0, 300)}`));
page.on("requestfailed", (r) => /google/.test(r.url()) || errors.push(`requestfailed: ${r.url().slice(0, 120)} ${r.failure()?.errorText}`));

await page.goto(`http://localhost:3107${route}`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
const sda = await page.evaluate(() => CSS.supports("animation-timeline: view()"));
const vh = await page.evaluate(() => window.innerHeight);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
const step = Math.round(vh * (process.env.STEP ? Number(process.env.STEP) : 0.75));
const shots = [];
const report = { config, size, route, sda, total, errors, overflow: [], brokenImages: new Set(), formats: {}, fonts: null };
let i = 0;
for (let y = 0; y < total; y += step) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(Number(process.env.WAIT ?? 900));
  const info = await page.evaluate(() => {
    const de = document.documentElement;
    const broken = [];
    const formats = {};
    for (const img of document.images) {
      const r = img.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight || r.width === 0) continue;
      if (img.complete && img.naturalWidth === 0 && img.loading !== "lazy") broken.push(img.currentSrc || img.src);
      const ext = (img.currentSrc || img.src).split("?")[0].split(".").pop().slice(0, 6);
      formats[ext] = (formats[ext] ?? 0) + 1;
    }
    return { sx: de.scrollWidth - de.clientWidth, y: scrollY, broken, formats };
  });
  if (info.sx > 0) report.overflow.push({ y: info.y, by: info.sx });
  info.broken.forEach((b) => report.brokenImages.add(b));
  for (const [k, v] of Object.entries(info.formats)) report.formats[k] = Math.max(report.formats[k] ?? 0, v);
  const file = path.join(outDir, `${String(i).padStart(2, "0")}-y${info.y}.png`);
  await page.screenshot({ path: file, timeout: 20000 }).catch(() => report.errors.push(`SCREENSHOT-TIMEOUT y=${info.y}`));
  shots.push(file);
  i += 1;
}
report.fonts = await page.evaluate(async () => {
  const ready = await Promise.race([document.fonts.ready.then(() => "ready"), new Promise((r) => setTimeout(() => r("ready-timeout"), 3000))]);
  return [`fonts.ready=${ready} status=${document.fonts.status}`, ...[...document.fonts].filter((f) => f.status !== "loaded" && f.status !== "unloaded").map((f) => `PENDING ${f.family} ${f.status}`), ...[...document.fonts].filter((f) => f.status === "loaded").map((f) => `${f.family} ${f.weight}`).slice(0, 12)];
});
report.brokenImages = [...report.brokenImages];
fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, errors: report.errors.slice(0, 15), errorCount: report.errors.length, shots: shots.length }));
await browser.close();
