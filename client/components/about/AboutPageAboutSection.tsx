import type { HomeAboutContent } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";

interface AboutPageAboutSectionProps {
  content: HomeAboutContent;
  headingTag?: string;
}

export default function AboutPageAboutSection({ content, headingTag = "h2" }: AboutPageAboutSectionProps) {
  if (!content.heading && !content.experienceDescription) {
    return null;
  }

  const HeadingTag = headingTag as keyof JSX.IntrinsicElements;

  return (
    <div className="w-full bg-white pt-[30px] md:pt-[54px] pb-[30px] md:pb-[54px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%]">
        {/* Heading */}
        {content.heading && (
          <div className="mb-[30px] md:mb-[50px]">
            <HeadingTag className="font-poppins text-[32px] md:text-[48px] font-bold leading-tight text-black">
              {content.heading}
            </HeadingTag>
            {/* Underline */}
            <div className="w-[60px] h-[2px] bg-brand-accent mt-[15px]"></div>
          </div>
        )}

        {/* 50/50 Layout: Text on Left, Black Box on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[5%]">
          {/* Left Side - Text Content */}
          <div>
            {content.experienceDescription && (
              <RichText
                html={content.experienceDescription}
                className="font-poppins text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-black"
              />
            )}
          </div>

          {/* Right Side - Black Box with Experience */}
          <div>
            <div className="bg-black p-4 md:p-6 h-full" style={{ boxShadow: '12px 12px 0 0 #cfab57' }}>
              <div className="border-2 border-white bg-black px-6 md:px-8 py-8 md:py-10 text-center h-full flex flex-col justify-center">
                <div className="font-poppins font-normal text-[16px] md:text-[18px] uppercase tracking-widest text-brand-accent mb-[10px]">
                  {content.experienceTitle}
                </div>
                <div className="font-poppins font-bold text-[48px] md:text-[64px] leading-tight text-white mb-[10px]">
                  {content.yearsNumber}
                </div>
                <div className="font-poppins font-semibold text-[14px] md:text-[16px] uppercase tracking-widest text-white">
                  {content.yearsLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
