import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import RichText from "@site/components/shared/RichText";

interface PracticeAreaCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  link?: string;
}

export default function PracticeAreaCard({
  icon: Icon,
  title,
  description,
  image,
  imageAlt,
  link = "/contact/",
}: PracticeAreaCardProps) {
  return (
    <div className="practice-card relative min-h-[450px] overflow-hidden bg-brand-card border border-brand-border">
      {/* Background Image */}
      <div
        role="img"
        aria-label={imageAlt || title}
        className="card-bg absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="card-overlay absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>

      {/* Front Content */}
      <div className="card-front relative h-full flex flex-col justify-between p-[25px] md:p-[30px] z-10">
        {/* Icon */}
        <div className="flex justify-start">
          <div className="bg-brand-accent p-[15px] inline-block transition-all duration-300 hover:bg-white">
            <Icon
              className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] text-black"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="font-poppins font-bold text-[28px] md:text-[32px] leading-tight text-white pb-[15px]">
            {title}
          </h3>
          <RichText
            html={description}
            className="font-poppins text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] text-white/90 mb-[15px]"
          />

          {/* Learn More Link */}
          <div className="flex items-center gap-2 text-brand-accent">
            <span className="font-poppins text-[14px] md:text-[16px]">
              Learn More
            </span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Gold Hover Panel */}
      <div className="card-back absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
        <p className="card-title">{title}</p>
        <Link to={link} className="card-learn">
          Learn More
        </Link>
        <a href={link} className="card-consult">
          Free Consultation
        </a>
      </div>
    </div>
  );
}
