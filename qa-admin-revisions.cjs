const { chromium } = require('./.qa-tools/node_modules/playwright');
const fs = require('fs');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let original,csrf;
 try {
  await page.goto('http://localhost:5173/admin');
  await page.locator('input[type=password]').fill(fs.readFileSync('admin-credentials.txt','utf8').match(/Şifre: (.+)/)[1]);
  await page.getByRole('button',{name:'Panele giriş yap'}).click();
  await page.getByRole('heading',{name:'Ana sayfa',exact:true}).waitFor();
  const session=await (await page.request.get('http://localhost:5173/api/content?action=session')).json();csrf=session.csrf;
  original=await (await page.request.get('http://localhost:5173/api/content')).json();
  const first=page.locator('.rich-editor').first();
  await first.getByRole('button',{name:'HTML',exact:true}).click();
  await first.locator('textarea').fill('<strong>Biçim testi</strong> <em>italik</em>');
  await first.getByRole('button',{name:'Görsel editör'}).click();
  assert.equal(await first.locator('[contenteditable] strong').textContent(),'Biçim testi');
  await page.getByRole('button',{name:'SEO & ölçümleme'}).click();
  await page.getByLabel('SEO başlığı',{exact:false}).fill('Test SEO başlığı');
  await page.getByLabel('Meta açıklama',{exact:false}).fill('Test meta açıklaması');
  await page.getByLabel('Google Search Console doğrulama kodu').fill('<meta name="google-site-verification" content="test-verification">');
  await page.getByLabel('Google Analytics ölçüm kimliği').fill('G-TEST123456');
  await page.getByRole('button',{name:'Slider yönetimi'}).click();
  const slide=page.locator('.admin-slide-editor').first();
  await slide.getByLabel('Başlık',{exact:true}).fill('Slider test başlığı');
  await slide.getByLabel('Açıklama',{exact:true}).fill('Slider test açıklaması');
  await slide.getByLabel('Görsel alt metni').fill('Slider test alt metni');
  await page.getByRole('button',{name:'Değişiklikleri yayınla'}).click();
  await page.getByText('Değişiklikler yayınlandı. Siteniz güncel.').waitFor();
  const visitor=await browser.newPage();
  await visitor.route('https://www.googletagmanager.com/**',r=>r.fulfill({contentType:'application/javascript',body:''}));
  await visitor.goto('http://localhost:5173/');
  await visitor.getByRole('heading',{name:'Slider test başlığı'}).waitFor();
  assert.equal(await visitor.title(),'Test SEO başlığı');
  assert.equal(await visitor.locator('meta[name=description]').getAttribute('content'),'Test meta açıklaması');
  assert.equal(await visitor.locator('meta[name=google-site-verification]').getAttribute('content'),'test-verification');
  assert.equal(await visitor.locator('.home-hero-slide img').first().getAttribute('alt'),'Slider test alt metni');
  assert.equal(await visitor.locator('script[src*="gtag/js?id=G-TEST123456"]').count(),1);
  assert.equal(await page.locator('script[src*="gtag/js"]').count(),0);
  const sanitizer=await page.evaluate(async()=>{const {safeHtml}=await import('/src/content/rich.tsx');return safeHtml('<strong>Güvenli</strong><script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:alert(1)">link</a>');});
  assert.equal(sanitizer,'<strong>Güvenli</strong><a>link</a>');
  const preservedImage=await page.evaluate(async()=>{const {safeHtml}=await import('/src/content/rich.tsx');return safeHtml('<figure><img src="/img/cocuk-mutlu.webp" alt="Çocuk yüzme" onerror="alert(1)"><figcaption>Fotoğraf</figcaption></figure>');});
  assert(preservedImage.includes('src="/img/cocuk-mutlu.webp"'));assert(!preservedImage.includes('onerror'));
  await visitor.goto('http://localhost:5173/kurumsal');await visitor.locator('h1').waitFor();assert.notEqual(await visitor.title(),'Test SEO başlığı');
  for(const route of ['/programlar','/programlar/cocuk-yuzme-kursu','/kayit','/galeri','/sss','/iletisim','/blog']){await visitor.goto('http://localhost:5173'+route);await visitor.locator('h1').waitFor();assert(!(await visitor.content()).includes('$&lt;RichText'));}
  const optimization=await page.evaluate(async()=>{
   const {optimizeImage}=await import('/src/content/optimize.ts');
   const c=document.createElement('canvas');c.width=3000;c.height=2200;
   const context=c.getContext('2d');const pixels=context.createImageData(c.width,c.height);
   for(let i=0;i<pixels.data.length;i+=4){pixels.data[i]=Math.random()*255;pixels.data[i+1]=Math.random()*255;pixels.data[i+2]=Math.random()*255;pixels.data[i+3]=255;}context.putImageData(pixels,0,0);
   const blob=await new Promise(r=>c.toBlob(r,'image/png'));const file=new File([blob],'large.png',{type:'image/png'});const result=await optimizeImage(file);const bitmap=await createImageBitmap(result);
   return {before:file.size,after:result.size,width:bitmap.width,type:result.type};
  });
  assert(optimization.before>3*1024*1024);assert(optimization.after<3*1024*1024);assert(optimization.width<=1920);assert.equal(optimization.type,'image/webp');
  await slide.locator('input[type=file]').setInputFiles('public/img/cocuk-mutlu.webp');
  await page.getByText('Görsel hazır.',{exact:false}).waitFor();
  await page.screenshot({path:'qa/admin-revisions-desktop.png',fullPage:true});
  await page.setViewportSize({width:375,height:812});
  await page.screenshot({path:'qa/admin-revisions-mobile.png',fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.getByRole('button',{name:'SEO & ölçümleme'}).click();
  await page.screenshot({path:'qa/admin-seo-mobile.png',fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({editor:'passed',seo:'passed',verification:'passed',slider:'passed',upload:'passed',optimization,mobile:'passed',errors}));
 } finally {
  if(original&&csrf){const latest=await (await page.request.get('http://localhost:5173/api/content')).json();const r=await page.request.post('http://localhost:5173/api/content?action=save',{headers:{'X-CSRF-Token':csrf},data:{...original,revision:latest.revision}});assert(r.ok(),'Original content restoration failed');}
  await browser.close();
 }
})().catch(e=>{console.error(e);process.exit(1)});
