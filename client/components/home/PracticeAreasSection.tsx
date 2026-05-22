import { Link } from "react-router-dom";
import type { PracticeAreasIntroContent } from "@site/lib/cms/homePageTypes";
import type { PracticeAreaItem } from "@site/lib/cms/homePageTypes";

interface PracticeAreasSectionProps {
  content?: PracticeAreasIntroContent;
  areas?: PracticeAreaItem[];
}

export default function PracticeAreasSection({ content, areas }: PracticeAreasSectionProps) {
  // Don't render if no areas at all, but show even if heading is empty (will use defaults)
  if (!areas || areas.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[2560px] mx-auto w-[95%]">
        {/* Heading */}
        {(content?.heading || "Where We Fight For You") && (
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block">
              <h2 className="font-poppins text-[32px] md:text-[42px] font-bold text-black leading-tight">
                {content?.heading || "Where We Fight For You"}
              </h2>
              <div className="h-px bg-brand-accent mt-4"></div>
            </div>
          </div>
        )}

        {/* Practice Areas Grid */}
        {areas && areas.length > 0 && (
          <div className="mb-12 md:mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {areas.map((area, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden group"
                  role="img"
                  aria-label={area.imageAlt || area.title}
                >
                  {/* Background Image */}
                  <div
                    className="relative min-h-[150px] md:min-h-[200px] overflow-hidden"
                    style={{
                      backgroundImage: `url(${area.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <h3 className="font-poppins text-[14px] md:text-[16px] leading-tight text-white font-normal text-center uppercase transition-all duration-300">
                        {area.title}
                      </h3>
                    </div>
                  </div>

                  {/* Hover Overlay - just slightly darker */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* See All Button - styled like hero button */}
        <div className="flex justify-center">
          <div className="inline-block border-2 border-brand-accent p-1 hover:border-black transition-all duration-300 hover:bg-black">
            <Link
              to={content?.buttonLink || "/practice-areas/"}
              className="group inline-block bg-brand-accent border-2 border-black px-8 md:px-12 py-3 md:py-4 hover:bg-black hover:border-black transition-all duration-300"
            >
              <span className="font-poppins text-[14px] md:text-[16px] font-normal uppercase text-black group-hover:text-white transition-colors duration-300">
                {content?.buttonTextLine1 || "SEE ALL AREAS OF PRACTICE"}
              </span>
              <span className="ml-2 text-black group-hover:text-white transition-colors duration-300">›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
