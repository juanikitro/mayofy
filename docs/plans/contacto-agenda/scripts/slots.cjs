const L = require('./lib.cjs'); const path = require('path');
(async () => {
  const [base, w, h, mobile] = [process.argv[2], +process.argv[3], +process.argv[4], process.argv[5] !== 'desk'];
  const s = await L.open({ mobile, w, h });
  await s.page.goto(base + '/', { waitUntil: 'load' }); await L.sleep(1500);
  await s.page.evaluate(() => document.getElementById('agenda').scrollIntoView({ behavior: 'instant' })); await L.sleep(8000);
  const fr = s.page.frames().find(f => /cal\.com/.test(f.url()));
  const y0 = await s.y();
  const day = fr.locator('button[data-testid="day"]:not([disabled])').nth(2);
  console.log('day text', await day.innerText());
  await day.click(); await L.sleep(3000);
  const y1 = await s.y();
  const ifH = await s.page.evaluate(() => Math.round(document.querySelector('.booking__inline iframe').getBoundingClientRect().height));
  const inner = await fr.evaluate(() => { const out = []; for (const e of document.querySelectorAll('*')) { const cs = getComputedStyle(e); if (/(auto|scroll)/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 2) out.push([(e.className + '').slice(0, 60), e.clientHeight, e.scrollHeight]); } return { scrollers: out, text: document.body.innerText.slice(0, 300) }; });
  console.log(JSON.stringify({ pageMovedOnTap: y1 - y0, iframeHeight: ifH, inner }));
  await s.page.locator('.booking').screenshot({ path: path.join('after', `slots_${w}.png`) });
  // flick from the times list
  const top = await s.page.evaluate(() => document.querySelector('.booking__inline iframe').getBoundingClientRect().top + scrollY);
  await s.page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), top - 200); await L.sleep(1200);
  if (mobile) { const b = await s.y(); await L.flick(s.cdp, { dy: 380, speed: 1300, x: 180, h }); await L.sleep(1800); console.log('flick on times: moved', (await s.y()) - b, 'finger on', await s.page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.tagName, [180, Math.round(h * 0.8)])); }
  await s.ctx.close(); await s.browser.close();
})();
