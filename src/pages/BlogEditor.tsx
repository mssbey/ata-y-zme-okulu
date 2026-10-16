import RichEditor, { safeHtml } from '../content/rich';
import { optimizeImage } from '../content/optimize';
import { useState } from 'react';
import archive from '../data/blog.json';
import { getBlogPosts, type BlogPost, type ContentData } from '../content/store';
import { readApiResponse } from '../content/api';

const slugify = (value: string) => value.toLocaleLowerCase('tr').replace(/ı/g, 'i').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function previewHtml(html: string) {
 const doc = new DOMParser().parseFromString(html, 'text/html');
 doc.querySelectorAll('script,style,iframe,object,embed,form,input,button,link,meta,base,svg,math').forEach(el=>el.remove());
 doc.querySelectorAll('*').forEach(el=>{for(const attr of [...el.attributes])if(attr.name.startsWith('on')||['style','srcdoc'].includes(attr.name)||(['href','src'].includes(attr.name)&&!/^(https?:\/\/|\/(?!\/)|#)/i.test(attr.value)))el.removeAttribute(attr.name);});
 return doc.body.innerHTML;
}
export default function BlogEditor({ data, busy, csrf, onChange, onStatus }: { data: ContentData; busy: boolean; csrf: string; onChange: (post: BlogPost) => void; onStatus: (message: string) => void }) {
 const posts = getBlogPosts(data);
 const [selected, setSelected] = useState<number | null>(null);
 const [query, setQuery] = useState('');
 const [uploading, setUploading] = useState(false);
 const post = posts.find(p => p.id === selected);
 function update(values: Partial<BlogPost>) {
  if (!post) return;
  const next = { ...post, ...values, modified: new Date().toISOString() };
  if (values.html !== undefined) {
   const doc = new DOMParser().parseFromString(values.html, 'text/html');
   doc.querySelectorAll('script,style,iframe,object,embed,form,input,button,link,meta,base,svg,math').forEach(el => el.remove());
   doc.querySelectorAll('*').forEach(el => { for (const attr of [...el.attributes]) if (attr.name.startsWith('on') || ['style','srcdoc'].includes(attr.name) || (['href','src'].includes(attr.name) && !/^(https?:\/\/|\/(?!\/)|#)/i.test(attr.value))) el.removeAttribute(attr.name); });
   next.html = values.html;
   next.text = doc.body.textContent || '';
   next.minutes = Math.max(1, Math.ceil(next.text.split(/\s+/).filter(Boolean).length / 200));
  }
  next.html = safeHtml(next.html);
  onChange(next);
 }
 function add() {
  const id = Math.max(0, ...posts.map(p => p.id)) + 1;
  const date = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Istanbul' });
  onChange({ id, title: 'Yeni blog yazısı', slug: `yeni-blog-yazisi-${id}`, date, modified: new Date().toISOString(), source: '', categories: [archive.categories[0].id], excerpt: '', html: '<p>Yazınızın içeriğini buraya ekleyin.</p>', text: 'Yazınızın içeriğini buraya ekleyin.', image: '', imageAlt: '', minutes: 1 });
  setSelected(id);
 }
 async function upload(file?: File) {
  if (!file || !post) return;

  setUploading(true);
  try {
   file = await optimizeImage(file);
   const image = await new Promise<string>((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1]); reader.onerror = () => reject(Error('Görsel okunamadı.')); reader.readAsDataURL(file!); });
   const result = await readApiResponse(await fetch('/api/content?action=upload', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf }, body: JSON.stringify({ image }) }));
   if (typeof result.url !== 'string') throw Error('Görsel yüklenemedi.');
   update({ image: result.url });
   onStatus('Kapak görseli hazır. Değişiklikleri yayınlayın.');
  } catch (e) { onStatus((e as Error).message); } finally { setUploading(false); }
 }
 return <div className="admin-editor"><div className="admin-editor-toolbar"><div><h2>Blog yazıları</h2><p>{posts.length} yazı · Değişiklikleri yayınla düğmesiyle kaydedilir</p></div><button className="admin-primary" disabled={busy || uploading} onClick={add}>+ Yeni blog ekle</button></div><div className="admin-blog-layout"><div className="admin-blog-list"><input aria-label="Blog ara" placeholder="Blog yazılarında ara…" value={query} onChange={e=>setQuery(e.target.value)}/>{posts.filter(p=>p.title.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr'))).map(p=><button key={p.id} className={p.id===selected?'selected':''} onClick={()=>setSelected(p.id)}><strong>{p.title}</strong><small>{p.date.slice(0,10)} · {data.blogs?.[p.id]?'Düzenlendi':'Mevcut yazı'}</small></button>)}</div><div className="admin-blog-form">{post?<fieldset disabled={busy || uploading}><legend>Yazıyı düzenle</legend><label>Başlık<input value={post.title} maxLength={500} onChange={e=>update({title:e.target.value})}/></label><label>URL adı (slug)<input value={post.slug} onChange={e=>update({slug:slugify(e.target.value)})}/><small>Adres: /blog/{post.slug} · Her yazı için benzersiz olmalı.</small></label><button className="admin-upload" onClick={()=>update({slug:slugify(post.title)})}>Başlıktan URL oluştur</button><label>Yayın tarihi<input type="date" value={post.date.slice(0,10)} onChange={e=>update({date:e.target.value})}/></label><label>Kategori<select value={post.categories[0]} onChange={e=>update({categories:[Number(e.target.value)]})}>{archive.categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Özet<textarea rows={4} value={post.excerpt} maxLength={5000} onChange={e=>update({excerpt:e.target.value})}/></label><label>Kapak görseli adresi<input value={post.image} placeholder="/img/... veya https://..." onChange={e=>update({image:e.target.value})}/></label>{post.image&&<img className="admin-blog-cover" src={post.image} alt={post.imageAlt||post.title}/>}<label className="admin-upload">{uploading?'Yükleniyor…':'Kapak görseli yükle'}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e=>{void upload(e.target.files?.[0]);e.target.value='';}}/></label><label>Görsel açıklaması<input value={post.imageAlt} onChange={e=>update({imageAlt:e.target.value})}/></label><label>Yazı içeriği (HTML)<RichEditor id="blog-html" value={post.html} onChange={html=>update({html})}/><small>Paragraflar için &lt;p&gt;, alt başlıklar için &lt;h2&gt;, kalın yazı için &lt;strong&gt; kullanın. Okuma süresi otomatik hesaplanır.</small></label><details><summary>İçerik önizlemesi</summary><div className="blog-prose admin-blog-preview" dangerouslySetInnerHTML={{__html:previewHtml(post.html)}}/></details><a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">Yayınlanan yazıyı görüntüle ↗</a></fieldset>:<p className="admin-empty">Düzenlemek için bir yazı seçin veya yeni blog ekleyin.</p>}</div></div></div>;
}
