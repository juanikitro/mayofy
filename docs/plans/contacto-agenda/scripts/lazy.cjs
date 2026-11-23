// Does Cal.com load with the page? Desktop: when it boots relative to #agenda. Phone: only on tap; popup opens, closes, page scrolls.
const L = require('./lib.cjs'); const path = require('path');
(async () => {
  const [w, h] = [+process.argv[2], +process.argv[3]];
  const mobile = w < 800;
  const s = await L.open({ mobile, w, h });
  const errors = []; s.page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 140)); });
  const cal = []; s.page.on('request', r => { if (/cal\.com/.test(r.url())) cal.push(r.url()); });
  let bytes = 0; s.page.on('response', async r => { if (/cal\.com|cal\.dev/.test(r.url())) { try { bytes += (await r.body()).length; } catch {} } });
  await s.page.goto('http://localhost:3016/', { waitUntil: 'load' }); await L.sleep(5000);
  console.log('after load at top: cal requests', cal.length);
  const dist = () => s.page.evaluate(() => (document.getElementById('agenda').getBoundingClientRect().top / innerHeight).toFixed(2));
  if (!mobile) {
    for (const screens of [4, 3, 2.5, 2, 1.6, 1.4, 1]) {
      await s.page.evaluate(k => { const a = document.getElementById('agenda'); scrollTo({ top: a.getBoundingClientRect().top + scrollY - innerHeight * k, behavior: 'instant' }); }, screens);
      await L.sleep(1200);
      console.log('agenda', await dist(), 'screens below the viewport top; cal requests', cal.length, 'status', await s.page.evaluate(() => document.getElementById('agenda').dataset.status));
    }
  } else {
    await s.page.evaluate(() => document.getElementById('agenda').scrollIntoView({ behavior: 'instant', block: 'center' })); await L.sleep(3000);
    console.log('phone, agenda on screen: cal requests', cal.length, 'status', await s.page.evaluate(() => document.getElementById('agenda').dataset.status));
    await s.page.screenshot({ path: path.join('r2', `phone_card_${w}.png`) });
    await s.page.tap('.booking__open'); await L.sleep(800);
    console.log('after tap: status', await s.page.evaluate(() => document.getElementById('agenda').dataset.status), 'button', await s.page.evaluate(() => document.querySelector('.booking__open').innerText));
    await L.sleep(9000);
    const m = await s.page.evaluate(() => { const box = document.querySelector('cal-modal-box'); return { modal: !!box, state: box?.getAttribute('state'), status: document.getElementById('agenda').dataset.status, bodyOverflow: getComputedStyle(document.body).overflow }; });
    console.log('popup', JSON.stringify(m), 'cal requests', cal.length, 'KB', Math.round(bytes / 1024));
    await s.page.screenshot({ path: path.join('r2', `phone_popup_${w}.png`) });
    const fr = s.page.frames().find(f => /cal\.com/.test(f.url()));
    if (fr) console.log('popup text', (await fr.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').slice(0, 160))));
    // close the popup the way a reader would: its close control, else Escape
    const closed = await s.page.evaluate(() => { const box = document.querySelector('cal-modal-box'); const btn = box?.shadowRoot?.querySelector('.close'); if (btn) { btn.click(); return 'close-button'; } return 'none'; });
    if (closed === 'none') await s.page.keyboard.press('Escape');
    await L.sleep(1500);
    await s.page.screenshot({ path: path.join('r2', `phone_after_close_${w}.png`) });
    console.log('after close: body overflow', await s.page.evaluate(() => getComputedStyle(document.body).overflow), 'modal display', await s.page.evaluate(() => { const b = document.querySelector('cal-modal-box'); return b ? getComputedStyle(b).display + '/' + getComputedStyle(b).visibility : 'removed'; }));
    const after = await s.page.evaluate(() => { const box = document.querySelector('cal-modal-box'); return { modalVisible: box ? getComputedStyle(box).display !== 'none' && box.getAttribute('state') !== 'closed' : false, state: box?.getAttribute('state') }; });
    console.log('closed via', closed, JSON.stringify(after));
    const b = await s.y(); await L.flick(s.cdp, { dy: 380, speed: 1300, x: 180, h }); await L.sleep(1800); console.log('flick after closing: moved', (await s.y()) - b);
  }
  console.log('errors', errors);
  await s.ctx.close(); await s.browser.close();
})();
