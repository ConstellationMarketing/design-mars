import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import { usePracticeAreasContent } from "@site/hooks/usePracticeAreasContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import { Loader2 } from "lucide-react";
import PracticeAreasSection from "@site/components/home/PracticeAreasSection";
import AboutValuesSection from "@site/components/about/AboutValuesSection";

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
        <div className="max-w-[1000px] w-[85%] md:w-[90%] relative z-10 text-center">
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

            {/* CTA Button */}
            {content.hero.buttonText && (
              <a
                href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                className="mt-8 md:mt-10 bg-brand-accent px-8 py-4 font-poppins text-[18px] font-bold text-black hover:bg-brand-accent-dark transition-colors inline-block"
              >
                {content.hero.buttonText}
              </a>
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
      <AboutValuesSection 
        content={content.values}
        headingTag={content.headingTags?.["values.valuesTitle"]}
      />
    </Layout>
  );
}
