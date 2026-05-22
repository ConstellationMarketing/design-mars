import type { AwardsContent } from "@site/lib/cms/homePageTypes";

interface AwardsSectionProps {
  content?: AwardsContent;
  headingTag?: string;
}

export default function AwardsSection({ content, headingTag }: AwardsSectionProps) {
  if (!content || !content.heading) {
    return null;
  }

  const data = content;
  const logos = data.logos || [];

  // Use first image as featured (right side), rest for logo grid (left side)
  const featuredImage = logos.length > 0 ? logos[0] : null;
  const gridLogos = logos.slice(0, 6);

  return (
    <section className="w-full py-16" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Title with gold underline */}
        <div className="text-center mb-16">
          <div className="border-b border-brand-accent pb-6 mb-6 max-w-2xl mx-auto">
            {headingTag ? (
              // @ts-ignore
              <headingTag className="text-4xl md:text-5xl font-bold text-black">
                {data.heading}
              </headingTag>
            ) : (
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                {data.heading}
              </h2>
            )}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Logo grid with gold border */}
          {gridLogos.length > 0 && (
            <div className="border border-brand-accent p-8">
              <div className="grid grid-cols-3 gap-6">
                {gridLogos.map((logo, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      className="max-w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right side - Featured image with gold shadow */}
          {featuredImage && (
            <div style={{ boxShadow: '-12px 12px 0 0 #CDA977' }}>
              <img
                src={featuredImage.src}
                alt={featuredImage.alt}
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
