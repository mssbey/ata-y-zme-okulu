import { contentText } from '../content/store';
import { Link } from 'react-router-dom';
import { advice, brand, enrollmentSteps, equipment, whatsapp } from '../data/site';
import { CtaBand, Eyebrow, Icon, Img, PageHero, SectionHeading, WhatsAppIcon, usePageMeta } from '../components/ui';

const ageGroups = [
  { age: contentText('text_05fd8f14bcb776b1', "3 – 5"), label: contentText('text_0aaa6e995256972f', "Minikler"), to: '/programlar/bebek-yuzme-dersleri' },
  { age: contentText('text_211dae09dac6949a', "5 – 14"), label: contentText('text_a7f147e4a35442d2', "Çocuklar"), to: '/programlar/cocuk-yuzme-kursu' },
  { age: contentText('text_1e11bb9775e74a93', "15 +"), label: contentText('text_a29df5c39aa19f89', "Yetişkinler"), to: '/programlar/yetiskin-yuzme-dersleri' },
];

export default function Enrollment() {
  usePageMeta(contentText('text_55d268039cc995c6', "Kayıt & Üyelik"), contentText('text_70f005fc77e6e4e2', "Ata Yüzme Spor Kulübü kayıt süreci: ön kayıt, tesis ziyareti, yaş grupları, ders düzeni ve derslere gelirken yanınızda bulunması gerekenler."));
  return (
    <>
      <PageHero
        eyebrow={contentText('text_55d268039cc995c6', "Kayıt & Üyelik")}
        title={<>{contentText('text_05fac454551d0646', "Dört adımda")}<br />{contentText('text_f64144c060b8eacc', "derslere başlayın.")}</>}
        lead={contentText('text_f38a2b7ed9805158', "Kontenjanlarımız sınırlıdır. Planladığınız dönemde eğitime başlayabilmek için ön kayıt yaptırmanızı öneririz.")}
        image="minik-egitmen"
        alt={contentText('text_8f4f643d0ce5431d', "Eğitmeniyle havuz kenarında çalışan minik öğrenciler")}
        position="50% 40%"
        crumbs={[{ label: contentText('text_55d268039cc995c6', "Kayıt & Üyelik") }]}
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow={contentText('text_2a23bc257dee8b8e', "Kayıt süreci")} title={contentText('text_5b3a5c835a8a7237', "Nasıl başlarım?")} align="split" lead={contentText('text_8ebee45e5253a5b0', "İlk görüşmeden ilk derse kadar süreç boyunca eğitim koordinatörümüz size eşlik eder.")} />
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
            <h2 className="display-4">{contentText('text_89353c393cd5b85e', "Yaş grupları")}</h2>
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
            <h2 className="display-4">{contentText('text_45cf38522704a1dc', "Ders düzeni")}</h2>
            <dl className="info-dl">
              <div><dt>{contentText('text_abc3e615d675e22b', "Haftalık")}</dt><dd>{contentText('text_cc3b7583b0675425', "2 gün, 1’er saat")}</dd></div>
              <div><dt>{contentText('text_e055e06d75814d33', "Aylık")}</dt><dd>{contentText('text_1c262e66ee435a71', "8 ders")}</dd></div>
              <div><dt>{contentText('text_48bef2532d3fdabe', "Grup")}</dt><dd>{contentText('text_617f7d61739422eb', "En fazla 6 kişi")}</dd></div>
              <div><dt>{contentText('text_6b0c1fc983e0a8a3', "Özel ders")}</dt><dd>{contentText('text_f93815024ef4fa75', "Gün ve saat birlikte belirlenir")}</dd></div>
            </dl>
          </div>
          <div className="info-card reveal">
            <span className="why-icon"><Icon name="wave" size={24} /></span>
            <h2 className="display-4">{contentText('text_fa18f3c8e5a411af', "Yanınızda olsun")}</h2>
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
            <Img name="havuz-genel" alt={contentText('text_a60cfccc2b7e2633', "Antrenman sırasında Yakacık Yüzme Havuzu")} sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
          <div className="reveal">
            <Eyebrow>{contentText('text_d589e1b5b9a97ae0', "Kurs seçerken")}</Eyebrow>
            <h2 className="display-2">{contentText('text_d99bda5e687944e5', "Doğru yüzme okulunu seçmek için öneriler.")}</h2>
            <p className="lead">{contentText('text_ce01724a7fcea5b0', "Yüzme eğitimi güven gerektirir. Karar vermeden önce şu adımları atmanızı tavsiye ediyoruz — kulübümüzde hepsine açığız.")}</p>
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
            <Eyebrow>{contentText('text_c0ba2f3c58514437', "Üyelik esasları")}</Eyebrow>
            <h2 className="display-3">{contentText('text_7dd50afee7949c45', "Bilmenizde fayda var.")}</h2>
          </div>
          <ul>
            <li><strong>{contentText('text_bb370d499fa2005c', "Üyelik esaslı katılım.")}</strong> {contentText('text_7f99cdb605e62164', "Tek girişlik (günlük) kullanım kabul edilmemektedir.")}</li>
            <li><strong>{contentText('text_6581c8816e34855f', "Telafi dersleri.")}</strong> {contentText('text_5c584b209806bb0e', "Prensip olarak kaçırılan derslerin telafisi yapılmaz; özel durumlar için koordinatörümüzle görüşebilirsiniz.")}</li>
            <li><strong>{contentText('text_c0e16c057120adb6', "Belgeler.")}</strong> {contentText('text_ca216c7bc528fb50', "Çocuk kayıtlarında sağlık durumuna ilişkin belgeler istenebilir; güncel listeyi kayıt sırasında paylaşıyoruz.")}</li>
            <li><strong>{contentText('text_04ca6e2d3491e44b', "Ulaşım.")}</strong> {contentText('text_0ff2e81a8dfc6f50', "Servis hizmeti verilmemektedir.")}</li>
            <li><strong>{contentText('text_5a03fbfec4af51f8', "Ücretler.")}</strong> {contentText('text_f01f754f2811160f', "Güncel ücret ve kontenjan bilgisi için telefon veya WhatsApp üzerinden bize ulaşın.")}</li>
          </ul>
          <div className="rules-actions">
            <a className="btn btn-primary" href={whatsapp(contentText('text_b6f307b40ba0df10', "Merhaba, ön kayıt hakkında bilgi almak istiyorum."))} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} /> {contentText('text_68a99b786cbab350', "Ön kayıt için yazın")}</a>
            <a className="btn btn-outline" href={brand.tel}>
              <Icon name="phone" size={18} /> {contentText('text_87548143ee724842', "Hemen arayın")}</a>
          </div>
        </div>
      </section>

      <CtaBand title={contentText('text_3d022f08530424a9', "Tesisimizi ziyaret edin.")} text={contentText('text_8e35b9096cb2dfbf', "Randevu alarak havuzumuzu görebilir, dersleri gözlemleyebilir ve eğitmenlerimizle tanışabilirsiniz.")} message={contentText('text_45d099be0fc22d37', "Merhaba, tesisi ziyaret etmek için randevu almak istiyorum.")} />
    </>
  );
}
