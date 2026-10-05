import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const proxy = { '/api/content': { target: 'http://127.0.0.1:8081', rewrite: (path:string) => path.replace(/^\/api\/content(?!\.php)/, '/api/content.php') }, '/uploads': 'http://127.0.0.1:8081' };
export default defineConfig({ plugins: [react()], server: { proxy }, preview: { proxy } });
