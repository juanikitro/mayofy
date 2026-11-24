// Phone section sheet: tap an item navigates; Escape, Tab out and an outside tap close it.
import { webkit, chromium, firefox, devices } from "playwright";
const engine = process.argv[2] ?? "webkit";
const browser = engine === "chrome" ? await chromium.launch({ channel: "chrome" }) : engine === "firefox" ? await firefox.launch() : await webkit.launch();
const context =
  engine === "webkit"
    ? await browser.newContext({ ...devices["iPhone 15"] })
    : await browser.newContext({ viewport: { width: 393, height: 659 }, hasTouch: true, isMobile: engine === "chrome" });
await context.route((url) => /google|(^|\.)cal\.com$/.test(url.hostname), (r) => r.abort());
const page = await context.newPage();
await page.goto("http://localhost:3107/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);
const expanded = () => page.locator(".island-nav__where").getAttribute("aria-expanded");
const open = async () => {
  await page.locator(".island-nav__where").tap();
  await page.waitForTimeout(700);
};
const out = [];
const check = (name, ok, detail = "") => out.push(`${engine} ${ok ? "OK  " : "FAIL"} ${name} ${detail}`);

await open();
await page.locator(".island-nav__item", { hasText: "Trabajos" }).tap();
await page.waitForTimeout(3000);
const t = await page.evaluate(() => Math.round(document.getElementById("trabajos").getBoundingClientRect().top));
check("tap Trabajos navigates", Math.abs(t) < 160, `top=${t} expanded=${await expanded()}`);

await open();
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
check("Escape closes", (await expanded()) === "false");

await open();
await page.touchscreen.tap(200, 600);
await page.waitForTimeout(400);
check("tap outside closes", (await expanded()) === "false");

await open();
const items = await page.locator(".island-nav__item").count();
for (let i = 0; i < items + 1; i++) await page.keyboard.press("Tab");
await page.waitForTimeout(400);
check("Tab out of the sheet closes", (await expanded()) === "false", `active=${await page.evaluate(() => document.activeElement?.className)}`);
console.log(out.join("\n"));
await browser.close();
