import { useEffect, useRef, useState } from 'react';
import catalog from '../content/catalog.json';
import { getContent, type ContentData } from '../content/store';
import { safeInlineHtml } from '../content/rich';

const pages = [['/','Ana sayfa'],['/kurumsal','Kurumsal'],['/programlar','Programlar'],['/kayit','Kayıt'],['/galeri','Galeri'],['/sss','Sorular'],['/iletisim','İletişim']];
const text = (html:string) => { const doc=new DOMParser().parseFromString(html,'text/html'); return (doc.body.textContent??'').replace(/\s+/g,' ').trim(); };

export default function VisualTextEditor({data,group,onChange}:{data:ContentData;group:string;onChange:(key:string,value:string)=>void}) {
 const [path,setPath]=useState('/');
 const [ready,setReady]=useState(false);
 const frame=useRef<HTMLIFrameElement>(null);
 const latest=useRef(data);latest.current=data;
 useEffect(()=>{const routes:Record<string,string>={Home:'/',About:'/kurumsal',Programs:'/programlar',ProgramDetail:'/programlar/cocuk-yuzme-kursu',Enrollment:'/kayit',Gallery:'/galeri',Faq:'/sss',Contact:'/iletisim'};setReady(false);setPath(routes[group]??'/');},[group]);
 function prepare() {
  const doc=frame.current?.contentDocument;if(!doc?.body)return;
  // The page loads React asynchronously after its content API request.
  const attach=()=>{
   if(!doc.querySelector('#root')?.children.length)return false;
   doc.getElementById('intro')?.remove();
   doc.documentElement.classList.remove('has-intro');doc.documentElement.style.overflow='';
   const style=doc.createElement('style');style.textContent='[data-edit-key]{cursor:text!important;outline:1px dashed #1692d880;outline-offset:4px;min-width:12px}[data-edit-key]:hover{outline:2px solid #1692d8;background:#1692d812}[data-edit-key]:focus{outline:2px solid #1692d8;background:#fff;color:#142d39;min-width:30px}.reveal{opacity:1!important;transform:none!important}';doc.head.append(style);
   const saved=getContent();
   const lookup=new Map<string,string>();
   for(const entry of catalog){lookup.set(text(entry.value),entry.key);lookup.set(text(saved.texts[entry.key]??entry.value),entry.key);}
   for(const [key,value] of Object.entries(saved.texts))if(key.startsWith('slide:'))lookup.set(text(value),key);
   const walker=doc.createTreeWalker(doc.body,NodeFilter.SHOW_TEXT);const nodes:Text[]=[];
   while(walker.nextNode())nodes.push(walker.currentNode as Text);
   for(const node of nodes){
    const el=node.parentElement;if(!el||el.closest('script,style,noscript,[data-edit-key]'))continue;
    const value=(node.textContent??'').replace(/\s+/g,' ').trim();const key=lookup.get(value);
    if(!key||!value||el.childElementCount>0)continue;
    el.dataset.editKey=key;el.contentEditable='true';el.setAttribute('aria-label','Metni düzenle: '+value);el.title='Tıklayın ve yazın';el.spellcheck=true;
    if(latest.current.texts[key]!==undefined)el.innerHTML=safeInlineHtml(latest.current.texts[key]);
    el.addEventListener('input',()=>{
     const html=safeInlineHtml(el.innerHTML);onChange(key,html);
     doc.querySelectorAll<HTMLElement>('[data-edit-key]').forEach(other=>{if(other!==el&&other.dataset.editKey===key)other.innerHTML=html;});
    });
    el.addEventListener('paste',event=>{event.preventDefault();doc.execCommand('insertText',false,event.clipboardData?.getData('text/plain')??'');});
   }
   doc.addEventListener('click',event=>{if((event.target as Element).closest('a,button,[data-edit-key]')){event.preventDefault();event.stopPropagation();}},true);
   doc.addEventListener('submit',event=>event.preventDefault(),true);
   setReady(true);return true;
  };
  if(!attach()){const observer=new MutationObserver(()=>{if(attach())observer.disconnect();});observer.observe(doc.body,{childList:true,subtree:true});}
 }
 return <section className="admin-visual-editor"><div className="admin-visual-toolbar"><label>Sayfa <select aria-label="Önizleme sayfası" value={path} onChange={e=>{setReady(false);setPath(e.target.value);}}>{pages.map(([url,label])=><option key={url} value={url}>{label}</option>)}</select></label><p>{ready?'Değiştirmek istediğiniz yazıya tıklayın ve yazın. Sonra yayınlayın.':'Sayfa hazırlanıyor…'}</p></div><iframe ref={frame} key={path} src={path+'?admin-preview=1'} title="Site üzerinde metin düzenleme" onLoad={prepare}/></section>;
}
