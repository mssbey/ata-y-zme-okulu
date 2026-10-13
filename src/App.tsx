import Admin from './pages/Admin';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Enrollment from './pages/Enrollment';
import Gallery from './pages/Gallery';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import blogRedirects from './data/blog-redirects.json';
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogDetail = React.lazy(() => import('./pages/Blog').then(m => ({ default: m.BlogDetail })));
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<Admin />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="kurumsal" element={<About />} />
          <Route path="programlar" element={<Programs />} />
          <Route path="programlar/:slug" element={<ProgramDetail />} />
          <Route path="kayit" element={<Enrollment />} />
          <Route path="galeri" element={<Gallery />} />
          <Route path="sss" element={<Faq />} />
          <Route path="iletisim" element={<Contact />} />
          <Route path="blog" element={<React.Suspense fallback={<div className="wrap section" role="status">Blog yükleniyor…</div>}><Blog /></React.Suspense>} />
          <Route path="blog/:slug" element={<React.Suspense fallback={<div className="wrap section" role="status">Yazı yükleniyor…</div>}><BlogDetail /></React.Suspense>} />
          <Route path="category/blog" element={<Navigate to="/blog" replace />} />
          <Route path="category/blog/page/:page" element={<Navigate to="/blog" replace />} />
          {blogRedirects.map(post => <Route key={post.path} path={post.path} element={<Navigate to={`/blog/${post.slug}`} replace />} />)}
          {/* Eski sitenin adresleri */}
          <Route path="foto-galeri" element={<Navigate to="/galeri" replace />} />
          <Route path="sikca-sorulan-sorular" element={<Navigate to="/sss" replace />} />
          {['cocuk-yuzme-kursu', 'yetiskin-yuzme-dersleri', 'bebek-yuzme-dersleri', 'ozel-yuzme-dersleri', 'performans-yuzme', 'saglik-ve-spor-amacli-yuzme'].map((s) => (
            <Route key={s} path={s} element={<Navigate to={`/programlar/${s}`} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
