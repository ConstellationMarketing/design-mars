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
        {/* Centered Heading with Underline */}
        {content.heading && (
          <div className="text-center mb-[30px] md:mb-[50px]">
            <div className="inline-block">
              <HeadingTag className="font-poppins text-[36px] md:text-[48px] font-bold text-black leading-tight">
                {content.heading}
              </HeadingTag>
              <div className="h-px bg-brand-accent mt-4 max-w-[60%] mx-auto"></div>
            </div>
          </div>
        )}

        {/* 50/50 Layout: Features on Left, Black Box + Experience Description on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[5%]">
          {/* Left Side - Features List */}
          <div>
            {/* Features List - Show space even if empty */}
            <div className="space-y-[20px] min-h-[200px]">
              {content.features && content.features.length > 0 ? (
                content.features.map((feature, index) => (
                  <div key={index}>
                    {feature.title && (
                      <h3 className="font-poppins font-semibold text-[18px] md:text-[20px] text-black mb-[8px]">
                        {feature.title}
                      </h3>
                    )}
                    {feature.description && (
                      <div className="feature-description-block">
                        <p className="font-poppins text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-black">
                          {feature.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          </div>

          {/* Right Side - Black Box with Experience Info */}
          <div>
            <div className="bg-black p-4 md:p-6" style={{ boxShadow: '12px 12px 0 0 #cfab57' }}>
              <div className="border-2 border-white bg-black px-6 md:px-8 py-8 md:py-10 text-center flex flex-col justify-center">
                <div className="font-poppins font-normal text-[16px] md:text-[18px] uppercase tracking-widest text-brand-accent mb-[10px]">
                  {content.experienceTitle}
                </div>
                <div className="font-poppins font-bold text-[48px] md:text-[64px] leading-tight text-white mb-[10px]">
                  {content.yearsNumber}
                </div>
                <div className="font-poppins font-semibold text-[14px] md:text-[16px] uppercase tracking-widest text-white mb-[15px]">
                  {content.yearsLabel}
                </div>

                {/* Experience Description - Inside Black Box */}
                {content.experienceDescription && (
                  <div className="pt-[15px]">
                    <RichText
                      html={content.experienceDescription}
                      className="font-poppins text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-white text-center"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
