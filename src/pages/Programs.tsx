import { Link } from 'react-router-dom';
import { pathway, programs } from '../data/site';
import { CtaBand, Eyebrow, Icon, Img, PageHero, usePageMeta } from '../components/ui';

export default function Programs() {
  usePageMeta('Programlar', 'Minik, çocuk ve yetişkin yüzme kursları; özel yüzme dersleri, performans yüzme ve sağlık amaçlı yüzme programları.');
  return (
    <>
      <PageHero
        eyebrow="Eğitim programları"
        title={<>Her yaşa, her seviyeye<br />uygun bir başlangıç.</>}
        lead="Programlarımız yaş, yüzme seviyesi ve hedef esas alınarak planlanır. Size en uygun programı karşılaştırın veya eğitim koordinatörümüzle birlikte belirleyin."
        image="hero-serbest"
        alt="Serbest stilde nefes alan Ata Yüzme sporcusu"
        position="50% 40%"
        crumbs={[{ label: 'Programlar' }]}
      />

      <section className="section">
        <div className="wrap">
          <div className="program-rows">
            {programs.map((p, i) => (
              <article key={p.slug} className={'program-row reveal' + (i % 2 ? ' is-reverse' : '')}>
                <Link to={`/programlar/${p.slug}`} className="program-row-media" tabIndex={-1} aria-hidden="true">
                  <Img name={p.image} alt="" sizes="(max-width: 800px) 100vw, 50vw" />
                </Link>
                <div className="program-row-body">
                  <span className="program-row-num">0{i + 1} / 0{programs.length}</span>
                  <Eyebrow>{p.tagline}</Eyebrow>
                  <h2 className="display-3">
                    <Link to={`/programlar/${p.slug}`}>{p.name}</Link>
                  </h2>
                  <p className="lead">{p.summary}</p>
                  <dl className="program-row-facts">
                    {p.facts.slice(0, 3).map((f) => (
                      <div key={f.label}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link className="btn btn-primary" to={`/programlar/${p.slug}`}>
                    Program detayları <Icon name="arrow" size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="compare reveal">
            <div className="compare-head">
              <Eyebrow>Hızlı karşılaştırma</Eyebrow>
              <h2 className="display-3">Programlara bir bakışta.</h2>
            </div>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="Program karşılaştırma tablosu">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Program</th>
                    <th scope="col">Kimler için</th>
                    <th scope="col">Öne çıkan</th>
                    <th scope="col"><span className="sr-only">Bağlantı</span></th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p) => (
                    <tr key={p.slug}>
                      <th scope="row">{p.name}</th>
                      <td>{p.audience}</td>
                      <td>{p.tagline}</td>
                      <td>
                        <Link to={`/programlar/${p.slug}`} aria-label={`${p.name} detayları`}>
                          <Icon name="arrow" size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="pathway-light reveal">
            <div>
              <Eyebrow>Gelişim modeli</Eyebrow>
              <h2 className="display-3">Üç aşamalı eğitim sistemi</h2>
            </div>
            <ol>
              {pathway.map((s) => (
                <li key={s.step}>
                  <span>{s.step}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
