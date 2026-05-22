import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Phone,
  MapPin,
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
        {/* Top Section - Contact Info in two columns with gold separator */}
        <div className="grid grid-cols-2 gap-4 mb-12 pb-8 relative" style={{ borderBottomColor: "#cfab57", borderBottomWidth: "1px" }}>
          <div className="text-center text-sm md:text-base flex items-center justify-center gap-2">
            {phoneNumber && (
              <>
                <Phone className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#cfab57" }} />
                <a href={`tel:${phoneNumber.replace(/\D/g, "")}`} className="hover:text-brand-accent transition-colors">
                  {phoneNumber}
                </a>
              </>
            )}
          </div>

          {/* Gold vertical separator - doesn't touch bottom border */}
          <div className="absolute left-1/2 top-2 bottom-2 w-px" style={{ backgroundColor: "#cfab57", transform: "translateX(-50%)" }}></div>

          <div className="text-center text-sm md:text-base text-gray-300 flex items-center justify-center gap-2">
            {(addressLine1 || addressLine2) && (
              <>
                <MapPin className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#cfab57" }} />
                <span>{[addressLine1, addressLine2].filter(Boolean).join(", ")}</span>
              </>
            )}
          </div>
        </div>

        {/* Logo */}
        <div className="text-center mb-4 pb-4">
          {logoUrl ? (
            <div className="flex justify-center">
              <img
                src={logoUrl}
                alt={logoAlt}
                className="w-40 sm:w-64 lg:w-[500px] h-auto object-contain"
              />
            </div>
          ) : null}
        </div>

        {/* Description - Blurbs */}
        {footerTaglineHtml && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {footerTaglineHtml.split(/<\/?p[^>]*>/g)
              .filter(text => text.trim())
              .map((text, idx) => (
                <p key={idx} className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                  {text.trim()}
                </p>
              ))}
          </div>
        )}

        {/* Social Media Links */}
        {enabledSocialLinks.length > 0 && (
          <div className="flex justify-center gap-6 mb-8 pb-8" style={{ borderBottomColor: "#cfab57", borderBottomWidth: "1px" }}>
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
        <div className="pt-6 text-center text-xs text-gray-500">
          {copyrightText && <p>{copyrightText}</p>}
        </div>
      </div>
    </footer>
  );
}
