const L = require('./lib.cjs'); const path = require('path');
const BASE = process.env.BASE || 'http://localhost:3016';
(async () => {
  const [w, h, mobile] = [+process.argv[2] || 360, +process.argv[3] || 800, process.argv[4] !== 'desk'];
  const s = await L.open({ mobile, w, h });
  s.page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text().slice(0, 200)); });
  await s.page.goto(BASE + '/', { waitUntil: 'load' }); await L.sleep(2000);
  await s.page.evaluate(() => document.getElementById('agenda').scrollIntoView({ behavior: 'instant' }));
  await L.sleep(9000);
  const outer = await s.page.evaluate(() => {
    const host = document.querySelector('.booking__inline'); const f = host.querySelector('iframe');
    const cs = getComputedStyle(host);
    return { host: [host.clientHeight, host.scrollHeight, cs.overflowY, cs.maxHeight], iframe: f ? [f.getBoundingClientRect().height, f.style.cssText, f.src] : null, ready: document.querySelector('.booking__frame').dataset.ready };
  });
  console.log(JSON.stringify(outer));
  const fr = s.page.frames().find(f => /cal\.com/.test(f.url()));
  if (fr) {
    const inner = await fr.evaluate(() => {
      const out = []; for (const e of document.querySelectorAll('*')) { const cs = getComputedStyle(e); if (/(auto|scroll)/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 2) out.push([(e.className || e.tagName).toString().slice(0, 80), e.clientHeight, e.scrollHeight]); }
      return { doc: [document.documentElement.clientHeight, document.documentElement.scrollHeight, innerWidth], scrollers: out, lang: document.documentElement.lang, text: document.body.innerText.slice(0, 600) };
    });
    console.log(JSON.stringify(inner, null, 1));
  }
  await s.page.screenshot({ path: path.join(process.env.OUT || '.', `probe_${w}.png`), fullPage: false }); await s.page.locator('.booking').screenshot({ path: path.join(process.env.OUT || '.', `panel_${w}.png`) });
  await s.ctx.close(); await s.browser.close();
})();
