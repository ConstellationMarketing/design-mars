import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import ContactForm from "@site/components/home/ContactForm";
import AboutSection from "@site/components/home/AboutSection";
import PracticeAreasSection from "@site/components/home/PracticeAreasSection";
import PracticeAreasGrid from "@site/components/home/PracticeAreasGrid";
import AwardsSection from "@site/components/home/AwardsSection";
import TestimonialsSection from "@site/components/home/TestimonialsSection";
import ProcessSection from "@site/components/home/ProcessSection";
import GoogleReviewsSection from "@site/components/home/GoogleReviewsSection";
import FaqSection from "@site/components/home/FaqSection";
import ContactUsSection from "@site/components/home/ContactUsSection";
import { useHomeContent } from "@site/hooks/useHomeContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import { Loader2 } from "lucide-react";

export default function Index() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = useHomeContent();
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

  // Use CMS content for hero and partner logos
  const heroContent = content.hero;
  const partnerLogos = content.partnerLogos;

  const heroBackgroundImage = 'https://atzgmwcxbdnswerpqzzi.supabase.co/storage/v1/object/public/media/library/1779351750724-20d0za.webp';

  return (
    <Layout heroBackgroundImage={heroBackgroundImage}>
      <Seo
        title={title || "Home"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      {/* Hero Section - Full Width */}
      <div className="min-h-screen w-full flex items-center justify-center py-[60px] md:py-[100px] relative">
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}></div>

        {/* Content */}
        <div className="max-w-[2560px] w-[95%] relative z-10 text-center">
          <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
            {/* Main Headline */}
            <h1 className="font-poppins text-[clamp(2.5rem,8vw,70px)] font-bold leading-[1.1] text-white">
              {heroContent.headline && heroContent.highlightedText && heroContent.headline.includes(heroContent.highlightedText)
                ? (() => {
                    const idx = heroContent.headline.indexOf(heroContent.highlightedText);
                    const before = heroContent.headline.slice(0, idx);
                    const match = heroContent.highlightedText;
                    const after = heroContent.headline.slice(idx + match.length);
                    return (
                      <>
                        {before}
                        <span className="text-brand-accent">{match}</span>
                        {after}
                      </>
                    );
                  })()
                : heroContent.headline}
            </h1>

            {/* Subheading */}
            {heroContent.h1Title && (
              <p className="font-poppins text-[18px] md:text-[22px] font-normal tracking-wide uppercase text-white/90">
                {heroContent.h1Title}
              </p>
            )}

            {/* Tagline in gold */}
            {heroContent.tagline && (
              <p className="font-poppins text-[14px] md:text-[16px] font-normal tracking-widest uppercase text-brand-accent">
                {heroContent.tagline}
              </p>
            )}

            {/* CTA Button */}
            <button
              onClick={() => window.location.href = '#contact-section'}
              className="font-poppins text-[16px] md:text-[18px] font-normal uppercase text-white bg-transparent px-10 py-3 border-[3px] border-brand-accent hover:bg-brand-accent hover:text-black transition-all duration-300 mt-4"
            >
              {heroContent.buttonText || "Request Free Consultation"}
            </button>
          </div>
        </div>
      </div>

      {/* Partner Badges Section - Bottom of Hero */}
      {partnerLogos.length > 0 && (
        <div className="bg-brand-dark py-[20px] md:py-[30px]">
          <div className="max-w-[2560px] mx-auto w-[95%]">
            <div className="bg-brand-card border border-brand-border py-[10px] px-0 flex flex-nowrap justify-center overflow-hidden">
              {partnerLogos.map((logo, index) => (
                <div
                  key={index}
                  className="px-[8px] sm:px-[15px] md:px-[30px] py-2 flex items-center justify-center flex-shrink"
                >
                  <div className="text-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[190px] max-w-full inline-block"
                      width={190}
                      height={123}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Us Section */}
      <AboutSection content={content.about} headingTag={content.headingTags?.["about.sectionLabel"]} />

      {/* Practice Areas Section */}
      <PracticeAreasSection content={content.practiceAreasIntro} />

      {/* Practice Areas Grid */}
      <PracticeAreasGrid areas={content.practiceAreas} />

      {/* Awards & Membership Section */}
      <AwardsSection content={content.awards} headingTag={content.headingTags?.["awards.sectionLabel"]} />

      {/* Testimonials Section */}
      <TestimonialsSection content={content.testimonials} headingTag={content.headingTags?.["testimonials.sectionLabel"]} />

      {/* Process Section */}
      <ProcessSection content={content.process} headingTags={content.headingTags} />

      {/* Google Reviews Section */}
      <GoogleReviewsSection content={content.googleReviews} headingTag={content.headingTags?.["googleReviews.sectionLabel"]} />

      {/* FAQ Section */}
      <FaqSection content={content.faq} />

      {/* Contact Us Section */}
      <ContactUsSection content={content.contact} headingTag={content.headingTags?.["contact.sectionLabel"]} />
    </Layout>
  );
}
