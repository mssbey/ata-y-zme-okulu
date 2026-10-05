export type ContentData = { texts: Record<string, string>; images: Record<string, string>; revision: number };
let current: ContentData = { texts: {}, images: {}, revision: 0 };
export async function loadContent() {
  try { const response = await fetch('/api/content', { cache: 'no-store' }); if (response.ok) { const data = await response.json(); if (data.texts && data.images) current = data; } } catch { /* Original content remains available when offline. */ }
}
export function contentText(key: string, fallback: string): string { return current.texts[key] ?? fallback; }
export function imageUrl(name: string): string { return current.images[name] ?? (name.startsWith('/') ? name : `/img/${name}.webp`); }
export function imageOverride(name: string): boolean { return Boolean(current.images[name]); }
export function getContent(): ContentData { return structuredClone(current); }

export function applyContentMedia() {
 document.querySelectorAll<HTMLImageElement>('#intro img').forEach(img=>{const path=img.getAttribute('src');if(path&&current.images[path])img.src=current.images[path];});
 for (const [selector,path] of [['link[rel="icon"]','/favicon-64.png'],['link[rel="apple-touch-icon"]','/apple-touch-icon.png']] as const) { const el=document.querySelector<HTMLLinkElement>(selector);if(el&&current.images[path]){el.href=current.images[path];el.removeAttribute('type');el.removeAttribute('sizes');} }
 document.querySelector('meta[property="og:image"]')?.setAttribute('content',imageUrl('/og-image.jpg'));
}
