// node fit.cjs <w>: label overflow at problema for a phone width.
const { chromium } = require('C:/Users/Juanito/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const EXE = 'C:/Users/Juanito/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
(async () => {
  const w = Number(process.argv[2] || 360);
  const browser = await chromium.launch({ headless: true, executablePath: EXE });
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3018/', { waitUntil: 'domcontentloaded', timeout: 180000 });
  await page.waitForTimeout(4000);
  await page.evaluate(() => document.getElementById('problema').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(1500);
  console.log(await page.evaluate(() => {
    const l = document.querySelector('.island-nav__where-label');
    const parts = ['.island-nav', '.island-nav__brand', '.island-nav__where', '.island-nav__cta'].map((s) => s + ' ' + Math.round(document.querySelector(s).getBoundingClientRect().width));
    return JSON.stringify({ label: l.textContent, overflow: l.scrollWidth - l.clientWidth, parts });
  }));
  await page.screenshot({ path: `t/fit-${w}.png`, clip: { x: 0, y: 0, width: w, height: 90 } });
  await browser.close();
})();
