const L = require('./lib.cjs');
(async () => {
  const [base, w, h] = [process.argv[2], +process.argv[3], +process.argv[4]];
  const s = await L.open({ mobile: false, w, h });
  const errors = []; s.page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
  await s.page.goto(base + '/', { waitUntil: 'load' }); await L.sleep(1500);
  await s.page.evaluate(() => document.getElementById('agenda').scrollIntoView({ behavior: 'instant' })); await L.sleep(8000);
  const out = {};
  for (const [name, fx, fy] of [['month', 0.3, 0.5], ['times', 0.85, 0.45], ['heading', 0.3, -1]]) {
    const top = await s.page.evaluate(() => document.querySelector('.booking__inline iframe').getBoundingClientRect().top + scrollY);
    await s.page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), top - 200); await L.sleep(1500);
    const r = await s.page.evaluate(() => { const b = document.querySelector('.booking__inline iframe').getBoundingClientRect(); const hd = document.querySelector('.booking__head').getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height, hy: hd.top + hd.height / 2 }; });
    const x = r.x + r.w * fx, y = fy < 0 ? r.hy : r.y + Math.min(r.h, 500) * fy;
    await s.page.mouse.move(x, y);
    const on = await s.page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.tagName, [x, y]);
    const steps = [];
    for (let i = 0; i < 4; i++) { const b = await s.y(); await s.page.mouse.wheel(0, 100); await L.sleep(900); steps.push((await s.y()) - b); }
    const b = await s.y(); await s.page.mouse.wheel(0, -100); await L.sleep(900); steps.push((await s.y()) - b);
    out[name] = { pointerOn: on, perNotch: steps };
  }
  console.log(JSON.stringify({ base, w, h, out, errors }));
  await s.ctx.close(); await s.browser.close();
})();
