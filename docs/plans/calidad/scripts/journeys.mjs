// node journeys.mjs <engine> <desktop|phone>: the interactive journeys, per engine.
import { chromium, firefox, webkit, devices } from "playwright";
import fs from "node:fs";

const [engine, form = "desktop"] = process.argv.slice(2);
const log = (...a) => {
  const line = `${engine}/${form} ${a.join(" ")}`;
  console.log(line);
  fs.appendFileSync("journeys.log", line + "\n");
};
const type = { chrome: chromium, firefox, webkit }[engine];
const browser = await type.launch(engine === "chrome" ? { channel: "chrome" } : {});
const phone = form === "phone";
const context = phone
  ? engine === "webkit"
    ? await browser.newContext({ ...devices["iPhone 15"] })
    : await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: engine !== "firefox", isMobile: engine === "chrome" })
  : await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.route((url) => /google/.test(url.hostname), (r) => r.abort());
// WebKit on Windows freezes on Cal.com's own app (see calmin.mjs); the agenda is checked in Chrome and Firefox.
if (engine === "webkit") await context.route((url) => /(^|\.)cal\.com$/.test(url.hostname), (r) => r.abort());
// The form posts to a stub: never send a real inquiry from a test.
await context.route("**/api/contact", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }));
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message.slice(0, 160)));
await page.goto("http://localhost:3107/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);
const step = async (name, fn) => {
  try {
    log("OK  ", name, (await fn()) ?? "");
  } catch (e) {
    log("FAIL", name, e.message.split("\n")[0].slice(0, 200));
  }
};
const top = (sel) => page.evaluate((sel) => Math.round(document.querySelector(sel).getBoundingClientRect().top), sel);

if (!phone) {
  await step("nav link Packs lands on #packs", async () => {
    await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Packs", exact: true }).click();
    await page.waitForTimeout(2500);
    const t = await top("#packs");
    if (Math.abs(t) > 120) throw new Error(`#packs top at ${t}px`);
    return `top=${t}`;
  });
  await step("nav link Preguntas lands on #preguntas", async () => {
    await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Preguntas" }).click();
    await page.waitForTimeout(2500);
    const t = await top("#preguntas");
    if (Math.abs(t) > 120) throw new Error(`#preguntas top at ${t}px`);
    return `top=${t}`;
  });
} else {
  await step("phone menu opens and jumps to Trabajos", async () => {
    await page.locator(".island-nav").getByRole("button").first().click();
    await page.waitForTimeout(600);
    await page.getByRole("link", { name: "Trabajos" }).last().click();
    await page.waitForTimeout(2500);
    const t = await top("#trabajos");
    if (Math.abs(t) > 160) throw new Error(`#trabajos top at ${t}px`);
    return `top=${t}`;
  });
  await step("packs carousel arrow moves to the next pack", async () => {
    await page.evaluate(() => document.getElementById("packs-detalle").scrollIntoView({ block: "start" }));
    await page.waitForTimeout(1200);
    const current = () => page.evaluate(() => document.querySelector(".packs__dot[aria-current]")?.getAttribute("aria-label"));
    const before = await current();
    await page.getByRole("button", { name: "Pack siguiente" }).click();
    await page.waitForTimeout(1200);
    const after = await current();
    if (!after || after === before) throw new Error(`dot stayed on ${before}`);
    return `${before} -> ${after}`;
  });
}

await step("payment toggletip opens and Escape closes it", async () => {
  const button = page.locator(".packs__payment button[aria-expanded]").first();
  await button.scrollIntoViewIfNeeded();
  await button.click();
  await page.waitForTimeout(400);
  const opened = await button.getAttribute("aria-expanded");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const closed = await button.getAttribute("aria-expanded");
  if (opened !== "true" || closed !== "false") throw new Error(`expanded ${opened} -> ${closed}`);
  return "true -> false";
});

await step("FAQ item opens", async () => {
  const summary = page.locator("#preguntas summary").first();
  await summary.scrollIntoViewIfNeeded();
  await summary.click();
  await page.waitForTimeout(800);
  const open = await summary.evaluate((s) => s.parentElement.open);
  if (!open) throw new Error("details stayed closed");
  return "open";
});

await step("contact form: callback send shows the success message", async () => {
  const toggle = page.getByRole("button", { name: "Completar un formulario" });
  await toggle.scrollIntoViewIfNeeded();
  await toggle.click();
  await page.waitForTimeout(800);
  await page.locator('input[name="name"]').fill("Prueba QA");
  await page.locator('input[name="contact"]').fill("qa@example.com");
  await page.locator('textarea[name="need"]').fill("Prueba automática del formulario (no es una consulta real).");
  // The route rejects sends made faster than a person types.
  await page.waitForTimeout(3500);
  await page.getByRole("button", { name: "Prefiero que me contacten" }).click();
  await page.waitForTimeout(2500);
  const text = (await page.locator("#contact-feedback").innerText()).trim();
  if (!/Consulta enviada/.test(text)) throw new Error(`feedback: ${text}`);
  return text.slice(0, 40);
});

if (engine !== "webkit" && !phone) {
  await step("Cal.com inline agenda renders", async () => {
    await page.evaluate(() => document.getElementById("contacto").scrollIntoView({ block: "start" }));
    const frame = page.frameLocator(".booking__inline iframe");
    await frame.locator("body").waitFor({ timeout: 25000 });
    await page.waitForTimeout(6000);
    const busy = await page.locator(".booking__inline").getAttribute("aria-busy");
    const days = await frame.locator("button[data-testid='day']").count().catch(() => -1);
    if (days <= 0) throw new Error(`no day buttons (aria-busy=${busy})`);
    return `${days} day buttons`;
  });
}
log(errors.length ? `PAGE ERRORS: ${errors.join(" | ")}` : "no page errors");
await browser.close();
