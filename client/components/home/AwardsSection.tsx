import type { AwardsContent } from "@site/lib/cms/homePageTypes";

interface AwardsSectionProps {
  content?: AwardsContent;
  headingTag?: string;
}

export default function AwardsSection({ content, headingTag }: AwardsSectionProps) {
  if (!content) {
    return null;
  }

  const data = content;

  return (
    <section className="w-full py-16" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-[1280px] mx-auto w-[95%]">
        {/* Title with gold underline */}
        {data.heading && (
          <div className="text-center mb-16">
            <div className="inline-block">
              {headingTag ? (
                // @ts-ignore
                <headingTag className="text-2xl md:text-[48px] font-bold text-black block">
                  {data.heading}
                </headingTag>
              ) : (
                <h2 className="text-[36px] md:text-[48px] font-bold text-black">
                  {data.heading}
                </h2>
              )}
              <div className="h-px bg-brand-accent mt-4 max-w-[60%] mx-auto"></div>
            </div>
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Logo image with gold border */}
          {data.logoImage && (
            <div className="border border-brand-accent p-8">
              <img
                src={data.logoImage}
                alt={data.logoImageAlt || "Award Logo"}
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Right side - Team image with gold shadow */}
          {data.teamImage && (
            <div style={{ boxShadow: '-12px 12px 0 0 #CDA977' }}>
              <img
                src={data.teamImage}
                alt={data.teamImageAlt || "Team Photo"}
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
