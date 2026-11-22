const L = require('./lib.cjs'); const path = require('path');
(async () => {
  for (const [w, h, reduced] of [[320, 700], [360, 800], [390, 844], [768, 1024], [1024, 768], [1366, 768], [1440, 900], [390, 844, true]]) {
    const s = await L.open({ mobile: w < 800, w, h });
    if (reduced) await s.page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = []; s.page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); }); s.page.on('pageerror', e => errors.push('PAGEERR ' + e.message.slice(0, 120)));
    await s.page.goto('http://localhost:3016/', { waitUntil: 'load' }); await L.sleep(1200);
    await s.page.evaluate(() => document.getElementById('agenda').scrollIntoView({ behavior: 'instant' })); await L.sleep(8000);
    const m = await s.page.evaluate(() => {
      const b = document.querySelector('.booking'), p = document.querySelector('.booking__panel'), f = document.querySelector('.booking__inline iframe');
      const link = document.querySelector('.booking__link').getBoundingClientRect();
      const wrap = document.querySelector('.hearth__invite').getBoundingClientRect();
      return { overflowX: document.documentElement.scrollWidth - innerWidth, panelLeft: Math.round(p.getBoundingClientRect().left), inviteLeft: Math.round(wrap.left), panelRight: Math.round(innerWidth - p.getBoundingClientRect().right), iframeH: f ? Math.round(f.getBoundingClientRect().height) : null, linkH: Math.round(link.height), status: document.querySelector('.booking__frame').dataset.status, skeletonAnim: getComputedStyle(document.querySelector('.booking__skeleton-grid')).animationName };
    });
    // keyboard: focus the WhatsApp button, then Tab into the calendar and on to the fallback link
    await s.page.focus('.hearth__whatsapp');
    const seq = [];
    for (let i = 0; i < 3; i++) { await s.page.keyboard.press('Tab'); seq.push(await s.page.evaluate(() => { const a = document.activeElement; return a.tagName + (a.className ? '.' + String(a.className).split(' ')[0] : ''); })); }
    console.log(JSON.stringify({ w, h, reduced: !!reduced, ...m, tabFromWhatsApp: seq, errors }));
    if (w === 1366) { await s.page.focus('.booking__link'); await s.page.screenshot({ path: path.join('after', 'focus_link_1366.png') }); }
    await s.ctx.close(); await s.browser.close();
  }
})();
