import { imageUrl, imageOverride } from '../content/store';
import { contentText } from '../content/store';
import { useEffect, type ReactNode, type SVGProps } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { imageSizes } from '../data/images';
import { brand, whatsapp } from '../data/site';

/* ---------- İkonlar ---------- */
const paths = {
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12.2a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  arrowUpRight: 'M7 17 17 7M8 7h9v9',
  chevron: 'm6 9 6 6 6-6',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  shield: 'M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6z M9 12l2 2 4-4',
  users: 'M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.15a3.5 3.5 0 0 1 0 6.7',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 14 7 21l5-3 5 3-1.5-7',
  wave: 'M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M14 4l-3 6 4 1.5',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7',
  layers: 'm12 3 9 5-9 5-9-5zM3 13l9 5 9-5',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  left: 'm15 6-6 6 6 6',
  right: 'm9 6 6 6-6 6',
} as const;
export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      <path d={paths[name]} />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3z" />
    </svg>
  );
}

/* ---------- Görsel ---------- */
type ImgProps = { name: string; alt: string; className?: string; sizes?: string; priority?: boolean; position?: string };
export function Img({ name, alt, className, sizes = '(max-width: 800px) 100vw, 50vw', priority, position }: ImgProps) {
  const [w, h] = imageSizes[name] ?? [1600, 1000];
  return (
    <img
      className={className}
      src={imageUrl(name)}
      srcSet={imageOverride(name) ? undefined : `/img/sm/${name}.webp 760w, /img/${name}.webp ${w}w`}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

/* ---------- Tipografi ---------- */
export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={'eyebrow' + (light ? ' eyebrow-light' : '')}>{children}</p>;
}

export function SectionHeading({ eyebrow, title, lead, light, align = 'left', action }: { eyebrow: string; title: ReactNode; lead?: ReactNode; light?: boolean; align?: 'left' | 'center' | 'split'; action?: ReactNode }) {
  return (
    <div className={`section-heading reveal is-${align}`}>
      <div>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2 className="display-2">{title}</h2>
      </div>
      {(lead || action) && (
        <div className="section-heading-side">
          {lead && <p className="lead">{lead}</p>}
          {action}
        </div>
      )}
    </div>
  );
}

export function ArrowLink({ to, children, light }: { to: string; children: ReactNode; light?: boolean }) {
  return (
    <Link className={'arrow-link' + (light ? ' is-light' : '')} to={to}>
      <span>{children}</span>
      <Icon name="arrow" size={18} />
    </Link>
  );
}

/* ---------- İç sayfa başlığı ---------- */
export function PageHero({ eyebrow, title, lead, image, alt, crumbs, position }: { eyebrow: string; title: ReactNode; lead?: ReactNode; image: string; alt: string; crumbs: { label: string; to?: string }[]; position?: string }) {
  return (
    <section className="page-hero">
      <Img name={image} alt={alt} className="page-hero-img" sizes="100vw" priority position={position} />
      <div className="page-hero-shade" />
      <div className="wrap page-hero-inner">
        <nav className="breadcrumbs" aria-label={contentText('text_8e43e283e33a0c1c', "Sayfa konumu")}>
          <ol>
            <li><Link to="/">{contentText('text_dcd2f7f89bdc791d', "Ana Sayfa")}</Link></li>
            {crumbs.map((c) => (
              <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        </nav>
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="display-1">{title}</h1>
        {lead && <p className="page-hero-lead">{lead}</p>}
      </div>
    </section>
  );
}

/* ---------- Kapanış çağrısı ---------- */
export function CtaBand({ title = contentText('text_52ef5a4de13e5d6b', "Size uygun programı birlikte belirleyelim."), text = contentText('text_cec36ae65fd5536e', "Yaş, seviye ve hedefinizi paylaşın; eğitim koordinatörümüz güncel grup ve ders seçenekleriyle size dönüş yapsın."), message }: { title?: string; text?: string; message?: string }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-band-inner reveal">
        <div>
          <Eyebrow light>{contentText('text_8b800e27d040867c', "Ön kayıt ve bilgi")}</Eyebrow>
          <h2 className="display-2">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band-actions">
          <a className="btn btn-light" href={whatsapp(message)} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} /> {contentText('text_b9077824e99b6f85', "WhatsApp ile yazın")}</a>
          <a className="btn btn-ghost-light" href={brand.tel}>
            <Icon name="phone" size={18} /> {brand.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sayfa başlığı / açıklaması ---------- */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${brand.name}` : `${brand.name} | ${brand.facility}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:site_name"]')?.setAttribute('content', brand.name);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    const schema = document.querySelector('script[type="application/ld+json"]');
    if (schema) { try { const data=JSON.parse(schema.textContent??'{}');Object.assign(data,{name:brand.name,alternateName:brand.facility,telephone:brand.tel.replace('tel:',''),email:brand.email,logo:imageUrl('/assets/ata-logo.svg')});data.address.streetAddress=brand.street;data.address.addressLocality=brand.city;schema.textContent=JSON.stringify(data); } catch { /* Keep existing metadata if no club schema exists. */ } }
  }, [title, description]);
}

/* ---------- Görünür olunca beliren öğeler ---------- */
export function useReveal(deps: unknown[] = []) {
  const { pathname } = useLocation();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        // Aynı anda görünen öğeler sırayla belirsin
        let order = 0;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.setProperty('--reveal-delay', `${Math.min(order++, 5) * 90}ms`);
            el.classList.add('is-visible');
            // Gecikme sonraki hover geçişlerini yavaşlatmasın
            window.setTimeout(() => el.style.removeProperty('--reveal-delay'), 1600);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, ...deps]);
}
