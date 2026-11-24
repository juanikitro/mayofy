import { webkit, devices } from "playwright";
const browser = await webkit.launch();
const route = process.argv[2] ?? "/";
const context = process.env.PHONE ? await browser.newContext({ ...devices["iPhone 15"] }) : await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.route((url) => /(^|\.)cal\.com$|google/.test(url.hostname), (r) => r.abort());
const page = await context.newPage();
await page.goto("http://localhost:3107" + route, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
const broken = new Set();
for (let y = 0; y < total; y += 600) {
  await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(500);
  for (const s of await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.getBoundingClientRect().top < innerHeight * 2).map((i) => (i.currentSrc || i.src).replace(location.origin, "")))) broken.add(s);
}
console.log(route, process.env.PHONE ? "iphone" : "1440", "broken:", broken.size, "\n" + [...broken].join("\n"));
await browser.close();
