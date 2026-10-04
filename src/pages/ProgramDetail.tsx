import { Link, useParams } from 'react-router-dom';
import { ageStages, brand, programBySlug, programs, whatsapp } from '../data/site';
import { CtaBand, Eyebrow, Icon, Img, PageHero, WhatsAppIcon, usePageMeta } from '../components/ui';
import NotFound from './NotFound';

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = programBySlug(slug);
  usePageMeta(program?.name ?? 'Sayfa bulunamadı', program ? `${program.name} (${program.audience}): ${program.summary}` : '');
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
        crumbs={[{ label: 'Programlar', to: '/programlar' }, { label: program.name }]}
      />

      <section className="section">
        <div className="wrap detail-grid">
          <article className="detail-main">
            <div className="detail-intro reveal">
              {program.intro.map((t, i) => (
                <p key={i} className={i === 0 ? 'lead' : undefined}>{t}</p>
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
                  <span className="detail-block-num">0{i + 1}</span>
                  <div>
                    <h2 id={`block-${i}`} className="display-4">{b.title}</h2>
                    {b.text && <p>{b.text}</p>}
                  </div>
                </div>
                <ul className="check-list">
                  {b.items.map((it) => (
                    <li key={it}><Icon name="check" size={18} /> {it}</li>
                  ))}
                </ul>
              </section>
            ))}

            {program.slug === 'performans-yuzme' && (
              <section className="detail-block reveal" aria-labelledby="stages">
                <div className="detail-block-head">
                  <span className="detail-block-num">0{program.blocks.length + 1}</span>
                  <div>
                    <h2 id="stages" className="display-4">Yaş gruplarına göre gelişim</h2>
                    <p>Antrenman içeriği, sporcunun gelişim dönemine göre planlanır.</p>
                  </div>
                </div>
                <ol className="stage-list">
                  {ageStages.map((s) => (
                    <li key={s.age}>
                      <strong>{s.age}</strong>
                      <div>
                        <h3>{s.title}</h3>
                        <p>{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {program.note && (
              <p className="detail-note reveal">
                <Icon name="shield" size={20} /> {program.note}
              </p>
            )}
          </article>

          <aside className="detail-aside">
            <div className="aside-card">
              <p className="aside-title">Program bilgileri</p>
              <dl>
                {program.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="aside-info">Güncel ders saatleri, kontenjan ve ücret bilgisi için bizimle iletişime geçin.</p>
              <a className="btn btn-primary btn-block" href={whatsapp(message)} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} /> WhatsApp ile bilgi alın
              </a>
              <a className="btn btn-outline btn-block" href={brand.tel}>
                <Icon name="phone" size={18} /> {brand.phone}
              </a>
            </div>
            <nav className="aside-nav" aria-label="Diğer programlar">
              <p className="aside-title">Tüm programlar</p>
              {programs.map((p) => (
                <Link key={p.slug} to={`/programlar/${p.slug}`} aria-current={p === program ? 'page' : undefined}>
                  {p.name}
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
              <Eyebrow>Diğer programlar</Eyebrow>
              <h2 className="display-3">Bunlar da ilginizi çekebilir.</h2>
            </div>
            <Link className="next-program" to={`/programlar/${next.slug}`}>
              <small>Sonraki program</small>
              <span>{next.name} <Icon name="arrow" size={18} /></span>
            </Link>
          </div>
          <div className="related-grid">
            {others.map((p) => (
              <Link key={p.slug} to={`/programlar/${p.slug}`} className="related-card reveal">
                <Img name={p.image} alt="" sizes="(max-width: 800px) 100vw, 33vw" />
                <div>
                  <small>{p.audience}</small>
                  <h3>{p.name}</h3>
                  <span className="program-card-more">İnceleyin <Icon name="arrow" size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`${program.name} için ön kayıt.`} message={message} />
    </>
  );
}
