const { chromium } = require('C:/Users/Juanito/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const EXE = 'C:/Users/Juanito/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
const NAMES = { inicio: 'Héroe', fall: 'Caída de nubes', problema: 'Isla 2 (propuesta/casos)', packs: 'Isla 3 (rocas/packs)', 'packs-detalle': 'Detalle de packs', sistemas: 'Isla 4 (taller)', trabajos: 'Isla 5 (trabajos + seis pasos)', contacto: 'Isla 6 (contacto)', preguntas: 'Isla 7 (preguntas)' };
const INIT = `(() => {
  const L = window.__ux = { inputs: [], scrolls: [], auto: [], frames: [] };
  const now = () => Date.now();
  for (const type of ['wheel','touchstart','touchend','keydown','pointerdown','click']) window.addEventListener(type, e => { if (type==='wheel' && L.inputs.length && L.inputs[L.inputs.length-1].type==='wheel' && now()-L.inputs[L.inputs.length-1].t<30) return; L.inputs.push({t: now(), type, key: e.key}); }, {capture:true, passive:true});
  const orig = window.scrollTo.bind(window);
  window.scrollTo = function(a, b) { const top = (a && typeof a === 'object') ? a.top : b; L.auto.push([now(), Math.round(top), Math.round(window.scrollY)]); return orig.apply(window, arguments); };
  const origBy = window.scrollBy.bind(window);
  window.scrollBy = function(a, b) { L.auto.push([now(), -1, Math.round(window.scrollY), 'by']); return origBy.apply(window, arguments); };
  let last = -1; let lf = 0;
  const tick = () => { const t = now(); const y = Math.round(scrollY); if (y !== last) { L.scrolls.push([t, y]); last = y; } if (lf && t - lf > 50) L.frames.push([t, t - lf]); lf = t; requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
})();`;
async function open({ mobile, w, h, videoDir, videoSize, throttle }) {
  const browser = await chromium.launch({ headless: true, executablePath: EXE, args: ['--hide-scrollbars=false'] });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: !!mobile, hasTouch: !!mobile, deviceScaleFactor: mobile ? 2 : 1, locale: 'es-AR', timezoneId: 'America/Argentina/Buenos_Aires', recordVideo: videoDir ? { dir: videoDir, size: videoSize || { width: w, height: h } } : undefined });
  await ctx.addInitScript(INIT);
  const page = await ctx.newPage();
  const t0 = Date.now();
  const cdp = await ctx.newCDPSession(page);
  if (throttle) {
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 165, downloadThroughput: 9e6 / 8, uploadThroughput: 1.5e6 / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }
  const R = { t0, steps: [], notes: [] };
  const ts = (t = Date.now()) => ((t - t0) / 1000).toFixed(1);
  const sectionAt = async () => page.evaluate((NAMES) => { const mid = innerHeight * 0.5; const main = document.getElementById('contenido'); for (const s of main.children) { const r = s.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) { const k = s.id || s.className.split(' ')[0]; return NAMES[k] || k; } } return '?'; }, NAMES);
  const y = () => page.evaluate(() => Math.round(scrollY));
  const shot = async (dir, name) => { const p = path.join(dir, name + '.png'); await page.screenshot({ path: p }); return p; };
  return { browser, ctx, page, cdp, R, ts, sectionAt, y, shot, t0 };
}
async function collect(page) { return page.evaluate(() => window.__ux); }
// Group site scrollTo calls into episodes (gap < 120 ms).
function episodes(ux, t0) {
  const eps = []; let cur = null;
  for (const [t, top, y] of ux.auto) {
    if (cur && t - cur.end < 120) { cur.end = t; cur.to = top; cur.n++; }
    else { cur = { start: t, end: t, from: y, to: top, n: 1 }; eps.push(cur); }
  }
  return eps.map(e => { const before = ux.inputs.filter(i => i.t <= e.start).pop(); return { at: +((e.start - t0) / 1000).toFixed(1), ms: e.end - e.start, from: e.from, to: e.to, dist: e.to - e.from, calls: e.n, lastInput: before ? before.type + '@' + ((before.t - t0) / 1000).toFixed(1) : null, gapFromInput: before ? e.start - before.t : null }; });
}
function jank(ux, t0) { const long = ux.frames.filter(f => f[1] > 50); return { longFrames: long.length, over100: long.filter(f => f[1] > 100).length, worst: long.reduce((m, f) => Math.max(m, f[1]), 0) }; }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rnd = (a, b) => a + Math.random() * (b - a);
async function flick(cdp, { dy, speed = 1200, x = 180, h = 800 }) {
  // dy > 0 = Marta wants to go DOWN (finger moves up). Real touch events, so the compositor flings with momentum.
  const travel = Math.min(Math.abs(dy), h * 0.62); const dir = Math.sign(dy);
  const startY = dir > 0 ? h * 0.8 : h * 0.18; const ms = Math.max(60, travel / speed * 1000); const steps = Math.max(4, Math.round(ms / 16));
  x = Math.round(x);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: Math.round(startY) }] });
  for (let k = 1; k <= steps; k++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + Math.round(k * 0.6), y: Math.round(startY - dir * travel * k / steps) }] }); await sleep(16); }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
}
module.exports = { open, collect, episodes, jank, sleep, rnd, flick, NAMES };
