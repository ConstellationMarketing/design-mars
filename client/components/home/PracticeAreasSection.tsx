import { Link } from "react-router-dom";
import type { PracticeAreasIntroContent } from "@site/lib/cms/homePageTypes";
import type { PracticeAreaItem } from "@site/lib/cms/homePageTypes";

interface PracticeAreasSectionProps {
  content?: PracticeAreasIntroContent;
  areas?: PracticeAreaItem[];
}

export default function PracticeAreasSection({ content, areas }: PracticeAreasSectionProps) {
  // Guard: if no meaningful content, don't render
  if (!content || !content.heading) {
    return null;
  }

  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[2560px] mx-auto w-[95%]">
        {/* Heading */}
        {content.heading && (
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-poppins text-[32px] md:text-[42px] font-bold text-black max-w-3xl mx-auto leading-tight">
              {content.heading}
            </h2>
          </div>
        )}

        {/* Practice Areas Grid */}
        {areas && areas.length > 0 && (
          <div className="mb-12 md:mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {areas.map((area, index) => (
                <Link
                  key={index}
                  to={area.link}
                  className="relative min-h-[150px] md:min-h-[200px] overflow-hidden group"
                  role="img"
                  aria-label={area.imageAlt || area.title}
                  style={{
                    backgroundImage: `url(${area.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>

                  {/* Content */}
                  <div className="relative h-full flex items-center justify-center p-4">
                    <h3 className="font-poppins text-[14px] md:text-[16px] leading-tight text-white font-bold text-center uppercase transition-all duration-300 group-hover:text-brand-accent">
                      {area.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* See All Button */}
        {content.buttonLink && (
          <div className="flex justify-center">
            <Link
              to={content.buttonLink}
              className="inline-block border-2 border-brand-accent bg-brand-accent px-8 md:px-12 py-3 md:py-4 hover:bg-white hover:text-black transition-all duration-300"
            >
              <span className="font-poppins text-[14px] md:text-[16px] font-normal uppercase text-black hover:text-black">
                {content.buttonTextLine1 || "SEE ALL AREAS OF PRACTICE"}
              </span>
              <span className="ml-2">›</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
