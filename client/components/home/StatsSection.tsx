import type { StatsContent } from "@site/lib/cms/homePageTypes";

interface StatsSectionProps {
  content: StatsContent;
}

export default function StatsSection({ content }: StatsSectionProps) {
  if (!content || (!content.totalAmount && content.cases.length === 0)) {
    return null;
  }

  return (
    <div className="w-full bg-brand-accent pt-20 md:pt-24 pb-12 md:pb-16 relative">
      <div className="max-w-[2560px] mx-auto w-[95%]">
        {/* Total wins card - overlapping hero with double border effect */}
        {content.totalAmount && (
          <div className="flex justify-center -mt-20 md:-mt-32 mb-8 md:mb-12 relative z-10">
            {/* Outer gold border */}
            <div className="border-4 border-brand-accent p-4 md:p-6 bg-black">
              {/* Inner gold border with black bg */}
              <div className="border-2 border-brand-accent bg-black px-8 md:px-12 py-6 md:py-8 text-center">
                <div className="font-poppins text-[32px] md:text-[48px] font-bold text-white leading-tight">
                  {content.totalAmount}
                </div>
                <div className="font-poppins text-[12px] md:text-[14px] font-semibold text-white tracking-widest uppercase mt-3 md:mt-4">
                  {content.totalLabel}
                </div>
              </div>
            </div>
          </div>
        )}

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
                <div className="font-poppins text-[11px] md:text-[12px] font-semibold text-black tracking-wider uppercase">
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
