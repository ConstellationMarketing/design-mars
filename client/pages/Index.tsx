import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import ContactForm from "@site/components/home/ContactForm";
import StatsSection from "@site/components/home/StatsSection";
import HomeAboutSection from "@site/components/home/HomeAboutSection";
import PracticeAreasSection from "@site/components/home/PracticeAreasSection";
import AwardsSection from "@site/components/home/AwardsSection";
import TestimonialsSection from "@site/components/home/TestimonialsSection";
import VideoTestimonialsSection from "@site/components/home/VideoTestimonialsSection";
import AttorneysSection from "@site/components/home/AttorneysSection";
import BlogSection from "@site/components/home/BlogSection";
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
      <div className="min-h-screen w-full flex items-center justify-center py-[60px] md:py-[100px] pb-[40px] md:pb-[60px] relative">
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }}></div>

        {/* Content */}
        <div className="max-w-[1000px] w-[85%] md:w-[90%] relative z-10 text-center">
          <div className="flex flex-col items-center justify-center gap-5 md:gap-6">
            {/* H1 Title - BIGGEST at 96px on desktop, bold, white, 3-line */}
            {heroContent.h1Title && (
              <h1 className="font-poppins text-[48px] sm:text-[64px] md:text-[96px] font-bold leading-[1.0] text-white max-w-4xl">
                {heroContent.h1Title}
              </h1>
            )}

            {/* Full Headline - white uppercase below h1 title */}
            {heroContent.headline && (
              <p className="font-poppins text-[18px] md:text-[22px] font-normal tracking-wider uppercase text-white max-w-2xl">
                {heroContent.headline}
              </p>
            )}

            {/* Highlighted Text - gold text above button */}
            {heroContent.highlightedText && (
              <p className="font-poppins text-[14px] md:text-[15px] font-normal tracking-widest uppercase text-brand-accent mt-3 md:mt-4">
                {heroContent.highlightedText}
              </p>
            )}

            {/* CTA Button wrapper - outer gold border with padding */}
            <div className="inline-block border-2 border-brand-accent p-1 mt-5 md:mt-6 hover:border-black transition-all duration-300 hover:bg-white">
              {/* CTA Button with gold background and black border */}
              <button
                onClick={() => window.location.href = '#contact-section'}
                className="font-poppins text-[16px] md:text-[17px] font-medium uppercase text-black bg-brand-accent px-8 md:px-10 py-3 md:py-4 border-2 border-black hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center gap-3"
              >
                {heroContent.buttonText || "Request Free Consultation"}
                <span className="text-xl">›</span>
              </button>
            </div>
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

      {/* Stats Section */}
      <StatsSection content={content.stats} />

      {/* About Section */}
      <HomeAboutSection content={content.homeAbout} />

      {/* Practice Areas Section */}
      <PracticeAreasSection content={content.practiceAreasIntro} areas={content.practiceAreas} />

      {/* Awards & Membership Section */}
      <AwardsSection content={content.awards} headingTag={content.headingTags?.["awards.sectionLabel"]} />

      {/* Testimonials Section */}
      <TestimonialsSection content={content.testimonials} headingTag={content.headingTags?.["testimonials.sectionLabel"]} />

      {/* Video Testimonials Section */}
      <VideoTestimonialsSection content={content.videoTestimonials} headingTag={content.headingTags?.["videoTestimonials.sectionLabel"]} />

      {/* Meet the Attorneys Section */}
      <AttorneysSection content={content.attorneys} headingTag={content.headingTags?.["attorneys.sectionLabel"]} />

      {/* Blog Section */}
      <BlogSection content={content.blog} headingTag={content.headingTags?.["blog.sectionLabel"]} />

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
