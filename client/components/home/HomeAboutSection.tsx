import type { HomeAboutContent } from "@site/lib/cms/homePageTypes";
import { GraduationCap, Crown, Clock, Globe, Trophy } from "lucide-react";

interface HomeAboutSectionProps {
  content: HomeAboutContent;
}

const featureIcons = [
  GraduationCap,
  Crown,
  Clock,
  Globe,
  Trophy,
];

export default function HomeAboutSection({ content }: HomeAboutSectionProps) {
  if (!content) {
    return null;
  }

  return (
    <div className="w-full py-12 md:py-16" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-[2560px] mx-auto w-[95%]">
        {/* Main heading */}
        {content.heading && (
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block">
              <h2 className="font-poppins text-[24px] md:text-[42px] font-bold text-black leading-tight" style={{ maxWidth: '864px' }}>
                {content.heading}
              </h2>
              <div className="h-px bg-brand-accent mt-4"></div>
            </div>
          </div>
        )}

        {/* Two-column layout: Left box + Right features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left column - Experience box */}
          <div className="md:col-span-1">
            {/* Black box with gold border */}
            <div className="border-4 border-brand-accent p-4 md:p-6 bg-black h-full">
              <div className="border-2 border-brand-accent bg-black px-6 md:px-8 py-8 md:py-10 text-center h-full flex flex-col justify-center">
                <div className="font-poppins text-[14px] md:text-[13px] font-normal text-brand-accent tracking-widest uppercase">
                  {content.experienceTitle}
                </div>
                <div className="font-poppins text-[56px] md:text-[72px] font-bold text-white leading-tight my-2">
                  {content.yearsNumber}
                </div>
                <div className="font-poppins text-[14px] md:text-[12px] font-normal text-brand-accent tracking-widest uppercase mb-6">
                  {content.yearsLabel}
                </div>
                <div className="pt-6">
                  <p className="font-poppins text-[16px] md:text-[14px] font-normal text-white leading-relaxed">
                    {content.experienceDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Features grid */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {content.features.map((feature, index) => {
                const IconComponent = featureIcons[index] || GraduationCap;
                return (
                  <div key={index} className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <IconComponent className="w-6 h-6 text-brand-accent" />
                    </div>
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-poppins text-[16px] md:text-[14px] font-semibold text-black tracking-wider uppercase mb-2">
                        {feature.title}
                      </h3>
                      <p className="font-poppins text-[16px] md:text-[14px] font-normal text-black/80 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
