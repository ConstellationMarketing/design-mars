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
              <h2 className="font-poppins text-[24px] md:text-[48px] font-bold text-black leading-tight">
                {content?.heading || "Where We Fight For You"}
              </h2>
              <div className="h-px bg-brand-accent mt-4"></div>
            </div>
          </div>
        )}

        {/* Practice Areas Grid */}
        {areas && areas.length > 0 && (
          <div className="mb-12 md:mb-16">
            <style>{`
              .pa-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 0;
              }
              @media (max-width: 1024px) {
                .pa-grid { grid-template-columns: repeat(3, 1fr); }
              }
              @media (max-width: 768px) {
                .pa-grid { grid-template-columns: repeat(2, 1fr); }
              }
              @media (max-width: 480px) {
                .pa-grid { grid-template-columns: 1fr; }
              }
              .pa-card {
                position: relative;
                height: 200px;
                overflow: hidden;
                cursor: pointer;
              }
              .pa-card-bg {
                position: absolute;
                inset: 0;
                background-size: cover;
                background-position: center;
                transition: opacity 0.4s ease;
              }
              .pa-card-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,0.45);
                transition: opacity 0.4s ease;
              }
              .pa-card-front {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2;
                transition: opacity 0.4s ease;
              }
              .pa-card-front span {
                color: #fff;
                font-size: 16px;
                font-weight: 700;
                text-transform: uppercase;
                text-align: center;
                padding: 0 16px;
                letter-spacing: 1px;
              }
              .pa-card-back {
                position: absolute;
                inset: 0;
                background: #C9A84C;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
                padding: 24px;
                opacity: 0;
                transition: opacity 0.4s ease;
                z-index: 3;
                pointer-events: none;
              }
              .pa-card:hover .pa-card-back {
                opacity: 1;
                pointer-events: auto;
              }
              .pa-card:hover .pa-card-bg,
              .pa-card:hover .pa-card-overlay,
              .pa-card:hover .pa-card-front {
                opacity: 0;
              }
              .pa-card-back .pa-title {
                font-size: 18px;
                font-weight: 700;
                text-transform: uppercase;
                color: #111;
                text-align: center;
                margin: 0;
              }
              .pa-card-back .pa-learn {
                font-size: 14px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #111;
                text-decoration: none;
              }
              .pa-card-back .pa-consult {
                font-size: 14px;
                font-weight: 400;
                color: #111;
                text-decoration: none;
              }
              .pa-card-back .pa-learn:hover,
              .pa-card-back .pa-consult:hover {
                text-decoration: underline;
              }
            `}</style>

            <div className="pa-grid">
              {areas.map((area, index) => (
                <div key={index} className="pa-card" style={{ outline: "4px solid red" }}>
                  <div className="pa-card-bg" style={{ backgroundImage: `url(${area.image})` }}></div>
                  <div className="pa-card-overlay"></div>
                  <div className="pa-card-front"><span>{area.title}</span></div>
                  <div className="pa-card-back">
                    <p className="pa-title">{area.title}</p>
                    <a href={area.link || "/practice-areas/"} className="pa-learn">Learn More</a>
                    <a href={area.link || "/practice-areas/"} className="pa-consult">Free Consultation</a>
                  </div>
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
