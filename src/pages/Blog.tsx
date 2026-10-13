import { useEffect, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import archive from '../data/blog.json';
import { getBlogPosts } from '../content/store';
import { CtaBand, Eyebrow, Icon, Img, usePageMeta, useReveal } from '../components/ui';
import NotFound from './NotFound';
import './blog.css';

const { categories } = archive;
const posts = getBlogPosts();
type Post = typeof posts[number];
const date = (value: string) => new Date(value).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const category = (p: Post) => categories.find(c => p.categories.includes(c.id))!;
const normalize = (s: string) => s.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
function Cover({ post, priority = false }: { post: Post; priority?: boolean }) {
  return post.image ? <img src={post.image} alt={post.imageAlt || post.title} loading={priority ? 'eager' : 'lazy'} /> : <Img name="hero-serbest" alt={post.title} sizes="(max-width: 700px) 100vw, 50vw" priority={priority} />;
}
function Card({ post }: { post: Post }) {
  return <article className="blog-card">
    <Link to={`/blog/${post.slug}`} className="blog-card-image" tabIndex={-1} aria-hidden="true"><Cover post={post} /><span>{category(post)?.name}</span></Link>
    <div className="blog-card-body"><div className="blog-meta"><time dateTime={post.date}>{date(post.date)}</time><span>{post.minutes} dk okuma</span></div>
      <h3 className="display-4"><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.excerpt || post.text.slice(0, 180)}</p>
      <Link className="arrow-link" to={`/blog/${post.slug}`} aria-label={`${post.title} — yazıyı oku`}>Yazıyı oku <Icon name="arrow" size={17} /></Link>
    </div>
  </article>;
}
export default function Blog() {
  useReveal();
  const [params, setParams] = useSearchParams();
  const selected = params.get('kategori') || '';
  const search = params.get('ara') || '';
  const filtered = useMemo(() => posts.filter(p => (!selected || category(p)?.slug === selected) && (!search || normalize(p.title + ' ' + p.text).includes(normalize(search)))), [selected, search]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 9));
  const page = Math.min(pageCount, Math.max(1, Number(params.get('sayfa')) || 1));
  const featured = posts[0];
  usePageMeta('Blog — Yüzme rehberi', 'Yüzme teknikleri, sağlık, beslenme ve yüzme eğitimi üzerine Ata Yüzme yazıları. Yakacık Yüzme Havuzu blog arşivini keşfedin.');
  const update = (key: string, value: string) => { const next = new URLSearchParams(params); if (value) next.set(key, value); else next.delete(key); if (key !== 'sayfa') next.delete('sayfa'); setParams(next, { replace: key === 'ara', preventScrollReset: true }); };
  return <>
    <section className="blog-intro"><div className="wrap">
      <nav className="blog-crumbs" aria-label="Sayfa konumu"><Link to="/">Ana Sayfa</Link><span>/</span><span aria-current="page">Blog</span></nav>
      <div className="blog-intro-row"><div><Eyebrow>ATA YÜZME / BİLGİ & İLHAM</Eyebrow><h1 className="display-1">Suya dair.<br /><em>Hayata dair.</em></h1></div><div><p className="lead">İlk kulacınızdan daha iyi bir tekniğe; suyun içindeki yolculuğunuza eşlik eden bilgiler, öneriler ve kulübümüzden hikâyeler.</p><div className="blog-archive-note"><span>{posts.length} yazı</span><span>{categories.length} konu başlığı</span><span>Birlikte öğreniyoruz</span></div></div></div>
      {!selected && !search && page === 1 && <article className="blog-feature"><Link className="blog-feature-image" to={`/blog/${featured.slug}`} tabIndex={-1} aria-hidden="true"><Cover post={featured} priority /></Link><div className="blog-feature-body"><Eyebrow>Öne çıkan yazı</Eyebrow><div className="blog-meta"><span>{category(featured)?.name}</span><span>{featured.minutes} dk okuma</span></div><h2 className="display-3"><Link to={`/blog/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt.slice(0, 220)}</p><Link className="btn btn-primary" to={`/blog/${featured.slug}`}>Yazıyı keşfet <Icon name="arrow" size={18} /></Link></div></article>}
    </div></section>
    <section className="section blog-library" id="yazilar"><div className="wrap">
      <div className="blog-library-heading"><div><Eyebrow>Yüzme kütüphanesi</Eyebrow><h2 className="display-3">Her kulaçta yeni bir bilgi.</h2></div><label className="blog-search"><span className="sr-only">Blog yazılarında ara</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input type="search" placeholder="Bir konu keşfedin…" value={search} onChange={e => update('ara', e.target.value)} /></label></div>
      <div className="blog-filters" aria-label="Blog kategorileri"><button className={!selected ? 'is-active' : ''} aria-pressed={!selected} onClick={() => update('kategori', '')}>Tüm yazılar <span>{posts.length}</span></button>{categories.map(c => <button key={c.id} className={selected === c.slug ? 'is-active' : ''} aria-pressed={selected === c.slug} onClick={() => update('kategori', c.slug)}>{c.name}<span>{posts.filter(p => p.categories.includes(c.id)).length}</span></button>)}</div>
      <div className="blog-result-count" role="status">{filtered.length} yazı{search && ` · “${search}” için sonuçlar`}</div>
      {filtered.length ? <div className="blog-grid">{filtered.slice((page - 1) * 9, page * 9).map(p => <Card post={p} key={p.id} />)}</div> : <div className="blog-empty"><h3 className="display-3">Bu konuda bir yazı bulunamadı.</h3><p>Başka bir kelime deneyin veya tüm yazılara göz atın.</p><button className="btn btn-primary" onClick={() => setParams({})}>Tüm yazıları göster</button></div>}
      {pageCount > 1 && <nav className="blog-pagination" aria-label="Blog sayfaları">{Array.from({ length: pageCount }, (_, i) => <button key={i} aria-label={`Sayfa ${i + 1}`} aria-current={page === i + 1 ? 'page' : undefined} onClick={() => { update('sayfa', String(i + 1)); document.getElementById('yazilar')?.scrollIntoView({ behavior: 'smooth' }); }}>{String(i + 1).padStart(2, '0')}</button>)}</nav>}
    </div></section><CtaBand />
  </>;
}

export function BlogDetail() {
  useReveal();
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  usePageMeta(post?.title || 'Yazı bulunamadı', post?.excerpt || 'Blog yazıları');
  const prepared = useMemo(() => {
    if (!post) return { html: '', headings: [] as { id: string; text: string }[] };
    const doc = new DOMParser().parseFromString(post.html, 'text/html');
    doc.querySelectorAll('script,style,iframe,object,embed,form,input,button,link,meta,base,svg,math').forEach(el => el.remove());
    doc.querySelectorAll('*').forEach(el => { for (const attr of [...el.attributes]) if (attr.name.startsWith('on') || ['style','srcdoc'].includes(attr.name) || (['href','src'].includes(attr.name) && !/^(https?:\/\/|\/(?!\/)|#)/i.test(attr.value))) el.removeAttribute(attr.name); });
    doc.querySelectorAll('h1').forEach(el => { const heading = doc.createElement('h2'); heading.innerHTML = el.innerHTML; el.replaceWith(heading); });
    const headings = Array.from(doc.querySelectorAll('h2,h3')).map((el, i) => { el.id = `bolum-${i + 1}`; return { id: el.id, text: el.textContent || '' }; });
    return { html: doc.body.innerHTML, headings };
  }, [post]);
  useEffect(() => {
    if (!post) return;
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, datePublished: post.date, dateModified: post.modified, image: post.image ? new URL(post.image, window.location.origin).href : undefined, author: { '@type': 'Organization', name: 'Ata Yüzme Spor Kulübü' }, mainEntityOfPage: window.location.href }); document.head.append(script); return () => script.remove();
  }, [post]);
  if (!post) return <NotFound />;
  const related = posts.filter(p => p.id !== post.id && p.categories.some(c => post.categories.includes(c))).slice(0, 3);
  return <><header className="blog-article-header"><div className="wrap"><nav className="blog-crumbs" aria-label="Sayfa konumu"><Link to="/">Ana Sayfa</Link><span>/</span><Link to="/blog">Blog</Link><span>/</span><span>{category(post)?.name}</span></nav><Link className="eyebrow" to={`/blog?kategori=${category(post)?.slug}`}>{category(post)?.name}</Link><h1 className="display-1">{post.title}</h1><div className="blog-meta"><span>Ata Yüzme Spor Kulübü</span><time dateTime={post.date}>{date(post.date)}</time><span>{post.minutes} dk okuma</span></div></div></header>
    <div className="wrap blog-article-cover"><Cover post={post} priority /></div>
    <div className="wrap blog-reading"><article className="blog-prose" dangerouslySetInnerHTML={{ __html: prepared.html }} /><aside className="blog-sidebar"><div>{prepared.headings.length > 0 && <><Eyebrow>Bu yazıda</Eyebrow><nav aria-label="İçindekiler">{prepared.headings.map(h => <a key={h.id} href={`#${h.id}`}>{h.text}</a>)}</nav></>}<div className="blog-side-cta"><span className="eyebrow">Sıradaki kulaç</span><h2 className="display-4">Bilgiyi suyla buluşturun.</h2><p>Yaşınıza ve seviyenize uygun yüzme programını birlikte seçelim.</p><Link className="btn btn-primary" to="/programlar">Programları keşfet <Icon name="arrow" size={17} /></Link></div><Link className="arrow-link" to="/blog">Tüm yazılara dön <Icon name="arrow" size={17} /></Link></div></aside></div>
    {related.length > 0 && <section className="section section-paper"><div className="wrap"><Eyebrow>Keşfetmeye devam</Eyebrow><h2 className="display-3 blog-related-title">İlginizi çekebilir.</h2><div className="blog-grid">{related.map(p => <Card post={p} key={p.id} />)}</div></div></section>}<CtaBand /></>;
}
