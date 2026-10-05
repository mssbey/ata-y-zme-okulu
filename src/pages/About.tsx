import { contentText } from '../content/store';
import { Link } from 'react-router-dom';
import { brand, mapsLink, values } from '../data/site';
import { ArrowLink, CtaBand, Eyebrow, Icon, type IconName, Img, PageHero, SectionHeading, usePageMeta } from '../components/ui';

const valueIcons: IconName[] = ['shield', 'book', 'award', 'users', 'layers', 'eye'];

export default function About() {
  usePageMeta(contentText('text_4880b93c7b77b50a', "Kurumsal"), contentText('text_b532d1b5e4c2f4aa', "Ata Yüzme Spor Kulübü; Türkiye Yüzme Federasyonu’na bağlı, Yakacık Yüzme Havuzu’nda her yaş grubuna bilimsel yüzme eğitimi sunan bir spor kulübüdür."));
  return (
    <>
      <PageHero
        eyebrow={contentText('text_4880b93c7b77b50a', "Kurumsal")}
        title={<>{contentText('text_9c1057cd2c307068', "Suda güven,")}<br />{contentText('text_8cf5885de763c757', "kulvarda disiplin.")}</>}
        lead={contentText('text_54561bef17c81aef', "Ata Yüzme Spor Kulübü; her yaş grubuna bilimsel yüzme eğitimi sunan, sporcu yetiştiren ve ulusal–uluslararası yarışlarda yer alan, Türkiye Yüzme Federasyonu’na bağlı bir spor kulübüdür.")}
        image="takim-bayrak-3"
        alt={contentText('text_b7197b1a005a5a52', "Ata Yüzme sporcuları ve antrenörleri kulüp bayrağıyla")}
        position="50% 45%"
        crumbs={[{ label: contentText('text_4880b93c7b77b50a', "Kurumsal") }]}
      />

      <section className="section">
        <div className="wrap about-grid">
          <div className="reveal">
            <Eyebrow>{contentText('text_275c6ddbb351b57c', "Hakkımızda")}</Eyebrow>
            <h2 className="display-2">{contentText('text_dc3e6683753e75d3', "Yüzmeyi bir yaşam becerisi, sporu bir karakter okulu olarak görüyoruz.")}</h2>
          </div>
          <div className="about-text reveal">
            <p className="lead">{contentText('text_63ccd02115bb501a', "Kartal Yakacık’ta, Yakacık Yüzme Havuzu’nda faaliyet gösteren kulübümüz; minik yaştan yetişkinliğe kadar her yaş grubuna, gelişim dönemine uygun ve bilimsel temelli yüzme eğitimi sunar.")}</p>
            <p>{contentText('text_af3df150c3320762', "Eğitim modelimiz; suya adaptasyonla başlayan, dört branşta teknik öğrenmeyle derinleşen ve isteyen öğrenciler için lisanslı sporculuğa uzanan aşamalı bir yapıya dayanır. Grup derslerimiz en fazla 6 kişiden oluşur; böylece her öğrenci eğitmeninin yakın takibinde ilerler.")}</p>
            <p>{contentText('text_8e8acb24031ee85b', "Performans takımımızın sporcuları, Türkiye Yüzme Federasyonu çatısı altında ulusal ve uluslararası yarışlarda kulübümüzü temsil eder. Bizim için başarı; kürsüdeki madalyalar kadar, suda kendine güvenen her öğrencinin ilk kulacıdır.")}</p>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap mission-grid">
          <article className="mission-card reveal">
            <span className="mission-label">{contentText('text_9cfb4f0b386365b8', "Misyonumuz")}</span>
            <p>{contentText('text_843d417f1c2ed606', "Her yaştan bireye güvenli, nitelikli ve bilimsel temelli yüzme eğitimi sunarak yüzmeyi yaşam boyu sürdürülebilir bir spor alışkanlığına dönüştürmek.")}</p>
          </article>
          <article className="mission-card is-dark reveal">
            <span className="mission-label">{contentText('text_6a4b4a435ed20722', "Vizyonumuz")}</span>
            <p>{contentText('text_522de9b540c31d18', "Yetiştirdiği sporcularla ulusal ve uluslararası arenada adından söz ettiren, eğitim kalitesiyle örnek gösterilen bir yüzme kulübü olmak.")}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow={contentText('text_c808f37ab920f95d', "Değerlerimiz")} title={contentText('text_fcd235c34d083f70', "Eğitim anlayışımızın temelleri.")} align="split" lead={contentText('text_3c505d4d03072efb', "Kulübümüzü tercih eden ailelerin ve sporcuların bize duyduğu güvenin arkasında, her gün özenle sürdürdüğümüz ilkeler var.")} />
          <ul className="value-grid">
            {values.map((v, i) => (
              <li key={v.title} className="reveal">
                <span className="why-icon"><Icon name={valueIcons[i]} size={24} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap split-feature">
          <div className="split-feature-media reveal">
            <Img name="antrenor-kenar-2" alt={contentText('text_c4e5937cf518b9d9', "Ata Yüzme antrenörü havuz kenarından antrenmanı takip ediyor")} sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
          <div className="reveal">
            <Eyebrow light>{contentText('text_cd743d031661e635', "Eğitmen kadromuz")}</Eyebrow>
            <h2 className="display-2">{contentText('text_c4d5eedcd140665c', "Akademik bilgi, sporcu tecrübesiyle buluşuyor.")}</h2>
            <p className="lead">{contentText('text_72ef8d8f9d9d547b', "Yüzme eğitmenlerimizin tamamı üniversitelerin beden eğitimi ve spor yüksekokullarından (BESYO) mezun akademisyenler ve/veya uzun yıllar yüzücülük yapmış eski sporculardan oluşur.")}</p>
            <ul className="check-list is-light">
              <li><Icon name="check" size={18} /> {contentText('text_372863324f7fc0e9', "Yaş ve gelişim dönemine uygun eğitim planlaması")}</li>
              <li><Icon name="check" size={18} /> {contentText('text_8389906e1232181b', "Dört branşta teknik eğitim yetkinliği")}</li>
              <li><Icon name="check" size={18} /> {contentText('text_b892d430fa1ab5cc', "Küçük gruplarla her öğrenciye yakın takip")}</li>
              <li><Icon name="check" size={18} /> {contentText('text_8cee52e41731f329', "Performans sporcuları için yarış odaklı antrenman")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="tesis">
        <div className="wrap">
          <SectionHeading eyebrow={contentText('text_0c939a8e3e6ea4d1', "Tesisimiz")} title={<>{contentText('text_ba84abb6de517b29', "Yakacık")}<br />{contentText('text_d539c6f0fa3ad47f', "Yüzme Havuzu.")}</>} align="split" lead={contentText('text_4c03bca4e1f6203f', "İstanbul Anadolu Yakası’nda, Kartal Yakacık’ta yer alan kapalı havuzda eğitimlerimizi sürdürüyoruz. Kayıt öncesinde randevu alarak tesisimizi ziyaret edebilirsiniz.")} />
          <div className="facility-grid reveal">
            <Img name="havuz-kulvarlar" alt={contentText('text_6e0a90ee3cc5638e', "Yakacık Yüzme Havuzu’nda kulvarlara ayrılmış kapalı havuz")} className="f1" sizes="(max-width: 800px) 100vw, 60vw" />
            <Img name="havuz-cocuklar" alt={contentText('text_e547b9ec843f7825', "Havuz kenarında eğitim alan çocuklar")} className="f2" sizes="(max-width: 800px) 100vw, 40vw" />
            <div className="facility-card f3">
              <Icon name="pin" size={26} />
              <p><strong>{brand.facility}</strong><br />{brand.street}<br />{brand.city}</p>
              <a className="arrow-link" href={mapsLink} target="_blank" rel="noreferrer">
                <span>{contentText('text_da9d6e1468775959', "Yol tarifi alın")}</span> <Icon name="arrow" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap split-feature is-reverse">
          <div className="split-feature-media reveal">
            <Img name="podyum-yurtdisi" alt={contentText('text_5e45b4096dcab53c', "Uluslararası yarışta kürsüde Ata Yüzme sporcuları")} sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
          <div className="reveal">
            <Eyebrow>{contentText('text_66cef8b5d39cc927', "Sporcu gelişimi")}</Eyebrow>
            <h2 className="display-2">{contentText('text_47b0dd9d8be70514', "Kurstan takıma, takımdan kürsüye.")}</h2>
            <p className="lead">{contentText('text_0d6695375a2aec09', "Kurslarımızdan mezun olan öğrenciler, antrenör gözlemiyle performans takımına geçer. Lisanslı sporcularımız, yaş gruplarına göre planlanan antrenman programlarıyla yarışlara hazırlanır.")}</p>
            <div className="btn-row">
              <Link className="btn btn-primary" to="/programlar/performans-yuzme">{contentText('text_c01e6fbf15155834', "Performans programı")}<Icon name="arrow" size={18} /></Link>
              <ArrowLink to="/galeri">{contentText('text_3718ff8766bca6eb', "Sporcularımız")}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
