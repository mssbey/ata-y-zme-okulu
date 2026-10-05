# Ata Yüzme Spor Kulübü — kurumsal web sitesi

React + TypeScript + React Router + Vite ile hazırlanmış, çok sayfalı kurumsal site.

## Çalıştırma

```sh
npm install
npm run dev        # geliştirme
npm run build      # üretim çıktısı → dist/
npm run preview    # çıktıyı yerelde inceleme
```

## Sayfalar

| Adres | Sayfa |
| --- | --- |
| `/` | Ana Sayfa (görsel geçişli hero, kurumsal tanıtım, programlar, gelişim yolu, neden biz, sporcularımız, SSS önizleme) |
| `/kurumsal` | Hakkımızda, misyon/vizyon, değerler, eğitmen kadrosu, tesis, sporcu gelişimi |
| `/programlar` | Program listesi, karşılaştırma tablosu, gelişim modeli |
| `/programlar/:slug` | 6 program detay sayfası (müfredat, program bilgileri kartı, ilgili programlar) |
| `/kayit` | Kayıt süreci, yaş grupları, ders düzeni, malzeme listesi, üyelik esasları |
| `/galeri` | Filtrelenebilir galeri + klavye destekli fotoğraf görüntüleyici |
| `/sss` | Kategorili ve aranabilir sıkça sorulan sorular |
| `/iletisim` | İletişim bilgileri, WhatsApp'a mesaj hazırlayan ön kayıt formu, harita |

Eski sitenin adresleri (`/cocuk-yuzme-kursu/`, `/foto-galeri/`, `/sikca-sorulan-sorular/` vb.) yeni sayfalara yönlendirilir.

## İçerik nerede?

- Tüm metinler, programlar, SSS ve galeri listesi: `src/data/site.ts`
- Görsel boyutları: `src/data/images.ts` — görseller `public/img/` (1800 px) ve `public/img/sm/` (760 px) altında WebP.
- Logo: `public/assets/ata-logo.png` (kaynak: kök klasördeki `ata logo png.png`, kırpılıp 720 px'e indirildi). Favicon `public/favicon-64.png`, iOS simgesi `public/apple-touch-icon.png`, paylaşım görseli `public/og-image.jpg` aynı logodan üretildi.
- Yazı tipleri yereldir (Fraunces başlıklar, Manrope gövde): `public/assets`.

## Yayına alma

Site tek sayfa uygulamasıdır; sunucunun bilinmeyen adresleri `index.html`'e yönlendirmesi gerekir.
`public/.htaccess` (Apache/cPanel) ve `public/_redirects` (Netlify) dosyaları bunun için hazırdır.

## İçerik kaynakları

İçerik, işletmenin mevcut sitesindeki (yakacikyuzmehavuzu.com) program, SSS ve galeri sayfalarından alındı.
Eski fiyatlar, ödeme yöntemi ve "yüzme garantisi" ifadesi aktarılmadı; ücret ve ders saatleri için
işletmeye yönlendirme yapıldı. Ders düzeni (haftada 2 gün, aylık 8 ders, en fazla 6 kişilik gruplar)
eski siteden alınmıştır, yayına almadan önce işletmeyle teyit edilmelidir. Misyon ve vizyon metinleri
taslaktır.

## Kontrol

`npm run build && npx vite preview --port 4173` çalışırken `node qa-verify.cjs` tüm sayfaları
1440 px ve 375 px genişlikte açar; yatay taşma, kırık görsel ve konsol hatası raporlar.

## Admin paneli

Panel adresi: `/admin`. Sayfa metinleri, SSS soru/cevapları, ortak içerikler, program bilgileri, galeri açıklamaları, fotoğraflar ve logolar düzenlenebilir. Sayfa yapısı ve tasarım korunur. **Değişiklikleri yayınla**, içeriği tüm ziyaretçiler için kaydeder. **Orijinale dön** ilgili alanı başlangıç içeriğine döndürür; bu değişiklik de yayınlanmalıdır.

### Yerel kullanım

PHP 8+ kurulu ve PATH içinde olmalı. Tek komut hem yerel içerik API’sini hem Vite’ı başlatır:

```sh
npm run dev
```

Panel: http://localhost:5173/admin. Yerel şifre `admin-credentials.txt` dosyasındadır. Şifre `public/api/config.php` dosyasından veya `ADMIN_PASSWORD` ortam değişkeninden okunur. Şifre dosyaları Git’e eklenmez. İlk kurulumda `public/api/config.example.php` dosyasını `config.php` olarak kopyalayıp şifreyi girin.

### Vercel yayını

Yayındaki site Vercel projesi **ata** ile bağlıdır. `api/content.js` giriş, oturum, yayınlama ve yüklemeyi; `api/media.js` fotoğrafları sunar. **ata-content** adlı private Vercel Blob deposu metinleri ve fotoğrafları dağıtımlardan bağımsız saklar. Sunucuda `ADMIN_PASSWORD` ve `BLOB_READ_WRITE_TOKEN` ortam değişkenleri gerekir. Şifre istemci paketine konmaz.

`npm run build:vercel`, derleme çıktısından PHP API’sini ve yerel yüklemeleri kaldırır. Vercel’e kaynak yüklerken `.vercelignore` yerel şifreleri, içerik dosyalarını ve test araçlarını dışarıda bırakır. `vercel.json`, API isteklerini sayfa yönlendirmesinden ayırır. Yeni sürüm: `vercel deploy --prod --yes`.

Görseller en fazla **3 MB** olabilir; JPG, PNG, WebP ve GIF kabul edilir. İçerik kayıtlarında sürüm ve Blob ETag kontrolü eşzamanlı değişiklikleri korur. Giriş HttpOnly/Secure/SameSite oturum çerezi kullanır; yazma ve yükleme isteklerinde CSRF doğrulanır.

### Apache / cPanel alternatifi

`npm run build` sonrası dist içeriğini PHP 8+ ve fileinfo destekli sunucuya yükleyin. `api/config.php` içinde şifre tanımlayın; `api/private` ve `uploads` klasörleri yazılabilir olmalıdır. Bu ortamda içerik `api/private/content.json` içinde saklanır. Yeniden dağıtımda mevcut içerik dosyalarını ve yüklenen görselleri koruyup yedekleyin. Apache erişim kuralları şifreyi ve özel dosyaları doğrudan indirmeye kapatır; farklı sunucuda eşdeğer kuralları ekleyin.

### İçerik kapsamı ve kontroller

SSS’de 16 soru–cevap çifti birlikte düzenlenir. Ortak içerikler kullanıldıkları sayfalara atanmıştır. **Tüm içerikler**, bütün alanlarda arama sağlar. Ortak metin ve görsel değişiklikleri kullanıldıkları diğer sayfalara da yansır. Görsel kütüphanesi logoları, açılış amblemini/logosunu, tarayıcı/mobil simgeleri ve paylaşım görselini kapsar. Telefon değişikliği arama ve WhatsApp adreslerini; açık adres değişikliği haritayı günceller.

`node qa-content-audit.cjs`, yerel sunucularda 14 sayfa ve 6 program detayını, SSS düzenleme/arama/ana sayfa eşleşmesini, galeri filtreleri/lightbox’ı, görselleri, iletişim bağlantılarını ve mobil paneli kontrol eder. Test içeriğini sonunda geri yükler. Yerel test sırasında eşzamanlı düzenleme yapmayın. `node qa-live-login.cjs`, canlı giriş, aynı içeriğin kalıcı kaydı, görsel yükleme/okuma, yetki/CSRF ve boş API yanıtı hata mesajını sınar. Testler .qa-tools altındaki Playwright kurulumunu kullanır.

Metaveriler JavaScript üzerinden güncellenir; JavaScript çalıştırmayan sosyal önizleme botları index.html içindeki başlangıç metaverilerini okuyabilir.
