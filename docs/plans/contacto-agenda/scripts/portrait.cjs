const L = require('./lib.cjs');
(async () => {
  for (const [w, h] of [[320, 700], [390, 844], [1440, 900]]) {
    const s = await L.open({ mobile: w < 800, w, h });
    const errors = []; s.page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
    await s.page.goto('http://localhost:3016/', { waitUntil: 'load' }); await L.sleep(1000);
    await s.page.evaluate(() => document.querySelector('.host__portrait').scrollIntoView({ block: 'center', behavior: 'instant' })); await L.sleep(5000);
    const r = await s.page.evaluate(() => { const i = document.querySelector('.host__portrait img'); const b = i.getBoundingClientRect(); return { src: i.currentSrc.split('/').pop(), w: Math.round(b.width), alt: i.alt, loaded: i.complete && i.naturalWidth > 0, overflowX: document.documentElement.scrollWidth - innerWidth }; });
    console.log(w, JSON.stringify(r), errors);
    await s.ctx.close(); await s.browser.close();
  }
})();
