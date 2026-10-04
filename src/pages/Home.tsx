import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { brand, faqGroups, pathway, programs, stats, values } from '../data/site';
import { ArrowLink, CtaBand, Eyebrow, Icon, type IconName, Img, SectionHeading, usePageMeta } from '../components/ui';

const slides = [
  { image: 'hero-sirtustu', alt: 'Ata Yüzme sporcusu kulvarda sırtüstü yüzüyor', position: '70% 40%' },
  { image: 'performans-cikis-3', alt: 'Yakacık Yüzme Havuzu’nda çıkış bloğunda start pozisyonundaki sporcu', position: '60% 50%' },
  { image: 'cocuk-mutlu', alt: 'Ata boneli çocuklar havuzda eğitim sırasında', position: '50% 40%' },
];

const valueIcons: IconName[] = ['shield', 'book', 'award', 'users', 'layers', 'eye'];

function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % slides.length), 6500);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section className="home-hero" aria-label="Tanıtım">
      <div className="home-hero-media">
        {slides.map((s, i) => (
          <div key={s.image} className={'home-hero-slide' + (i === active ? ' is-active' : '')} aria-hidden={i !== active}>
            <Img name={s.image} alt={s.alt} sizes="100vw" priority={i === 0} position={s.position} />
          </div>
        ))}
        <div className="home-hero-shade" />
      </div>
      <div className="wrap home-hero-inner">
        <div className="home-hero-copy">
          <Eyebrow light>Yakacık Yüzme Havuzu · Kartal</Eyebrow>
          <h1 className="display-hero">
            Her yaşta,<br />
            <em>bilimsel</em> yüzme eğitimi.
          </h1>
          <p>Türkiye Yüzme Federasyonu’na bağlı Ata Yüzme Spor Kulübü; minik yaştan yetişkinliğe, ilk kulaçtan lisanslı sporculuğa uzanan bir eğitim yolculuğu sunar.</p>
          <div className="btn-row">
            <Link className="btn btn-light" to="/programlar">
              Programları İnceleyin <Icon name="arrow" size={18} />
            </Link>
            <Link className="btn btn-ghost-light" to="/kayit">
              Kayıt Süreci
            </Link>
          </div>
        </div>
        <div className="home-hero-dots" role="tablist" aria-label="Görsel seçimi">
          {slides.map((s, i) => (
            <button key={s.image} role="tab" aria-selected={i === active} aria-label={`${i + 1}. görsel`} className={i === active ? 'is-active' : undefined} onClick={() => setActive(i)}>
              <span>0{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="wrap hero-quick">
        {programs.slice(0, 4).map((p) => (
          <Link key={p.slug} to={`/programlar/${p.slug}`} className="hero-quick-item">
            <small>{p.audience}</small>
            <strong>{p.name}</strong>
            <Icon name="arrowUpRight" size={18} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta('', 'Kartal Yakacık’ta Türkiye Yüzme Federasyonu’na bağlı Ata Yüzme Spor Kulübü: minik, çocuk ve yetişkin yüzme kursları, özel dersler ve performans yüzme.');
  const previewFaqs = faqGroups.flatMap((g) => g.items).filter((_, i) => [0, 1, 4, 8].includes(i));

  return (
    <>
      <Hero />

      {/* Kurumsal tanıtım */}
      <section className="section">
        <div className="wrap intro-grid">
          <div className="intro-media reveal">
            <Img name="takim-bayrak" alt="Madalyalı Ata Yüzme sporcuları kulüp bayrağıyla" className="intro-main" sizes="(max-width: 800px) 100vw, 45vw" />
            <div className="intro-badge">
              <strong>TYF</strong>
              <span>Türkiye Yüzme Federasyonu’na bağlı akredite kulüp</span>
            </div>
          </div>
          <div className="intro-copy reveal">
            <Eyebrow>Kurumsal</Eyebrow>
            <h2 className="display-2">Bir yüzme kursundan çok daha fazlası.</h2>
            <p className="lead">Ata Yüzme Spor Kulübü, her yaş grubuna bilimsel yüzme eğitimi sunan, sporcu yetiştiren ve ulusal–uluslararası yarışlarda yer alan bir spor kulübüdür.</p>
            <p>Yakacık Yüzme Havuzu’ndaki eğitimlerimizde amacımız yalnızca yüzmeyi öğretmek değil; suda güven, disiplin ve sporcu karakteri kazandırmaktır. Her öğrencimiz, seviyesine uygun grupta ve uzman eğitmenlerin yakın takibinde ilerler.</p>
            <blockquote className="intro-quote">
              “{brand.slogan}”
              <cite>Ata Yüzme Spor Kulübü</cite>
            </blockquote>
            <ArrowLink to="/kurumsal">Kulübümüzü tanıyın</ArrowLink>
          </div>
        </div>
      </section>

      {/* Rakamlar */}
      <section className="stats-band" aria-label="Kısaca kulübümüz">
        <div className="wrap stats-grid">
          {stats.map((s) => (
            <div className="stat reveal" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Programlar */}
      <section className="section section-paper">
        <div className="wrap">
          <SectionHeading eyebrow="Eğitim programları" title={<>Her yaşa ve her hedefe<br />uygun bir program.</>} align="split" lead="Suyla ilk kez tanışan minik öğrencilerden lisanslı sporculara kadar; her programımız yaş, seviye ve hedef esas alınarak planlanır." />
          <div className="program-grid">
            {programs.map((p, i) => (
              <Link key={p.slug} to={`/programlar/${p.slug}`} className={'program-card reveal' + (i < 2 ? ' is-large' : '')}>
                <div className="program-card-media">
                  <Img name={p.image} alt={p.alt} sizes={i < 2 ? '(max-width: 800px) 100vw, 50vw' : '(max-width: 800px) 100vw, 33vw'} />
                  <span className="program-card-tag">{p.audience}</span>
                </div>
                <div className="program-card-body">
                  <span className="program-card-num">0{i + 1}</span>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <span className="program-card-more">
                    Programı inceleyin <Icon name="arrow" size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gelişim yolu */}
      <section className="section section-dark pathway">
        <Img name="performans-kulvar" alt="" className="pathway-bg" sizes="100vw" />
        <div className="wrap">
          <SectionHeading light eyebrow="Gelişim yolu" title={<>İlk kulaçtan<br />kürsüye.</>} align="split" lead="Öğrencilerimiz üç aşamalı bir gelişim modeliyle ilerler. Kurslardan mezun olan öğrenciler, antrenör gözlemiyle performans takımına geçebilir." />
          <ol className="pathway-steps">
            {pathway.map((s) => (
              <li key={s.step} className="reveal">
                <span className="pathway-num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="pathway-foot reveal">
            <ArrowLink light to="/programlar/performans-yuzme">Performans yüzme programı</ArrowLink>
          </div>
        </div>
      </section>

      {/* Neden biz */}
      <section className="section">
        <div className="wrap why-grid">
          <div className="why-intro reveal">
            <Eyebrow>Neden Ata Yüzme?</Eyebrow>
            <h2 className="display-2">Güvenle emanet edebileceğiniz bir eğitim anlayışı.</h2>
            <p className="lead">Eğitimin niteliği; eğitmen kadrosu, grup büyüklüğü ve sistemli bir gelişim planıyla belirlenir.</p>
            <div className="why-photo">
              <Img name="antrenor-blok" alt="Ata Yüzme eğitmeni çıkış bloğunda teknik gösteriyor" sizes="(max-width: 800px) 100vw, 35vw" />
            </div>
          </div>
          <ul className="why-list">
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

      {/* Sporcularımız */}
      <section className="section section-paper">
        <div className="wrap">
          <SectionHeading eyebrow="Sporcularımız" title={<>Kulvarda emek,<br />kürsüde gurur.</>} align="split" lead="Sporcularımız ulusal ve uluslararası yarışlarda Ata Yüzme Spor Kulübü’nü temsil ediyor." action={<ArrowLink to="/galeri">Galeriyi görüntüleyin</ArrowLink>} />
          <div className="mosaic reveal">
            <Img name="takim-madalya" alt="Madalyalı sporcular ve antrenörleri kulüp bayrağıyla" className="m1" sizes="(max-width: 800px) 100vw, 50vw" />
            <Img name="podyum-yurtdisi" alt="Uluslararası yarışta kürsüde sporcularımız" className="m2" sizes="(max-width: 800px) 50vw, 25vw" />
            <Img name="kurs-podyum" alt="Kürsüde Ata Yüzme sporcuları" className="m3" sizes="(max-width: 800px) 50vw, 25vw" />
            <Img name="hero-kelebek" alt="Kelebek stilinde yüzen genç sporcu" className="m4" sizes="(max-width: 800px) 50vw, 25vw" />
            <Img name="takim-2010" alt="Ata Yüzme takımı" className="m5" sizes="(max-width: 800px) 50vw, 25vw" />
          </div>
        </div>
      </section>

      {/* SSS önizleme */}
      <section className="section">
        <div className="wrap faq-preview">
          <div className="reveal">
            <Eyebrow>Sıkça sorulan sorular</Eyebrow>
            <h2 className="display-2">Başlamadan önce merak edilenler.</h2>
            <p className="lead">Programlar, kayıt süreci ve tesis hakkında en çok sorulan soruları derledik.</p>
            <ArrowLink to="/sss">Tüm soruları görüntüleyin</ArrowLink>
          </div>
          <dl className="faq-cards">
            {previewFaqs.map((f) => (
              <div key={f.q} className="faq-card reveal">
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
