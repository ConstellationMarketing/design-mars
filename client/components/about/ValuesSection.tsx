import {
  Trophy,
  Crown,
  Users,
  Heart,
  Star,
  Shield,
  Zap,
  Award,
} from "lucide-react";
import type { ValuesContent } from "@site/lib/cms/aboutPageTypes";

interface ValuesSectionProps {
  content?: ValuesContent;
  headingTag?: string;
}

// Map icon names to components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy,
  Crown,
  Users,
  Heart,
  Star,
  Shield,
  Zap,
  Award,
};

export default function ValuesSection({ content, headingTag = "h2" }: ValuesSectionProps) {
  if (!content || !content.items || content.items.length === 0) {
    return null;
  }

  const HeadingTag = headingTag as keyof JSX.IntrinsicElements;
  const backgroundColor = content.backgroundColor || "#f5f5f5";
  const backgroundStyle: React.CSSProperties = {
    backgroundColor,
    ...(content.backgroundImage && {
      backgroundImage: `url('${content.backgroundImage}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
  };

  return (
    <section style={backgroundStyle} className="w-full py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto w-[95%] md:w-[90%]">
        {/* Heading */}
        {content.heading && (
          <div className="text-center mb-12 md:mb-16">
            <HeadingTag className="font-poppins text-[36px] md:text-[48px] font-bold text-black leading-tight">
              {content.heading}
            </HeadingTag>
            <div className="h-px bg-brand-accent mt-4 max-w-[60%] mx-auto"></div>
          </div>
        )}

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {content.items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Trophy;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-white p-6 md:p-8 rounded"
              >
                {/* Icon */}
                <IconComponent className="h-16 w-16 md:h-20 md:w-20 text-brand-accent mb-4" />

                {/* Title */}
                <h3 className="font-poppins text-[18px] md:text-[20px] font-bold text-black mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-poppins text-[16px] md:text-[16px] leading-[1.5] text-gray-700">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
