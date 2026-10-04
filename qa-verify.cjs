// Tarayıcı kontrolü: npm run build && npx vite preview --port 4173, ardından: node qa-verify.cjs
const { chromium } = require('./.qa-tools/node_modules/playwright');
const fs = require('fs');
const BASE = 'http://localhost:4173';
const OUT = process.env.QA_OUT || 'qa';
const pages = ['/', '/kurumsal', '/programlar', '/programlar/cocuk-yuzme-kursu', '/programlar/performans-yuzme', '/kayit', '/galeri', '/sss', '/iletisim', '/olmayan-sayfa'];
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = {};
  for (const [label, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 375, height: 812 }]]) {
    const page = await browser.newPage({ viewport: vp });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !/maps|google/i.test(m.text())) errors.push(m.text()); });
    for (const p of pages) {
      await page.goto(BASE + p, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const h = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < h; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(60); }
      await page.waitForTimeout(900);
      const name = (p === '/' ? 'home' : p.slice(1).replace(/\//g, '_'));
      await page.screenshot({ path: `${OUT}/${label}-${name}.png`, fullPage: true });
      report[`${label} ${p}`] = await page.evaluate(() => ({
        title: document.title,
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        broken: [...document.images].filter((i) => i.complete && !i.naturalWidth).map((i) => i.src),
        h1: document.querySelectorAll('h1').length,
      }));
    }
    report[`${label} errors`] = errors;
    await page.close();
  }
  console.log(JSON.stringify(report, null, 1));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
