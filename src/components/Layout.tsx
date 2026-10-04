import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { brand, mapsLink, nav, programs, whatsapp } from '../data/site';
import { Icon, Img, WhatsAppIcon, useReveal } from './ui';

function Logo() {
  return (
    <Link className="logo" to="/" aria-label={`${brand.name} — ana sayfa`}>
      <img src="/assets/ata-logo.png" alt={brand.name} width={720} height={210} />
    </Link>
  );
}

function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap topbar-inner">
        <p className="topbar-badge">
          <Icon name="shield" size={15} /> Türkiye Yüzme Federasyonu’na bağlı spor kulübü
        </p>
        <div className="topbar-links">
          <a href={mapsLink} target="_blank" rel="noreferrer">
            <Icon name="pin" size={15} /> Yakacık, Kartal / İstanbul
          </a>
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
    <div className="mega" role="group" aria-label="Programlar">
      <div className="mega-inner">
        <div className="mega-list">
          {programs.map((p, i) => (
            <Link key={p.slug} to={`/programlar/${p.slug}`} className="mega-item">
              <span className="mega-num">0{i + 1}</span>
              <span>
                <strong>{p.name}</strong>
                <small>{p.audience} · {p.tagline}</small>
              </span>
            </Link>
          ))}
        </div>
        <Link to="/programlar" className="mega-feature">
          <Img name="hero-serbest" alt="" sizes="320px" />
          <span>
            <small>Tüm programlar</small>
            <strong>Size uygun programı karşılaştırın</strong>
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
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
          <nav className="main-nav" aria-label="Ana menü">
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
            Ön Kayıt
          </Link>
          <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'} onClick={() => setOpen(!open)}>
            <span className={'burger' + (open ? ' is-open' : '')}>
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={'mobile-menu' + (open ? ' is-open' : '')} hidden={!open}>
        <nav aria-label="Mobil menü">
          <NavLink to="/" end>Ana Sayfa</NavLink>
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-programs">
          <p className="eyebrow">Programlar</p>
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
            <WhatsAppIcon size={18} /> WhatsApp
          </a>
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
          <Logo />
          <p>Türkiye Yüzme Federasyonu’na bağlı Ata Yüzme Spor Kulübü; Yakacık Yüzme Havuzu’nda her yaş grubuna bilimsel yüzme eğitimi sunar.</p>
          <p className="footer-slogan">“{brand.slogan}”</p>
        </div>
        <div>
          <h2 className="footer-title">Kurumsal</h2>
          <ul className="footer-links">
            <li><Link to="/kurumsal">Hakkımızda</Link></li>
            <li><Link to="/kayit">Kayıt & Üyelik</Link></li>
            <li><Link to="/galeri">Galeri</Link></li>
            <li><Link to="/sss">Sıkça Sorulan Sorular</Link></li>
            <li><Link to="/iletisim">İletişim</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">Programlar</h2>
          <ul className="footer-links">
            {programs.map((p) => (
              <li key={p.slug}><Link to={`/programlar/${p.slug}`}>{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-title">İletişim</h2>
          <ul className="footer-contact">
            <li><Icon name="pin" size={18} /><a href={mapsLink} target="_blank" rel="noreferrer">{brand.street}<br />{brand.city}</a></li>
            <li><Icon name="phone" size={18} /><a href={brand.tel}>{brand.phone}</a></li>
            <li><Icon name="mail" size={18} /><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} {brand.name}. Tüm hakları saklıdır.</span>
        <span>{brand.facility} · Kartal / İstanbul</span>
        <span className="footer-credit">Zeynart tarafından yapılmıştır.</span>
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
  return (
    <>
      <a className="skip-link" href="#main">İçeriğe geç</a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <a className="float-wa" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="WhatsApp üzerinden yazın">
        <WhatsAppIcon size={26} />
      </a>
    </>
  );
}
