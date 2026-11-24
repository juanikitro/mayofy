// node contrast.mjs <WxH>: contrast of text that sits on painted plates (no solid background behind it)
import { chromium } from "playwright";
const [size, route = "/"] = process.argv.slice(2);
const [w, h] = size.split("x").map(Number);
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
await context.route(/googletagmanager\.com|google-analytics\.com/, (r) => r.abort());
const page = await context.newPage();
const lab = await context.newPage();
await page.goto(`http://localhost:3107${route}`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
const seen = new Map();
for (let y = 0; y < total; y += Math.round(h * 0.5)) {
  await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(900);
  const items = await page.evaluate(() => {
    const out = [];
    const cv = document.createElement("canvas"); cv.width = cv.height = 1; const cx = cv.getContext("2d", { willReadFrequently: true });
    const parse = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const opaqueBg = (el) => {
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const cs = getComputedStyle(n);
        const bg = parse(cs.backgroundColor);
        if (bg && (bg.length < 4 || bg[3] > 0.6)) return true;
        if (cs.backgroundImage !== "none" && !/gradient/.test(cs.backgroundImage)) return false;
        if (/gradient/.test(cs.backgroundImage) && n.closest("button, a, [class*=card], [class*=chip], [class*=marker]") === n) return true;
        if (cs.backdropFilter && cs.backdropFilter !== "none") return true;
      }
      return false;
    };
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const els = new Set();
    while (walker.nextNode()) {
      const t = walker.currentNode;
      if (t.textContent.trim().length < 2) continue;
      const el = t.parentElement;
      if (!el || el.closest("[aria-hidden=true], script, style, noscript, iframe, .motion-diag")) continue;
      els.add(el);
    }
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4 || r.top < 0 || r.bottom > innerHeight || r.left < 0 || r.right > innerWidth) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || Number(cs.opacity) < 0.5) continue;
      void opaqueBg;
      out.push({ key: (el.textContent.trim().slice(0, 40) + "|" + el.tagName), text: el.textContent.trim().replace(/\s+/g, " ").slice(0, 50), color: parse(cs.color), size: parseFloat(cs.fontSize), weight: Number(cs.fontWeight), shadow: cs.textShadow !== "none", rect: [r.left, r.top, r.width, r.height].map(Math.round), section: el.closest("section[id]")?.id ?? el.closest("section,footer,header")?.className?.split(" ")[0] ?? "" });
    }
    return out;
  });
  const fresh = items.filter((i) => !seen.has(i.key));
  if (!fresh.length) continue;
  await page.addStyleTag({ content: "*{color:transparent!important;text-shadow:none!important;-webkit-text-stroke:0!important;caret-color:transparent!important} *::marker{color:transparent!important}" }).then(() => {});
  await page.waitForTimeout(400);
  const png = await page.screenshot();
  await page.evaluate(() => document.querySelectorAll("style").forEach((s) => s.textContent.startsWith("*{color:transparent") && s.remove()));
  const res = await lab.evaluate(async ({ b64, fresh }) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = new OffscreenCanvas(img.width, img.height); const g = c.getContext("2d"); g.drawImage(img, 0, 0);
    const lum = ([r, gg, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b); };
    return fresh.map((it) => {
      const [x, y, w, h] = it.rect;
      const d = g.getImageData(x, y, Math.max(1, w), Math.max(1, h)).data;
      const tl = lum(it.color); const ratios = [];
      for (let i = 0; i < d.length; i += 16) { const bl = lum([d[i], d[i + 1], d[i + 2]]); ratios.push((Math.max(tl, bl) + 0.05) / (Math.min(tl, bl) + 0.05)); }
      ratios.sort((a, b) => a - b);
      return { ...it, p10: +ratios[Math.floor(ratios.length * 0.1)].toFixed(2), med: +ratios[Math.floor(ratios.length / 2)].toFixed(2) };
    });
  }, { b64: png.toString("base64"), fresh });
  for (const r of res) seen.set(r.key, { ...r, y });
}
const rows = [...seen.values()].sort((a, b) => a.p10 - b.p10);
for (const r of rows) {
  const large = r.size >= 24 || (r.size >= 18.66 && r.weight >= 700);
  const need = large ? 3 : 4.5;
  const flag = r.med < need ? "FAIL" : r.p10 < need ? "WEAK" : "ok";
  if (flag !== "ok" || process.env.ALL) console.log(`${flag} p10=${r.p10} med=${r.med} need=${need} ${r.size}px/${r.weight}${r.shadow ? " shadow" : ""} [${r.section}] y=${r.y} "${r.text}"`);
}
console.log("checked", rows.length);
await browser.close();
