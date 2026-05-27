import type { StatsContent } from "@site/lib/cms/homePageTypes";

interface StatsSectionProps {
  content: StatsContent;
}

export default function StatsSection({ content }: StatsSectionProps) {
  if (!content || content.cases.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-brand-accent pt-32 md:pt-36 pb-12 md:pb-16 relative" style={{ marginTop: 0, paddingTop: '60px' }}>
      <div className="max-w-[2560px] mx-auto w-[95%]">
        {/* Case stats grid with black separators between columns */}
        {content.cases.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4">
            {content.cases.map((caseItem, index) => (
              <div
                key={index}
                className={`text-center py-6 md:py-8 px-4 md:px-6 ${
                  index < content.cases.length - 1
                    ? 'md:border-r-2 md:border-black'
                    : ''
                }`}
              >
                <div className="font-poppins text-[14px] md:text-[12px] font-semibold text-black tracking-wider uppercase">
                  {caseItem.label}
                </div>
                <div className="font-poppins text-[18px] md:text-[24px] font-bold text-black mt-2 md:mt-3">
                  {caseItem.amount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
