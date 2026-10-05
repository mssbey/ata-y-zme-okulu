import { contentText } from '../content/store';
import { Link } from 'react-router-dom';
import { pathway, programs } from '../data/site';
import { CtaBand, Eyebrow, Icon, Img, PageHero, usePageMeta } from '../components/ui';

export default function Programs() {
  usePageMeta(contentText('text_8ec2bb837a16ca7a', "Programlar"), contentText('text_5ba48599b2489cd8', "Minik, çocuk ve yetişkin yüzme kursları; özel yüzme dersleri, performans yüzme ve sağlık amaçlı yüzme programları."));
  return (
    <>
      <PageHero
        eyebrow={contentText('text_f3ee63c0b64470f4', "Eğitim programları")}
        title={<>{contentText('text_4a6419617a9ef874', "Her yaşa, her seviyeye")}<br />{contentText('text_f682a6a4c9ca1418', "uygun bir başlangıç.")}</>}
        lead={contentText('text_0bbc403168110e32', "Programlarımız yaş, yüzme seviyesi ve hedef esas alınarak planlanır. Size en uygun programı karşılaştırın veya eğitim koordinatörümüzle birlikte belirleyin.")}
        image="hero-serbest"
        alt={contentText('text_4674fdda06d5ea08', "Serbest stilde nefes alan Ata Yüzme sporcusu")}
        position="50% 40%"
        crumbs={[{ label: contentText('text_8ec2bb837a16ca7a', "Programlar") }]}
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
                  <span className="program-row-num">{"0"}{i + 1} {contentText('text_79ff6fc4e26d8d6b', "/ 0")}{programs.length}</span>
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
                    {contentText('text_92741d0791ec3af1', "Program detayları")}<Icon name="arrow" size={18} />
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
              <Eyebrow>{contentText('text_85e7cfe4737a637b', "Hızlı karşılaştırma")}</Eyebrow>
              <h2 className="display-3">{contentText('text_28e2a9f7c6a4dbc1', "Programlara bir bakışta.")}</h2>
            </div>
            <div className="table-scroll" tabIndex={0} role="region" aria-label={contentText('text_13560607007d9d1f', "Program karşılaştırma tablosu")}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">{contentText('text_90920d93e2c7e632', "Program")}</th>
                    <th scope="col">{contentText('text_2cb0ae387c17b934', "Kimler için")}</th>
                    <th scope="col">{contentText('text_a8ee2b2b5c9a1c4e', "Öne çıkan")}</th>
                    <th scope="col"><span className="sr-only">{contentText('text_7916c8f0474be4f0', "Bağlantı")}</span></th>
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
              <Eyebrow>{contentText('text_e2d10268af6efd0a', "Gelişim modeli")}</Eyebrow>
              <h2 className="display-3">{contentText('text_bea2041f5137834b', "Üç aşamalı eğitim sistemi")}</h2>
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
