import archive from '../data/blog.json';
export type BlogPost = typeof archive.posts[number];
﻿export type ContentData = { texts: Record<string, string>; images: Record<string, string>; revision: number; blogs?: Record<string, BlogPost> };
let current: ContentData = { texts: {}, images: {}, revision: 0 };
export async function loadContent() {
  try { const response = await fetch('/api/content', { cache: 'no-store' }); if (response.ok) { const data = await response.json(); if (data.texts && data.images) current = data; } } catch { /* Original content remains available when offline. */ }
}
export function setContent(data: ContentData) { current = structuredClone(data); applyContentMedia(); }
export function contentText(key: string, fallback: string): string { return current.texts[key] ?? fallback; }
export function imageUrl(name: string): string { return current.images[name] ?? (name.startsWith('/') ? name : `/img/${name}.webp`); }
export function imageOverride(name: string): boolean { return Boolean(current.images[name]); }
export function getContent(): ContentData { return structuredClone(current); }

export function applyContentMedia() {
 document.querySelectorAll<HTMLImageElement>('#intro img').forEach(img=>{const path=img.getAttribute('src');if(path&&current.images[path])img.src=current.images[path];});
 for (const [selector,path] of [['link[rel="icon"]','/favicon-64.png'],['link[rel="apple-touch-icon"]','/apple-touch-icon.png']] as const) { const el=document.querySelector<HTMLLinkElement>(selector);if(el&&current.images[path]){el.href=current.images[path];el.removeAttribute('type');el.removeAttribute('sizes');} }
 document.querySelector('meta[property="og:image"]')?.setAttribute('content',imageUrl('/og-image.jpg'));
}

export function getBlogPosts(data: ContentData = current): BlogPost[] {
 const posts = new Map(archive.posts.map(post => [post.id, post]));
 for (const post of Object.values(data.blogs ?? {})) posts.set(post.id, post);
 return [...posts.values()].sort((a,b) => b.date.localeCompare(a.date));
}

export function applyTracking() {
 const verification=current.texts['seo:verification']??'';
 const code=verification.includes('<')?new DOMParser().parseFromString(verification,'text/html').querySelector('meta[name="google-site-verification"]')?.getAttribute('content')??'':verification.trim();
 if(code){const meta=document.createElement('meta');meta.name='google-site-verification';meta.content=code;document.head.append(meta);}
 const measurement=(current.texts['seo:analytics']??'').match(/\bG-[A-Z0-9]{4,20}\b/)?.[0];
 if(measurement){const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+measurement;document.head.append(script);
 const w=window as unknown as {dataLayer:unknown[];gtag:(...args:unknown[])=>void};w.dataLayer=w.dataLayer||[];w.gtag=function(){w.dataLayer.push(arguments);};w.gtag('js',new Date());w.gtag('config',measurement);}
}
