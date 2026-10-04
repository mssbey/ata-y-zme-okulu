export const brand = {
  name: 'Ata Yüzme Spor Kulübü',
  short: 'Ata Yüzme',
  facility: 'Yakacık Yüzme Havuzu',
  slogan: 'Yüzmek Hobi Değil, Prestijdir.',
  phone: '0537 938 73 32',
  tel: 'tel:+905379387332',
  email: 'ata@yakacikyuzmehavuzu.com',
  street: 'Cumhuriyet Mah. Yüzyıl Cad. No:71 / A',
  city: 'Kartal / İstanbul',
  address: 'Cumhuriyet Mah. Yüzyıl Cad. No:71 / A, Kartal / İstanbul',
};

export const whatsappNumber = '905379387332';
export const whatsapp = (text?: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text ?? 'Merhaba, yüzme programlarınız hakkında bilgi almak istiyorum.')}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${brand.facility} ${brand.address}`)}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(`${brand.facility}, ${brand.address}`)}&z=15&output=embed`;

export type NavItem = { label: string; to: string };
export const nav: NavItem[] = [
  { label: 'Kurumsal', to: '/kurumsal' },
  { label: 'Programlar', to: '/programlar' },
  { label: 'Kayıt & Üyelik', to: '/kayit' },
  { label: 'Galeri', to: '/galeri' },
  { label: 'S.S.S.', to: '/sss' },
  { label: 'İletişim', to: '/iletisim' },
];

export type Program = {
  slug: string;
  name: string;
  short: string;
  audience: string;
  tagline: string;
  summary: string;
  image: string;
  alt: string;
  gallery: { image: string; alt: string }[];
  intro: string[];
  facts: { label: string; value: string }[];
  blocks: { title: string; text?: string; items: string[] }[];
  note?: string;
};

export const programs: Program[] = [
  {
    slug: 'cocuk-yuzme-kursu',
    name: 'Çocuk Yüzme Kursu',
    short: 'Çocuk',
    audience: '5 – 14 yaş',
    tagline: 'İlk kulaçtan teknik yüzmeye',
    summary: 'Suya adaptasyondan dört branş tekniğine; yaşa ve seviyeye göre planlanan grup eğitimleri.',
    image: 'cocuk-grup',
    alt: 'Ata boneli çocuklar havuzda eğitmenlerini dinliyor',
    gallery: [
      { image: 'cocuk-tahta', alt: 'Yüzme tahtalarıyla çalışan çocuk grubu' },
      { image: 'cocuk-mutlu', alt: 'Havuzda gülümseyen Ata Yüzme öğrencileri' },
    ],
    intro: [
      '5 – 14 yaş grubunu kapsayan çocuk yüzme eğitimlerimiz, Yakacık Yüzme Havuzu’nda yaş ve seviye esas alınarak oluşturulan gruplarla yürütülür.',
      'Eğitim süreci suyla tanışma ve güven kazanmayla başlar; teknik öğrenme ve geliştirme aşamasıyla devam eder. Yüzmeyi spor olarak sürdürmek isteyen öğrenciler için performans gruplarına uzanan bir gelişim yolu sunulur.',
    ],
    facts: [
      { label: 'Yaş grubu', value: '5 – 14 yaş' },
      { label: 'Ders düzeni', value: 'Haftada 2 gün, 1’er saat' },
      { label: 'Aylık program', value: '8 ders' },
      { label: 'Grup yapısı', value: 'Seviyeye göre, en fazla 6 kişi' },
    ],
    blocks: [
      {
        title: 'Başlangıç seviyesi',
        text: 'Yüzme öğrenme aşaması',
        items: ['Su ile tanışma ve adaptasyon çalışmaları', 'Temel nefes çalışmaları', 'Ayak vuruşu ve vücut pozisyonu çalışmaları', 'Eğitsel oyunlar', 'Havuza atlama çalışmaları'],
      },
      {
        title: 'Teknik öğrenme ve geliştirme',
        text: 'Spor odaklı teknik aşama',
        items: ['Streamline yüzme çalışmaları', 'Serbest yüzmede nefes – kol koordinasyonu', 'Sırtüstü yüzme teknikleri', 'Kurbağalama yüzme çalışmaları', 'Kelebek yüzmede temel teknik', 'Atlama ve çıkış çalışmaları'],
      },
      {
        title: 'Performans grupları',
        text: 'Lisanslı sporcu aşaması',
        items: ['Dört branşta teknik çalışmalar', 'Yarışmaya yönelik mesafe antrenmanları', 'Kondisyon çalışmaları', 'Çıkış, dönüş ve bitiriş tekniği'],
      },
    ],
  },
  {
    slug: 'yetiskin-yuzme-dersleri',
    name: 'Yetişkin Yüzme Kursu',
    short: 'Yetişkin',
    audience: '15 yaş ve üzeri',
    tagline: 'Başlamak için hiçbir zaman geç değil',
    summary: 'İlk kez yüzme öğrenenlerden tekniğini geliştirmek isteyenlere, seviyeye uygun grup ve bire bir dersler.',
    image: 'yetiskin-ders',
    alt: 'Ata bonesiyle kulvar kenarında yetişkin yüzme öğrencisi',
    gallery: [
      { image: 'yetiskin-isinma', alt: 'Havuz kenarında ısınma hareketleri yapan yetişkin grup' },
      { image: 'yetiskin-kelebek', alt: 'Kelebek stilinde yüzen yetişkin sporcu' },
    ],
    intro: [
      'Yetişkin yüzme eğitimlerimiz, 15 yaş ve üzeri katılımcıların yüzme seviyesine göre oluşturulan gruplarda verilir. Hiç yüzme bilmeyenler de, tekniğini ilerletmek isteyenler de kendi seviyesine uygun bir başlangıç noktası bulur.',
      'Öğrenme süresi kişiden kişiye değişmekle birlikte, yetişkinler ortalama 1 – 2 ay içinde yüzmeye başlar. Düzenli katılım, bu süreci belirleyen en önemli etkendir.',
    ],
    facts: [
      { label: 'Yaş grubu', value: '15 yaş ve üzeri' },
      { label: 'Ders düzeni', value: 'Haftada 2 gün, 1’er saat' },
      { label: 'Aylık program', value: '8 ders' },
      { label: 'Grup yapısı', value: 'En fazla 6 kişi' },
    ],
    blocks: [
      {
        title: 'Eğitim seçenekleri',
        items: ['Bire bir (özel) yüzme dersi', 'Grup yüzme dersi (en fazla 6 kişi)', 'Performans amaçlı eğitim', 'Serbest yüzme (yüzme bilenler için)', 'Sağlık amaçlı yüzme'],
      },
      {
        title: 'Seviye grupları',
        items: ['Başlangıç: suya adaptasyon, nefes ve ayak vuruşu tekniği', 'Teknik öğrenim: koordinasyon ve dört branş tekniği', 'Performans: ileri teknik, antrenman ve kondisyon çalışmaları'],
      },
    ],
  },
  {
    slug: 'bebek-yuzme-dersleri',
    name: 'Minik Yüzme Dersleri',
    short: 'Minik',
    audience: '3 – 5 yaş',
    tagline: 'Suyla güvenli ilk tanışma',
    summary: 'Su güvenliği, suya uyum ve motor gelişim odağında; yüzme sporunu sevdiren grup dersleri.',
    image: 'minik-grup',
    alt: 'Havuz kenarında renkli yüzme köpükleriyle çalışan minik öğrenciler',
    gallery: [
      { image: 'minik-egitmen', alt: 'Eğitmeniyle havuz kenarında çalışan minik öğrenciler' },
      { image: 'cocuk-bone', alt: 'Ata boneli minik öğrenciler gözlüklerini takıyor' },
    ],
    intro: [
      '3 – 5 yaş grubuna yönelik minik yüzme derslerimiz, çocukların suyla güvenli ve keyifli bir ilişki kurmasını amaçlar. Grup dersleri ebeveynler suya girmeden yapılır; çalışmalar havuz alanından izlenebilir.',
      'Program, oyun temelli etkinliklerle su güvenliği ve suya adaptasyonu destekler; yüzme sporuna ilk adımı atan çocukların sosyal gelişimine de katkı sağlar.',
    ],
    facts: [
      { label: 'Yaş grubu', value: '3 – 5 yaş' },
      { label: 'Ders formatı', value: 'Grup dersi' },
      { label: 'Ebeveyn', value: 'Dersleri izleyebilir' },
      { label: 'Odak', value: 'Su güvenliği ve adaptasyon' },
    ],
    blocks: [
      {
        title: 'Eğitim hedefleri',
        items: ['Su aktivitesi ve suya adaptasyon', 'Motor becerilerin gelişimi', 'Yüzme sporunu tanıtmak ve sevdirmek', 'Grup içinde sosyalleşmeyi öğretmek'],
      },
      {
        title: 'Ebeveynler için öneriler',
        items: ['Çocuğunuzun suya güven duymasını sabırla destekleyin', 'Suya üfleme gibi temel alışkanlıkları oyunla pekiştirin', 'Su çekmeyen bez ve havlu gibi ihtiyaçları önceden hazırlayın'],
      },
    ],
  },
  {
    slug: 'ozel-yuzme-dersleri',
    name: 'Özel Yüzme Dersleri',
    short: 'Özel ders',
    audience: '3 yaştan yetişkine',
    tagline: 'Size özel planlanan bire bir eğitim',
    summary: 'Yaşa, seviyeye ve hedefe göre planlanan; gün ve saatleri birlikte belirlenen bire bir dersler.',
    image: 'ozel-sualti',
    alt: 'Su altında kameraya doğru yüzen Ata Yüzme öğrencisi',
    gallery: [
      { image: 'ozel-tahta', alt: 'Yüzme tahtasıyla ayak vuruşu çalışan öğrenci' },
      { image: 'antrenor-blok', alt: 'Ata Yüzme eğitmeni çıkış bloğunda teknik gösteriyor' },
    ],
    intro: [
      'Bire bir özel yüzme dersleri, 3 yaşından itibaren çocuklar ve yetişkinler için kişinin yaşı ve yüzme seviyesine göre planlanır. Eğitim gün ve saatleri, katılımcıyla birlikte belirlenir.',
      'Özel dersler aylık paketler halinde düzenlenir; her pakette 1’er saatlik 8 ders bulunur.',
    ],
    facts: [
      { label: 'Kimler için', value: '3 yaştan itibaren çocuk ve yetişkin' },
      { label: 'Ders süresi', value: '1 saat' },
      { label: 'Aylık paket', value: '8 ders' },
      { label: 'Program', value: 'Kişiye özel planlama' },
    ],
    blocks: [
      {
        title: 'Özel ders kimler için uygun?',
        items: ['Su korkusu yaşayanlar', 'Grup derslerini tercih etmeyenler veya grup saatlerine uyamayanlar', 'Daha hızlı ilerlemek isteyenler', 'Özel ilgi ve yakın takip gerektiren durumlar', 'Tekniğini geliştirmek isteyen deneyimli yüzücüler'],
      },
    ],
  },
  {
    slug: 'performans-yuzme',
    name: 'Performans Yüzme',
    short: 'Performans',
    audience: 'Lisanslı sporcu',
    tagline: 'Kulvardan kürsüye uzanan yol',
    summary: 'Antrenör değerlendirmesiyle takım antrenmanları; yaş gruplarına göre planlanan sporcu gelişimi.',
    image: 'performans-cikis-3',
    alt: 'Ata Yüzme sporcusu çıkış bloğunda start pozisyonunda',
    gallery: [
      { image: 'performans-takip', alt: 'Yarış sonrası sonuçları takip eden genç sporcular' },
      { image: 'takim-bayrak-2', alt: 'Madalyalı Ata Yüzme sporcuları kulüp bayrağıyla' },
    ],
    intro: [
      'Performans yüzme programı, kurslardan mezun olan ve antrenör gözlemiyle takım antrenmanlarına geçen sporcularımızı kapsar. Kulüp dışından katılmak isteyen sporcular, yaş gruplarına göre belirlenen kriterler doğrultusunda değerlendirilir.',
      'Ata Yüzme Spor Kulübü sporcuları, Türkiye Yüzme Federasyonu çatısı altında ulusal ve uluslararası yarışlarda kulübümüzü temsil eder.',
    ],
    facts: [
      { label: 'Statü', value: 'Lisanslı sporcu' },
      { label: 'Geçiş', value: 'Antrenör değerlendirmesiyle' },
      { label: 'Branşlar', value: 'Serbest, sırtüstü, kurbağalama, kelebek' },
      { label: 'Yarışlar', value: 'Ulusal ve uluslararası' },
    ],
    blocks: [
      {
        title: 'Programın kazanımları',
        items: ['Lisanslı sporcu olma', 'Okul bursu süreçlerinde sportif altyapı', 'Yurt dışı burs olanaklarına yönelik sporcu geçmişi', 'Milli takım seçmelerine katılım hakkı'],
      },
    ],
    note: 'Takım antrenmanlarına geçiş ve dışarıdan katılım kriterleri için antrenörlerimizle görüşmenizi öneririz.',
  },
  {
    slug: 'saglik-ve-spor-amacli-yuzme',
    name: 'Sağlık Amaçlı Yüzme',
    short: 'Sağlık',
    audience: 'Her yaş',
    tagline: 'Yaşam boyu sürdürülebilir bir spor',
    summary: 'Yüzmeyi düzenli bir sağlık alışkanlığına dönüştürmek isteyenler için eğitim ve serbest yüzme seçenekleri.',
    image: 'saglik-yetiskin',
    alt: 'Havuzda kulvar boyunca yüzen yetişkinler',
    gallery: [
      { image: 'yetiskin-isinma-2', alt: 'Eğitim öncesi esneme hareketleri yapan yetişkinler' },
      { image: 'saglik-serbest', alt: 'Kulvarda serbest stil yüzen sporcu' },
    ],
    intro: [
      'Yüzme, her yaş grubuna önerilebilen ve yaşam boyu sürdürülebilen spor dallarının başında gelir. Suyun kaldırma kuvveti sayesinde eklemler üzerindeki yük azalır, sakatlanma riski düşer.',
      'Kulübümüz, yüzmeyi sağlık ve spor amacıyla düzenli bir alışkanlığa dönüştürmek isteyenler için eğitimli programlar ve eğitim almadan katılabilecek serbest yüzme seansları sunar.',
    ],
    facts: [
      { label: 'Kimler için', value: 'Her yaş grubu' },
      { label: 'Seçenekler', value: 'Eğitimli program veya serbest yüzme' },
      { label: 'Ortam', value: 'Kapalı havuz' },
      { label: 'Odak', value: 'Kondisyon ve sağlıklı yaşam' },
    ],
    blocks: [
      {
        title: 'Yüzmenin sağlığa katkıları',
        items: ['Akciğer kapasitesini artırır, nefes tekniğini geliştirir', 'Kardiyovasküler kondisyonu destekler', 'Kas kuvvetini ve dayanıklılığı artırır', 'Sırt ve karın kaslarını güçlendirir', 'Eklem dostu, düşük darbeli bir egzersiz sunar'],
      },
    ],
    note: 'Sağlık sorunu olan katılımcıların yüzmeye başlamadan önce hekimine danışmasını öneririz.',
  },
];

export const programBySlug = (slug?: string) => programs.find((p) => p.slug === slug);

export const stats = [
  { value: '6', label: 'Grup başına en fazla öğrenci' },
  { value: '8', label: 'Aylık ders · haftada 2 gün' },
  { value: '3+', label: 'Yaştan itibaren eğitim' },
  { value: '4', label: 'Branşta teknik eğitim' },
];

export const values = [
  { title: 'Federasyona bağlı kulüp', text: 'Türkiye Yüzme Federasyonu’na bağlı akredite bir spor kulübü olarak faaliyet gösteriyoruz.' },
  { title: 'Bilimsel eğitim', text: 'Her yaş grubuna, gelişim dönemine uygun ve bilimsel temelli yüzme eğitimi sunuyoruz.' },
  { title: 'Uzman eğitmen kadrosu', text: 'Eğitmenlerimiz BESYO mezunu akademisyenler ve/veya uzun yıllar yüzücülük yapmış eski sporculardan oluşur.' },
  { title: 'Küçük gruplar', text: 'Grup derslerimiz en fazla 6 kişiden oluşur; her öğrenci yakından takip edilir.' },
  { title: 'Seviye bazlı gelişim', text: 'Başlangıçtan performansa, her öğrenci seviyesine uygun grupta ilerler.' },
  { title: 'Şeffaf süreç', text: 'Kayıt öncesinde havuzu ziyaret edebilir, dersleri gözlemleyebilir ve eğitmenlerle tanışabilirsiniz.' },
];

export const pathway = [
  { step: '01', title: 'Başlangıç', text: 'Suyla tanışma, adaptasyon, temel nefes ve ayak vuruşu çalışmaları.' },
  { step: '02', title: 'Teknik gelişim', text: 'Dört branşta teknik öğrenme, koordinasyon, atlama ve çıkış çalışmaları.' },
  { step: '03', title: 'Performans', text: 'Lisanslı sporculuk, mesafe antrenmanları, kondisyon ve yarış teknikleri.' },
];

export const ageStages = [
  { age: '11 – 12', title: 'Gelişim çağı', text: 'Teknik öğrenme ve aerobik kapasitenin geliştirilmesi ön plandadır.' },
  { age: '13 – 14', title: 'Yıldızlar', text: 'Milli takım seçmelerine ilk kez katılım; teknik pekiştirme ve kara antrenmanlarının başlangıcı.' },
  { age: '15 – 16', title: 'Gençler', text: 'Tüm enerji sistemlerinin çalıştırılması, artan anaerobik yüklenmeler ve beslenme bilinci.' },
  { age: '17 +', title: 'Açık yaş', text: 'Performansın zirvesine yaklaşılan dönem; küçük yaşlardan gelen doğru antrenman altyapısı belirleyicidir.' },
];

export const enrollmentSteps = [
  { title: 'Bize ulaşın', text: 'Telefon veya WhatsApp üzerinden yaş, seviye ve hedefinizi paylaşın; size uygun programı birlikte belirleyelim.' },
  { title: 'Tesisi ziyaret edin', text: 'Randevu alarak havuzu görebilir, dersleri gözlemleyebilir ve eğitmenlerimizle tanışabilirsiniz.' },
  { title: 'Ön kayıt yaptırın', text: 'Kontenjanlarımız sınırlıdır. Planladığınız dönemde başlayabilmek için ön kayıt yaptırmanızı öneririz.' },
  { title: 'Derslere başlayın', text: 'Seviyenize uygun grupta, düzenli bir ders programıyla eğitiminize başlayın.' },
];

export const equipment = ['Yüzme bonesi', 'Yüzücü (klor) gözlüğü', 'Mayo veya yüzme şortu', 'Kaymaz tabanlı terlik', 'Havlu'];

export const advice = [
  'Kayıt öncesinde dersleri yerinde gözlemleyin.',
  'Eğitmenle görüşün; deneyimi ve yaklaşımı hakkında bilgi alın.',
  'Havuz suyunun kalitesi ve hijyen uygulamaları hakkında bilgi isteyin.',
  'Kurumun referanslarını ve federasyon bağlantısını sorgulayın.',
  'Soyunma odaları ve ortak alanlar dahil tesisi inceleyin.',
];

export type Faq = { q: string; a: string };
export const faqGroups: { title: string; items: Faq[] }[] = [
  {
    title: 'Programlar',
    items: [
      { q: 'Hangi yaş grupları için eğitim veriyorsunuz?', a: '3 – 5 yaş minikler, 5 – 14 yaş çocuklar ve 15 yaş üzeri yetişkinler için yüzme eğitimi veriyoruz. Ayrıca özel ders, performans ve sağlık amaçlı yüzme seçeneklerimiz bulunur.' },
      { q: 'Gruplar kaç kişiden oluşuyor?', a: 'Grup derslerimiz en fazla 6 kişiden oluşur. Gruplar yaş ve yüzme seviyesine göre belirlenir.' },
      { q: 'Dersler ne sıklıkta yapılıyor?', a: 'Grup dersleri haftada iki gün, birer saat olarak planlanır; aylık programda 8 ders bulunur. Güncel ders saatleri için bizimle iletişime geçebilirsiniz.' },
      { q: 'Hangi durumlarda özel ders almalıyım?', a: 'Su korkusu yaşayanlar, grup derslerinde ilerlemekte zorlananlar, grup saatlerine uyamayanlar ve tekniğini hızla geliştirmek isteyenler için özel ders öneriyoruz.' },
    ],
  },
  {
    title: 'Eğitim süreci',
    items: [
      { q: 'Yüzmeyi ne kadar sürede öğrenebilirim?', a: 'Ortalama yetenekteki bir kişi, yaklaşık 8 seansta kendi güvenliğini sağlayacak düzeyde yüzebilir. Tekniği geliştirmek ise daha uzun bir süreç gerektirir; yetişkinler genellikle 1 – 2 ay içinde yüzmeye başlar.' },
      { q: 'Eğitmenleriniz kimlerden oluşuyor?', a: 'Eğitmenlerimizin tamamı üniversitelerin beden eğitimi ve spor yüksekokullarından (BESYO) mezun akademisyenler ve/veya uzun yıllar yüzücülük yapmış eski sporculardan oluşur.' },
      { q: 'Kaçırdığım derslerin telafisi yapılıyor mu?', a: 'Prensip olarak kaçırılan derslerin telafisi yapılmaz. Özel durumlar için eğitim koordinatörümüzle görüşebilirsiniz.' },
      { q: 'Performans takımına nasıl geçilir?', a: 'Kurslardan mezun olan öğrenciler antrenör gözlemiyle takım antrenmanlarına alınır. Dışarıdan katılmak isteyen sporcular, yaş grubuna göre belirlenen kriterlerle değerlendirilir.' },
    ],
  },
  {
    title: 'Kayıt ve üyelik',
    items: [
      { q: 'Havuzu ve dersleri kayıttan önce görebilir miyim?', a: 'Evet. Telefonla randevu alarak havuzu ziyaret edebilir, dersleri gözlemleyebilir ve eğitmenlerimizle tanışabilirsiniz.' },
      { q: 'Ne zaman başlayabilirim?', a: 'Kontenjanlarımız sınırlıdır. Planladığınız dönemde başlayabilmek için ön kayıt yaptırmanızı öneririz.' },
      { q: 'Kayıt için hangi belgeler gerekiyor?', a: 'Çocuk kayıtlarında sağlık durumuna ilişkin belgeler istenebilir. Güncel belge listesini kayıt sırasında sizinle paylaşıyoruz.' },
      { q: 'Ücret ve ders saatlerini nasıl öğrenebilirim?', a: 'Güncel ücret, kontenjan ve ders saatleri için telefon veya WhatsApp üzerinden bize ulaşabilirsiniz.' },
    ],
  },
  {
    title: 'Tesis ve genel',
    items: [
      { q: 'Derslere gelirken yanımda neler olmalı?', a: 'Yüzme bonesi, yüzücü gözlüğü, mayo veya yüzme şortu, kaymaz tabanlı terlik ve havlu getirmeniz yeterlidir.' },
      { q: 'Eğitim almadan serbest yüzmeye gelebilir miyim?', a: 'Evet, yüzme bilenler için serbest yüzme seansları düzenlenmektedir. Güncel seans ve katılım koşulları için bize ulaşabilirsiniz.' },
      { q: 'Tek girişlik kullanım mümkün mü?', a: 'Tek girişlik (günlük) kullanım kabul edilmemektedir; katılım üyelik esasına dayanır.' },
      { q: 'Servis hizmetiniz var mı?', a: 'Servis hizmeti verilmemektedir. Tesisimize ulaşım bilgisi için İletişim sayfamızdaki haritayı kullanabilirsiniz.' },
    ],
  },
];

export type GalleryItem = { image: string; alt: string; cat: 'Eğitim' | 'Sporcularımız' | 'Tesis' };
export const gallery: GalleryItem[] = [
  { image: 'hero-sirtustu', alt: 'Sırtüstü yüzen Ata Yüzme sporcusu', cat: 'Eğitim' },
  { image: 'takim-bayrak', alt: 'Madalyalı sporcular kulüp bayrağıyla', cat: 'Sporcularımız' },
  { image: 'cocuk-grup', alt: 'Havuzda dinlenen Ata boneli çocuklar', cat: 'Eğitim' },
  { image: 'havuz-kulvarlar', alt: 'Kulvarlara ayrılmış kapalı havuz', cat: 'Tesis' },
  { image: 'kurs-podyum', alt: 'Kürsüde Ata Yüzme sporcuları', cat: 'Sporcularımız' },
  { image: 'cocuk-kenar', alt: 'Yüzme tahtalarıyla havuz kenarında çalışan çocuklar', cat: 'Eğitim' },
  { image: 'takim-antrenor', alt: 'Antrenörüyle madalyalı minik sporcular', cat: 'Sporcularımız' },
  { image: 'performans-cikis', alt: 'Çıkış bloğunda start alan sporcu', cat: 'Eğitim' },
  { image: 'havuz-genel', alt: 'Antrenman sırasında havuz', cat: 'Tesis' },
  { image: 'yetiskin-kelebek', alt: 'Kelebek stilinde yüzen sporcu', cat: 'Eğitim' },
  { image: 'podyum-yurtdisi', alt: 'Uluslararası yarışta kürsüde sporcularımız', cat: 'Sporcularımız' },
  { image: 'minik-egitmen', alt: 'Eğitmeniyle çalışan minik öğrenciler', cat: 'Eğitim' },
  { image: 'takim-2010', alt: 'Ata Yüzme takım fotoğrafı', cat: 'Sporcularımız' },
  { image: 'hero-serbest', alt: 'Serbest stilde nefes alan sporcu', cat: 'Eğitim' },
  { image: 'havuz-yarisma', alt: 'Açık havuzda yarış organizasyonu', cat: 'Tesis' },
  { image: 'takim-madalya', alt: 'Madalyalı sporcular ve antrenörleri', cat: 'Sporcularımız' },
  { image: 'cocuk-mutlu', alt: 'Havuzda mutlu öğrenciler', cat: 'Eğitim' },
  { image: 'antrenor-blok', alt: 'Eğitmen çıkış bloğunda teknik gösteriyor', cat: 'Eğitim' },
  { image: 'podyum-yurtdisi-4', alt: 'Yarış sonrası kürsüde sporcular', cat: 'Sporcularımız' },
  { image: 'havuz-cocuklar', alt: 'Havuz kenarında çalışan çocuklar', cat: 'Tesis' },
  { image: 'yetiskin-isinma', alt: 'Ders öncesi ısınan yetişkinler', cat: 'Eğitim' },
  { image: 'kurs-podyum-3', alt: 'Ödül töreninde sporcularımız', cat: 'Sporcularımız' },
  { image: 'ozel-sualti', alt: 'Su altında yüzen öğrenci', cat: 'Eğitim' },
  { image: 'podyum-acik-2', alt: 'Açık su yarışında kürsü', cat: 'Sporcularımız' },
  { image: 'havuz-cocuklar-2', alt: 'Kulvarda antrenman', cat: 'Tesis' },
  { image: 'hero-kelebek', alt: 'Kelebek stilinde yüzen genç sporcu', cat: 'Eğitim' },
  { image: 'takim-bayrak-3', alt: 'Kulüp bayrağıyla sporcular ve antrenörleri', cat: 'Sporcularımız' },
  { image: 'cocuk-tahta-2', alt: 'Yüzme tahtasıyla çalışan çocuklar', cat: 'Eğitim' },
  { image: 'podyum', alt: 'Kürsüde Ata Yüzme sporcuları', cat: 'Sporcularımız' },
  { image: 'performans-kulvar', alt: 'Kulvarlarda antrenman', cat: 'Tesis' },
  { image: 'hero-kurbagalama', alt: 'Kurbağalama stilinde yüzen sporcu', cat: 'Eğitim' },
  { image: 'takim-madalya-2', alt: 'Madalyalı sporcular kulüp bayrağıyla', cat: 'Sporcularımız' },
  { image: 'minik-grup', alt: 'Havuz kenarında minik öğrenciler', cat: 'Eğitim' },
  { image: 'podyum-yurtdisi-3', alt: 'Uluslararası yarışta takımımız', cat: 'Sporcularımız' },
  { image: 'performans-sirtustu', alt: 'Sırtüstü start çalışması', cat: 'Eğitim' },
  { image: 'takim-havuz', alt: 'Havuz başında takımımız', cat: 'Sporcularımız' },
];
