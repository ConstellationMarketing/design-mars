import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import { Loader2 } from "lucide-react";
import { useAboutContent } from "@site/hooks/useAboutContent";

// Import page section components
import AboutPageAboutSection from "@site/components/about/AboutPageAboutSection";
import AboutValuesSection from "@site/components/about/AboutValuesSection";
import AwardsSection from "@site/components/home/AwardsSection";

export default function AboutUs() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = useAboutContent();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
        </div>
      </Layout>
    );
  }

  // Hero content from About page
  const heroContent = content.hero;
  const heroBackgroundImage = heroContent.backgroundImage || 'https://atzgmwcxbdnswerpqzzi.supabase.co/storage/v1/object/public/media/library/1779351750724-20d0za.webp';

  return (
    <Layout heroBackgroundImage={heroBackgroundImage}>
      <Seo
        title={title || "About Us"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      {/* Hero Section - same as home page */}
      <div className="w-full flex items-center justify-center py-[40px] md:py-[100px] pb-[100px] md:pb-[120px] relative overflow-visible" style={{ position: 'relative', overflow: 'visible' }}>
        {/* Dark overlay for text readability */}
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
            {heroContent.highlightedText && (
              <p className="font-poppins text-[48px] sm:text-[48px] md:text-[96px] font-bold leading-[1.0] text-white max-w-4xl">
                {heroContent.highlightedText}
              </p>
            )}

            {/* Full Headline - white uppercase in middle */}
            {heroContent.headline && (
              <p className="font-poppins text-[18px] md:text-[22px] font-semibold tracking-wider uppercase text-white max-w-[60%] mx-auto text-center">
                {heroContent.headline}
              </p>
            )}

            {/* H1 Title - small yellow text on bottom */}
            {heroContent.h1Title && (
              <h1 className="font-poppins text-[14px] md:text-[15px] font-normal tracking-widest uppercase text-brand-accent max-w-[60%] mx-auto text-center" style={{ marginTop: 0 }}>
                {heroContent.h1Title}
              </h1>
            )}

            {/* CTA Button wrapper */}
            <div className="border-2 border-brand-accent p-1 hover:border-black transition-all duration-300 hover:bg-white inline-block max-w-[80vw] md:max-w-none" style={{ marginTop: '30px', marginBottom: '70px' }}>
              {/* CTA Button */}
              <button
                onClick={() => window.location.href = '#contact-section'}
                className="font-poppins text-[18px] font-normal uppercase text-black bg-brand-accent px-6 py-3 border-2 border-black hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap"
                style={{ width: '100%' }}
              >
                {heroContent.buttonText || "Request Free Consultation"}
                <span className="text-xl">›</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* About Section - Custom Layout for About Page */}
      <AboutPageAboutSection content={content.homeAbout} headingTag={content.headingTags?.["homeAbout.heading"]} />

      {/* Page Sections */}
      <AboutValuesSection content={content.practiceAreasIntro} headingTag={content.headingTags?.["practiceAreasIntro.sectionLabel"]} />

      {/* Awards Section with white background override */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1280px] mx-auto w-[95%]">
          {/* Title */}
          {content.awards?.heading && (
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-[36px] md:text-[48px] font-bold text-black">
                  {content.awards.heading}
                </h2>
                <div className="h-px bg-brand-accent mt-4 max-w-[60%] mx-auto"></div>
              </div>
            </div>
          )}

          {/* Two-column centered layout */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
            maxWidth: "1280px",
            margin: "0 auto",
            flexDirection: "row",
          }} className="flex-col lg:flex-row">
            {/* Left side - Logo image with gold border */}
            {content.awards?.logoImage && (
              <div className="border border-brand-accent p-8 flex-shrink-0" style={{ maxWidth: "45%" }}>
                <img
                  src={content.awards.logoImage}
                  alt={content.awards.logoImageAlt || "Award Logo"}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Right side - Description and Team Photo */}
            <div style={{ maxWidth: "45%" }}>
              {content.awards?.description && (
                <div className="mb-12 text-base leading-relaxed text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: content.awards.description }} />
                </div>
              )}

              {content.awards?.teamImage && (
                <img
                  src={content.awards.teamImage}
                  alt={content.awards.teamImageAlt || "Team"}
                  loading="lazy"
                  className="w-full h-auto"
                  style={{
                    border: "2px solid #C9A84C",
                    boxShadow: "8px 8px 0px #C9A84C",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
