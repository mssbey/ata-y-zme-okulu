import { useEffect, useRef, useState } from 'react';
export function safeHtml(value: string) {
 const doc = new DOMParser().parseFromString(value, 'text/html');
 const allowed = new Set(['STRONG','B','EM','I','U','BR','P','H1','H2','H3','H4','H5','H6','UL','OL','LI','A','BLOCKQUOTE','DIV','SPAN','FIGURE','FIGCAPTION','IMG','DL','DT','DD','HR','TABLE','THEAD','TBODY','TR','TH','TD']);
 doc.querySelectorAll('script,style,iframe,object,svg,math,template').forEach(e=>e.remove());
 [...doc.body.querySelectorAll('*')].reverse().forEach(el=>{if(!allowed.has(el.tagName)){el.replaceWith(...el.childNodes);return;}for(const a of [...el.attributes]){const link=el.tagName==='A'&&a.name==='href'&&/^(https?:\/\/|\/(?!\/)|#|mailto:|tel:)/i.test(a.value);const image=el.tagName==='IMG'&&((a.name==='src'&&/^(https?:\/\/|\/(?!\/))/i.test(a.value))||['alt','width','height'].includes(a.name));if(!link&&!image)el.removeAttribute(a.name);}if(el.tagName==='IMG'&&!el.getAttribute('src'))el.remove();});
 return doc.body.innerHTML;
}
export function safeInlineHtml(value: string) { return safeHtml(value).replace(/<\/(?:p|h2|h3|li|blockquote)>/gi,'<br>').replace(/<\/?(?:p|h2|h3|ul|ol|li|blockquote)\b[^>]*>/gi,''); }
export function RichText({value}:{value:string}) { return <span className="rich-copy" dangerouslySetInnerHTML={{__html:safeInlineHtml(value)}}/>; }
export default function RichEditor({id,value,onChange,inline=false}:{id:string;value:string;onChange:(v:string)=>void;inline?:boolean}) {
 const ref=useRef<HTMLDivElement>(null);const [source,setSource]=useState(false);
 useEffect(()=>{if(ref.current&&document.activeElement!==ref.current)ref.current.innerHTML=safeHtml(value);},[value,source]);
 function command(cmd:string){ref.current?.focus();document.execCommand(cmd);if(ref.current)onChange(safeHtml(ref.current.innerHTML));}
 return <div className="rich-editor"><div className="rich-toolbar" role="toolbar" aria-label="Metin biçimlendirme">{[['bold','Kalın'],['italic','İtalik'],['underline','Altı çizili'],...(!inline?[['insertUnorderedList','Madde listesi'],['insertOrderedList','Numaralı liste']]:[]),['removeFormat','Biçimi temizle']].map(([cmd,label])=><button type="button" key={cmd} disabled={source} onMouseDown={e=>e.preventDefault()} onClick={()=>command(cmd)}>{label}</button>)}<button type="button" onClick={()=>setSource(!source)}>{source?'Görsel editör':'HTML'}</button></div>{source?<textarea id={id} value={value} rows={6} onChange={e=>onChange(e.target.value)}/>:<div id={id} ref={ref} role="textbox" aria-multiline="true" contentEditable suppressContentEditableWarning onInput={e=>onChange(safeHtml(e.currentTarget.innerHTML))} onPaste={e=>{e.preventDefault();document.execCommand('insertText',false,e.clipboardData.getData('text/plain'));}}/>}</div>;
}
