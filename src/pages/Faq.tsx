import { useId, useMemo, useState } from 'react';
import { faqGroups, whatsapp } from '../data/site';
import { CtaBand, Icon, PageHero, WhatsAppIcon, usePageMeta, useReveal } from '../components/ui';

const normalize = (s: string) => s.toLocaleLowerCase('tr-TR');

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className={'accordion-item' + (open ? ' is-open' : '')}>
      <h3>
        <button aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={onToggle}>
          <span>{q}</span>
          <span className="accordion-icon"><Icon name={open ? 'minus' : 'plus'} size={18} /></span>
        </button>
      </h3>
      <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  usePageMeta('Sıkça Sorulan Sorular', 'Yüzme kursları, kayıt süreci, ders düzeni ve tesis hakkında sıkça sorulan sorular.');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(faqGroups[0].items[0].q);
  const groups = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return faqGroups;
    return faqGroups.map((g) => ({ ...g, items: g.items.filter((f) => normalize(f.q + ' ' + f.a).includes(q)) })).filter((g) => g.items.length);
  }, [query]);
  useReveal([query]);

  return (
    <>
      <PageHero
        eyebrow="Sıkça sorulan sorular"
        title={<>Aklınızdaki<br />sorular.</>}
        lead="Programlar, eğitim süreci, kayıt ve tesis hakkında en çok merak edilenleri derledik."
        image="cocuk-kenar"
        alt="Yüzme tahtalarıyla havuz kenarında çalışan çocuklar"
        position="50% 40%"
        crumbs={[{ label: 'S.S.S.' }]}
      />

      <section className="section">
        <div className="wrap faq-layout">
          <aside className="faq-aside">
            <label className="search">
              <span className="sr-only">Sorularda ara</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input type="search" placeholder="Sorularda ara…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <nav aria-label="Soru kategorileri">
              {faqGroups.map((g, i) => (
                <a key={g.title} href={`#kategori-${i}`}>{g.title}</a>
              ))}
            </nav>
            <div className="faq-help">
              <p><strong>Sorunuzu bulamadınız mı?</strong> Eğitim koordinatörümüz size yardımcı olsun.</p>
              <a className="btn btn-primary btn-block" href={whatsapp('Merhaba, bir sorum var.')} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} /> Bize sorun
              </a>
            </div>
          </aside>
          <div className="faq-groups">
            {groups.length === 0 && <p className="empty">“{query}” için sonuç bulunamadı.</p>}
            {groups.map((g) => {
              const idx = faqGroups.findIndex((x) => x.title === g.title);
              return (
                <section key={g.title} id={`kategori-${idx}`} className="faq-group reveal" aria-labelledby={`kat-${idx}`}>
                  <h2 id={`kat-${idx}`} className="display-4"><span>0{idx + 1}</span>{g.title}</h2>
                  {g.items.map((f) => (
                    <Item key={f.q} q={f.q} a={f.a} open={open === f.q || !!query.trim()} onToggle={() => setOpen(open === f.q ? null : f.q)} />
                  ))}
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
