import { RichText } from '../content/rich';
import { contentText } from '../content/store';
import { Link, useParams } from 'react-router-dom';
import { ageStages, brand, programBySlug, programs, whatsapp } from '../data/site';
import { CtaBand, Eyebrow, Icon, Img, PageHero, WhatsAppIcon, usePageMeta } from '../components/ui';
import NotFound from './NotFound';

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = programBySlug(slug);
  usePageMeta(program?.name ?? contentText('text_54862c4b8a11fca6', "Sayfa bulunamadı"), program ? `${program.name} (${program.audience}): ${program.summary}` : '');
  if (!program) return <NotFound />;

  const index = programs.indexOf(program);
  const others = programs.filter((p) => p !== program).slice(0, 3);
  const next = programs[(index + 1) % programs.length];
  const message = `Merhaba, ${program.name} hakkında bilgi almak istiyorum.`;

  return (
    <>
      <PageHero
        eyebrow={`${program.audience} · ${program.tagline}`}
        title={program.name}
        lead={program.summary}
        image={program.image}
        alt={program.alt}
        crumbs={[{ label: contentText('text_8ec2bb837a16ca7a', "Programlar"), to: '/programlar' }, { label: program.name }]}
      />

      <section className="section">
        <div className="wrap detail-grid">
          <article className="detail-main">
            <div className="detail-intro reveal">
              {program.intro.map((t, i) => (
                <p key={i} className={i === 0 ? 'lead' : undefined}><RichText value={t}/></p>
              ))}
            </div>

            <div className="detail-photos reveal">
              {program.gallery.map((g) => (
                <Img key={g.image} name={g.image} alt={g.alt} sizes="(max-width: 800px) 100vw, 30vw" />
              ))}
            </div>

            {program.blocks.map((b, i) => (
              <section key={b.title} className="detail-block reveal" aria-labelledby={`block-${i}`}>
                <div className="detail-block-head">
                  <span className="detail-block-num">{"0"}{i + 1}</span>
                  <div>
                    <h2 id={`block-${i}`} className="display-4"><RichText value={b.title}/></h2>
                    {b.text && <p><RichText value={b.text}/></p>}
                  </div>
                </div>
                <ul className="check-list">
                  {b.items.map((it) => (
                    <li key={it}><Icon name="check" size={18} /> <RichText value={it}/></li>
                  ))}
                </ul>
              </section>
            ))}

            {program.slug === 'performans-yuzme' && (
              <section className="detail-block reveal" aria-labelledby="stages">
                <div className="detail-block-head">
                  <span className="detail-block-num">{"0"}{program.blocks.length + 1}</span>
                  <div>
                    <h2 id="stages" className="display-4"><RichText value={contentText('text_f70fcdede05a585e', "Yaş gruplarına göre gelişim")}/></h2>
                    <p><RichText value={contentText('text_5c8631570a152fb2', "Antrenman içeriği, sporcunun gelişim dönemine göre planlanır.")}/></p>
                  </div>
                </div>
                <ol className="stage-list">
                  {ageStages.map((s) => (
                    <li key={s.age}>
                      <strong>{s.age}</strong>
                      <div>
                        <h3><RichText value={s.title}/></h3>
                        <p><RichText value={s.text}/></p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {program.note && (
              <p className="detail-note reveal">
                <Icon name="shield" size={20} /> <RichText value={program.note}/>
              </p>
            )}
          </article>

          <aside className="detail-aside">
            <div className="aside-card">
              <p className="aside-title"><RichText value={contentText('text_00e02e01b886aef9', "Program bilgileri")}/></p>
              <dl>
                {program.facts.map((f) => (
                  <div key={f.label}>
                    <dt><RichText value={f.label}/></dt>
                    <dd><RichText value={f.value}/></dd>
                  </div>
                ))}
              </dl>
              <p className="aside-info"><RichText value={contentText('text_7516e83c6a255d72', "Güncel ders saatleri, kontenjan ve ücret bilgisi için bizimle iletişime geçin.")}/></p>
              <a className="btn btn-primary btn-block" href={whatsapp(message)} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} /> <RichText value={contentText('text_ee3eade43f6fd49e', "WhatsApp ile bilgi alın")}/></a>
              <a className="btn btn-outline btn-block" href={brand.tel}>
                <Icon name="phone" size={18} /> {brand.phone}
              </a>
            </div>
            <nav className="aside-nav" aria-label={contentText('text_8e3bf5c396eebd37', "Diğer programlar")}>
              <p className="aside-title"><RichText value={contentText('text_435c173f3ea49634', "Tüm programlar")}/></p>
              {programs.map((p) => (
                <Link key={p.slug} to={`/programlar/${p.slug}`} aria-current={p === program ? 'page' : undefined}>
                  <RichText value={p.name}/>
                  <Icon name="arrow" size={16} />
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="related-head reveal">
            <div>
              <Eyebrow><RichText value={contentText('text_8e3bf5c396eebd37', "Diğer programlar")}/></Eyebrow>
              <h2 className="display-3"><RichText value={contentText('text_c647ef7d71e9ea4c', "Bunlar da ilginizi çekebilir.")}/></h2>
            </div>
            <Link className="next-program" to={`/programlar/${next.slug}`}>
              <small><RichText value={contentText('text_71127019b04d6e3b', "Sonraki program")}/></small>
              <span><RichText value={next.name}/> <Icon name="arrow" size={18} /></span>
            </Link>
          </div>
          <div className="related-grid">
            {others.map((p) => (
              <Link key={p.slug} to={`/programlar/${p.slug}`} className="related-card reveal">
                <Img name={p.image} alt="" sizes="(max-width: 800px) 100vw, 33vw" />
                <div>
                  <small><RichText value={p.audience}/></small>
                  <h3><RichText value={p.name}/></h3>
                  <span className="program-card-more"><RichText value={contentText('text_1b520bae31c1ae17', "İnceleyin")}/><Icon name="arrow" size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={program.name + contentText('text_43f43a72f9d710ef', " için ön kayıt.")} message={message} />
    </>
  );
}
