const L = require('./lib.cjs'); const path = require('path');
(async () => {
  for (const [w, h, reduced] of [[320, 700], [390, 844], [768, 1024], [1024, 768], [1280, 800], [1366, 768], [1440, 900], [390, 844, true], [1366, 768, true]]) {
    const s = await L.open({ mobile: w < 800, w, h });
    if (reduced) await s.page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = []; s.page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); }); s.page.on('pageerror', e => errors.push('PAGEERR ' + e.message.slice(0, 120)));
    await s.page.goto('http://localhost:3016/', { waitUntil: 'load' }); await L.sleep(1000);
    await s.page.evaluate(() => document.querySelector('.hearth__reach').scrollIntoView({ behavior: 'instant' })); await L.sleep(w >= 1024 ? 9000 : 1500);
    const m = await s.page.evaluate(() => {
      const r = (sel) => { const e = document.querySelector(sel); if (!e) return null; const b = e.getBoundingClientRect(); return { l: Math.round(b.left), r: Math.round(innerWidth - b.right), t: Math.round(b.top + scrollY), b: Math.round(b.bottom + scrollY), h: Math.round(b.height) }; };
      return { overflowX: document.documentElement.scrollWidth - innerWidth, invite: r('.hearth__invite'), panel: r('.booking__panel'), alt: r('.hearth__alt'), status: document.getElementById('agenda').dataset.status, iframe: document.querySelector('.booking__inline iframe') ? Math.round(document.querySelector('.booking__inline iframe').getBoundingClientRect().width) : null, launchShown: getComputedStyle(document.querySelector('.booking__launch')).display !== 'none', tap: [...document.querySelectorAll('.hearth__alt .btn, .booking__open, .booking__link')].filter(e => e.offsetParent).map(e => Math.round(e.getBoundingClientRect().height)) };
    });
    // keyboard through the quieter ways in and the form toggle
    await s.page.focus('.hearth__alt .btn');
    await s.page.keyboard.press('Tab');
    const onToggle = await s.page.evaluate(() => document.activeElement.className);
    const before = await s.page.evaluate(() => document.querySelector('.hearth__form-toggle').getAttribute('aria-expanded'));
    await s.page.keyboard.press('Tab');
    const skipsClosedForm = await s.page.evaluate(() => !document.querySelector('.hearth__form').contains(document.activeElement));
    await s.page.focus('.hearth__form-toggle'); await s.page.keyboard.press('Enter'); await L.sleep(500);
    await s.page.keyboard.press('Tab');
    const intoForm = await s.page.evaluate(() => ({ expanded: document.querySelector('.hearth__form-toggle').getAttribute('aria-expanded'), focus: document.activeElement.name || document.activeElement.className, inForm: document.querySelector('.hearth__form').contains(document.activeElement), formH: Math.round(document.querySelector('.hearth__form').getBoundingClientRect().height) }));
    console.log(JSON.stringify({ w, h, reduced: !!reduced, ...m, keyboard: { onToggle: onToggle.includes('hearth__form-toggle'), before, skipsClosedForm, ...intoForm }, errors }));
    if (w === 1366 && !reduced) { await s.page.evaluate(() => document.querySelector('.hearth__form').scrollIntoView({ block: 'center', behavior: 'instant' })); await L.sleep(800); await s.page.screenshot({ path: path.join('r2', 'form_open_1366.png') }); }
    if (w === 390 && !reduced) { await s.page.evaluate(() => document.querySelector('.hearth__form-toggle').scrollIntoView({ block: 'start', behavior: 'instant' })); await L.sleep(800); await s.page.screenshot({ path: path.join('r2', 'form_open_390.png') }); }
    await s.ctx.close(); await s.browser.close();
  }
})();
