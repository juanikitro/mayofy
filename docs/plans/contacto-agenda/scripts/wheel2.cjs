// Wheel notches (100 px, 250 ms apart) with the pointer on the month, on the times column and on the left column.
const L = require('./lib.cjs');
(async () => {
  const [w, h, n] = [+process.argv[2], +process.argv[3], +(process.argv[4] || 10)];
  const s = await L.open({ mobile: false, w, h });
  const errors = []; s.page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 140)); });
  await s.page.goto('http://localhost:3016/', { waitUntil: 'load' }); await L.sleep(1500);
  await s.page.evaluate(() => document.getElementById('agenda').scrollIntoView({ behavior: 'instant' })); await L.sleep(9000);
  const out = {};
  for (const [name, fx, fy] of [['times', 0.82, 0.5], ['month', 0.35, 0.5], ['left', -1, 0.5]]) {
    const top = await s.page.evaluate(() => document.querySelector('.booking__panel').getBoundingClientRect().top + scrollY);
    await s.page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), top - 60); await L.sleep(1500);
    const r = await s.page.evaluate(() => { const b = document.querySelector('.booking__inline iframe').getBoundingClientRect(); const l = document.querySelector('.hearth__invite').getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height, lx: l.left + 40 }; });
    const x = fx < 0 ? r.lx : r.x + r.w * fx, y = r.y + r.h * fy;
    await s.page.mouse.move(x, y);
    const down = [], up = [];
    for (let i = 0; i < n; i++) { const b = await s.y(); await s.page.mouse.wheel(0, 100); await L.sleep(250); await L.sleep(i === n - 1 ? 900 : 0); down.push((await s.y()) - b); }
    await L.sleep(900);
    for (let i = 0; i < n; i++) { const b = await s.y(); await s.page.mouse.wheel(0, -100); await L.sleep(250); up.push((await s.y()) - b); }
    out[name] = { down: down.join(','), up: up.join(',') };
  }
  console.log(JSON.stringify({ w, h, out, errors }));
  await s.ctx.close(); await s.browser.close();
})();
