import type { StatsContent } from "@site/lib/cms/homePageTypes";

interface StatsSectionProps {
  content: StatsContent;
}

export default function StatsSection({ content }: StatsSectionProps) {
  if (!content || (!content.totalAmount && content.cases.length === 0)) {
    return null;
  }

  return (
    <div className="w-full bg-brand-accent pt-0 md:pt-0 pb-12 md:pb-16 relative">
      <div className="max-w-[2560px] mx-auto w-[95%]">
        {/* Total wins card - overlapping hero */}
        {content.totalAmount && (
          <div className="flex justify-center -mt-16 md:-mt-20 mb-12 md:mb-16 relative z-10">
            <div className="bg-black border-2 border-white px-8 md:px-12 py-6 md:py-8 text-center max-w-md">
              <div className="font-poppins text-[32px] md:text-[48px] font-bold text-white leading-tight">
                {content.totalAmount}
              </div>
              <div className="font-poppins text-[12px] md:text-[14px] font-semibold text-white tracking-widest uppercase mt-3 md:mt-4">
                {content.totalLabel}
              </div>
            </div>
          </div>
        )}

        {/* Case stats grid */}
        {content.cases.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {content.cases.map((caseItem, index) => (
              <div key={index} className="text-center">
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
