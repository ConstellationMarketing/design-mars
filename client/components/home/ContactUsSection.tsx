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
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        {data.heading && (
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block">
              {headingTag ? (
                // @ts-ignore
                <headingTag className="text-4xl md:text-5xl font-bold text-black block">
                  {data.heading}
                </headingTag>
              ) : (
                <h2 className="text-4xl md:text-5xl font-bold text-black">
                  {data.heading}
                </h2>
              )}
              <div className="h-px bg-brand-accent mt-4"></div>
            </div>
          </div>
        )}

        {/* Two Column Layout with text wrapping */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Left/Center - Content with wrapped image */}
          <div className="lg:col-span-2">
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
              <RichText
                html={data.description}
                className="font-poppins text-base md:text-lg leading-relaxed text-gray-700"
              />
            )}

            {/* Clear float after text */}
            <div className="clear-both"></div>
          </div>

          {/* Right Side - Form with shadow background */}
          <div className="lg:col-span-1 relative">
            {/* Shadow box background */}
            <div className="absolute inset-0 bg-gray-800 -z-10 transform translate-y-2 translate-x-2"></div>

            {/* Form container on black */}
            <div className="bg-black p-8 md:p-10 relative z-10">
              {/* Form Heading */}
              {data.formHeading && (
                <h3 className="font-poppins text-2xl md:text-3xl font-bold text-white mb-8">
                  {data.formHeading}
                </h3>
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
