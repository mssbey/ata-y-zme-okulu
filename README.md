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
