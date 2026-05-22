import type { AwardsContent } from "@site/lib/cms/homePageTypes";
import DynamicHeading from "@site/components/shared/DynamicHeading";

interface AwardsSectionProps {
  content?: AwardsContent;
  headingTag?: string;
}

export default function AwardsSection({ content, headingTag }: AwardsSectionProps) {
  // Guard: if no logos, don't render
  if (!content || !content.logos || content.logos.length === 0) {
    return null;
  }

  const data = content;
  const logos = data.logos;
  // Use first logo as the main image on the right side
  const mainImage = logos[0];
  const gridLogos = logos.slice(1);

  return (
    <div className="w-full py-12 md:py-16" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-[2560px] mx-auto w-[95%]">
        {/* Heading with gold underline */}
        {data.heading && (
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-poppins text-[32px] md:text-[42px] font-bold text-black max-w-3xl mx-auto leading-tight">
              {data.heading}
            </h2>
            <div className="w-24 h-px bg-brand-accent mx-auto mt-6"></div>
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left side - Logo grid with border */}
          <div className="border border-brand-accent p-8 md:p-10 bg-white">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {gridLogos.map((logo, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={80}
                    loading="lazy"
                    className="max-w-full max-h-[80px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Main image with gold border */}
          {mainImage && (
            <div className="border-4 border-brand-accent p-2 bg-black">
              <img
                src={mainImage.src}
                alt={mainImage.alt}
                width={400}
                height={300}
                loading="lazy"
                className="w-full h-auto block"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
