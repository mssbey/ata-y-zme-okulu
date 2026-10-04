import { Link } from 'react-router-dom';
import { brand, mapsLink, values } from '../data/site';
import { ArrowLink, CtaBand, Eyebrow, Icon, type IconName, Img, PageHero, SectionHeading, usePageMeta } from '../components/ui';

const valueIcons: IconName[] = ['shield', 'book', 'award', 'users', 'layers', 'eye'];

export default function About() {
  usePageMeta('Kurumsal', 'Ata Yüzme Spor Kulübü; Türkiye Yüzme Federasyonu’na bağlı, Yakacık Yüzme Havuzu’nda her yaş grubuna bilimsel yüzme eğitimi sunan bir spor kulübüdür.');
  return (
    <>
      <PageHero
        eyebrow="Kurumsal"
        title={<>Suda güven,<br />kulvarda disiplin.</>}
        lead="Ata Yüzme Spor Kulübü; her yaş grubuna bilimsel yüzme eğitimi sunan, sporcu yetiştiren ve ulusal–uluslararası yarışlarda yer alan, Türkiye Yüzme Federasyonu’na bağlı bir spor kulübüdür."
        image="takim-bayrak-3"
        alt="Ata Yüzme sporcuları ve antrenörleri kulüp bayrağıyla"
        position="50% 45%"
        crumbs={[{ label: 'Kurumsal' }]}
      />

      <section className="section">
        <div className="wrap about-grid">
          <div className="reveal">
            <Eyebrow>Hakkımızda</Eyebrow>
            <h2 className="display-2">Yüzmeyi bir yaşam becerisi, sporu bir karakter okulu olarak görüyoruz.</h2>
          </div>
          <div className="about-text reveal">
            <p className="lead">Kartal Yakacık’ta, Yakacık Yüzme Havuzu’nda faaliyet gösteren kulübümüz; minik yaştan yetişkinliğe kadar her yaş grubuna, gelişim dönemine uygun ve bilimsel temelli yüzme eğitimi sunar.</p>
            <p>Eğitim modelimiz; suya adaptasyonla başlayan, dört branşta teknik öğrenmeyle derinleşen ve isteyen öğrenciler için lisanslı sporculuğa uzanan aşamalı bir yapıya dayanır. Grup derslerimiz en fazla 6 kişiden oluşur; böylece her öğrenci eğitmeninin yakın takibinde ilerler.</p>
            <p>Performans takımımızın sporcuları, Türkiye Yüzme Federasyonu çatısı altında ulusal ve uluslararası yarışlarda kulübümüzü temsil eder. Bizim için başarı; kürsüdeki madalyalar kadar, suda kendine güvenen her öğrencinin ilk kulacıdır.</p>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap mission-grid">
          <article className="mission-card reveal">
            <span className="mission-label">Misyonumuz</span>
            <p>Her yaştan bireye güvenli, nitelikli ve bilimsel temelli yüzme eğitimi sunarak yüzmeyi yaşam boyu sürdürülebilir bir spor alışkanlığına dönüştürmek.</p>
          </article>
          <article className="mission-card is-dark reveal">
            <span className="mission-label">Vizyonumuz</span>
            <p>Yetiştirdiği sporcularla ulusal ve uluslararası arenada adından söz ettiren, eğitim kalitesiyle örnek gösterilen bir yüzme kulübü olmak.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Değerlerimiz" title="Eğitim anlayışımızın temelleri." align="split" lead="Kulübümüzü tercih eden ailelerin ve sporcuların bize duyduğu güvenin arkasında, her gün özenle sürdürdüğümüz ilkeler var." />
          <ul className="value-grid">
            {values.map((v, i) => (
              <li key={v.title} className="reveal">
                <span className="why-icon"><Icon name={valueIcons[i]} size={24} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap split-feature">
          <div className="split-feature-media reveal">
            <Img name="antrenor-kenar-2" alt="Ata Yüzme antrenörü havuz kenarından antrenmanı takip ediyor" sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
          <div className="reveal">
            <Eyebrow light>Eğitmen kadromuz</Eyebrow>
            <h2 className="display-2">Akademik bilgi, sporcu tecrübesiyle buluşuyor.</h2>
            <p className="lead">Yüzme eğitmenlerimizin tamamı üniversitelerin beden eğitimi ve spor yüksekokullarından (BESYO) mezun akademisyenler ve/veya uzun yıllar yüzücülük yapmış eski sporculardan oluşur.</p>
            <ul className="check-list is-light">
              <li><Icon name="check" size={18} /> Yaş ve gelişim dönemine uygun eğitim planlaması</li>
              <li><Icon name="check" size={18} /> Dört branşta teknik eğitim yetkinliği</li>
              <li><Icon name="check" size={18} /> Küçük gruplarla her öğrenciye yakın takip</li>
              <li><Icon name="check" size={18} /> Performans sporcuları için yarış odaklı antrenman</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="tesis">
        <div className="wrap">
          <SectionHeading eyebrow="Tesisimiz" title={<>Yakacık<br />Yüzme Havuzu.</>} align="split" lead="İstanbul Anadolu Yakası’nda, Kartal Yakacık’ta yer alan kapalı havuzda eğitimlerimizi sürdürüyoruz. Kayıt öncesinde randevu alarak tesisimizi ziyaret edebilirsiniz." />
          <div className="facility-grid reveal">
            <Img name="havuz-kulvarlar" alt="Yakacık Yüzme Havuzu’nda kulvarlara ayrılmış kapalı havuz" className="f1" sizes="(max-width: 800px) 100vw, 60vw" />
            <Img name="havuz-cocuklar" alt="Havuz kenarında eğitim alan çocuklar" className="f2" sizes="(max-width: 800px) 100vw, 40vw" />
            <div className="facility-card f3">
              <Icon name="pin" size={26} />
              <p><strong>{brand.facility}</strong><br />{brand.street}<br />{brand.city}</p>
              <a className="arrow-link" href={mapsLink} target="_blank" rel="noreferrer">
                <span>Yol tarifi alın</span> <Icon name="arrow" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap split-feature is-reverse">
          <div className="split-feature-media reveal">
            <Img name="podyum-yurtdisi" alt="Uluslararası yarışta kürsüde Ata Yüzme sporcuları" sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
          <div className="reveal">
            <Eyebrow>Sporcu gelişimi</Eyebrow>
            <h2 className="display-2">Kurstan takıma, takımdan kürsüye.</h2>
            <p className="lead">Kurslarımızdan mezun olan öğrenciler, antrenör gözlemiyle performans takımına geçer. Lisanslı sporcularımız, yaş gruplarına göre planlanan antrenman programlarıyla yarışlara hazırlanır.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" to="/programlar/performans-yuzme">Performans programı <Icon name="arrow" size={18} /></Link>
              <ArrowLink to="/galeri">Sporcularımız</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
