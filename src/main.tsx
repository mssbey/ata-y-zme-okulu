import { loadContent, applyContentMedia, applyTracking } from './content/store';
void loadContent().then(() => { applyContentMedia(); if(!location.pathname.startsWith('/admin'))applyTracking(); return import('./App'); });
