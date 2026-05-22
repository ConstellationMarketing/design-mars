import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

const SOCIAL_LABEL_MAP: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "Youtube",
  linkedin: "LinkedIn",
  twitter: "X",
};

export default function Footer() {
  const { settings } = useSiteSettings();

  const logoUrl = settings.logoUrl?.trim() || "";
  const logoAlt = settings.logoAlt?.trim() || settings.siteName?.trim() || "Logo";
  const siteName = settings.siteName?.trim() || "CONSTELLATION LAW";
  const phoneNumber = settings.phoneNumber?.trim() || "";
  const phoneDisplay = settings.phoneDisplay?.trim() || "";
  const addressLine1 = settings.addressLine1?.trim() || "";
  const addressLine2 = settings.addressLine2?.trim() || "";
  const footerTaglineHtml = settings.footerTaglineHtml || "";
  const copyrightRaw = settings.copyrightText?.trim() || "";
  const copyrightText = copyrightRaw.replace(/\{year\}/gi, String(new Date().getFullYear()));
  const enabledSocialLinks = (settings.socialLinks ?? []).filter((s) => s.enabled);

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Top Section - Contact Info in two columns */}
        <div className="grid grid-cols-2 gap-4 mb-12 pb-8 border-b border-gray-600 text-center text-xs md:text-sm">
          {phoneNumber && (
            <div>
              <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="hover:text-brand-accent transition-colors">
                📞 {phoneNumber}
              </a>
            </div>
          )}
          {(addressLine1 || addressLine2) && (
            <div className="text-gray-400">
              📍 {[addressLine1, addressLine2].filter(Boolean).join(", ")}
            </div>
          )}
        </div>

        {/* Logo and Company Name */}
        <div className="text-center mb-8">
          {logoUrl ? (
            <div className="flex justify-center mb-3">
              <img
                src={logoUrl}
                alt={logoAlt}
                className="w-12 h-12 object-contain"
                width={48}
                height={48}
              />
            </div>
          ) : null}
          <div className="mb-2">
            <h2 className="font-poppins text-2xl md:text-3xl font-bold inline">
              {siteName}
            </h2>
            <p className="text-xs md:text-sm text-gray-300 tracking-widest">
              PROTECTING YOUR RIGHTS
            </p>
          </div>
        </div>

        {/* Description - Two paragraphs */}
        {footerTaglineHtml && (
          <div className="text-center max-w-3xl mx-auto mb-6 text-xs md:text-sm text-gray-300 leading-relaxed space-y-4">
            <div dangerouslySetInnerHTML={{ __html: footerTaglineHtml }} />
          </div>
        )}

        {/* Social Media Links */}
        {enabledSocialLinks.length > 0 && (
          <div className="flex justify-center gap-6 mb-8">
            {enabledSocialLinks.map((social) => {
              const Icon = SOCIAL_ICON_MAP[social.platform];
              const label = SOCIAL_LABEL_MAP[social.platform] || social.platform;

              if (!Icon) return null;

              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-accent transition-colors duration-300"
                  title={`Follow on ${label}`}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              );
            })}
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-6 text-center text-xs text-gray-500">
          {copyrightText && <p>{copyrightText}</p>}
        </div>
      </div>
    </footer>
  );
}
