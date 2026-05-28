import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { AttorneysContent } from "@site/lib/cms/homePageTypes";

interface AttorneysSectionProps {
  content?: AttorneysContent;
  headingTag?: string;
}

export default function AttorneysSection({
  content,
  headingTag,
}: AttorneysSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  if (!content || !content.attorneys || content.attorneys.length === 0) {
    return null;
  }

  const data = content;
  const attorneys = data.attorneys;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = attorneys.length;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Get visible attorneys with infinite loop (wraps around)
  const getAttorneyIndex = (offset: number) => {
    return (activeSlide + offset) % attorneys.length;
  };

  const visibleAttorneys = Array.from({ length: itemsPerSlide }, (_, i) =>
    attorneys[getAttorneyIndex(i)]
  );

  return (
    <div className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto w-[95%]">
        {/* Title */}
        {data.heading && (
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block">
              {headingTag ? (
                // @ts-ignore
                <headingTag className="text-2xl md:text-5xl font-bold text-black block">
                  {data.heading}
                </headingTag>
              ) : (
                <h2 className="text-2xl md:text-[48px] font-bold text-black">
                  {data.heading}
                </h2>
              )}
              <div className="h-px bg-black mt-4"></div>
            </div>
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative group px-12 md:px-16">
          {/* Attorney Carousel - 3 visible, smooth scroll */}
          <div className="overflow-hidden mb-12">
            <div className="flex justify-center gap-6 md:gap-8 transition-all duration-500 ease-in-out">
              {visibleAttorneys.map((attorney, index) => (
                <div
                  key={`${attorney.name}-${index}`}
                  className={`flex flex-col items-center flex-shrink-0 ${isMobile ? "w-full" : "w-1/3"}`}
                >
                  {/* Photo */}
                  <div className="mb-4 w-full max-w-xs overflow-hidden rounded-lg">
                    <img
                      src={attorney.photo}
                      alt={attorney.photoAlt || attorney.name}
                      loading="lazy"
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </div>

                  {/* Attorney Info - centered */}
                  <div className="text-center w-full">
                    <h3 className="font-poppins text-lg md:text-xl font-bold text-black mb-2">
                      {attorney.name}
                    </h3>
                    <p className="font-poppins text-sm md:text-base font-semibold mb-1" style={{ color: "#cfab57" }}>
                      {attorney.title}
                    </p>
                    <p className="font-poppins text-sm md:text-sm text-gray-500">
                      {attorney.yearsExperience}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - only show if carousel can move */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/3 -translate-y-1/2 text-gray-400 hover:text-black transition-colors z-10 p-2"
                aria-label="Previous attorneys"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/3 -translate-y-1/2 text-gray-400 hover:text-black transition-colors z-10 p-2"
                aria-label="Next attorneys"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </>
          )}
        </div>

        {/* See All Attorneys Button */}
        {data.buttonText && data.buttonLink && (
          <div className="flex justify-center">
            <div className="inline-block border-2 border-brand-accent p-1 hover:border-black transition-all duration-300 hover:bg-black">
              <Link
                to={data.buttonLink}
                className="group inline-block bg-brand-accent border-2 border-black px-6 py-3 hover:bg-black hover:border-black transition-all duration-300"
              >
                <span className="font-poppins text-[18px] font-normal uppercase text-black group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {data.buttonText}
                </span>
                <span className="ml-2 text-black group-hover:text-white transition-colors duration-300">›</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
