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
            <div style={{ background: '#111', padding: '40px', flex: '1', boxShadow: '8px 8px 0px #d1ab58' }}>
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
              <h3 style={{ fontSize: '30px', fontWeight: '700', color: '#111', marginBottom: '32px', fontFamily: 'Poppins, sans-serif', margin: '0 0 32px 0' }}>
                {content.form.benefitsTitle}
              </h3>
              {content.form.benefits.map((item, index) => (
                <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '24px' }}>
                  {item.icon && (
                    <img src={item.icon} alt="" style={{ width: index === 0 ? '96px' : '32px', height: index === 0 ? '96px' : '32px', objectFit: 'contain', flexShrink: 0 }} />
                  )}
                  <div>
                    <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#111', margin: '0 0 6px 0', fontFamily: 'Poppins, sans-serif' }}>
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

      {/* Office Hours & Information Section */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <style>{`
            .office-hours-grid {
              display: grid;
              gridTemplateColumns: 1fr 1fr;
              gap: 48px;
              marginTop: 40px;
            }
            @media (max-width: 768px) {
              .office-hours-grid {
                gridTemplateColumns: 1fr;
                gap: 32px;
              }
            }
          `}</style>

          {/* LEFT COLUMN: Office Hours & Expectations */}
          <div className="office-hours-grid">
            <div>
              {/* Heading */}
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111', marginBottom: '24px' }}>
                {content.officeHours.sectionTitle}
              </h2>

              {/* Hours Card */}
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '0', marginBottom: '32px' }}>
                {content.officeHours.hours.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '16px 24px',
                      borderBottom: i < content.officeHours.hours.length - 1 ? '1px solid #e5e7eb' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '16px', color: '#111' }}>{row.day}</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: row.highlight ? '#d1ab58' : '#888' }}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* What to Expect */}
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111', marginTop: '32px', marginBottom: '16px' }}>
                {content.officeHours.expectationsTitle}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {content.officeHours.expectations.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      fontSize: '15px',
                      color: '#333',
                      marginBottom: '12px'
                    }}
                  >
                    <span style={{ color: '#d1ab58', fontWeight: '700', fontSize: '18px', lineHeight: '1.3' }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT COLUMN: Office Info */}
            <div>
              {/* Heading */}
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111', marginBottom: '24px' }}>
                {content.officeInfo.sectionTitle}
              </h2>

              {/* Map Placeholder */}
              <div
                style={{
                  background: '#d1d5db',
                  height: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}
              >
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Interactive Map Coming Soon</span>
              </div>

              {/* Address Card */}
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '24px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', margin: '0 0 16px 0' }}>
                  {content.officeInfo.firmName}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                  {/* Address */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <MapPin
                      style={{
                        width: '18px',
                        height: '18px',
                        color: '#d1ab58',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    />
                    <div>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>
                        {content.officeInfo.address}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                        {content.officeInfo.city}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Phone
                      style={{
                        width: '18px',
                        height: '18px',
                        color: '#d1ab58',
                        flexShrink: 0
                      }}
                    />
                    <span style={{ fontSize: '15px', fontWeight: '700' }}>
                      {content.officeInfo.phone}
                    </span>
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Mail
                      style={{
                        width: '18px',
                        height: '18px',
                        color: '#d1ab58',
                        flexShrink: 0
                      }}
                    />
                    <span style={{ fontSize: '15px' }}>
                      {content.officeInfo.email}
                    </span>
                  </div>
                </div>

                {/* Note */}
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                  <p style={{ fontSize: '13px', color: '#888', fontStyle: 'italic', margin: 0 }}>
                    {content.officeInfo.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
