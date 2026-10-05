import { contentText } from '../content/store';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { brand, faqGroups, pathway, programs, stats, values } from '../data/site';
import { ArrowLink, CtaBand, Eyebrow, Icon, type IconName, Img, SectionHeading, usePageMeta } from '../components/ui';

const slides = [
  { image: 'hero-sirtustu', alt: contentText('text_7619e2dae55fc95f', "Ata Yüzme sporcusu kulvarda sırtüstü yüzüyor"), position: '70% 40%' },
  { image: 'performans-cikis-3', alt: contentText('text_88b2938fa3510503', "Yakacık Yüzme Havuzu’nda çıkış bloğunda start pozisyonundaki sporcu"), position: '60% 50%' },
  { image: 'cocuk-mutlu', alt: contentText('text_fd5172987ff63738', "Ata boneli çocuklar havuzda eğitim sırasında"), position: '50% 40%' },
];

const valueIcons: IconName[] = ['shield', 'book', 'award', 'users', 'layers', 'eye'];

/* Görünür olduğunda baştaki sayıyı sıfırdan sayar ("3+" → 0…3 + "+") */
function CountUp({ value }: { value: string }) {
  const [, target = '', suffix = value] = value.match(/^(\d+)(.*)$/) ?? [];
  const [n, setN] = useState(target ? 0 : null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !target) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(Number(target));
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round(Number(target) * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{n ?? ''}{suffix}</span>
    </span>
  );
}

function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % slides.length), 6500);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section className="home-hero" aria-label={contentText('text_c64ad07ada02fc4b', "Tanıtım")}>
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
          <Eyebrow light>{contentText('text_0bb4f2ffbbcc123c', "Yakacık Yüzme Havuzu · Kartal")}</Eyebrow>
          <h1 className="display-hero">
            <span className="line"><span>{contentText('text_eb0df6b007fc6357', "Her yaşta,")}</span></span>
            <span className="line"><span><em>{contentText('text_296afbfbd5117dd5', "bilimsel")}</em> {contentText('text_ce8581195117f2ba', "yüzme eğitimi.")}</span></span>
          </h1>
          <p>{contentText('text_669a91b60f08ad95', "Türkiye Yüzme Federasyonu’na bağlı Ata Yüzme Spor Kulübü; minik yaştan yetişkinliğe, ilk kulaçtan lisanslı sporculuğa uzanan bir eğitim yolculuğu sunar.")}</p>
          <div className="btn-row">
            <Link className="btn btn-light" to="/programlar">
              {contentText('text_653f0b279139a098', "Programları İnceleyin")}<Icon name="arrow" size={18} />
            </Link>
            <Link className="btn btn-ghost-light" to="/kayit">
              {contentText('text_29ebe50bc9feb9c7', "Kayıt Süreci")}</Link>
          </div>
        </div>
        <div className="home-hero-dots" role="tablist" aria-label={contentText('text_d5384a6b10231bb4', "Görsel seçimi")}>
          {slides.map((s, i) => (
            <button key={s.image} role="tab" aria-selected={i === active} aria-label={`${i + 1}. görsel`} className={i === active ? 'is-active' : undefined} onClick={() => setActive(i)}>
              <span>{"0"}{i + 1}</span>
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
  usePageMeta('', contentText('text_5b619357d7b0460a', "Kartal Yakacık’ta Türkiye Yüzme Federasyonu’na bağlı Ata Yüzme Spor Kulübü: minik, çocuk ve yetişkin yüzme kursları, özel dersler ve performans yüzme."));
  const previewFaqs = faqGroups.flatMap((g) => g.items).filter((_, i) => [0, 1, 4, 8].includes(i));

  return (
    <>
      <Hero />

      {/* Kurumsal tanıtım */}
      <section className="section">
        <div className="wrap intro-grid">
          <div className="intro-media reveal">
            <Img name="takim-bayrak" alt={contentText('text_2623764020a4b295', "Madalyalı Ata Yüzme sporcuları kulüp bayrağıyla")} className="intro-main" sizes="(max-width: 800px) 100vw, 45vw" />
            <div className="intro-badge">
              <strong>{contentText('text_343a763e16e3aece', "TYF")}</strong>
              <span>{contentText('text_92e654fd519d3b3f', "Türkiye Yüzme Federasyonu’na bağlı akredite kulüp")}</span>
            </div>
          </div>
          <div className="intro-copy reveal">
            <Eyebrow>{contentText('text_4880b93c7b77b50a', "Kurumsal")}</Eyebrow>
            <h2 className="display-2">{contentText('text_d2b2717cd9963480', "Bir yüzme kursundan çok daha fazlası.")}</h2>
            <p className="lead">{contentText('text_afa304408b778368', "Ata Yüzme Spor Kulübü, her yaş grubuna bilimsel yüzme eğitimi sunan, sporcu yetiştiren ve ulusal–uluslararası yarışlarda yer alan bir spor kulübüdür.")}</p>
            <p>{contentText('text_6486d0e8bdf5c455', "Yakacık Yüzme Havuzu’ndaki eğitimlerimizde amacımız yalnızca yüzmeyi öğretmek değil; suda güven, disiplin ve sporcu karakteri kazandırmaktır. Her öğrencimiz, seviyesine uygun grupta ve uzman eğitmenlerin yakın takibinde ilerler.")}</p>
            <blockquote className="intro-quote">
              {"“"}{brand.slogan}{"”"}<cite>{contentText('text_77466ebad986f618', "Ata Yüzme Spor Kulübü")}</cite>
            </blockquote>
            <ArrowLink to="/kurumsal">{contentText('text_1d24b6be9198b123', "Kulübümüzü tanıyın")}</ArrowLink>
          </div>
        </div>
      </section>

      {/* Rakamlar */}
      <section className="stats-band" aria-label={contentText('text_e7529857a64a4da8', "Kısaca kulübümüz")}>
        <div className="wrap stats-grid">
          {stats.map((s) => (
            <div className="stat reveal" key={s.label}>
              <strong><CountUp value={s.value} /></strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Programlar */}
      <section className="section section-paper">
        <div className="wrap">
          <SectionHeading eyebrow={contentText('text_f3ee63c0b64470f4', "Eğitim programları")} title={<>{contentText('text_df2b0ec04f015fe0', "Her yaşa ve her hedefe")}<br />{contentText('text_1449ff4b5d0e926c', "uygun bir program.")}</>} align="split" lead={contentText('text_d660d3a59cc9cd8c', "Suyla ilk kez tanışan minik öğrencilerden lisanslı sporculara kadar; her programımız yaş, seviye ve hedef esas alınarak planlanır.")} />
          <div className="program-grid">
            {programs.map((p, i) => (
              <Link key={p.slug} to={`/programlar/${p.slug}`} className={'program-card reveal' + (i < 2 ? ' is-large' : '')}>
                <div className="program-card-media">
                  <Img name={p.image} alt={p.alt} sizes={i < 2 ? '(max-width: 800px) 100vw, 50vw' : '(max-width: 800px) 100vw, 33vw'} />
                  <span className="program-card-tag">{p.audience}</span>
                </div>
                <div className="program-card-body">
                  <span className="program-card-num">{"0"}{i + 1}</span>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <span className="program-card-more">
                    {contentText('text_f5deccf9f566b8f6', "Programı inceleyin")}<Icon name="arrow" size={16} />
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
          <SectionHeading light eyebrow={contentText('text_98fa99ea003caec4', "Gelişim yolu")} title={<>{contentText('text_f85fd56bdd0bcae8', "İlk kulaçtan")}<br />{contentText('text_1f50ad1e3a81bb16', "kürsüye.")}</>} align="split" lead={contentText('text_11d3bf840b74a394', "Öğrencilerimiz üç aşamalı bir gelişim modeliyle ilerler. Kurslardan mezun olan öğrenciler, antrenör gözlemiyle performans takımına geçebilir.")} />
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
            <ArrowLink light to="/programlar/performans-yuzme">{contentText('text_d5b155da5b72e3e5', "Performans yüzme programı")}</ArrowLink>
          </div>
        </div>
      </section>

      {/* Neden biz */}
      <section className="section">
        <div className="wrap why-grid">
          <div className="why-intro reveal">
            <Eyebrow>{contentText('text_193e3592bc436941', "Neden Ata Yüzme?")}</Eyebrow>
            <h2 className="display-2">{contentText('text_6435becf090db6bc', "Güvenle emanet edebileceğiniz bir eğitim anlayışı.")}</h2>
            <p className="lead">{contentText('text_a023332f19b6b9cc', "Eğitimin niteliği; eğitmen kadrosu, grup büyüklüğü ve sistemli bir gelişim planıyla belirlenir.")}</p>
            <div className="why-photo">
              <Img name="antrenor-blok" alt={contentText('text_629ed63d49e3b689', "Ata Yüzme eğitmeni çıkış bloğunda teknik gösteriyor")} sizes="(max-width: 800px) 100vw, 35vw" />
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
          <SectionHeading eyebrow={contentText('text_3718ff8766bca6eb', "Sporcularımız")} title={<>{contentText('text_e6fd0a9f85f62e17', "Kulvarda emek,")}<br />{contentText('text_ddbf9cbf2766da18', "kürsüde gurur.")}</>} align="split" lead={contentText('text_511af3e39f00e827', "Sporcularımız ulusal ve uluslararası yarışlarda Ata Yüzme Spor Kulübü’nü temsil ediyor.")} action={<ArrowLink to="/galeri">{contentText('text_678b28e6c1d767ec', "Galeriyi görüntüleyin")}</ArrowLink>} />
          <div className="mosaic reveal">
            <Img name="takim-madalya" alt={contentText('text_c52fe7383dd0966c', "Madalyalı sporcular ve antrenörleri kulüp bayrağıyla")} className="m1" sizes="(max-width: 800px) 100vw, 50vw" />
            <Img name="podyum-yurtdisi" alt={contentText('text_50c02e6c7132a45c', "Uluslararası yarışta kürsüde sporcularımız")} className="m2" sizes="(max-width: 800px) 50vw, 25vw" />
            <Img name="kurs-podyum" alt={contentText('text_4fad2a3ffa38a248', "Kürsüde Ata Yüzme sporcuları")} className="m3" sizes="(max-width: 800px) 50vw, 25vw" />
            <Img name="hero-kelebek" alt={contentText('text_24f5fff18d1f3975', "Kelebek stilinde yüzen genç sporcu")} className="m4" sizes="(max-width: 800px) 50vw, 25vw" />
            <Img name="takim-2010" alt={contentText('text_7a613167e3090b2c', "Ata Yüzme takımı")} className="m5" sizes="(max-width: 800px) 50vw, 25vw" />
          </div>
        </div>
      </section>

      {/* SSS önizleme */}
      <section className="section">
        <div className="wrap faq-preview">
          <div className="reveal">
            <Eyebrow>{contentText('text_58f9de626eaa5ee4', "Sıkça sorulan sorular")}</Eyebrow>
            <h2 className="display-2">{contentText('text_e86d95889db6c3f0', "Başlamadan önce merak edilenler.")}</h2>
            <p className="lead">{contentText('text_c489b4ba7323bcff', "Programlar, kayıt süreci ve tesis hakkında en çok sorulan soruları derledik.")}</p>
            <ArrowLink to="/sss">{contentText('text_5d83a058e41d21b1', "Tüm soruları görüntüleyin")}</ArrowLink>
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
