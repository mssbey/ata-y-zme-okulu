import { contentText } from '../content/store';
export const brand = {
  name: contentText('text_77466ebad986f618', "Ata Yüzme Spor Kulübü"),
  short: contentText('text_6296eb9c7b43c97c', "Ata Yüzme"),
  facility: contentText('text_569a70d32b725df6', "Yakacık Yüzme Havuzu"),
  slogan: contentText('text_3c77185159b3e8bf', "Yüzmek Hobi Değil, Prestijdir."),
  phone: contentText('text_e2b4ba377f239b30', "0537 938 73 32"),
  tel: 'tel:+905379387332',
  email: contentText('text_a0c65ee28f407530', "ata@yakacikyuzmehavuzu.com"),
  street: contentText('text_86709da66a403969', "Cumhuriyet Mah. Yüzyıl Cad. No:71 / A"),
  city: contentText('text_02bfdca99db3fb41', "Kartal / İstanbul"),
  address: '',
};

const phoneDigits = brand.phone.replace(/\D/g, '');
export const whatsappNumber = phoneDigits.startsWith('90') && phoneDigits.length === 12 ? phoneDigits : '90' + phoneDigits.replace(/^0/, '');
brand.address = `${brand.street}, ${brand.city}`;
brand.tel = 'tel:+' + whatsappNumber;
export const whatsapp = (text?: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text ?? contentText('text_576f79bd741222d1', "Merhaba, yüzme programlarınız hakkında bilgi almak istiyorum."))}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${brand.facility} ${brand.address}`)}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(`${brand.facility}, ${brand.address}`)}&z=15&output=embed`;

export type NavItem = { label: string; to: string };
export const nav: NavItem[] = [
  { label: contentText('text_4880b93c7b77b50a', "Kurumsal"), to: '/kurumsal' },
  { label: contentText('text_8ec2bb837a16ca7a', "Programlar"), to: '/programlar' },
  { label: contentText('text_55d268039cc995c6', "Kayıt & Üyelik"), to: '/kayit' },
  { label: contentText('text_41533b6d0d098341', "Galeri"), to: '/galeri' },
  { label: contentText('text_5ba17459505b7261', "S.S.S."), to: '/sss' },
  { label: contentText('text_5e948ad2e2df8515', "İletişim"), to: '/iletisim' },
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
    name: contentText('text_90cbc6d831f60fc5', "Çocuk Yüzme Kursu"),
    short: contentText('text_394fdce88b63c3f6', "Çocuk"),
    audience: contentText('text_9627471014c631a0', "5 – 14 yaş"),
    tagline: contentText('text_8429b93e325f9033', "İlk kulaçtan teknik yüzmeye"),
    summary: contentText('text_3f05652a1fedef17', "Suya adaptasyondan dört branş tekniğine; yaşa ve seviyeye göre planlanan grup eğitimleri."),
    image: 'cocuk-grup',
    alt: contentText('text_f109a1ecd60a4111', "Ata boneli çocuklar havuzda eğitmenlerini dinliyor"),
    gallery: [
      { image: 'cocuk-tahta', alt: contentText('text_979776f3e2bcf29f', "Yüzme tahtalarıyla çalışan çocuk grubu") },
      { image: 'cocuk-mutlu', alt: contentText('text_c5f61ddae5507eb3', "Havuzda gülümseyen Ata Yüzme öğrencileri") },
    ],
    intro: [
      contentText('text_e7fc86d8ce4c57ff', "5 – 14 yaş grubunu kapsayan çocuk yüzme eğitimlerimiz, Yakacık Yüzme Havuzu’nda yaş ve seviye esas alınarak oluşturulan gruplarla yürütülür."),
      contentText('text_c778a01b5269be90', "Eğitim süreci suyla tanışma ve güven kazanmayla başlar; teknik öğrenme ve geliştirme aşamasıyla devam eder. Yüzmeyi spor olarak sürdürmek isteyen öğrenciler için performans gruplarına uzanan bir gelişim yolu sunulur."),
    ],
    facts: [
      { label: contentText('text_bfafee68686f5f2c', "Yaş grubu"), value: contentText('text_9627471014c631a0', "5 – 14 yaş") },
      { label: contentText('text_45cf38522704a1dc', "Ders düzeni"), value: contentText('text_3b148da2431a5433', "Haftada 2 gün, 1’er saat") },
      { label: contentText('text_e2e0c7f5b3cae37d', "Aylık program"), value: contentText('text_1c262e66ee435a71', "8 ders") },
      { label: contentText('text_2d32e3d9b5f2c082', "Grup yapısı"), value: contentText('text_2f631a73c7669a07', "Seviyeye göre, en fazla 6 kişi") },
    ],
    blocks: [
      {
        title: contentText('text_bfb24ce6eb683fac', "Başlangıç seviyesi"),
        text: contentText('text_009884f7c41e8dba', "Yüzme öğrenme aşaması"),
        items: [contentText('text_51c04e7485a092a8', "Su ile tanışma ve adaptasyon çalışmaları"), contentText('text_376e4dc83da2fe13', "Temel nefes çalışmaları"), contentText('text_40a7e9ce1d3a83ba', "Ayak vuruşu ve vücut pozisyonu çalışmaları"), contentText('text_ba2b38a53ec680f6', "Eğitsel oyunlar"), contentText('text_3040e1b0c257a3fc', "Havuza atlama çalışmaları")],
      },
      {
        title: contentText('text_9bb2c38870bc07c8', "Teknik öğrenme ve geliştirme"),
        text: contentText('text_6f25862dd6595ec0', "Spor odaklı teknik aşama"),
        items: [contentText('text_1fbeab8a09615511', "Streamline yüzme çalışmaları"), contentText('text_677a49663bb50ccd', "Serbest yüzmede nefes – kol koordinasyonu"), contentText('text_1dca58de9e61619e', "Sırtüstü yüzme teknikleri"), contentText('text_a13f618fb43abcae', "Kurbağalama yüzme çalışmaları"), contentText('text_08d122e553a8a32a', "Kelebek yüzmede temel teknik"), contentText('text_9fedd4243a2d2e73', "Atlama ve çıkış çalışmaları")],
      },
      {
        title: contentText('text_99ad261514bbecd7', "Performans grupları"),
        text: contentText('text_094d5240bd1b05f5', "Lisanslı sporcu aşaması"),
        items: [contentText('text_a2e013207cbd44be', "Dört branşta teknik çalışmalar"), contentText('text_46839f7d07360b1e', "Yarışmaya yönelik mesafe antrenmanları"), contentText('text_b0cff1c08aae9259', "Kondisyon çalışmaları"), contentText('text_93741154a0cd173b', "Çıkış, dönüş ve bitiriş tekniği")],
      },
    ],
  },
  {
    slug: 'yetiskin-yuzme-dersleri',
    name: contentText('text_0017d4c635a87558', "Yetişkin Yüzme Kursu"),
    short: contentText('text_fe4117cefaeb2c43', "Yetişkin"),
    audience: contentText('text_bf46adecede77aab', "15 yaş ve üzeri"),
    tagline: contentText('text_fa5ab1fcc93c0c56', "Başlamak için hiçbir zaman geç değil"),
    summary: contentText('text_f454f0ff65483770', "İlk kez yüzme öğrenenlerden tekniğini geliştirmek isteyenlere, seviyeye uygun grup ve bire bir dersler."),
    image: 'yetiskin-ders',
    alt: contentText('text_6bcfe5efacad32a1', "Ata bonesiyle kulvar kenarında yetişkin yüzme öğrencisi"),
    gallery: [
      { image: 'yetiskin-isinma', alt: contentText('text_d7c4565c6ba8ed1d', "Havuz kenarında ısınma hareketleri yapan yetişkin grup") },
      { image: 'yetiskin-kelebek', alt: contentText('text_f73241ed5d9e8527', "Kelebek stilinde yüzen yetişkin sporcu") },
    ],
    intro: [
      contentText('text_a554837f972c91c9', "Yetişkin yüzme eğitimlerimiz, 15 yaş ve üzeri katılımcıların yüzme seviyesine göre oluşturulan gruplarda verilir. Hiç yüzme bilmeyenler de, tekniğini ilerletmek isteyenler de kendi seviyesine uygun bir başlangıç noktası bulur."),
      contentText('text_17c1857d16c0935f', "Öğrenme süresi kişiden kişiye değişmekle birlikte, yetişkinler ortalama 1 – 2 ay içinde yüzmeye başlar. Düzenli katılım, bu süreci belirleyen en önemli etkendir."),
    ],
    facts: [
      { label: contentText('text_bfafee68686f5f2c', "Yaş grubu"), value: contentText('text_bf46adecede77aab', "15 yaş ve üzeri") },
      { label: contentText('text_45cf38522704a1dc', "Ders düzeni"), value: contentText('text_3b148da2431a5433', "Haftada 2 gün, 1’er saat") },
      { label: contentText('text_e2e0c7f5b3cae37d', "Aylık program"), value: contentText('text_1c262e66ee435a71', "8 ders") },
      { label: contentText('text_2d32e3d9b5f2c082', "Grup yapısı"), value: contentText('text_617f7d61739422eb', "En fazla 6 kişi") },
    ],
    blocks: [
      {
        title: contentText('text_d5fcad97576f3177', "Eğitim seçenekleri"),
        items: [contentText('text_3d0de364d8916a43', "Bire bir (özel) yüzme dersi"), contentText('text_f0d87da1d7036f11', "Grup yüzme dersi (en fazla 6 kişi)"), contentText('text_d9b70e8397050d3d', "Performans amaçlı eğitim"), contentText('text_485c50810c79dfb0', "Serbest yüzme (yüzme bilenler için)"), contentText('text_ded70ffe730a898b', "Sağlık amaçlı yüzme")],
      },
      {
        title: contentText('text_27d6aed8efc2f8e8', "Seviye grupları"),
        items: [contentText('text_2b1e7fae146c7516', "Başlangıç: suya adaptasyon, nefes ve ayak vuruşu tekniği"), contentText('text_0e30e41f6ee6a5c0', "Teknik öğrenim: koordinasyon ve dört branş tekniği"), contentText('text_95e28387a8273099', "Performans: ileri teknik, antrenman ve kondisyon çalışmaları")],
      },
    ],
  },
  {
    slug: 'bebek-yuzme-dersleri',
    name: contentText('text_fedf5cef7fadbc37', "Minik Yüzme Dersleri"),
    short: contentText('text_8541c6c0d6da1e04', "Minik"),
    audience: contentText('text_1e1e40a660c0bf5e', "3 – 5 yaş"),
    tagline: contentText('text_1504bc286273b2ef', "Suyla güvenli ilk tanışma"),
    summary: contentText('text_ea11f307b005e059', "Su güvenliği, suya uyum ve motor gelişim odağında; yüzme sporunu sevdiren grup dersleri."),
    image: 'minik-grup',
    alt: contentText('text_8322cf7d39a67be8', "Havuz kenarında renkli yüzme köpükleriyle çalışan minik öğrenciler"),
    gallery: [
      { image: 'minik-egitmen', alt: contentText('text_8f4f643d0ce5431d', "Eğitmeniyle havuz kenarında çalışan minik öğrenciler") },
      { image: 'cocuk-bone', alt: contentText('text_b57dc2cee7bfc335', "Ata boneli minik öğrenciler gözlüklerini takıyor") },
    ],
    intro: [
      contentText('text_3b847b1fcb3f5647', "3 – 5 yaş grubuna yönelik minik yüzme derslerimiz, çocukların suyla güvenli ve keyifli bir ilişki kurmasını amaçlar. Grup dersleri ebeveynler suya girmeden yapılır; çalışmalar havuz alanından izlenebilir."),
      contentText('text_25ddbe09436fb83f', "Program, oyun temelli etkinliklerle su güvenliği ve suya adaptasyonu destekler; yüzme sporuna ilk adımı atan çocukların sosyal gelişimine de katkı sağlar."),
    ],
    facts: [
      { label: contentText('text_bfafee68686f5f2c', "Yaş grubu"), value: contentText('text_1e1e40a660c0bf5e', "3 – 5 yaş") },
      { label: contentText('text_8a0bf00a2abd8852', "Ders formatı"), value: contentText('text_089b54e3fe79050a', "Grup dersi") },
      { label: contentText('text_ef0ca7a406b8ee30', "Ebeveyn"), value: contentText('text_7f8b3cfe1b136f5f', "Dersleri izleyebilir") },
      { label: contentText('text_41620582d6218948', "Odak"), value: contentText('text_6a6b7adf8de098b1', "Su güvenliği ve adaptasyon") },
    ],
    blocks: [
      {
        title: contentText('text_e27b507024a3b125', "Eğitim hedefleri"),
        items: [contentText('text_1020dbf58d1fcd8e', "Su aktivitesi ve suya adaptasyon"), contentText('text_4cd0bc12a20654ba', "Motor becerilerin gelişimi"), contentText('text_e0413df76017a521', "Yüzme sporunu tanıtmak ve sevdirmek"), contentText('text_80a3c8f65df52183', "Grup içinde sosyalleşmeyi öğretmek")],
      },
      {
        title: contentText('text_c421a5df96b4d8d1', "Ebeveynler için öneriler"),
        items: [contentText('text_52739d8b7a227c52', "Çocuğunuzun suya güven duymasını sabırla destekleyin"), contentText('text_b8592b367c1b10bd', "Suya üfleme gibi temel alışkanlıkları oyunla pekiştirin"), contentText('text_ab84e72bbd4e5603', "Su çekmeyen bez ve havlu gibi ihtiyaçları önceden hazırlayın")],
      },
    ],
  },
  {
    slug: 'ozel-yuzme-dersleri',
    name: contentText('text_12dcc1068abd905a', "Özel Yüzme Dersleri"),
    short: contentText('text_6b0c1fc983e0a8a3', "Özel ders"),
    audience: contentText('text_8791c5824d1d389c', "3 yaştan yetişkine"),
    tagline: contentText('text_c4079072b7d278fd', "Size özel planlanan bire bir eğitim"),
    summary: contentText('text_d6f8c9306194681c', "Yaşa, seviyeye ve hedefe göre planlanan; gün ve saatleri birlikte belirlenen bire bir dersler."),
    image: 'ozel-sualti',
    alt: contentText('text_c5bf3498bd84714b', "Su altında kameraya doğru yüzen Ata Yüzme öğrencisi"),
    gallery: [
      { image: 'ozel-tahta', alt: contentText('text_88cd6334d6e68253', "Yüzme tahtasıyla ayak vuruşu çalışan öğrenci") },
      { image: 'antrenor-blok', alt: contentText('text_629ed63d49e3b689', "Ata Yüzme eğitmeni çıkış bloğunda teknik gösteriyor") },
    ],
    intro: [
      contentText('text_c5b617a9a755586c', "Bire bir özel yüzme dersleri, 3 yaşından itibaren çocuklar ve yetişkinler için kişinin yaşı ve yüzme seviyesine göre planlanır. Eğitim gün ve saatleri, katılımcıyla birlikte belirlenir."),
      contentText('text_642c29d7296178de', "Özel dersler aylık paketler halinde düzenlenir; her pakette 1’er saatlik 8 ders bulunur."),
    ],
    facts: [
      { label: contentText('text_2cb0ae387c17b934', "Kimler için"), value: contentText('text_00edfe745a76404e', "3 yaştan itibaren çocuk ve yetişkin") },
      { label: contentText('text_9d6fc6bad958d1e5', "Ders süresi"), value: contentText('text_384a9067127e3638', "1 saat") },
      { label: contentText('text_806974efd1268d90', "Aylık paket"), value: contentText('text_1c262e66ee435a71', "8 ders") },
      { label: contentText('text_90920d93e2c7e632', "Program"), value: contentText('text_03fee96957ef151b', "Kişiye özel planlama") },
    ],
    blocks: [
      {
        title: contentText('text_298da90db5bbb3e9', "Özel ders kimler için uygun?"),
        items: [contentText('text_c7a43c85e41a1470', "Su korkusu yaşayanlar"), contentText('text_c69f651702c27859', "Grup derslerini tercih etmeyenler veya grup saatlerine uyamayanlar"), contentText('text_dda836b6912b950c', "Daha hızlı ilerlemek isteyenler"), contentText('text_6e885b961515fb72', "Özel ilgi ve yakın takip gerektiren durumlar"), contentText('text_b70477ec9b2307db', "Tekniğini geliştirmek isteyen deneyimli yüzücüler")],
      },
    ],
  },
  {
    slug: 'performans-yuzme',
    name: contentText('text_cdcf6fa011e58290', "Performans Yüzme"),
    short: contentText('text_559b742446bf14ea', "Performans"),
    audience: contentText('text_38beab07b485d7a8', "Lisanslı sporcu"),
    tagline: contentText('text_96954f718cc50d68', "Kulvardan kürsüye uzanan yol"),
    summary: contentText('text_c77eabb9ab33255c', "Antrenör değerlendirmesiyle takım antrenmanları; yaş gruplarına göre planlanan sporcu gelişimi."),
    image: 'performans-cikis-3',
    alt: contentText('text_63454f658162cb33', "Ata Yüzme sporcusu çıkış bloğunda start pozisyonunda"),
    gallery: [
      { image: 'performans-takip', alt: contentText('text_4a8cfce43d3663a8', "Yarış sonrası sonuçları takip eden genç sporcular") },
      { image: 'takim-bayrak-2', alt: contentText('text_2623764020a4b295', "Madalyalı Ata Yüzme sporcuları kulüp bayrağıyla") },
    ],
    intro: [
      contentText('text_5cf3b165c96b6ba8', "Performans yüzme programı, kurslardan mezun olan ve antrenör gözlemiyle takım antrenmanlarına geçen sporcularımızı kapsar. Kulüp dışından katılmak isteyen sporcular, yaş gruplarına göre belirlenen kriterler doğrultusunda değerlendirilir."),
      contentText('text_d4e478fba72a617e', "Ata Yüzme Spor Kulübü sporcuları, Türkiye Yüzme Federasyonu çatısı altında ulusal ve uluslararası yarışlarda kulübümüzü temsil eder."),
    ],
    facts: [
      { label: contentText('text_91e17e6ed08a85ce', "Statü"), value: contentText('text_38beab07b485d7a8', "Lisanslı sporcu") },
      { label: contentText('text_3702423bdac8f1db', "Geçiş"), value: contentText('text_e9b6360c840b0690', "Antrenör değerlendirmesiyle") },
      { label: contentText('text_b3ce1bdff1230304', "Branşlar"), value: contentText('text_816fd66fa0f2586d', "Serbest, sırtüstü, kurbağalama, kelebek") },
      { label: contentText('text_831d1990ae0a3d3a', "Yarışlar"), value: contentText('text_41d3e9d7fba1fa69', "Ulusal ve uluslararası") },
    ],
    blocks: [
      {
        title: contentText('text_f1fe1d73e03aa531', "Programın kazanımları"),
        items: [contentText('text_6f9df5cd2f918d11', "Lisanslı sporcu olma"), contentText('text_e4499d8956a1736a', "Okul bursu süreçlerinde sportif altyapı"), contentText('text_3d4f3292742e5d4c', "Yurt dışı burs olanaklarına yönelik sporcu geçmişi"), contentText('text_d0821f7837d3f2b4', "Milli takım seçmelerine katılım hakkı")],
      },
    ],
    note: contentText('text_da148fae76982abc', "Takım antrenmanlarına geçiş ve dışarıdan katılım kriterleri için antrenörlerimizle görüşmenizi öneririz."),
  },
  {
    slug: 'saglik-ve-spor-amacli-yuzme',
    name: contentText('text_4965191de51100b7', "Sağlık Amaçlı Yüzme"),
    short: contentText('text_5aed93824f10cc1d', "Sağlık"),
    audience: contentText('text_8c9d4eb038fae428', "Her yaş"),
    tagline: contentText('text_ba7a5015a6f625ec', "Yaşam boyu sürdürülebilir bir spor"),
    summary: contentText('text_62375848dc80c296', "Yüzmeyi düzenli bir sağlık alışkanlığına dönüştürmek isteyenler için eğitim ve serbest yüzme seçenekleri."),
    image: 'saglik-yetiskin',
    alt: contentText('text_ad30c4a37eb9add5', "Havuzda kulvar boyunca yüzen yetişkinler"),
    gallery: [
      { image: 'yetiskin-isinma-2', alt: contentText('text_b8306041c07fa246', "Eğitim öncesi esneme hareketleri yapan yetişkinler") },
      { image: 'saglik-serbest', alt: contentText('text_60f6dd8b62e246aa', "Kulvarda serbest stil yüzen sporcu") },
    ],
    intro: [
      contentText('text_6a9158251402628f', "Yüzme, her yaş grubuna önerilebilen ve yaşam boyu sürdürülebilen spor dallarının başında gelir. Suyun kaldırma kuvveti sayesinde eklemler üzerindeki yük azalır, sakatlanma riski düşer."),
      contentText('text_33b171978624cb64', "Kulübümüz, yüzmeyi sağlık ve spor amacıyla düzenli bir alışkanlığa dönüştürmek isteyenler için eğitimli programlar ve eğitim almadan katılabilecek serbest yüzme seansları sunar."),
    ],
    facts: [
      { label: contentText('text_2cb0ae387c17b934', "Kimler için"), value: contentText('text_870dbe390c358ef9', "Her yaş grubu") },
      { label: contentText('text_1ba822cc0684a103', "Seçenekler"), value: contentText('text_3e85053d737e6735', "Eğitimli program veya serbest yüzme") },
      { label: contentText('text_267c6508d8f6d3ba', "Ortam"), value: contentText('text_bc4c5c4dc103afc1', "Kapalı havuz") },
      { label: contentText('text_41620582d6218948', "Odak"), value: contentText('text_3198c637d0744a22', "Kondisyon ve sağlıklı yaşam") },
    ],
    blocks: [
      {
        title: contentText('text_757397b19dc08df0', "Yüzmenin sağlığa katkıları"),
        items: [contentText('text_b1be260c8e4a11d7', "Akciğer kapasitesini artırır, nefes tekniğini geliştirir"), contentText('text_8340e94b983b7eb0', "Kardiyovasküler kondisyonu destekler"), contentText('text_a19a3f10cf34a1c3', "Kas kuvvetini ve dayanıklılığı artırır"), contentText('text_b6155a5019023687', "Sırt ve karın kaslarını güçlendirir"), contentText('text_713ebdc127b8a322', "Eklem dostu, düşük darbeli bir egzersiz sunar")],
      },
    ],
    note: contentText('text_7568ff1783e50dc0', "Sağlık sorunu olan katılımcıların yüzmeye başlamadan önce hekimine danışmasını öneririz."),
  },
];

export const programBySlug = (slug?: string) => programs.find((p) => p.slug === slug);

export const stats = [
  { value: contentText('text_e7f6c011776e8db7', "6"), label: contentText('text_04d4eb7c403baf48', "Grup başına en fazla öğrenci") },
  { value: contentText('text_2c624232cdd22177', "8"), label: contentText('text_3b0a1cce8224ac01', "Aylık ders · haftada 2 gün") },
  { value: contentText('text_a38d780c0b08f82e', "3+"), label: contentText('text_73ea174e72a6923b', "Yaştan itibaren eğitim") },
  { value: contentText('text_4b227777d4dd1fc6', "4"), label: contentText('text_f59a41746b49767a', "Branşta teknik eğitim") },
];

export const values = [
  { title: contentText('text_6a55395830adce17', "Federasyona bağlı kulüp"), text: contentText('text_be27007f33cddb1e', "Türkiye Yüzme Federasyonu’na bağlı akredite bir spor kulübü olarak faaliyet gösteriyoruz.") },
  { title: contentText('text_6edcf0230e2f7479', "Bilimsel eğitim"), text: contentText('text_503daedf9fe191e4', "Her yaş grubuna, gelişim dönemine uygun ve bilimsel temelli yüzme eğitimi sunuyoruz.") },
  { title: contentText('text_27400f5f47feeb4f', "Uzman eğitmen kadrosu"), text: contentText('text_09c3e0ec468cf723', "Eğitmenlerimiz BESYO mezunu akademisyenler ve/veya uzun yıllar yüzücülük yapmış eski sporculardan oluşur.") },
  { title: contentText('text_2828e6075c624dd8', "Küçük gruplar"), text: contentText('text_4076af163506a85d', "Grup derslerimiz en fazla 6 kişiden oluşur; her öğrenci yakından takip edilir.") },
  { title: contentText('text_097107f0c88e8373', "Seviye bazlı gelişim"), text: contentText('text_9d635e0ca54f9c21', "Başlangıçtan performansa, her öğrenci seviyesine uygun grupta ilerler.") },
  { title: contentText('text_72c4a537d1ed13a4', "Şeffaf süreç"), text: contentText('text_c4f7351c3e1ffd10', "Kayıt öncesinde havuzu ziyaret edebilir, dersleri gözlemleyebilir ve eğitmenlerle tanışabilirsiniz.") },
];

export const pathway = [
  { step: '01', title: contentText('text_296ccc7ac21e386c', "Başlangıç"), text: contentText('text_8ddbc1d12152ed91', "Suyla tanışma, adaptasyon, temel nefes ve ayak vuruşu çalışmaları.") },
  { step: '02', title: contentText('text_e900107f2f5fff70', "Teknik gelişim"), text: contentText('text_53bda2c76a533290', "Dört branşta teknik öğrenme, koordinasyon, atlama ve çıkış çalışmaları.") },
  { step: '03', title: contentText('text_559b742446bf14ea', "Performans"), text: contentText('text_bdf18326c5afb9ce', "Lisanslı sporculuk, mesafe antrenmanları, kondisyon ve yarış teknikleri.") },
];

export const ageStages = [
  { age: contentText('text_8d4032d7b90094d8', "11 – 12"), title: contentText('text_e2d6191b985f5273', "Gelişim çağı"), text: contentText('text_082c01b811c2e599', "Teknik öğrenme ve aerobik kapasitenin geliştirilmesi ön plandadır.") },
  { age: contentText('text_0bc13f5d6f1f55dd', "13 – 14"), title: contentText('text_5afaa8bd616a8a1e', "Yıldızlar"), text: contentText('text_a338a165b49385f9', "Milli takım seçmelerine ilk kez katılım; teknik pekiştirme ve kara antrenmanlarının başlangıcı.") },
  { age: contentText('text_bf1a005b3bea23b5', "15 – 16"), title: contentText('text_5cf760fd9a3ad026', "Gençler"), text: contentText('text_511f093b588c761c', "Tüm enerji sistemlerinin çalıştırılması, artan anaerobik yüklenmeler ve beslenme bilinci.") },
  { age: contentText('text_242214cc5b02a87b', "17 +"), title: contentText('text_a4f6bf3e811a551a', "Açık yaş"), text: contentText('text_900be246dec91396', "Performansın zirvesine yaklaşılan dönem; küçük yaşlardan gelen doğru antrenman altyapısı belirleyicidir.") },
];

export const enrollmentSteps = [
  { title: contentText('text_e9aa1f265ccc2d71', "Bize ulaşın"), text: contentText('text_a07e8b10f839fe31', "Telefon veya WhatsApp üzerinden yaş, seviye ve hedefinizi paylaşın; size uygun programı birlikte belirleyelim.") },
  { title: contentText('text_7ab253670fb25012', "Tesisi ziyaret edin"), text: contentText('text_e1b8defdc01e7244', "Randevu alarak havuzu görebilir, dersleri gözlemleyebilir ve eğitmenlerimizle tanışabilirsiniz.") },
  { title: contentText('text_8ad291bd164943cd', "Ön kayıt yaptırın"), text: contentText('text_5b24595043548225', "Kontenjanlarımız sınırlıdır. Planladığınız dönemde başlayabilmek için ön kayıt yaptırmanızı öneririz.") },
  { title: contentText('text_65adfff2272ba176', "Derslere başlayın"), text: contentText('text_09e70f9f243b714a', "Seviyenize uygun grupta, düzenli bir ders programıyla eğitiminize başlayın.") },
];

export const equipment = [contentText('text_965e95de47a47ab4', "Yüzme bonesi"), contentText('text_626b33d6849b9aa2', "Yüzücü (klor) gözlüğü"), contentText('text_fcce7f61537676fb', "Mayo veya yüzme şortu"), contentText('text_ee3f10fbf81431d9', "Kaymaz tabanlı terlik"), contentText('text_4bea6cdf6b1d65f4', "Havlu")];

export const advice = [
  contentText('text_99d42cb86da237d3', "Kayıt öncesinde dersleri yerinde gözlemleyin."),
  contentText('text_7667db60ca10e463', "Eğitmenle görüşün; deneyimi ve yaklaşımı hakkında bilgi alın."),
  contentText('text_97454736f90c1e9a', "Havuz suyunun kalitesi ve hijyen uygulamaları hakkında bilgi isteyin."),
  contentText('text_132aa5df9fbcf5e5', "Kurumun referanslarını ve federasyon bağlantısını sorgulayın."),
  contentText('text_4cc8f35801add047', "Soyunma odaları ve ortak alanlar dahil tesisi inceleyin."),
];

export type Faq = { q: string; a: string };
export const faqGroups: { title: string; items: Faq[] }[] = [
  {
    title: contentText('text_8ec2bb837a16ca7a', "Programlar"),
    items: [
      { q: contentText('text_62d5bf9e096e12c1', "Hangi yaş grupları için eğitim veriyorsunuz?"), a: contentText('text_aeca83ef29626e08', "3 – 5 yaş minikler, 5 – 14 yaş çocuklar ve 15 yaş üzeri yetişkinler için yüzme eğitimi veriyoruz. Ayrıca özel ders, performans ve sağlık amaçlı yüzme seçeneklerimiz bulunur.") },
      { q: contentText('text_b97141167626423b', "Gruplar kaç kişiden oluşuyor?"), a: contentText('text_c65d76f8ce15d5bf', "Grup derslerimiz en fazla 6 kişiden oluşur. Gruplar yaş ve yüzme seviyesine göre belirlenir.") },
      { q: contentText('text_877b89b48d17aea0', "Dersler ne sıklıkta yapılıyor?"), a: contentText('text_164dfedbe7dc243b', "Grup dersleri haftada iki gün, birer saat olarak planlanır; aylık programda 8 ders bulunur. Güncel ders saatleri için bizimle iletişime geçebilirsiniz.") },
      { q: contentText('text_086d05200a6bb592', "Hangi durumlarda özel ders almalıyım?"), a: contentText('text_0a641e858af8a061', "Su korkusu yaşayanlar, grup derslerinde ilerlemekte zorlananlar, grup saatlerine uyamayanlar ve tekniğini hızla geliştirmek isteyenler için özel ders öneriyoruz.") },
    ],
  },
  {
    title: contentText('text_9dc2399763ae4b75', "Eğitim süreci"),
    items: [
      { q: contentText('text_0f4368a4ac4aee49', "Yüzmeyi ne kadar sürede öğrenebilirim?"), a: contentText('text_cffb035175892531', "Ortalama yetenekteki bir kişi, yaklaşık 8 seansta kendi güvenliğini sağlayacak düzeyde yüzebilir. Tekniği geliştirmek ise daha uzun bir süreç gerektirir; yetişkinler genellikle 1 – 2 ay içinde yüzmeye başlar.") },
      { q: contentText('text_669334c26facec01', "Eğitmenleriniz kimlerden oluşuyor?"), a: contentText('text_45564b85bab26658', "Eğitmenlerimizin tamamı üniversitelerin beden eğitimi ve spor yüksekokullarından (BESYO) mezun akademisyenler ve/veya uzun yıllar yüzücülük yapmış eski sporculardan oluşur.") },
      { q: contentText('text_e04868f201009ae2', "Kaçırdığım derslerin telafisi yapılıyor mu?"), a: contentText('text_cb6a0568bf098f72', "Prensip olarak kaçırılan derslerin telafisi yapılmaz. Özel durumlar için eğitim koordinatörümüzle görüşebilirsiniz.") },
      { q: contentText('text_921c5d2a4837ef8d', "Performans takımına nasıl geçilir?"), a: contentText('text_64b5324e4da82801', "Kurslardan mezun olan öğrenciler antrenör gözlemiyle takım antrenmanlarına alınır. Dışarıdan katılmak isteyen sporcular, yaş grubuna göre belirlenen kriterlerle değerlendirilir.") },
    ],
  },
  {
    title: contentText('text_5c76fac4d1fd2a7c', "Kayıt ve üyelik"),
    items: [
      { q: contentText('text_c7e3e4b05a50ccd2', "Havuzu ve dersleri kayıttan önce görebilir miyim?"), a: contentText('text_3452a35cae7db7dc', "Evet. Telefonla randevu alarak havuzu ziyaret edebilir, dersleri gözlemleyebilir ve eğitmenlerimizle tanışabilirsiniz.") },
      { q: contentText('text_55036237439e60c8', "Ne zaman başlayabilirim?"), a: contentText('text_5b24595043548225', "Kontenjanlarımız sınırlıdır. Planladığınız dönemde başlayabilmek için ön kayıt yaptırmanızı öneririz.") },
      { q: contentText('text_69cddcaa26eb0992', "Kayıt için hangi belgeler gerekiyor?"), a: contentText('text_08372b34c2c59ef8', "Çocuk kayıtlarında sağlık durumuna ilişkin belgeler istenebilir. Güncel belge listesini kayıt sırasında sizinle paylaşıyoruz.") },
      { q: contentText('text_23b32181d76a9075', "Ücret ve ders saatlerini nasıl öğrenebilirim?"), a: contentText('text_e6065d573cd99250', "Güncel ücret, kontenjan ve ders saatleri için telefon veya WhatsApp üzerinden bize ulaşabilirsiniz.") },
    ],
  },
  {
    title: contentText('text_18c0b344ccb463c3', "Tesis ve genel"),
    items: [
      { q: contentText('text_4f29376f9db8b7c8', "Derslere gelirken yanımda neler olmalı?"), a: contentText('text_58b3c7674ee37ffa', "Yüzme bonesi, yüzücü gözlüğü, mayo veya yüzme şortu, kaymaz tabanlı terlik ve havlu getirmeniz yeterlidir.") },
      { q: contentText('text_dc0f86627cb0dce8', "Eğitim almadan serbest yüzmeye gelebilir miyim?"), a: contentText('text_8fba3453dc29d379', "Evet, yüzme bilenler için serbest yüzme seansları düzenlenmektedir. Güncel seans ve katılım koşulları için bize ulaşabilirsiniz.") },
      { q: contentText('text_dcae1e3440f97241', "Tek girişlik kullanım mümkün mü?"), a: contentText('text_3a2acf4fa31e4618', "Tek girişlik (günlük) kullanım kabul edilmemektedir; katılım üyelik esasına dayanır.") },
      { q: contentText('text_c0a30f54068453bc', "Servis hizmetiniz var mı?"), a: contentText('text_e04b505b6716255a', "Servis hizmeti verilmemektedir. Tesisimize ulaşım bilgisi için İletişim sayfamızdaki haritayı kullanabilirsiniz.") },
    ],
  },
];

export type GalleryItem = { image: string; alt: string; cat: string };
export const gallery: GalleryItem[] = [
  { image: 'hero-sirtustu', alt: contentText('text_e9207447fa5c5f4d', "Sırtüstü yüzen Ata Yüzme sporcusu"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'takim-bayrak', alt: contentText('text_42691155e9c558be', "Madalyalı sporcular kulüp bayrağıyla"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'cocuk-grup', alt: contentText('text_a2d7a299c91d7845', "Havuzda dinlenen Ata boneli çocuklar"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'havuz-kulvarlar', alt: contentText('text_cb04b5d98642f8ae', "Kulvarlara ayrılmış kapalı havuz"), cat: contentText('text_b1f97931adf9e1cb', "Tesis") },
  { image: 'kurs-podyum', alt: contentText('text_4fad2a3ffa38a248', "Kürsüde Ata Yüzme sporcuları"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'cocuk-kenar', alt: contentText('text_03ceddec48eb8ec8', "Yüzme tahtalarıyla havuz kenarında çalışan çocuklar"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'takim-antrenor', alt: contentText('text_25a52f9c4d0cbc9a', "Antrenörüyle madalyalı minik sporcular"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'performans-cikis', alt: contentText('text_30a6468faec70ee3', "Çıkış bloğunda start alan sporcu"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'havuz-genel', alt: contentText('text_c04c4557185c4b3d', "Antrenman sırasında havuz"), cat: contentText('text_b1f97931adf9e1cb', "Tesis") },
  { image: 'yetiskin-kelebek', alt: contentText('text_cbfbd3ec7ec25828', "Kelebek stilinde yüzen sporcu"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'podyum-yurtdisi', alt: contentText('text_50c02e6c7132a45c', "Uluslararası yarışta kürsüde sporcularımız"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'minik-egitmen', alt: contentText('text_2ec426499bdd8a09', "Eğitmeniyle çalışan minik öğrenciler"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'takim-2010', alt: contentText('text_fe7f14d3f2d33121', "Ata Yüzme takım fotoğrafı"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'hero-serbest', alt: contentText('text_7be454a2638a2e2d', "Serbest stilde nefes alan sporcu"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'havuz-yarisma', alt: contentText('text_73aadc53db89ad4c', "Açık havuzda yarış organizasyonu"), cat: contentText('text_b1f97931adf9e1cb', "Tesis") },
  { image: 'takim-madalya', alt: contentText('text_7881e1c78e0894bc', "Madalyalı sporcular ve antrenörleri"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'cocuk-mutlu', alt: contentText('text_c4a34a43722c7ffe', "Havuzda mutlu öğrenciler"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'antrenor-blok', alt: contentText('text_57b9de3115ef4184', "Eğitmen çıkış bloğunda teknik gösteriyor"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'podyum-yurtdisi-4', alt: contentText('text_b0fbfa9936b88382', "Yarış sonrası kürsüde sporcular"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'havuz-cocuklar', alt: contentText('text_2be8b3dfc6fb6089', "Havuz kenarında çalışan çocuklar"), cat: contentText('text_b1f97931adf9e1cb', "Tesis") },
  { image: 'yetiskin-isinma', alt: contentText('text_40c307be6822da57', "Ders öncesi ısınan yetişkinler"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'kurs-podyum-3', alt: contentText('text_fccab0a5317426cb', "Ödül töreninde sporcularımız"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'ozel-sualti', alt: contentText('text_2fb174e60ce06763', "Su altında yüzen öğrenci"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'podyum-acik-2', alt: contentText('text_ba2f6ee18c7f1518', "Açık su yarışında kürsü"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'havuz-cocuklar-2', alt: contentText('text_d15bd7e5521d241f', "Kulvarda antrenman"), cat: contentText('text_b1f97931adf9e1cb', "Tesis") },
  { image: 'hero-kelebek', alt: contentText('text_24f5fff18d1f3975', "Kelebek stilinde yüzen genç sporcu"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'takim-bayrak-3', alt: contentText('text_60d63317f8899793', "Kulüp bayrağıyla sporcular ve antrenörleri"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'cocuk-tahta-2', alt: contentText('text_eadb1be5e7b86838', "Yüzme tahtasıyla çalışan çocuklar"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'podyum', alt: contentText('text_4fad2a3ffa38a248', "Kürsüde Ata Yüzme sporcuları"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'performans-kulvar', alt: contentText('text_c1f184ff979fbb65', "Kulvarlarda antrenman"), cat: contentText('text_b1f97931adf9e1cb', "Tesis") },
  { image: 'hero-kurbagalama', alt: contentText('text_28c899bdf4a6a725', "Kurbağalama stilinde yüzen sporcu"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'takim-madalya-2', alt: contentText('text_42691155e9c558be', "Madalyalı sporcular kulüp bayrağıyla"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'minik-grup', alt: contentText('text_90d1c038001eb0c8', "Havuz kenarında minik öğrenciler"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'podyum-yurtdisi-3', alt: contentText('text_fc13bc0611251f64', "Uluslararası yarışta takımımız"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
  { image: 'performans-sirtustu', alt: contentText('text_b275741e49c0da54', "Sırtüstü start çalışması"), cat: contentText('text_2aa71916f93cb8e4', "Eğitim") },
  { image: 'takim-havuz', alt: contentText('text_58e9c6bc0f20ca0b', "Havuz başında takımımız"), cat: contentText('text_3718ff8766bca6eb', "Sporcularımız") },
];
