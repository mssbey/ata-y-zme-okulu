import { useCallback, useEffect, useRef, useState } from 'react';
import { gallery } from '../data/site';
import { CtaBand, Icon, Img, PageHero, usePageMeta, useReveal } from '../components/ui';

const cats = ['Tümü', 'Eğitim', 'Sporcularımız', 'Tesis'] as const;
type Cat = (typeof cats)[number];

export default function Gallery() {
  usePageMeta('Galeri', 'Ata Yüzme Spor Kulübü eğitimlerinden, yarışlarından ve Yakacık Yüzme Havuzu’ndan fotoğraflar.');
  const [cat, setCat] = useState<Cat>('Tümü');
  const [current, setCurrent] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const items = cat === 'Tümü' ? gallery : gallery.filter((g) => g.cat === cat);
  useReveal([cat]);

  const open = (i: number, el: HTMLElement) => {
    opener.current = el;
    setCurrent(i);
    dialog.current?.showModal();
  };
  const close = () => {
    dialog.current?.close();
  };
  const step = useCallback((d: number) => setCurrent((c) => (c === null ? c : (c + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      setCurrent(null);
      opener.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (!el.open) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    el.addEventListener('close', onClose);
    document.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('close', onClose);
      document.removeEventListener('keydown', onKey);
    };
  }, [step]);

  const item = current !== null ? items[current] : null;

  return (
    <>
      <PageHero
        eyebrow="Galeri"
        title={<>Kulvardan<br />kareler.</>}
        lead="Eğitimlerimizden, yarışlardan ve Yakacık Yüzme Havuzu’ndan seçilmiş fotoğraflar."
        image="hero-kelebek"
        alt="Kelebek stilinde yüzen genç sporcu"
        position="50% 45%"
        crumbs={[{ label: 'Galeri' }]}
      />

      <section className="section">
        <div className="wrap">
          <div className="filter-bar" role="toolbar" aria-label="Galeri filtresi">
            {cats.map((c) => (
              <button key={c} className={c === cat ? 'is-active' : undefined} aria-pressed={c === cat} onClick={() => setCat(c)}>
                {c}
                <span>{c === 'Tümü' ? gallery.length : gallery.filter((g) => g.cat === c).length}</span>
              </button>
            ))}
          </div>
          <ul className="masonry">
            {items.map((g, i) => (
              <li key={g.image} className="reveal">
                <button className="masonry-item" onClick={(e) => open(i, e.currentTarget)} aria-label={`${g.alt} — büyüt`}>
                  <Img name={g.image} alt={g.alt} sizes="(max-width: 540px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  <span className="masonry-overlay">
                    <small>{g.cat}</small>
                    <Icon name="expand" size={20} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <dialog ref={dialog} className="lightbox" aria-label="Fotoğraf görüntüleyici" onClick={(e) => e.target === dialog.current && close()}>
        {item && (
          <>
            <figure>
              <img src={`/img/${item.image}.webp`} alt={item.alt} />
              <figcaption>
                <span>{item.alt}</span>
                <span>{(current ?? 0) + 1} / {items.length}</span>
              </figcaption>
            </figure>
            <button className="lightbox-btn lightbox-prev" onClick={() => step(-1)} aria-label="Önceki fotoğraf"><Icon name="left" size={26} /></button>
            <button className="lightbox-btn lightbox-next" onClick={() => step(1)} aria-label="Sonraki fotoğraf"><Icon name="right" size={26} /></button>
            <button className="lightbox-btn lightbox-close" onClick={close} aria-label="Kapat"><Icon name="close" size={24} /></button>
          </>
        )}
      </dialog>

      <CtaBand />
    </>
  );
}
