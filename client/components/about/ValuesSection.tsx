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
        {/* Title */}
        {content.heading && (
          <div className="text-center mb-12 md:mb-16">
            <HeadingTag className="font-poppins text-[36px] md:text-[48px] font-bold text-black leading-tight mb-6">
              {content.heading}
            </HeadingTag>
            <div className="h-px bg-brand-accent max-w-[60%] mx-auto"></div>
          </div>
        )}

        {/* Values Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {content.items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Trophy;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="mb-6">
                  <IconComponent className="h-16 w-16 md:h-20 md:w-20 text-brand-accent mx-auto" />
                </div>

                {/* Title */}
                <h3 className="font-poppins text-[14px] md:text-[14px] font-bold text-black mb-4 tracking-widest uppercase">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-poppins text-[14px] md:text-[14px] leading-[1.6] text-gray-700">
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
