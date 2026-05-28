import type { ContactContent } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
import CmsFormRenderer from "@site/components/shared/CmsFormRenderer";

interface ContactUsSectionProps {
  content?: ContactContent;
  headingTag?: string;
}

export default function ContactUsSection({ content, headingTag }: ContactUsSectionProps) {
  if (!content || (!content.heading && !content.sectionLabel)) {
    return null;
  }

  const data = content;

  return (
    <div className="w-full py-16 md:py-24 bg-white" id="contact-section">
      <div className="max-w-[1280px] mx-auto w-[95%]">
        {/* Title */}
        {data.heading && (
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block">
              <div
                dangerouslySetInnerHTML={{ __html: data.heading }}
                className="text-2xl md:text-[48px] font-bold text-black leading-tight block"
              />
              <div className="h-px bg-brand-accent mt-4 max-w-[60%] mx-auto"></div>
            </div>
          </div>
        )}

        {/* Two Column Layout with equal widths and text wrapping */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left - Content with wrapped image */}
          <div>
            {/* Badge/Icon - floated left so text wraps around */}
            {data.image && (
              <div className="float-left mr-8 mb-4">
                <img
                  src={data.image}
                  alt={data.imageAlt || "Badge"}
                  loading="lazy"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </div>
            )}

            {/* Description Text - wraps around image */}
            {data.description && (
              <div className="description-block">
                <RichText
                  html={data.description}
                  className="font-poppins text-base md:text-lg leading-relaxed text-gray-700"
                />
              </div>
            )}

            {/* Clear float after text */}
            <div className="clear-both"></div>
          </div>

          {/* Right Side - Form with gold shadow box */}
          <div className="relative">
            {/* Gold shadow box behind */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "#cfab57",
                transform: "translate(12px, 12px)",
                zIndex: 0
              }}
            ></div>

            {/* Form container on black with gold right border */}
            <div
              className="bg-black p-8 md:p-10 border-r-4 relative z-10"
              style={{ borderRightColor: "#cfab57" }}
            >
              {/* Form Heading with gold underline */}
              {data.formHeading && (
                <div className="pb-4 mb-8" style={{ borderBottomColor: "#cfab57", borderBottomWidth: "1px" }}>
                  <h3 className="font-poppins text-2xl md:text-3xl font-bold text-white">
                    {data.formHeading}
                  </h3>
                </div>
              )}

              {/* Form */}
              <CmsFormRenderer
                formId="contact"
                className="space-y-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
