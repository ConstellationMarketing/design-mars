import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import { usePracticeAreasContent } from "@site/hooks/usePracticeAreasContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import { Loader2 } from "lucide-react";
import PracticeAreasSection from "@site/components/home/PracticeAreasSection";
import PracticeAreasValuesSection from "@site/components/practice-areas/PracticeAreasValuesSection";

export default function PracticeAreas() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = usePracticeAreasContent();
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
        </div>
      </Layout>
    );
  }

  const heroBackgroundImage = content.hero.backgroundImage || 'https://atzgmwcxbdnswerpqzzi.supabase.co/storage/v1/object/public/media/library/1779351750724-20d0za.webp';

  return (
    <Layout heroBackgroundImage={heroBackgroundImage}>
      <Seo
        title={title || "Practice Areas"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      {/* ========== Section 1: Hero ========== */}
      <div className="w-full flex items-center justify-center py-[40px] md:py-[100px] pb-[100px] md:pb-[120px] relative overflow-visible">
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1
        }}></div>

        {/* Content */}
        <div className="max-w-[1000px] w-[85%] md:w-[90%] relative z-10 text-center" style={{ paddingTop: '35px' }}>
          <div className="flex flex-col items-center justify-center gap-5 md:gap-6">
            {/* Highlighted Text - large white text on top */}
            {content.hero.highlightedText && (
              <p className="font-poppins text-[48px] sm:text-[48px] md:text-[96px] font-bold leading-[1.0] text-white max-w-4xl">
                {content.hero.highlightedText}
              </p>
            )}

            {/* Headline - white uppercase in middle */}
            {content.hero.headline && (
              <p className="font-poppins text-[18px] md:text-[22px] font-semibold tracking-wider uppercase text-white max-w-[60%] mx-auto text-center">
                {content.hero.headline}
              </p>
            )}

            {/* H1 Title - small yellow text on bottom */}
            {content.hero.h1Title && (
              <h1 className="font-poppins text-[14px] md:text-[15px] font-normal tracking-widest uppercase text-brand-accent max-w-[60%] mx-auto text-center" style={{ marginTop: 0 }}>
                {content.hero.h1Title}
              </h1>
            )}

            {/* Tagline */}
            {content.hero.tagline && (
              <p className="font-poppins text-[16px] md:text-[18px] text-white/90 max-w-[700px] mt-2">
                {content.hero.tagline}
              </p>
            )}

            {/* CTA Button wrapper */}
            {content.hero.buttonText && (
              <div className="border-2 border-brand-accent p-1 hover:border-black transition-all duration-300 hover:bg-white inline-block max-w-[80vw] md:max-w-none" style={{ marginTop: '30px', marginBottom: '70px' }}>
                {/* CTA Button */}
                <button
                  onClick={() => window.location.href = '#contact-section'}
                  className="font-poppins text-[18px] font-normal uppercase text-black bg-brand-accent px-6 py-3 border-2 border-black hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap"
                  style={{ width: '100%' }}
                >
                  {content.hero.buttonText}
                  <span className="text-xl">›</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========== Section 2: Practice Areas Intro ========== */}
      <PracticeAreasSection 
        content={content.practiceAreasIntro}
        areas={content.practiceAreas}
      />

      {/* ========== Section 3: Values ========== */}
      <PracticeAreasValuesSection
        content={content.values}
        headingTag={content.headingTags?.["values.valuesTitle"]}
      />

      {/* ========== Section 4: Practice Items ========== */}
      <section style={{ background: '#f5f5f5', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {content.practiceItems && content.practiceItems.map((item, index) => (
            <div key={item.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'center',
              direction: index % 2 === 0 ? 'ltr' : 'rtl'
            }}>
              <div style={{ direction: 'ltr' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  {item.icon && <img src={item.icon} alt="" style={{ width: '32px', height: '32px' }} />}
                  <h3 style={{ fontSize: '30px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{item.title}</h3>
                </div>
                <p style={{ fontSize: '18px', color: '#444', marginBottom: '20px', lineHeight: '1.7' }}>{item.description}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {item.bullets && item.bullets.map((bullet, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#333' }}>
                      <span style={{ color: '#C9A84C', fontWeight: '700' }}>›</span> {bullet}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <a
                    href={item.learnMoreUrl}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = '#C9A84C';
                      (e.currentTarget as HTMLElement).style.color = '#111';
                      (e.currentTarget as HTMLElement).style.outlineColor = '#111';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = '#555';
                      (e.currentTarget as HTMLElement).style.outlineColor = '#C9A84C';
                    }}
                    style={{ padding: '10px 22px', border: '1px solid #C9A84C', outline: '1px solid #C9A84C', outlineOffset: '4px', color: '#555', background: 'transparent', textDecoration: 'none', fontSize: '14px', fontWeight: '400', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    Learn More ›
                  </a>
                  <a
                    href={item.getHelpUrl}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = '#fff';
                      (e.currentTarget as HTMLElement).style.color = '#C9A84C';
                      (e.currentTarget as HTMLElement).style.outlineColor = '#111';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = '#C9A84C';
                      (e.currentTarget as HTMLElement).style.color = '#111';
                      (e.currentTarget as HTMLElement).style.outlineColor = '#C9A84C';
                    }}
                    style={{ padding: '10px 22px', border: '1px solid #8B6914', outline: '1px solid #C9A84C', outlineOffset: '4px', background: '#C9A84C', color: '#111', textDecoration: 'none', fontSize: '14px', fontWeight: '400', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    Get Help Now ›
                  </a>
                </div>
              </div>
              <div style={{ direction: 'ltr' }}>
                {item.image && <img src={item.image} alt={item.title} style={{ width: '100%', height: '380px', objectFit: 'cover' }} />}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
