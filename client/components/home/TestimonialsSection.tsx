import type { TestimonialsContent } from "@site/lib/cms/homePageTypes";

interface TestimonialsSectionProps {
  content?: TestimonialsContent;
  headingTag?: string;
}

export default function TestimonialsSection({
  content,
  headingTag,
}: TestimonialsSectionProps) {
  // Guard: if no testimonial items, don't render
  if (!content || !content.items || content.items.length === 0) {
    return null;
  }

  const data = content;
  const testimonials = data.items;

  const renderStars = (count: number) => {
    return "★".repeat(count);
  };

  return (
    <div className="w-full py-16 md:py-24" style={{ backgroundColor: "#000" }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        {data.heading && (
          <div className="text-center mb-16">
            {headingTag ? (
              // @ts-ignore
              <headingTag className="text-4xl md:text-5xl font-bold text-white">
                {data.heading}
              </headingTag>
            ) : (
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {data.heading}
              </h2>
            )}
          </div>
        )}

        {/* Grid of testimonials - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border p-6 md:p-8 flex flex-col"
              style={{ backgroundColor: "#0a0a0a", borderColor: "#cfab57" }}
            >
              {/* Badge - White rounded container with service info */}
              <div className="mb-8 flex justify-center">
                <div className="bg-white rounded-lg p-4 md:p-5 text-center max-w-xs">
                  {/* Service Logo */}
                  {testimonial.badgeLogo && (
                    <div className="mb-3 flex justify-center">
                      <img
                        src={testimonial.badgeLogo}
                        alt={testimonial.badgeLogoAlt || "Service Logo"}
                        loading="lazy"
                        className="h-6"
                      />
                    </div>
                  )}

                  {/* Service Name */}
                  {testimonial.badgeServiceName && (
                    <div className="text-sm font-semibold text-black mb-2">
                      {testimonial.badgeServiceName}
                    </div>
                  )}

                  {/* Stars */}
                  <div className="text-yellow-400 text-lg md:text-xl mb-1 tracking-wider">
                    {renderStars(testimonial.badgeStarCount || 5)}
                  </div>

                  {/* Rating */}
                  <div className="text-xs md:text-sm text-gray-700 font-medium">
                    {testimonial.badgeRating || "5.0"} Rating
                  </div>
                </div>
              </div>

              {/* Testimonial text */}
              <p className="text-white text-sm md:text-base leading-relaxed mb-6 flex-grow">
                "{testimonial.text}"
              </p>

              {/* Author and client type in gold */}
              <div className="text-xs md:text-sm font-semibold uppercase tracking-wider" style={{ color: "#cfab57" }}>
                {testimonial.author}
                {testimonial.clientType && `, ${testimonial.clientType}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
