// Does a bare Cal.com inline embed freeze WebKit's main thread on its own?
import { webkit, firefox } from "playwright";
import fs from "node:fs";
const log = (...a) => fs.appendFileSync("calmin.log", a.join(" ") + "\n");
const withTimeout = (p, ms, label) => Promise.race([p, new Promise((r) => setTimeout(() => r(`${label}-TIMEOUT`), ms))]);
const html = `<!doctype html><html><body style="margin:0;font:16px sans-serif">
<h1>Cal test</h1><div id="cal" style="width:900px;height:640px"></div>
<script>
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", { origin: "https://cal.com" });
Cal("inline", { elementOrSelector: "#cal", calLink: "${process.env.CALLINK ?? "mayofy/mayofy-first-meeting"}", config: { layout: "month_view" } });
</script></body></html>`;
const type = process.env.ENGINE === "firefox" ? firefox : webkit;
const browser = await type.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.route("http://localhost:3107/__caltest", (r) => r.fulfill({ contentType: "text/html", body: html }));
await page.goto("http://localhost:3107/__caltest", { waitUntil: "domcontentloaded" });
for (let i = 0; i < 8; i++) {
  await new Promise((r) => setTimeout(r, 4000));
  const t0 = Date.now();
  const r = await withTimeout(page.evaluate(() => document.querySelector("iframe") ? "iframe" : "no-iframe"), 8000, "eval");
  log(`${(i + 1) * 4}s`, r, Date.now() - t0, "ms");
}
await page.screenshot({ path: "calmin.png", timeout: 8000 }).catch(() => log("shot timeout"));
log("done");
await browser.close().catch(() => {});
process.exit(0);
