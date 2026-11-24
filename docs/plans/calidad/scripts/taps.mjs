import { chromium } from "playwright";
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await context.route(/googletagmanager\.com|google-analytics\.com/, (r) => r.abort());
const page = await context.newPage();
await page.goto("http://localhost:3107" + (process.argv[2] ?? "/"), { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
const rows = await page.evaluate(() => {
  const out = new Map();
  for (const el of document.querySelectorAll("a[href], button, summary, input, select, textarea, [role=button], [tabindex]:not([tabindex='-1'])")) {
    if (el.closest("[inert], [aria-hidden=true], [hidden]")) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const inline = el.tagName === "A" && el.parentElement && /^(P|LI|SPAN|SMALL|DD)$/.test(el.parentElement.tagName) && el.parentElement.textContent.trim().length > el.textContent.trim().length + 15;
    if (inline) continue;
    const min = Math.min(r.width, r.height);
    if (min >= 44) continue;
    const label = (el.getAttribute("aria-label") || el.textContent || el.getAttribute("name") || "").trim().replace(/\s+/g, " ").slice(0, 40);
    const key = `${el.tagName}.${(el.className + "").split(" ")[0]} "${label}"`;
    if (!out.has(key)) out.set(key, `${Math.round(r.width)}x${Math.round(r.height)}${min < 24 ? "  <24 (WCAG 2.2 AA)" : ""}`);
  }
  return [...out].map(([k, v]) => `${v}  ${k}`);
});
console.log(rows.join("\n"));
await browser.close();
