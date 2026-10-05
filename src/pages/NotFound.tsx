import { contentText } from '../content/store';
import { Link } from 'react-router-dom';
import { programs } from '../data/site';
import { Eyebrow, Icon, usePageMeta } from '../components/ui';

export default function NotFound() {
  usePageMeta(contentText('text_54862c4b8a11fca6', "Sayfa bulunamadı"), contentText('text_cf8883d5805f6695', "Aradığınız sayfa bulunamadı."));
  return (
    <section className="not-found">
      <div className="wrap">
        <Eyebrow>{contentText('text_df337c381dd7407c', "Hata 404")}</Eyebrow>
        <h1 className="display-1">{contentText('text_0d62e53683b392b9', "Bu kulvar boş görünüyor.")}</h1>
        <p className="lead">{contentText('text_083bfed66c874aea', "Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Aşağıdaki bağlantılarla devam edebilirsiniz.")}</p>
        <div className="btn-row">
          <Link className="btn btn-primary" to="/">{contentText('text_573c0bc7e12c57cf', "Ana sayfaya dönün")}<Icon name="arrow" size={18} /></Link>
          <Link className="btn btn-outline" to="/iletisim">{contentText('text_5e948ad2e2df8515', "İletişim")}</Link>
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
