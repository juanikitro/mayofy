// node frames.cjs <w> <from> <to> <outPng>: header frames of the pill resize, animations at 1/5 speed.
const { chromium } = require('C:/Users/Juanito/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const EXE = 'C:/Users/Juanito/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
(async () => {
  const [w, from, to, out] = process.argv.slice(2);
  const width = Number(w);
  const browser = await chromium.launch({ headless: true, executablePath: EXE });
  const ctx = await browser.newContext({ viewport: { width, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('http://localhost:3018/', { waitUntil: 'domcontentloaded', timeout: 180000 });
  await page.waitForTimeout(4000);
  const go = (id) => page.evaluate((id) => document.getElementById(id).scrollIntoView({ behavior: 'instant' }), id);
  await go(from);
  await page.waitForTimeout(1500);
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Animation.enable');
  await cdp.send('Animation.setPlaybackRate', { playbackRate: 0.2 });
  const frames = [];
  const read = () => page.evaluate(() => ({
    label: Math.round(document.querySelector('.island-nav__where-label').getBoundingClientRect().width),
    pill: Math.round(document.querySelector('.island-nav').getBoundingClientRect().width),
    text: [...document.querySelectorAll('.island-nav__where-text')].map((t) => `${t.textContent}${t.hasAttribute('data-leaving') ? '(out)' : ''}@${getComputedStyle(t).opacity.slice(0, 4)}`).join(' '),
  }));
  frames.push({ t: 'before', ...(await read()), shot: await page.screenshot({ clip: { x: 0, y: 0, width, height: 80 } }) });
  await go(to);
  for (let i = 1; i <= 8; i++) {
    await page.waitForTimeout(330);
    frames.push({ t: `${i * 66} ms`, ...(await read()), shot: await page.screenshot({ clip: { x: 0, y: 0, width, height: 80 } }) });
  }
  const rows = frames.map((f) => `<div class="r"><b>${f.t}</b><img src="data:image/png;base64,${f.shot.toString('base64')}"><span>pill ${f.pill}px</span></div>`).join('');
  await page.setViewportSize({ width: width + 200, height: 100 });
  await page.setContent(`<style>body{margin:0;font:13px system-ui;background:#fff}.r{display:flex;align-items:center;gap:8px;padding:2px 6px}b{width:60px}img{width:${width}px;height:80px}</style>${rows}`);
  await page.screenshot({ path: out, fullPage: true });
  console.log(JSON.stringify({ frames: frames.map(({ shot, ...f }) => f), errors }, null, 0));
  await browser.close();
})();
