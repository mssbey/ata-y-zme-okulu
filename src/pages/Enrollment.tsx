import { Link } from 'react-router-dom';
import { advice, brand, enrollmentSteps, equipment, whatsapp } from '../data/site';
import { CtaBand, Eyebrow, Icon, Img, PageHero, SectionHeading, WhatsAppIcon, usePageMeta } from '../components/ui';

const ageGroups = [
  { age: '3 – 5', label: 'Minikler', to: '/programlar/bebek-yuzme-dersleri' },
  { age: '5 – 14', label: 'Çocuklar', to: '/programlar/cocuk-yuzme-kursu' },
  { age: '15 +', label: 'Yetişkinler', to: '/programlar/yetiskin-yuzme-dersleri' },
];

export default function Enrollment() {
  usePageMeta('Kayıt & Üyelik', 'Ata Yüzme Spor Kulübü kayıt süreci: ön kayıt, tesis ziyareti, yaş grupları, ders düzeni ve derslere gelirken yanınızda bulunması gerekenler.');
  return (
    <>
      <PageHero
        eyebrow="Kayıt & Üyelik"
        title={<>Dört adımda<br />derslere başlayın.</>}
        lead="Kontenjanlarımız sınırlıdır. Planladığınız dönemde eğitime başlayabilmek için ön kayıt yaptırmanızı öneririz."
        image="minik-egitmen"
        alt="Eğitmeniyle havuz kenarında çalışan minik öğrenciler"
        position="50% 40%"
        crumbs={[{ label: 'Kayıt & Üyelik' }]}
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Kayıt süreci" title="Nasıl başlarım?" align="split" lead="İlk görüşmeden ilk derse kadar süreç boyunca eğitim koordinatörümüz size eşlik eder." />
          <ol className="steps">
            {enrollmentSteps.map((s, i) => (
              <li key={s.title} className="reveal">
                <span className="steps-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap info-grid">
          <div className="info-card reveal">
            <span className="why-icon"><Icon name="users" size={24} /></span>
            <h2 className="display-4">Yaş grupları</h2>
            <ul className="age-list">
              {ageGroups.map((g) => (
                <li key={g.age}>
                  <Link to={g.to}>
                    <strong>{g.age}</strong>
                    <span>{g.label}</span>
                    <Icon name="arrow" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="info-card reveal">
            <span className="why-icon"><Icon name="clock" size={24} /></span>
            <h2 className="display-4">Ders düzeni</h2>
            <dl className="info-dl">
              <div><dt>Haftalık</dt><dd>2 gün, 1’er saat</dd></div>
              <div><dt>Aylık</dt><dd>8 ders</dd></div>
              <div><dt>Grup</dt><dd>En fazla 6 kişi</dd></div>
              <div><dt>Özel ders</dt><dd>Gün ve saat birlikte belirlenir</dd></div>
            </dl>
          </div>
          <div className="info-card reveal">
            <span className="why-icon"><Icon name="wave" size={24} /></span>
            <h2 className="display-4">Yanınızda olsun</h2>
            <ul className="check-list">
              {equipment.map((e) => (
                <li key={e}><Icon name="check" size={18} /> {e}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split-feature">
          <div className="split-feature-media reveal">
            <Img name="havuz-genel" alt="Antrenman sırasında Yakacık Yüzme Havuzu" sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
          <div className="reveal">
            <Eyebrow>Kurs seçerken</Eyebrow>
            <h2 className="display-2">Doğru yüzme okulunu seçmek için öneriler.</h2>
            <p className="lead">Yüzme eğitimi güven gerektirir. Karar vermeden önce şu adımları atmanızı tavsiye ediyoruz — kulübümüzde hepsine açığız.</p>
            <ul className="check-list">
              {advice.map((a) => (
                <li key={a}><Icon name="check" size={18} /> {a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap rules reveal">
          <div>
            <Eyebrow>Üyelik esasları</Eyebrow>
            <h2 className="display-3">Bilmenizde fayda var.</h2>
          </div>
          <ul>
            <li><strong>Üyelik esaslı katılım.</strong> Tek girişlik (günlük) kullanım kabul edilmemektedir.</li>
            <li><strong>Telafi dersleri.</strong> Prensip olarak kaçırılan derslerin telafisi yapılmaz; özel durumlar için koordinatörümüzle görüşebilirsiniz.</li>
            <li><strong>Belgeler.</strong> Çocuk kayıtlarında sağlık durumuna ilişkin belgeler istenebilir; güncel listeyi kayıt sırasında paylaşıyoruz.</li>
            <li><strong>Ulaşım.</strong> Servis hizmeti verilmemektedir.</li>
            <li><strong>Ücretler.</strong> Güncel ücret ve kontenjan bilgisi için telefon veya WhatsApp üzerinden bize ulaşın.</li>
          </ul>
          <div className="rules-actions">
            <a className="btn btn-primary" href={whatsapp('Merhaba, ön kayıt hakkında bilgi almak istiyorum.')} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} /> Ön kayıt için yazın
            </a>
            <a className="btn btn-outline" href={brand.tel}>
              <Icon name="phone" size={18} /> Hemen arayın
            </a>
          </div>
        </div>
      </section>

      <CtaBand title="Tesisimizi ziyaret edin." text="Randevu alarak havuzumuzu görebilir, dersleri gözlemleyebilir ve eğitmenlerimizle tanışabilirsiniz." message="Merhaba, tesisi ziyaret etmek için randevu almak istiyorum." />
    </>
  );
}
