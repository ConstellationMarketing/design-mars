import type { AboutPracticeAreasIntroContent } from "@site/lib/cms/aboutPageTypes";

interface AboutValuesSectionProps {
  content?: AboutPracticeAreasIntroContent;
  headingTag?: string;
}

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
          {content.values.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              {item.icon && (
                <div className="mb-6">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-16 w-16 md:h-20 md:w-20 object-contain mx-auto"
                    style={{
                      filter: 'invert(72%) sepia(55%) saturate(500%) hue-rotate(5deg) brightness(95%)',
                    }}
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="font-poppins text-[14px] md:text-[14px] font-bold text-black mb-4 tracking-widest uppercase">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-poppins text-[14px] md:text-[14px] leading-[1.6] text-gray-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
