import { loadContent, applyContentMedia } from './content/store';
void loadContent().then(() => { applyContentMedia(); return import('./App'); });
