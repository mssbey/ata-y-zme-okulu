import { imageUrl } from '../content/store';
import { contentText } from '../content/store';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { brand, mapsLink, nav, programs, whatsapp } from '../data/site';
import { Icon, Img, WhatsAppIcon, useReveal } from './ui';

function Logo({ light }: { light?: boolean }) {
  return (
    <Link className="logo" to="/" aria-label={`${brand.name} — ana sayfa`}>
      <img src={imageUrl(light ? '/assets/ata-logo-light.svg' : '/assets/ata-logo.svg')} alt={brand.name} width={200} height={52} />
    </Link>
  );
}

function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap topbar-inner">
        <p className="topbar-badge">
          <Icon name="shield" size={15} /> {contentText('text_b1a66c95792448b5', "Türkiye Yüzme Federasyonu’na bağlı spor kulübü")}</p>
        <div className="topbar-links">
          <a href={mapsLink} target="_blank" rel="noreferrer">
            <Icon name="pin" size={15} /> {contentText('text_5719c65b22766aa4', "Yakacık, Kartal / İstanbul")}</a>
          <a href={`mailto:${brand.email}`}>
            <Icon name="mail" size={15} /> {brand.email}
          </a>
          <a href={brand.tel}>
            <Icon name="phone" size={15} /> {brand.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

function ProgramsMenu() {
  return (
    <div className="mega" role="group" aria-label={contentText('text_8ec2bb837a16ca7a', "Programlar")}>
      <div className="mega-inner">
        <div className="mega-list">
          {programs.map((p, i) => (
            <Link key={p.slug} to={`/programlar/${p.slug}`} className="mega-item">
              <span className="mega-num">{"0"}{i + 1}</span>
              <span>
                <strong>{p.name}</strong>
                <small>{p.audience} {"·"}{p.tagline}</small>
              </span>
            </Link>
          ))}
        </div>
        <Link to="/programlar" className="mega-feature">
          <Img name="hero-serbest" alt="" sizes="320px" />
          <span>
            <small>{contentText('text_435c173f3ea49634', "Tüm programlar")}</small>
            <strong>{contentText('text_e3471cc99ed8c7ed', "Size uygun programı karşılaştırın")}</strong>
          </span>
        </Link>
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty('--progress', String(max > 0 ? Math.min(window.scrollY / max, 1) : 0));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const bottom = document.querySelector('.header-main')?.getBoundingClientRect().bottom ?? 0;
    document.documentElement.style.setProperty('--menu-top', `${Math.round(bottom)}px`);
    document.body.classList.add('no-scroll');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={'site-header' + (scrolled ? ' is-scrolled' : '')}>
      <TopBar />
      <div className="header-main">
        <div className="wrap header-inner">
          <Logo />
          <nav className="main-nav" aria-label={contentText('text_489a38bb4ae9f8f6', "Ana menü")}>
            <ul>
              {nav.map((item) => (
                <li key={item.to} className={item.to === '/programlar' ? 'has-mega' : undefined}>
                  <NavLink to={item.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                    {item.label}
                    {item.to === '/programlar' && <Icon name="chevron" size={14} />}
                  </NavLink>
                  {item.to === '/programlar' && <ProgramsMenu />}
                </li>
              ))}
            </ul>
          </nav>
          <Link className="btn btn-primary header-cta" to="/iletisim">
            {contentText('text_1540f4f3628c8e87', "Ön Kayıt")}</Link>
          <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? contentText('text_5746a58b35815df8', "Menüyü kapat") : contentText('text_73822f6a15438615', "Menüyü aç")} onClick={() => setOpen(!open)}>
            <span className={'burger' + (open ? ' is-open' : '')}>
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
        <span ref={progress} className="scroll-progress" aria-hidden="true" />
      </div>
      <div id="mobile-menu" className={'mobile-menu' + (open ? ' is-open' : '')} hidden={!open}>
        <nav aria-label={contentText('text_1e9d78f8c0d3cfb7', "Mobil menü")}>
          <NavLink to="/" end>{contentText('text_dcd2f7f89bdc791d', "Ana Sayfa")}</NavLink>
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-programs">
          <p className="eyebrow">{contentText('text_8ec2bb837a16ca7a', "Programlar")}</p>
          {programs.map((p) => (
            <Link key={p.slug} to={`/programlar/${p.slug}`}>
              {p.name}
            </Link>
          ))}
        </div>
        <div className="mobile-contact">
          <a className="btn btn-primary" href={brand.tel}>
            <Icon name="phone" size={18} /> {brand.phone}
          </a>
          <a className="btn btn-outline" href={whatsapp()} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} /> {contentText('text_6a40edf1fc87a29f', "WhatsApp")}</a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <Logo light />
          <p>{contentText('text_31de3c50617f43ee', "Türkiye Yüzme Federasyonu’na bağlı Ata Yüzme Spor Kulübü; Yakacık Yüzme Havuzu’nda her yaş grubuna bilimsel yüzme eğitimi sunar.")}</p>
          <p className="footer-slogan">{"“"}{brand.slogan}{"”"}</p>
        </div>
        <div>
          <h2 className="footer-title">{contentText('text_4880b93c7b77b50a', "Kurumsal")}</h2>
          <ul className="footer-links">
            <li><Link to="/kurumsal">{contentText('text_275c6ddbb351b57c', "Hakkımızda")}</Link></li>
            <li><Link to="/kayit">{contentText('text_55d268039cc995c6', "Kayıt & Üyelik")}</Link></li>
            <li><Link to="/galeri">{contentText('text_41533b6d0d098341', "Galeri")}</Link></li>
            <li><Link to="/sss">{contentText('text_15a1eebeec336f00', "Sıkça Sorulan Sorular")}</Link></li>
            <li><Link to="/iletisim">{contentText('text_5e948ad2e2df8515', "İletişim")}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">{contentText('text_8ec2bb837a16ca7a', "Programlar")}</h2>
          <ul className="footer-links">
            {programs.map((p) => (
              <li key={p.slug}><Link to={`/programlar/${p.slug}`}>{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-title">{contentText('text_5e948ad2e2df8515', "İletişim")}</h2>
          <ul className="footer-contact">
            <li><Icon name="pin" size={18} /><a href={mapsLink} target="_blank" rel="noreferrer">{brand.street}<br />{brand.city}</a></li>
            <li><Icon name="phone" size={18} /><a href={brand.tel}>{brand.phone}</a></li>
            <li><Icon name="mail" size={18} /><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>{"©"}{new Date().getFullYear()} {brand.name}{contentText('text_141817126a46bbf5', ". Tüm hakları saklıdır.")}</span>
        <span>{brand.facility} {contentText('text_12a8ccb6fc3bc1a6', "· Kartal / İstanbul")}</span>
        <span className="footer-credit">{contentText('text_103732148204c90b', "Zeynart tarafından yapılmıştır.")}</span>
      </div>
    </footer>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  useReveal();
  const { pathname } = useLocation();
  return (
    <>
      <a className="skip-link" href="#main">{contentText('text_1d1efc464bcbede5', "İçeriğe geç")}</a>
      <ScrollManager />
      <Header />
      <main id="main" key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
      <a className="float-wa" href={whatsapp()} target="_blank" rel="noreferrer" aria-label={contentText('text_7ba7ca534a70e50f', "WhatsApp üzerinden yazın")}>
        <WhatsAppIcon size={26} />
      </a>
    </>
  );
}
