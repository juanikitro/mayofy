const L = require('./lib.cjs'); const fs = require('fs'); const path = require('path');
const M = process.env.FSMOCK_DIR;
(async () => {
  const [w, h] = [+process.argv[2], +process.argv[3]];
  const s = await L.open({ mobile: w < 800, w, h });
  const errors = []; s.page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
  await s.page.goto('http://localhost:3016/', { waitUntil: 'load' }); await L.sleep(1500);
  await s.page.locator('.hearth__form summary').scrollIntoViewIfNeeded(); await s.page.locator('.hearth__form summary').click(); await L.sleep(800);
  const fill = async () => {
    await s.page.fill('input[name=name]', 'Marta Gómez'); await s.page.fill('input[name=business]', 'Peluquería Marta');
    await s.page.fill('input[name=contact]', 'marta@ejemplo.test'); await s.page.selectOption('select[name=pack]', 'web-gestion');
    await s.page.fill('textarea[name=need]', 'Quiero que mis clientas reserven turnos solas. ¿Se puede?');
  };
  const fb = () => s.page.evaluate(() => ({ text: document.querySelector('#contact-feedback').innerText, busy: document.querySelector('.contact-form').getAttribute('aria-busy'), btn: document.querySelector('button[value=callback]').innerText, disabled: document.querySelector('button[value=callback]').disabled }));
  for (const [kind, delay, waits] of [['success', 10000, [2000, 7000, 12000]], ['activation', 500, [2500]]]) {
    fs.writeFileSync(M + '/mode.json', JSON.stringify({ kind, delay }));
    await fill(); await L.sleep(2600);
    await s.page.click('button[value=callback]');
    let t = 0;
    for (const at of waits) { await L.sleep(at - t); t = at; const f = await fb(); console.log(kind, at, JSON.stringify(f)); await s.page.locator('.contact-form__footer').scrollIntoViewIfNeeded(); await s.page.screenshot({ path: path.join('after', `form_${kind}_${at}_${w}.png`) }); }
  }
  console.log('errors', errors);
  await s.ctx.close(); await s.browser.close();
})();
