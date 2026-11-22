const L = require('./lib.cjs'); const path = require('path');
(async () => {
  const [mode, w, h] = [process.argv[2], +process.argv[3] || 390, +process.argv[4] || 844];
  const s = await L.open({ mobile: w < 800, w, h });
  const errors = []; s.page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
  if (mode === 'slow') await s.ctx.route('**/embed/embed.js', async r => { await L.sleep(9000); await r.continue(); });
  if (mode === 'noscript') await s.ctx.route('**/embed/embed.js', r => r.abort());
  if (mode === 'noframe') await s.ctx.route(u => /app\.cal\.com\/(?!embed\/embed\.js)/.test(u.href), r => r.abort());
  await s.page.goto('http://localhost:3016/', { waitUntil: 'load' });
  await s.page.evaluate(() => document.getElementById('agenda').scrollIntoView({ behavior: 'instant' }));
  const snap = async (t) => { const st = await s.page.evaluate(() => ({ status: document.querySelector('.booking__frame').dataset.status, state: document.querySelector('.booking__state').textContent, failed: document.querySelector('.booking__failed')?.innerText ?? null })); console.log(mode, t, JSON.stringify(st)); await s.page.screenshot({ path: path.join('after', `state_${mode}_${t}_${w}.png`) }); };
  await L.sleep(2500); await snap('t2');
  await L.sleep(mode === 'noframe' ? 15000 : 4000); await snap('t2b');
  console.log('errors', errors.length, errors.slice(0, 3));
  await s.ctx.close(); await s.browser.close();
})();
