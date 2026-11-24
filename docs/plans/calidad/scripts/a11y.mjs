// node a11y.mjs <WxH> <route>: axe-core + keyboard trace (Chrome)
import { chromium } from "playwright";
import fs from "node:fs";
const [size, route = "/"] = process.argv.slice(2);
const [w, h] = size.split("x").map(Number);
const axe = fs.readFileSync(new URL("./node_modules/axe-core/axe.min.js", import.meta.url), "utf8");
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: w < 600, isMobile: w < 600 });
await context.route(/googletagmanager\.com|google-analytics\.com/, (r) => r.abort());
const page = await context.newPage();
await page.goto(`http://localhost:3107${route}`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
await page.addScriptTag({ content: axe });
const res = await page.evaluate(async () => {
  const r = await window.axe.run(document, { resultTypes: ["violations", "incomplete"] });
  const fmt = (v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, help: v.help, nodes: v.nodes.slice(0, 6).map((n) => `${n.target.join(" ")} :: ${(n.failureSummary || n.any?.[0]?.message || "").replace(/\s+/g, " ").slice(0, 220)}`) });
  return { violations: r.violations.map(fmt), incomplete: r.incomplete.map(fmt) };
});
console.log("== AXE", size, route);
for (const v of res.violations) console.log("VIOL", v.impact, v.id, v.n, v.help, "\n   " + v.nodes.join("\n   "));
for (const v of res.incomplete) console.log("INCOMPLETE", v.id, v.n, v.help, "\n   " + v.nodes.slice(0, 3).join("\n   "));
// headings + landmarks
console.log(await page.evaluate(() => [...document.querySelectorAll("h1,h2,h3,h4,h5,h6,main,nav,header,footer,[role=region],aside")].map((e) => `${e.tagName}${e.getAttribute("aria-label") ? `[${e.getAttribute("aria-label")}]` : ""} ${/^H/.test(e.tagName) ? e.textContent.trim().replace(/\s+/g, " ").slice(0, 70) : ""}${e.closest("[aria-hidden=true],[hidden],[inert]") ? " (hidden)" : ""}`).join("\n")));
// keyboard trace
await page.evaluate(() => window.scrollTo(0, 0));
if (!process.env.CLICK) await page.evaluate(() => document.activeElement?.blur?.());
const trace = [];
for (let i = 0; i < Number(process.env.TABS ?? 80); i++) {
  await page.keyboard.press("Tab");
  await page.waitForTimeout(Number(process.env.TABWAIT ?? 250));
  trace.push(await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return "BODY";
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const ring = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== "none";
    const label = (el.getAttribute("aria-label") || el.textContent || el.getAttribute("title") || el.getAttribute("name") || "").trim().replace(/\s+/g, " ").slice(0, 40);
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const top = document.elementFromPoint(Math.min(Math.max(cx, 0), innerWidth - 1), Math.min(Math.max(cy, 0), innerHeight - 1));
    const covered = top && !el.contains(top) && !top.contains(el) ? `covered-by:${top.tagName}.${(top.className + "").split(" ")[0]}` : "";
    const off = r.bottom < 0 || r.top > innerHeight || r.width === 0 ? "OFFSCREEN" : "";
    return `${el.tagName}${el.id ? "#" + el.id : ""} "${label}" ${Math.round(r.width)}x${Math.round(r.height)} ring=${ring} ${covered} ${off}`;
  }));
}
console.log("== TAB ORDER\n" + trace.map((t, i) => `${i + 1}. ${t}`).join("\n"));
await browser.close();
