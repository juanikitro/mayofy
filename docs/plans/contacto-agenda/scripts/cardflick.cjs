const L = require('./lib.cjs');
(async () => {
  const s = await L.open({ mobile: true, w: 390, h: 844 });
  await s.page.goto('http://localhost:3016/', { waitUntil: 'load' }); await L.sleep(1200);
  const res = [];
  for (const dir of [1, -1]) {
    const fy = dir > 0 ? Math.round(844 * 0.8) : Math.round(844 * 0.18);
    await s.page.evaluate(([fy]) => { const p = document.querySelector('.booking__panel'); const r = p.getBoundingClientRect(); scrollTo({ top: r.top + scrollY - fy + r.height / 2, behavior: 'instant' }); }, [fy]); await L.sleep(1500);
    const on = await s.page.evaluate(([y]) => document.elementFromPoint(195, y)?.closest('.booking__panel') ? 'panel' : 'other', [fy]);
    const b = await s.y(); await L.flick(s.cdp, { dy: dir * 380, speed: 1300, x: 195, h: 844 }); await L.sleep(1800);
    res.push({ dir: dir > 0 ? 'down' : 'up', fingerOn: on, moved: (await s.y()) - b });
  }
  console.log(JSON.stringify(res));
  await s.ctx.close(); await s.browser.close();
})();
