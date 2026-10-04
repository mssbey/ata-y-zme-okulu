import { Link } from 'react-router-dom';
import { programs } from '../data/site';
import { Eyebrow, Icon, usePageMeta } from '../components/ui';

export default function NotFound() {
  usePageMeta('Sayfa bulunamadı', 'Aradığınız sayfa bulunamadı.');
  return (
    <section className="not-found">
      <div className="wrap">
        <Eyebrow>Hata 404</Eyebrow>
        <h1 className="display-1">Bu kulvar boş görünüyor.</h1>
        <p className="lead">Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Aşağıdaki bağlantılarla devam edebilirsiniz.</p>
        <div className="btn-row">
          <Link className="btn btn-primary" to="/">Ana sayfaya dönün <Icon name="arrow" size={18} /></Link>
          <Link className="btn btn-outline" to="/iletisim">İletişim</Link>
        </div>
        <ul className="not-found-links">
          {programs.map((p) => (
            <li key={p.slug}><Link to={`/programlar/${p.slug}`}>{p.name}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
