// node test.cjs <outDir> <w>x<h>[,m] [reduce]
const { chromium } = require('C:/Users/Juanito/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core');
const EXE = 'C:/Users/Juanito/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
const ORDER = ['inicio', 'problema', 'packs', 'sistemas', 'trabajos', 'contacto', 'preguntas'];
const SHORT = { inicio: 'Inicio', problema: 'Qué hacemos', packs: 'Packs', sistemas: 'Sistemas', trabajos: 'Trabajos', contacto: 'Quién soy', preguntas: 'Preguntas' };
const ANCHORS = ['inicio', 'problema', 'packs', 'packs-detalle', 'sistemas', 'trabajos', 'contacto', 'preguntas'];
(async () => {
  const [out, size, mode] = process.argv.slice(2);
  const [wh, m] = size.split(',');
  const [w, h] = wh.split('x').map(Number);
  const mobile = m === 'm';
  const browser = await chromium.launch({ headless: true, executablePath: EXE });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1, locale: 'es-AR', reducedMotion: mode === 'reduce' ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(20000);
  const step = (m) => console.error(new Date().toISOString().slice(11, 19), m);
  const errors = [];
  const fails = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('http://localhost:3018/', { waitUntil: 'domcontentloaded', timeout: 180000 });
  await page.waitForTimeout(4000);
  const compact = await page.evaluate(() => getComputedStyle(document.querySelector('.island-nav__where')).display !== 'none');
  const state = () => page.evaluate((ANCHORS) => {
    const line = innerHeight * 0.35;
    let inView = 'inicio';
    for (const id of ANCHORS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= line) inView = id === 'packs-detalle' ? 'packs' : id;
    }
    const cur = document.querySelector('.island-nav__link[aria-current]');
    const where = [...document.querySelectorAll('.island-nav__where-text')].filter((t) => !t.hasAttribute('data-leaving')).map((t) => t.textContent).join('|');
    const step = document.querySelector('.island-nav__step')?.textContent ?? null;
    const nav = document.querySelector('.island-nav').getBoundingClientRect();
    const story = document.querySelector('.island-nav').style.getPropertyValue('--story');
    return { y: Math.round(scrollY), inView, cur: cur ? cur.getAttribute('href') : null, where, step, navBottom: Math.round(nav.bottom), navW: Math.round(nav.width), story, overflow: document.documentElement.scrollWidth - innerWidth };
  }, ANCHORS);
  const want = (s) => compact ? SHORT[s.inView] : (s.inView === 'inicio' ? null : '#' + s.inView);
  const got = (s) => compact ? s.where : s.cur;

  // 1. Real wheel scroll through the whole page.
  const log = [];
  let last = -1;
  let still = 0;
  for (let i = 0; i < 400 && still < 6; i++) {
    await page.mouse.move(w / 2, h / 2);
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(220);
    const s = await state();
    if (s.y === last) still++; else still = 0;
    last = s.y;
    log.push(s);
  }
  const seen = [...new Set(log.map((s) => s.inView))];
  if (seen.join() !== ORDER.join()) fails.push(`scroll order seen ${seen.join()}`);
  await page.waitForTimeout(900);
  const settled = await state();
  if (got(settled) !== want(settled)) fails.push(`end indicator ${JSON.stringify(settled)}`);
  const mismatch = log.filter((s, i) => i > 0 && i + 1 < log.length && log[i - 1].inView === s.inView && log[i + 1].inView === s.inView && got(s) !== want(s));
  if (mismatch.length) fails.push(`indicator lag samples ${mismatch.length}: ${JSON.stringify(mismatch.slice(0, 2))}`);
  if (Math.max(...log.map((s) => s.overflow)) > 0) fails.push('horizontal overflow');
  if (Number(settled.story) < 0.97) fails.push(`story at end ${settled.story}`);

  step('scrolled ' + log.length);
  // 2. Back to top, then jumps.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(1200);
  const jumps = [];
  for (const id of ORDER.slice(1)) {
    step('jump ' + id);
    if (compact) {
      await page.click('.island-nav__where');
      await page.waitForTimeout(400);
      if (id === 'packs' || id === 'preguntas') await page.screenshot({ path: `${out}/sheet-${w}-${id}${mode ? '-' + mode : ''}.png` });
      await page.click(`.island-nav__item[href$="#${id}"]`);
    } else {
      await page.click(`.island-nav__link[href$="#${id}"]`);
    }
    await page.waitForTimeout(2600);
    const r = await page.evaluate((id) => {
      const head = document.querySelector(`#${id} h2`) || document.getElementById(id);
      const nav = document.querySelector('.island-nav').getBoundingClientRect();
      const hb = head.getBoundingClientRect();
      return { hash: location.hash, headTop: Math.round(hb.top), headBottom: Math.round(hb.bottom), navBottom: Math.round(nav.bottom), sheetOpen: document.querySelector('.island-nav').hasAttribute('data-open') };
    }, id);
    const s = await state();
    r.indicator = compact ? s.where : s.cur;
    r.inView = s.inView;
    jumps.push([id, r]);
    if (r.hash !== '#' + id) fails.push(`jump ${id} hash ${r.hash}`);
    if (s.inView !== id) fails.push(`jump ${id} landed in ${s.inView}`);
    if (got(s) !== want(s)) fails.push(`jump ${id} indicator ${r.indicator}`);
    if (r.sheetOpen) fails.push(`jump ${id} sheet stayed open`);
    if (r.headTop < r.navBottom && r.headBottom > 0) fails.push(`jump ${id} heading under pill ${JSON.stringify(r)}`);
    await page.screenshot({ path: `${out}/jump-${w}-${id}${mode ? '-' + mode : ''}.png` });
  }

  step('back');
  // 3. Back.
  await page.goBack();
  await page.waitForTimeout(2000);
  const back1 = await page.evaluate(() => location.hash);
  await page.goBack();
  await page.waitForTimeout(2000);
  const back2 = await page.evaluate(() => location.hash);
  if (back1 !== '#contacto' || back2 !== '#trabajos') fails.push(`back ${back1} ${back2}`);

  step('keyboard');
  // 4. Keyboard.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await page.keyboard.press('Tab');
  const tabs = [];
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press('Tab');
    tabs.push(await page.evaluate(() => (document.activeElement.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)));
  }
  let kb = null;
  if (compact) {
    await page.focus('.island-nav__where');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    const a = await page.evaluate(() => ({ expanded: document.querySelector('.island-nav__where').getAttribute('aria-expanded'), focus: document.activeElement.textContent.trim() }));
    await page.keyboard.press('ArrowDown');
    const b = await page.evaluate(() => document.activeElement.textContent.trim());
    const dur = await page.evaluate(() => getComputedStyle(document.querySelector('.island-nav__sheet')).transitionDuration);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const c = await page.evaluate(() => ({ expanded: document.querySelector('.island-nav__where').getAttribute('aria-expanded'), focusIsToggle: document.activeElement.classList.contains('island-nav__where') }));
    kb = { a, b, c, dur };
    if (a.expanded !== 'true' || c.expanded !== 'false' || !c.focusIsToggle) fails.push(`keyboard ${JSON.stringify(kb)}`);
    await page.click('.island-nav__where');
    await page.waitForTimeout(300);
    await page.mouse.click(w / 2, h - 40);
    await page.waitForTimeout(300);
    if (await page.evaluate(() => document.querySelector('.island-nav').hasAttribute('data-open'))) fails.push('outside tap did not close');
    // Tab out of the open list closes it.
    await page.click('.island-nav__where');
    await page.waitForTimeout(300);
    for (let i = 0; i < 9; i++) await page.keyboard.press('Tab');
    const tabOut = await page.evaluate(() => ({ open: document.querySelector('.island-nav').hasAttribute('data-open'), focus: document.activeElement.className }));
    kb.tabOut = tabOut;
    if (tabOut.open) fails.push(`tab out left the list open ${JSON.stringify(tabOut)}`);
  }
  const ring = await page.evaluate(() => { const el = document.querySelector('.island-nav__brand'); el.focus(); return getComputedStyle(el).outlineStyle; });

  // 5. Tap sizes.
  const small = await page.evaluate(() => [...document.querySelectorAll('.island-nav a, .island-nav button')].filter((el) => { const r = el.getBoundingClientRect(); const st = getComputedStyle(el); return r.width > 0 && r.height > 0 && r.height < 44 && st.visibility !== 'hidden'; }).map((el) => el.textContent.trim()));
  if (small.length) fails.push(`small targets ${small}`);
  console.log(JSON.stringify({ size, mode, compact, seen, settled, jumps, back: [back1, back2], tabs, kb, ring, errors, fails }, null, 1));
  await browser.close();
})();
