import { useState } from "react";
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
  // Display 1 less than total, so carousel can move
  const itemsPerSlide = Math.max(1, attorneys.length - 1);
  const totalSlides = attorneys.length > 1 ? attorneys.length - itemsPerSlide + 1 : 1;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const startIndex = activeSlide * 1; // Move 1 attorney at a time
  const visibleAttorneys = attorneys.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <div className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        {data.heading && (
          <div className="text-center mb-12 md:mb-16">
            {headingTag ? (
              // @ts-ignore
              <headingTag className="text-4xl md:text-5xl font-bold text-black">
                {data.heading}
              </headingTag>
            ) : (
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                {data.heading}
              </h2>
            )}
            <div className="w-24 h-px bg-black mx-auto mt-6"></div>
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative group">
          {/* Attorney Carousel - centered with transition */}
          <div className="overflow-hidden mb-12">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6 md:gap-8 justify-center"
              style={{ transform: `translateX(0)` }}
            >
              {visibleAttorneys.map((attorney, index) => (
                <div key={index} className="flex flex-col items-center flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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
                  <div className="text-center">
                    <h3 className="font-poppins text-lg md:text-xl font-bold text-black mb-2">
                      {attorney.name}
                    </h3>
                    <p className="font-poppins text-sm md:text-base font-semibold mb-1" style={{ color: "#cfab57" }}>
                      {attorney.title}
                    </p>
                    <p className="font-poppins text-xs md:text-sm text-gray-500">
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
                className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-12 md:-translate-x-16 text-gray-400 hover:text-black transition-colors z-10 p-2"
                aria-label="Previous attorneys"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-12 md:translate-x-16 text-gray-400 hover:text-black transition-colors z-10 p-2"
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
            <div className="inline-block border-2 border-brand-accent p-1">
              <Link
                to={data.buttonLink}
                className="inline-block bg-brand-accent border-2 border-brand-accent px-8 md:px-12 py-3 md:py-4 hover:bg-white hover:text-black transition-all duration-300"
              >
                <span className="font-poppins text-[14px] md:text-[16px] font-normal uppercase text-black">
                  {data.buttonText}
                </span>
                <span className="ml-2">›</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
