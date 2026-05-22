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

  const getBadgeLabel = (badgeType: string) => {
    const labels: Record<string, string> = {
      google: "Google",
      facebook: "Facebook",
      yelp: "Yelp",
      trustpilot: "Trustpilot",
      avvo: "Avvo",
    };
    return labels[badgeType.toLowerCase()] || badgeType;
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
              className="border border-gray-700 p-6 md:p-8 flex flex-col"
              style={{ backgroundColor: "#0a0a0a" }}
            >
              {/* Badge - Service type and rating */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-white mb-1">
                  {getBadgeLabel(testimonial.badgeType)}
                </div>
                <div className="text-sm text-gray-400 mb-3">
                  {testimonial.badgeRating || "5.0"} Rating
                </div>

                {/* Company Logo */}
                {testimonial.companyLogo && (
                  <img
                    src={testimonial.companyLogo}
                    alt={testimonial.companyLogoAlt || "Company Logo"}
                    loading="lazy"
                    className="h-8 mb-4"
                  />
                )}
              </div>

              {/* Testimonial text */}
              <p className="text-white text-sm md:text-base leading-relaxed mb-6 flex-grow">
                "{testimonial.text}"
              </p>

              {/* Author and client type */}
              <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider">
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
