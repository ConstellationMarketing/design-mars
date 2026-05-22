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
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Top Section - Contact Info */}
        <div className="text-center mb-12 md:mb-16 border-b border-gray-600 pb-12">
          {phoneNumber && (
            <div className="text-sm md:text-base mb-2">
              <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="hover:text-brand-accent transition-colors">
                📞 {phoneNumber}
              </a>
            </div>
          )}
          {(addressLine1 || addressLine2) && (
            <div className="text-sm md:text-base text-gray-400">
              📍 {[addressLine1, addressLine2].filter(Boolean).join(", ")}
            </div>
          )}
        </div>

        {/* Logo and Company Name */}
        <div className="text-center mb-8">
          {logoUrl ? (
            <div className="flex justify-center mb-4">
              <img
                src={logoUrl}
                alt={logoAlt}
                className="w-16 h-16 object-contain"
                width={64}
                height={64}
              />
            </div>
          ) : null}
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-2">
            {siteName}
          </h2>
          <p className="text-sm md:text-base text-gray-400 tracking-widest">
            PROTECTING YOUR RIGHTS
          </p>
        </div>

        {/* Description */}
        {footerTaglineHtml && (
          <div className="text-center max-w-2xl mx-auto mb-8 text-sm md:text-base text-gray-300 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: footerTaglineHtml }} />
          </div>
        )}

        {/* Social Media Links */}
        {enabledSocialLinks.length > 0 && (
          <div className="flex justify-center gap-4 mb-12">
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
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-8 text-center text-xs md:text-sm text-gray-500">
          {copyrightText && <p>{copyrightText}</p>}
        </div>
      </div>
    </footer>
  );
}
