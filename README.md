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

Panel adresi: `/admin`. Sayfa metinleri, ortak içerikler, program bilgileri, SSS, galeri açıklamaları, fotoğraflar ve logolar panelden değiştirilebilir. Sayfa yapısı ve tasarım düzenlenmez. Aynı metnin/görselin ortak kullanıldığı alanlar birlikte güncellenir. Dosya yükledikten veya metin düzenledikten sonra **Değişiklikleri yayınla** düğmesine basın. **Orijinale dön**, alanı başlangıç içeriğine döndürür; bu değişiklik de yayınlanmalıdır.

### Yerel kullanım

İki terminal açın:

```sh
php -S 127.0.0.1:8081 -t public
npm run dev
```

Panel: `http://localhost:5173/admin`. Oluşturulan şifre kök klasördeki `admin-credentials.txt` dosyasındadır. Bu dosya ve `public/api/config.php` Git'e alınmaz. Şifreyi config dosyasından değiştirebilir veya sunucuda `ADMIN_PASSWORD` ortam değişkeni kullanabilirsiniz. Şifre eksikse panel girişe kapalıdır.

### Yayın ortamı

Admin API'si PHP 8+ (fileinfo eklentisi) gerektirir. Apache/cPanel sunucusuna `npm run build` sonrası **dist klasörünün içeriğini** yükleyin. `dist/api/config.php` dosyasını ve `dist/api/.htaccess` dosyasını da yükleyin; HTTPS kullanın. `api/private` ve `uploads` klasörleri PHP tarafından yazılabilir olmalıdır. Apache erişim kuralları özel içerik dosyalarını ve şifre yapılandırmasını doğrudan indirmeye kapatır. Farklı web sunucusunda bu dizinleri ayrıca erişime kapatın.

İçerik `api/private/content.json` içinde, yüklenen fotoğraflar `uploads` içinde kalıcı saklanır. Yeniden dağıtımda bu klasörlerin mevcut içeriğini koruyun ve yedekleyin. Yüklemeler 8 MB ile sınırlıdır; PHP `upload_max_filesize` ve `post_max_size` değerlerini buna göre ayarlayın. SVG yükleme kabul edilmez; logo değişimi için PNG veya WebP kullanılabilir.

Vercel/Netlify gibi yalnızca statik yayın ortamlarında PHP API çalışmaz; panelin kayıt ve giriş işlevleri için PHP destekli sunucu veya ayrıca API barındırma gerekir. API kullanılamadığında ziyaretçi sitesi başlangıç içeriğiyle açılır.

Doğrulama: `npm run build`, PHP sözdizimi kontrolü ve `node qa-admin.cjs` ile giriş, metin yayınlama, görsel yükleme, mobil taşma, sayfa açılışları ve yetkisiz kayıt engeli kontrol edildi. `qa-admin.cjs`, yerel PHP ve Vite sunucuları ile `.qa-tools` altındaki Playwright kurulumunu kullanır.

### İçerik kapsam kontrolü

SSS bölümünde 16 soru–cevap çifti birlikte düzenlenir; kategoriler, sayfa başlığı ve açıklamaları da aynı bölümde bulunur. Ortak veri dosyasındaki içerikler kullanıldıkları sayfalara atanmıştır: program metinleri Programlar/Program detayları, kayıt adımları ve malzemeler Kayıt & üyelik, galeri açıklamaları Galeri altında görünür. **Tüm içerikler** tüm alanlarda arama sağlar. Ortak kullanılan bir metin değiştirildiğinde onu kullanan diğer sayfalar da güncellenir.

Görsel kütüphanesi fotoğraflara ek olarak ana/açık renk logo, açılış amblemi ve logosu, tarayıcı simgesi, mobil simge ve paylaşım görselini kapsar. Telefon değişikliği arama ve WhatsApp adreslerini; açık adres değişikliği haritayı ve yol tarifi bağlantısını günceller. Yayınlanan metinler tarayıcı başlığı, açıklama ve kulüp yapılandırılmış verilerine de yansır. Sosyal platformların JavaScript çalıştırmayan önizleme botları index.html dosyasındaki başlangıç metaverisini okuyabilir.

`node qa-content-audit.cjs`, çalışan yerel sunucular üzerinde tüm metinleri ve görselleri geçici değiştirir; SSS düzenleme/arama/ana sayfa eşleşmesi, 14 sayfa, 6 program, galeri filtreleri/lightbox, telefon/WhatsApp/harita bağlantıları ve mobil paneli kontrol eder. İşlem sonunda başlangıç içeriklerini API üzerinden geri yükler. Bu kontrol sırasında yerel panelde eşzamanlı içerik düzenlemeyin.
