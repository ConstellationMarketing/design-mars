import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import ContactForm from "@site/components/home/ContactForm";
import CallBox from "@site/components/shared/CallBox";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import { useContactContent } from "@site/hooks/useContactContent";
import { useGlobalPhone, useSiteSettings } from "@site/contexts/SiteSettingsContext";
import RichText from "@site/components/shared/RichText";
import DynamicHeading from "@site/components/shared/DynamicHeading";
import { Loader2 } from "lucide-react";

// Icon mapping for contact methods
const iconMap: Record<string, LucideIcon> = {
  Phone,
  Mail,
  MapPin,
  Clock,
};

export default function ContactPage() {
  const { content, meta, title, publishedAt, updatedAt, isLoading } = useContactContent();
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();
  const { settings } = useSiteSettings();

  // Map contact methods from CMS content
  const contactMethods = content.contactMethods.methods.map((method) => {
    let detail = method.detail;
    let subDetail = method.subDetail;

    // Fallback to Site Settings when CMS fields are empty
    if (method.title === "Phone" && !detail) {
      detail = phoneDisplay;
    }
    if (method.title === "Office") {
      if (!detail) detail = settings.addressLine1 || "";
      if (!subDetail) subDetail = settings.addressLine2 || "";
    }

    return {
      icon: method.icon,
      title: method.title,
      detail,
      subdDetail: subDetail,
    };
  });

  // Map office hours from CMS content
  const officeHours = content.officeHours.items;

  // Map process steps from CMS content
  const whatToExpect = content.process.steps;

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
        </div>
      </Layout>
    );
  }

  const heroContent = content.hero;
  const heroBackgroundImage = heroContent.backgroundImage || 'https://atzgmwcxbdnswerpqzzi.supabase.co/storage/v1/object/public/media/library/1779351750724-20d0za.webp';

  return (
    <Layout heroBackgroundImage={heroBackgroundImage}>
      <Seo
        title={title || "Contact Us"}
        meta={meta}
        pageContent={content}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      {/* Hero Section */}
      <div className="w-full flex items-center justify-center py-[40px] md:py-[100px] pb-[100px] md:pb-[120px] relative overflow-visible">
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
              <h1 className="font-poppins text-[16px] font-normal tracking-widest uppercase text-brand-accent max-w-[60%] mx-auto text-center" style={{ marginTop: 0 }}>
                {heroContent.h1Title}
              </h1>
            )}

            {/* CTA Button wrapper */}
            <div className="border-2 border-brand-accent p-1 hover:border-black transition-all duration-300 hover:bg-white inline-block max-w-[80vw] md:max-w-none" style={{ marginTop: '30px', marginBottom: '70px' }}>
              {/* CTA Button */}
              <button
                onClick={() => window.location.href = `tel:${heroContent.phone}`}
                className="font-poppins text-[18px] font-normal uppercase text-black bg-brand-accent px-6 py-3 border-2 border-black hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap"
                style={{ width: '100%' }}
              >
                {heroContent.buttonText || "Call Now"}
                <span className="text-xl">›</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Contact Methods Section */}
      <div className="bg-white" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Section Heading */}
          <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '12px', color: '#111' }}>
            {content.contactMethods.heading || "Get In Touch Today"}
          </h2>
          <div style={{ width: '80px', height: '2px', background: '#C9A84C', margin: '0 auto 48px' }}></div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              // Get fallback Lucide icon based on title
              const getFallbackIcon = (title: string) => {
                if (title === "Phone") return Phone;
                if (title === "Office" || title === "Visit Us") return MapPin;
                if (title === "Email") return Mail;
                return Phone;
              };

              const FallbackIcon = getFallbackIcon(method.title);

              return (
                <div
                  key={index}
                  style={{
                    border: '1px solid rgb(229, 231, 235)',
                    padding: '32px 24px',
                    textAlign: 'center',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'border-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border = '1px solid #C9A84C';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border = '1px solid rgb(229, 231, 235)';
                  }}
                >
                  {/* Icon in gold square */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    {method.icon ? (
                      <img src={method.icon} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                    ) : (
                      <FallbackIcon style={{ width: '40px', height: '40px', color: '#C9A84C' }} />
                    )}
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111', margin: '0 0 8px 0' }}>
                    {method.title}
                  </h3>

                  {/* Main value (phone/address/email) */}
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#C9A84C', margin: '0 0 8px 0' }}>
                    {method.title === "Phone" ? (
                      <a href={`tel:${method.detail.replace(/\D/g, "")}`} style={{ color: '#C9A84C', textDecoration: 'none' }}>
                        {method.detail}
                      </a>
                    ) : (
                      method.detail
                    )}
                  </p>

                  {/* Sub text */}
                  <p style={{ fontSize: '16px', color: '#888', margin: 0 }}>
                    {method.subdDetail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <style>{`
            @media (max-width: 768px) {
              .form-layout {
                flex-direction: column !important;
              }
              .form-benefits {
                padding-left: 0 !important;
                padding-top: 24px;
              }
            }
          `}</style>

          <div className="form-layout" style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', gap: '0' }}>
            {/* Left Side - Dark Form */}
            <div style={{ background: '#111', padding: '40px', flex: '1' }}>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ color: '#fff', fontSize: '30px', fontWeight: '700', marginBottom: '12px', fontFamily: 'Poppins, sans-serif', margin: '0 0 12px 0' }}>
                  {content.form.formTitle}
                </h2>
                <div style={{ width: '80px', height: '1px', background: '#d1ab58' }}></div>
              </div>
              <ContactForm />
            </div>

            {/* Right Side - Benefits */}
            <div className="form-benefits" style={{ flex: '1', paddingLeft: '48px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111', marginBottom: '32px', fontFamily: 'Poppins, sans-serif', margin: '0 0 32px 0' }}>
                {content.form.benefitsTitle}
              </h3>
              {content.form.benefits.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '24px' }}>
                  {item.icon && (
                    <img src={item.icon} alt="" style={{ width: '48px', height: '48px', objectFit: 'contain', flexShrink: 0 }} />
                  )}
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#111', margin: '0 0 6px 0', fontFamily: 'Poppins, sans-serif' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Office Hours Section */}
      <div className="bg-brand-dark py-[40px] md:py-[60px]">
        <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
          {/* Office Hours */}
          <div className="bg-brand-card border border-brand-border p-[30px] md:p-[40px] mb-[30px] md:mb-[40px] max-w-[600px]">
            <div className="flex items-center gap-3 mb-[20px]">
              <div className="bg-brand-accent p-[15px]">
                <Clock
                  className="w-[30px] h-[30px] text-black"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-poppins text-[24px] md:text-[28px] leading-tight text-black font-bold">
                {content.officeHours.heading}
              </h3>
            </div>
            <div className="space-y-[15px]">
              {officeHours.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pb-[15px] border-b border-brand-border/50 last:border-0 last:pb-0"
                >
                  <span className="font-poppins text-[16px] md:text-[18px] text-black/80">
                    {item.day}
                  </span>
                  <span className="font-poppins text-[16px] md:text-[18px] text-brand-accent font-medium">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
            {content.officeHours.note && (
              <div className="mt-[25px] pt-[25px] border-t border-brand-border/50">
                <RichText
                  html={content.officeHours.note}
                  className="font-poppins text-[14px] md:text-[16px] text-black/70 leading-[22px] md:leading-[24px]"
                />
              </div>
            )}
          </div>

          {/* Call to Action Boxes */}
          <div className="space-y-[20px] max-w-[600px]">
            <CallBox
              icon={Phone}
              title={phoneLabel}
              subtitle={phoneDisplay}
              phone={phoneNumber}
              className="w-full max-w-none"
            />
            <CallBox
              icon={Calendar}
              title={content.cta.secondaryButton.label}
              subtitle={content.cta.secondaryButton.sublabel}
              className="w-full max-w-none"
            />
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="bg-white py-[40px] md:py-[60px]">
        <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[80%]">
          <div className="text-center mb-[30px] md:mb-[50px]">
            <div className="mb-[10px]">
              <DynamicHeading
                tag={content.headingTags?.["process.sectionLabel"]}
                defaultTag="h2"
                className="font-poppins text-[18px] md:text-[24px] leading-tight md:leading-[36px] text-brand-accent"
              >
                {content.process.sectionLabel}
              </DynamicHeading>
            </div>
            <p className="font-poppins text-[32px] md:text-[48px] lg:text-[54px] leading-tight md:leading-[54px] text-black font-bold">
              {content.process.heading}
            </p>
            {content.process.subtitle && (
              <p className="font-poppins text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-black/80 mt-[15px]">
                {content.process.subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {whatToExpect.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-[20px] flex justify-center">
                  <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] bg-brand-accent flex items-center justify-center">
                    <span className="font-poppins text-[32px] md:text-[40px] text-black font-bold">
                      {item.number}
                    </span>
                  </div>
                </div>
                <h3 className="font-poppins text-[22px] md:text-[26px] leading-tight text-black pb-[12px] font-bold">
                  {item.title}
                </h3>
                <RichText
                  html={item.description}
                  className="font-poppins text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] text-black/80"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-brand-dark py-[40px] md:py-[60px]">
        <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%]">
          <div className="text-center mb-[30px] md:mb-[40px]">
            <h2 className="font-poppins text-[32px] md:text-[48px] leading-tight text-black pb-[10px] font-bold">
              {content.visitOffice.heading}
            </h2>
            {content.visitOffice.subtext && (
              <RichText
                html={content.visitOffice.subtext}
                className="font-poppins text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-black/80"
              />
            )}
          </div>

          <div className="bg-brand-card border border-brand-border p-[20px] md:p-[30px]">
            <iframe
              src={content.visitOffice.mapEmbedUrl || settings.mapEmbedUrl}
              width="100%"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px] md:h-[450px]"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
}
