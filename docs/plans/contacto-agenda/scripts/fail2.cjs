const L = require('./lib.cjs'); const path = require('path');
(async () => {
  for (const [w, h, mode] of [[1366, 768, 'noscript'], [390, 844, 'noscript'], [1366, 768, 'noframe'], [1366, 768, 'slow']]) {
    const s = await L.open({ mobile: w < 800, w, h });
    if (mode === 'noscript') await s.ctx.route('**/embed/embed.js', r => r.abort());
    if (mode === 'noframe') await s.ctx.route(u => /app\.cal\.com\/(?!embed\/embed\.js)/.test(u.href), r => r.abort());
    if (mode === 'slow') await s.ctx.route('**/embed/embed.js', async r => { await L.sleep(8000); await r.continue(); });
    const t0 = Date.now();
    await s.page.goto('http://localhost:3016/', { waitUntil: 'load' }); await L.sleep(1000);
    await s.page.evaluate(() => document.getElementById('agenda').scrollIntoView({ behavior: 'instant', block: 'center' }));
    if (w < 800) { await L.sleep(800); await s.page.tap('.booking__open'); }
    const st = async () => s.page.evaluate(() => ({ status: document.getElementById('agenda').dataset.status, state: document.querySelector('.booking__state').textContent, failed: document.querySelector('.booking__failed')?.innerText?.split('\n')[0] ?? null }));
    await L.sleep(2500); const a = await st(); await s.page.screenshot({ path: path.join('r2', `fail_${mode}_${w}_a.png`) });
    await L.sleep(mode === 'noframe' ? 15000 : 1000); const b = await st(); await s.page.screenshot({ path: path.join('r2', `fail_${mode}_${w}_b.png`) });
    console.log(mode, w, JSON.stringify(a), '->', JSON.stringify(b));
    await s.ctx.close(); await s.browser.close();
  }
})();
