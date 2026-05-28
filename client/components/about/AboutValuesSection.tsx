import type { AboutPracticeAreasIntroContent } from "@site/lib/cms/aboutPageTypes";

interface AboutValuesSectionProps {
  content?: AboutPracticeAreasIntroContent;
  headingTag?: string;
}

// Hardcoded Lucide SVG icons
const valueIcons = {
  excellence: (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1ab58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>
      <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>
      <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
      <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>
    </svg>
  ),
  integrity: (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1ab58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
      <path d="M5 21h14"/>
    </svg>
  ),
  compassion: (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1ab58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <circle cx="9" cy="7" r="4"/>
    </svg>
  ),
};

export default function AboutValuesSection({ content, headingTag = "h2" }: AboutValuesSectionProps) {
  if (!content || !content.values || content.values.length === 0) {
    return null;
  }

  const HeadingTag = headingTag as keyof JSX.IntrinsicElements;

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-[1280px] mx-auto w-[95%] md:w-[90%]">
        {/* Title */}
        {content.valuesTitle && (
          <div className="text-center mb-12 md:mb-16">
            <HeadingTag className="font-poppins text-[36px] md:text-[48px] font-bold text-black leading-tight">
              {content.valuesTitle}
            </HeadingTag>
            <div className="h-px bg-brand-accent mt-6 max-w-[60%] mx-auto"></div>
          </div>
        )}

        {/* Values Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
          {content.values.map((item) => {
            const iconKey = item.iconType || item.id;
            const icon = valueIcons[iconKey as keyof typeof valueIcons];
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  {icon}
                </div>

                {/* Title */}
                <h3 className="font-poppins text-[14px] md:text-[14px] font-bold text-black mb-4 tracking-widest uppercase">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-poppins text-[14px] md:text-[14px] leading-[1.6] text-gray-700">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
