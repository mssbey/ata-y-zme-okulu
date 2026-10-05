import { imageUrl } from '../content/store';
import { contentText } from '../content/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { gallery } from '../data/site';
import { CtaBand, Icon, Img, PageHero, usePageMeta, useReveal } from '../components/ui';

const cats = [contentText('text_f43a65ad826800a3', "Tümü"), contentText('text_2aa71916f93cb8e4', "Eğitim"), contentText('text_3718ff8766bca6eb', "Sporcularımız"), contentText('text_b1f97931adf9e1cb', "Tesis")] as const;
type Cat = (typeof cats)[number];

export default function Gallery() {
  usePageMeta(contentText('text_41533b6d0d098341', "Galeri"), contentText('text_13eb4d3b2591e1ea', "Ata Yüzme Spor Kulübü eğitimlerinden, yarışlarından ve Yakacık Yüzme Havuzu’ndan fotoğraflar."));
  const [cat, setCat] = useState<Cat>(contentText('text_f43a65ad826800a3', "Tümü"));
  const [current, setCurrent] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const items = cat === contentText('text_f43a65ad826800a3', "Tümü") ? gallery : gallery.filter((g) => g.cat === cat);
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
        eyebrow={contentText('text_41533b6d0d098341', "Galeri")}
        title={<>{contentText('text_df2ff9b86f7dbfd1', "Kulvardan")}<br />{contentText('text_421cfe119291b9d5', "kareler.")}</>}
        lead={contentText('text_793c3460e10bcfda', "Eğitimlerimizden, yarışlardan ve Yakacık Yüzme Havuzu’ndan seçilmiş fotoğraflar.")}
        image="hero-kelebek"
        alt={contentText('text_24f5fff18d1f3975', "Kelebek stilinde yüzen genç sporcu")}
        position="50% 45%"
        crumbs={[{ label: contentText('text_41533b6d0d098341', "Galeri") }]}
      />

      <section className="section">
        <div className="wrap">
          <div className="filter-bar" role="toolbar" aria-label={contentText('text_1616d676294acf13', "Galeri filtresi")}>
            {cats.map((c) => (
              <button key={c} className={c === cat ? 'is-active' : undefined} aria-pressed={c === cat} onClick={() => setCat(c)}>
                {c}
                <span>{c === contentText('text_f43a65ad826800a3', "Tümü") ? gallery.length : gallery.filter((g) => g.cat === c).length}</span>
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

      <dialog ref={dialog} className="lightbox" aria-label={contentText('text_530caa8946e3fdd9', "Fotoğraf görüntüleyici")} onClick={(e) => e.target === dialog.current && close()}>
        {item && (
          <>
            <figure>
              <img src={imageUrl(item.image)} alt={item.alt} />
              <figcaption>
                <span>{item.alt}</span>
                <span>{(current ?? 0) + 1} {"/"}{items.length}</span>
              </figcaption>
            </figure>
            <button className="lightbox-btn lightbox-prev" onClick={() => step(-1)} aria-label={contentText('text_d4da46a637694e1a', "Önceki fotoğraf")}><Icon name="left" size={26} /></button>
            <button className="lightbox-btn lightbox-next" onClick={() => step(1)} aria-label={contentText('text_5c88ebc536a2ba71', "Sonraki fotoğraf")}><Icon name="right" size={26} /></button>
            <button className="lightbox-btn lightbox-close" onClick={close} aria-label={contentText('text_7b31a9fc4816824b', "Kapat")}><Icon name="close" size={24} /></button>
          </>
        )}
      </dialog>

      <CtaBand />
    </>
  );
}
