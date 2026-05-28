import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import { Loader2 } from "lucide-react";
import { useAboutContent } from "@site/hooks/useAboutContent";

// Import home page section components
import StatsSection from "@site/components/home/StatsSection";
import HomeAboutSection from "@site/components/home/HomeAboutSection";
import PracticeAreasSection from "@site/components/home/PracticeAreasSection";
import AwardsSection from "@site/components/home/AwardsSection";
import TestimonialsSection from "@site/components/home/TestimonialsSection";
import VideoTestimonialsSection from "@site/components/home/VideoTestimonialsSection";
import AttorneysSection from "@site/components/home/AttorneysSection";
import BlogSection from "@site/components/home/BlogSection";
import FaqSection from "@site/components/home/FaqSection";
import ContactUsSection from "@site/components/home/ContactUsSection";

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
  const heroBackgroundImage = 'https://atzgmwcxbdnswerpqzzi.supabase.co/storage/v1/object/public/media/library/1779351750724-20d0za.webp';

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

        {/* Floating Badge */}
        {content.stats?.totalAmount && (
          <div
            className="absolute left-1/2 z-20 transform -translate-x-1/2"
            style={{
              bottom: '-60px',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              marginTop: '70px'
            }}
          >
            {/* Outer gold border frame - mobile */}
            <div className="md:hidden border-4 border-brand-accent bg-black" style={{ borderColor: '#C9A84C', maxWidth: '332px', padding: '16px' }}>
              {/* Inner gold border */}
              <div className="border-2 border-brand-accent bg-black text-center w-full" style={{ borderColor: '#C9A84C', padding: '24px 32px' }}>
                <div className="font-poppins font-bold text-white leading-tight" style={{ fontSize: '24px' }}>
                  {content.stats.totalAmount}
                </div>
                <div className="font-poppins font-semibold uppercase tracking-widest text-white" style={{ fontSize: '16px' }}>
                  {content.stats.totalLabel}
                </div>
              </div>
            </div>
            {/* Outer gold border frame - desktop */}
            <div className="hidden md:block border-4 border-brand-accent bg-black" style={{ borderColor: '#C9A84C', maxWidth: '332px', padding: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}>
              {/* Inner gold border */}
              <div className="border-2 border-brand-accent bg-black text-center w-full" style={{ borderColor: '#C9A84C', padding: '30px 40px' }}>
                <div className="font-poppins font-bold text-white leading-tight" style={{ fontSize: '28px' }}>
                  {content.stats.totalAmount}
                </div>
                <div className="font-poppins font-semibold uppercase tracking-widest text-white" style={{ fontSize: '18px' }}>
                  {content.stats.totalLabel}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Page Sections - same as home page */}
      <StatsSection content={content.stats} />
      <HomeAboutSection content={content.homeAbout} headingTag={content.headingTags?.["homeAbout.heading"]} />
      <PracticeAreasSection content={content.practiceAreasIntro} areas={content.practiceAreas} headingTag={content.headingTags?.["practiceAreasIntro.sectionLabel"]} />
      <AwardsSection content={content.awards} headingTag={content.headingTags?.["awards.sectionLabel"]} />
      <TestimonialsSection content={content.testimonials} headingTag={content.headingTags?.["testimonials.sectionLabel"]} />
      <VideoTestimonialsSection content={content.videoTestimonials} headingTag={content.headingTags?.["videoTestimonials.sectionLabel"]} />
      <AttorneysSection content={content.attorneys} headingTag={content.headingTags?.["attorneys.sectionLabel"]} />
      <BlogSection content={content.blog} headingTag={content.headingTags?.["blog.sectionLabel"]} />
      <FaqSection content={content.faq} headingTag={content.headingTags?.["faq.heading"]} />
      <ContactUsSection content={content.contact} headingTag={content.headingTags?.["contact.sectionLabel"]} />
    </Layout>
  );
}
