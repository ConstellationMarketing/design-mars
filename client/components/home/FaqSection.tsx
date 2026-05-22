import { useState } from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqContent, FaqItem } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
import { triggerDniRefreshAfterReveal } from "@site/components/layout/dniReveal";

interface FaqSectionProps {
  content?: FaqContent;
}

export default function FaqSection({ content }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  // Guard: if no FAQ items, don't render
  if (!content || !content.items || content.items.length === 0) {
    return null;
  }

  const data = content;
  const faqs = data.items;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
    triggerDniRefreshAfterReveal();
  };

  return (
    <div className="w-full py-16 md:py-24" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          {data.heading && (
            <div className="inline-block">
              <h2 className="font-poppins font-bold text-2xl md:text-5xl text-black leading-tight">
                {data.heading}
              </h2>
              <div className="h-px bg-brand-accent mt-4"></div>
            </div>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-white"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full font-poppins text-lg md:text-xl px-6 md:px-8 py-5 md:py-6 text-left flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200 text-gray-700"
              >
                <span className="font-medium pr-8">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 text-gray-600 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="border-t border-gray-300 bg-white px-6 md:px-8 py-5 md:py-6">
                  <RichText
                    html={faq.answer}
                    className="font-poppins text-base md:text-lg leading-relaxed text-gray-700"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
