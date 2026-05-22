import type { AwardsContent } from "@site/lib/cms/homePageTypes";

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

  return (
    <div className="w-full py-12 md:py-16" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-[2560px] mx-auto w-[95%]">
        {/* Title with gold underline */}
        {data.heading && (
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-poppins text-[28px] md:text-[36px] font-bold text-black leading-tight">
              {data.heading}
            </h2>
            <div className="w-32 h-px bg-brand-accent mx-auto mt-4"></div>
          </div>
        )}

        {/* Two-column layout: Logos on left, Image on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Left side - Logos grid with light border */}
          <div className="border-2 border-gray-300 bg-white p-8 md:p-12">
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              {logos.slice(0, 6).map((logo, index) => (
                <div key={index} className="flex items-center justify-center h-20 md:h-24">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={80}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Main image with gold border frame */}
          {logos[6] && (
            <div className="border-4 border-brand-accent p-1 bg-black">
              <img
                src={logos[6].src}
                alt={logos[6].alt}
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
