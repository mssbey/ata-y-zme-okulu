import { contentText } from '../content/store';
import { useState, type FormEvent } from 'react';
import { brand, mapsEmbed, mapsLink, programs, whatsapp } from '../data/site';
import { Eyebrow, Icon, PageHero, WhatsAppIcon, usePageMeta } from '../components/ui';

type Form = { name: string; phone: string; program: string; age: string; message: string };
const empty: Form = { name: "", phone: "", program: '', age: "", message: '' };

export default function Contact() {
  usePageMeta(contentText('text_5e948ad2e2df8515', "İletişim"), `Ata Yüzme Spor Kulübü iletişim: ${brand.phone} · ${brand.email} · ${brand.address}`);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (form.name.trim().length < 2) err.name = contentText('text_e5d40681ea8b8140', "Lütfen adınızı ve soyadınızı yazın.");
    if (form.phone.replace(/\D/g, '').length < 10) err.phone = contentText('text_6b2dd28b34ebe3c2', "Lütfen geçerli bir telefon numarası yazın.");
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`f-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    const lines = [
      contentText('text_5d2746c69f2641a0', "Merhaba, ön kayıt / bilgi talebim:"),
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
        eyebrow={contentText('text_5e948ad2e2df8515', "İletişim")}
        title={<>{contentText('text_d30dbfc105d763ae', "İlk kulaç için")}<br />{contentText('text_bc2f4c016b15e10d', "ilk adımı atın.")}</>}
        lead={contentText('text_09dc7b2cd98a6508', "Programlar, ön kayıt ve tesis ziyareti için bize telefon, WhatsApp veya e-posta ile ulaşabilirsiniz.")}
        image="havuz-kulvarlar"
        alt={contentText('text_8303f877b62e1507', "Yakacık Yüzme Havuzu’nda kulvarlar")}
        position="50% 60%"
        crumbs={[{ label: contentText('text_5e948ad2e2df8515', "İletişim") }]}
      />

      <section className="section">
        <div className="wrap contact-layout">
          <div className="contact-info">
            <Eyebrow>{contentText('text_20c47f39498bb061', "İletişim bilgileri")}</Eyebrow>
            <h2 className="display-3">{contentText('text_f44a8117585d6340', "Size nasıl yardımcı olabiliriz?")}</h2>
            <ul className="contact-cards">
              <li>
                <span className="why-icon"><Icon name="phone" size={22} /></span>
                <div>
                  <small>{contentText('text_fa6906d76ee94d4e', "Telefon")}</small>
                  <a href={brand.tel}>{brand.phone}</a>
                </div>
              </li>
              <li>
                <span className="why-icon"><WhatsAppIcon size={22} /></span>
                <div>
                  <small>{contentText('text_6a40edf1fc87a29f', "WhatsApp")}</small>
                  <a href={whatsapp()} target="_blank" rel="noreferrer">{contentText('text_66496a401fbdefa7', "Mesaj gönderin")}</a>
                </div>
              </li>
              <li>
                <span className="why-icon"><Icon name="mail" size={22} /></span>
                <div>
                  <small>{contentText('text_e1081b69d80ace5d', "E-posta")}</small>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </div>
              </li>
              <li>
                <span className="why-icon"><Icon name="pin" size={22} /></span>
                <div>
                  <small>{contentText('text_32c6bebf1cb00776', "Adres")}</small>
                  <a href={mapsLink} target="_blank" rel="noreferrer">{brand.facility}<br />{brand.street}{","}{brand.city}</a>
                </div>
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={submit} noValidate>
            <p className="form-title">{contentText('text_e91fd01d5d4c07f3', "Ön kayıt / bilgi formu")}</p>
            <p className="form-sub">{contentText('text_c537abf92f35d8d3', "Formu doldurduğunuzda bilgileriniz WhatsApp mesajı olarak hazırlanır; göndermeden önce kontrol edebilirsiniz.")}</p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="f-name">{contentText('text_14dfdbfa940b3c34', "Ad Soyad *")}</label>
                <input id="f-name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
                {errors.name && <span className="field-error" id="e-name">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-phone">{contentText('text_4c9ab8b065a55949', "Telefon *")}</label>
                <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={contentText('text_1db802e8ea8631c5', "05xx xxx xx xx")} value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'e-phone' : undefined} />
                {errors.phone && <span className="field-error" id="e-phone">{errors.phone}</span>}
              </div>
              <div className="field">
                <label htmlFor="f-program">{contentText('text_50ae0414885a270a', "İlgilendiğiniz program")}</label>
                <select id="f-program" value={form.program} onChange={set('program')}>
                  <option value="">{contentText('text_830050ddc750c465', "Seçiniz")}</option>
                  {programs.map((p) => (
                    <option key={p.slug} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Serbest yüzme">{contentText('text_1acbe1c95f05a7a9', "Serbest yüzme")}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-age">{contentText('text_d6894ad9e9b8629f', "Katılımcının yaşı")}</label>
                <input id="f-age" inputMode="numeric" value={form.age} onChange={set('age')} />
              </div>
              <div className="field field-full">
                <label htmlFor="f-message">{contentText('text_42a1a75b0d4b8d22', "Mesajınız")}</label>
                <textarea id="f-message" rows={4} value={form.message} onChange={set('message')} placeholder={contentText('text_ab84d63c52a487aa', "Yüzme seviyesi, uygun gün ve saatler…")} />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              <WhatsAppIcon size={18} /> {contentText('text_c2e5061d38d7a4c4', "WhatsApp ile gönder")}</button>
          </form>
        </div>
      </section>

      <section className="map-section" aria-label={contentText('text_89a6e97ffda5334a', "Konum haritası")}>
        <iframe title={`${brand.facility} konumu`} src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="map-card">
          <Eyebrow>{contentText('text_cc8b7c8aadf02bff', "Konum")}</Eyebrow>
          <p><strong>{brand.facility}</strong><br />{brand.street}<br />{brand.city}</p>
          <a className="btn btn-primary" href={mapsLink} target="_blank" rel="noreferrer">
            {contentText('text_da9d6e1468775959', "Yol tarifi alın")}<Icon name="arrowUpRight" size={18} />
          </a>
        </div>
      </section>
    </>
  );
}
