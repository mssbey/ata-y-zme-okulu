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
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="kurumsal" element={<About />} />
          <Route path="programlar" element={<Programs />} />
          <Route path="programlar/:slug" element={<ProgramDetail />} />
          <Route path="kayit" element={<Enrollment />} />
          <Route path="galeri" element={<Gallery />} />
          <Route path="sss" element={<Faq />} />
          <Route path="iletisim" element={<Contact />} />
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
