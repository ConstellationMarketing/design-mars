import type { PracticeAreasValuesContent } from "@site/lib/cms/practiceAreasPageTypes";

interface PracticeAreasValuesSectionProps {
  content?: PracticeAreasValuesContent;
  headingTag?: string;
}

export default function PracticeAreasValuesSection({ content, headingTag = "h2" }: PracticeAreasValuesSectionProps) {
  if (!content || !content.values || content.values.length === 0) {
    return null;
  }

  const HeadingTag = headingTag as keyof JSX.IntrinsicElements;

  return (
    <section className="w-full py-20" style={{ backgroundColor: "#f5f5f5" }}>
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
              {/* Badge Circle */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#C9A84C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '700',
                color: '#111',
                flexShrink: 0,
                marginBottom: '24px'
              }}>
                {item.badgeText}
              </div>

              {/* Title */}
              <h3 className="font-poppins text-[20px] md:text-[20px] font-bold text-black mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-poppins text-[18px] md:text-[18px] leading-[1.6] text-gray-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
