// Touch flicks that START on the Cal iframe: does the page move? Usage: node flick.cjs <base> <w> <h> [videoDir]
const L = require('./lib.cjs'); const path = require('path');
(async () => {
  const [base, w, h, vdir] = [process.argv[2], +process.argv[3], +process.argv[4], process.argv[5]];
  const s = await L.open({ mobile: true, w, h, videoDir: vdir });
  const errors = []; s.page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
  await s.page.goto(base + '/', { waitUntil: 'load' }); await L.sleep(1500);
  await s.page.evaluate(() => document.getElementById('agenda').scrollIntoView({ behavior: 'instant' })); await L.sleep(8000);
  const place = async (frameTopAt) => { // setup jump (not part of the gesture)
    const t = await s.page.evaluate(() => document.querySelector('.booking__inline iframe').getBoundingClientRect().top + scrollY);
    await s.page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), t - frameTopAt); await L.sleep(1500);
  };
  const run = async (dir) => {
    const res = [];
    for (let i = 0; i < 3; i++) {
      const fy = dir > 0 ? Math.round(h * 0.8) : Math.round(h * 0.18);
      const on = await s.page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.tagName, [180, fy]);
      const b = await s.y(); await L.flick(s.cdp, { dy: dir * 380, speed: 1300, x: 180, h }); await L.sleep(1800); const a = await s.y();
      res.push({ fingerOn: on, from: b, to: a, moved: a - b });
      if (on !== 'IFRAME') await place(dir > 0 ? Math.round(h * 0.45) : Math.round(h * 0.1));
    }
    return res;
  };
  const ifH = await s.page.evaluate(() => Math.round(document.querySelector('.booking__inline iframe').getBoundingClientRect().height));
  const box = await s.page.evaluate(() => { const e = document.querySelector('.booking__inline'); return [e.clientHeight, e.scrollHeight, getComputedStyle(e).overflowY]; });
  await place(Math.round(h * 0.45));
  const down = await run(1);
  await place(Math.round(h * 0.1));
  const up = await run(-1);
  console.log(JSON.stringify({ base, w, h, iframeHeight: ifH, box, down, up, errors }, null, 0));
  await s.ctx.close(); await s.browser.close();
})();
