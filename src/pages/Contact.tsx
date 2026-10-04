import { useState, type FormEvent } from 'react';
import { brand, mapsEmbed, mapsLink, programs, whatsapp } from '../data/site';
import { Eyebrow, Icon, PageHero, WhatsAppIcon, usePageMeta } from '../components/ui';

type Form = { name: string; phone: string; program: string; age: string; message: string };
const empty: Form = { name: '', phone: '', program: '', age: '', message: '' };

export default function Contact() {
  usePageMeta('İletişim', `Ata Yüzme Spor Kulübü iletişim: ${brand.phone} · ${brand.email} · ${brand.address}`);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (form.name.trim().length < 2) err.name = 'Lütfen adınızı ve soyadınızı yazın.';
    if (form.phone.replace(/\D/g, '').length < 10) err.phone = 'Lütfen geçerli bir telefon numarası yazın.';
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`f-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    const lines = [
      'Merhaba, ön kayıt / bilgi talebim:',
      `Ad Soyad: ${form.name.trim()}`,
      `Telefon: ${form.phone.trim()}`,
      form.program && `Program: ${form.program}`,
      form.age && `Yaş: ${form.age.trim()}`,
      form.message.trim() && `Not: ${form.message.trim()}`,
    ].filter(Boolean);
    window.open(whatsapp(lines.join('\n')), '_blank', 'noopener');
  };

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title={<>İlk kulaç için<br />ilk adımı atın.</>}
        lead="Programlar, ön kayıt ve tesis ziyareti için bize telefon, WhatsApp veya e-posta ile ulaşabilirsiniz."
        image="havuz-kulvarlar"
        alt="Yakacık Yüzme Havuzu’nda kulvarlar"
        position="50% 60%"
        crumbs={[{ label: 'İletişim' }]}
      />

      <section className="section">
        <div className="wrap contact-layout">
          <div className="contact-info">
            <Eyebrow>İletişim bilgileri</Eyebrow>
            <h2 className="display-3">Size nasıl yardımcı olabiliriz?</h2>
            <ul className="contact-cards">
              <li>
                <span className="why-icon"><Icon name="phone" size={22} /></span>
                <div>
                  <small>Telefon</small>
                  <a href={brand.tel}>{brand.phone}</a>
                </div>
              </li>
              <li>
                <span className="why-icon"><WhatsAppIcon size={22} /></span>
                <div>
                  <small>WhatsApp</small>
                  <a href={whatsapp()} target="_blank" rel="noreferrer">Mesaj gönderin</a>
                </div>
              </li>
              <li>
                <span className="why-icon"><Icon name="mail" size={22} /></span>
                <div>
                  <small>E-posta</small>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </div>
              </li>
              <li>
                <span className="why-icon"><Icon name="pin" size={22} /></span>
                <div>
                  <small>Adres</small>
                  <a href={mapsLink} target="_blank" rel="noreferrer">{brand.facility}<br />{brand.street}, {brand.city}</a>
                </div>
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={submit} noValidate>
            <p className="form-title">Ön kayıt / bilgi formu</p>
            <p className="form-sub">Formu doldurduğunuzda bilgileriniz WhatsApp mesajı olarak hazırlanır; göndermeden önce kontrol edebilirsiniz.</p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="f-name">Ad Soyad *</label>
                <input id="f-name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
                {errors.name && <span className="field-error" id="e-name">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-phone">Telefon *</label>
                <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="05xx xxx xx xx" value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'e-phone' : undefined} />
                {errors.phone && <span className="field-error" id="e-phone">{errors.phone}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-program">İlgilendiğiniz program</label>
                <select id="f-program" value={form.program} onChange={set('program')}>
                  <option value="">Seçiniz</option>
                  {programs.map((p) => (
                    <option key={p.slug} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Serbest yüzme">Serbest yüzme</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-age">Katılımcının yaşı</label>
                <input id="f-age" inputMode="numeric" value={form.age} onChange={set('age')} />
              </div>
              <div className="field field-full">
                <label htmlFor="f-message">Mesajınız</label>
                <textarea id="f-message" rows={4} value={form.message} onChange={set('message')} placeholder="Yüzme seviyesi, uygun gün ve saatler…" />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              <WhatsAppIcon size={18} /> WhatsApp ile gönder
            </button>
          </form>
        </div>
      </section>

      <section className="map-section" aria-label="Konum haritası">
        <iframe title={`${brand.facility} konumu`} src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="map-card">
          <Eyebrow>Konum</Eyebrow>
          <p><strong>{brand.facility}</strong><br />{brand.street}<br />{brand.city}</p>
          <a className="btn btn-primary" href={mapsLink} target="_blank" rel="noreferrer">
            Yol tarifi alın <Icon name="arrowUpRight" size={18} />
          </a>
        </div>
      </section>
    </>
  );
}
