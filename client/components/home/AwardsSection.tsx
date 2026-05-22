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
