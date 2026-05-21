import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSiteSettings, useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import NavDropdown from "./NavDropdown";

interface HeaderProps {
  heroBackgroundImage?: string;
}

export default function Header({ heroBackgroundImage }: HeaderProps) {
  const { settings } = useSiteSettings();
  const { phoneNumber, phoneDisplay } = useGlobalPhone();

  const logoUrl = settings.logoUrl?.trim() || "";
  const logoAlt =
    settings.logoAlt?.trim() || settings.siteName?.trim() || "Logo";

  const ctaText = settings.headerCtaText?.trim() || "";
  const ctaUrl = settings.headerCtaUrl?.trim() || "/contact";
  const ctaLabel = settings.headerCtaLabel?.trim() || "FREE CONSULTATIONS";
  const ctaTagline = settings.headerCtaTagline?.trim() || "NO FEES UNTIL WE WIN";

  const navItems = [...(settings.navigationItems ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <>
      {/* Sticky header wrapper - overlay only when background present */}
      <div className="sticky top-0 z-50" style={{ backgroundColor: heroBackgroundImage ? 'rgba(0, 0, 0, 0.35)' : 'transparent' }}>
        <div className="max-w-[2560px] mx-auto w-[95%] h-[90px] flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={logoAlt}
                  className="h-[60px] w-auto"
                  width={306}
                  height={60}
                />
              ) : (
                <span className="font-poppins text-black text-[24px] leading-none font-bold">
                  {settings.siteName || "Logo"}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            <ul className="flex items-center gap-8">
              {navItems.map((item, index) => {
                const hasChildren =
                  item.children && item.children.length > 0;

                return (
                  <li key={`${item.href}-${index}`} className="flex items-center">
                    {hasChildren ? (
                      <NavDropdown item={item} isHeaderNav={true} />
                    ) : (
                      <Link
                        to={item.href}
                        target={
                          item.openInNewTab ? "_blank" : undefined
                        }
                        rel={
                          item.openInNewTab
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="font-poppins text-[20px] text-white uppercase font-light hover:text-white/80 transition-opacity duration-300"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Phone CTA - Right */}
          <div className="hidden lg:block flex-shrink-0">
            {phoneNumber && (
              <a
                href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity duration-300"
              >
                <span className="font-poppins text-white text-[12px] tracking-wide font-semibold">
                  {ctaLabel}
                </span>
                <span className="font-poppins text-brand-accent text-[20px] font-bold leading-none">
                  {phoneDisplay}
                </span>
                <span className="font-poppins text-white text-[10px] tracking-wide font-semibold">
                  {ctaTagline}
                </span>
              </a>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden flex-shrink-0">
              <Button variant="ghost" size="icon" className="text-black hover:bg-white/20">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white border-l border-brand-border w-80"
            >
              <nav className="flex flex-col gap-6 mt-8">
                {navItems.map((item, index) => {
                  const hasChildren =
                    item.children && item.children.length > 0;

                  return (
                    <MobileNavItem key={`${item.href}-${index}`} item={item} hasChildren={hasChildren} />
                  );
                })}
                {phoneNumber && (
                  <a
                    href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                    className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity w-full py-2"
                  >
                    <span className="font-poppins text-black text-[11px] tracking-wide font-semibold">
                      {ctaLabel}
                    </span>
                    <span className="font-poppins text-brand-accent text-[18px] font-bold leading-none">
                      {phoneDisplay}
                    </span>
                    <span className="font-poppins text-black text-[9px] tracking-wide font-semibold">
                      {ctaTagline}
                    </span>
                  </a>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

/* ── Mobile nav item with collapsible children ── */

interface MobileNavItemProps {
  item: {
    label: string;
    href: string;
    openInNewTab?: boolean;
    children?: MobileNavItemProps["item"][];
  };
  hasChildren?: boolean;
}

function MobileNavItem({
  item,
  hasChildren,
}: MobileNavItemProps) {
  const [expanded, setExpanded] = useState(false);

  if (!hasChildren) {
    return (
      <Link
        to={item.href}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className="font-poppins text-[20px] text-black uppercase font-light py-2 hover:text-brand-accent transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          to={item.href}
          className="font-poppins text-[20px] text-black uppercase font-light py-2 hover:text-brand-accent transition-colors flex-1"
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-black/60 hover:text-black p-1 transition-colors"
          aria-label={expanded ? "Collapse submenu" : "Expand submenu"}
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div className={`pl-4 py-1 space-y-2 ${expanded ? "block" : "hidden"}`}>
        {item.children!.map((child, idx) => (
          <div key={idx}>
            <Link
              to={child.href}
              target={child.openInNewTab ? "_blank" : undefined}
              rel={child.openInNewTab ? "noopener noreferrer" : undefined}
              className="block font-poppins text-[16px] text-black/80 py-1 hover:text-brand-accent transition-colors"
            >
              {child.label}
            </Link>
            {child.children && child.children.length > 0 && (
              <div className="pl-4 space-y-1">
                {child.children.map((grandchild, grandchildIdx) => (
                  <Link
                    key={grandchildIdx}
                    to={grandchild.href}
                    target={grandchild.openInNewTab ? "_blank" : undefined}
                    rel={grandchild.openInNewTab ? "noopener noreferrer" : undefined}
                    className="block font-poppins text-[14px] text-black/70 py-1 hover:text-brand-accent transition-colors"
                  >
                    {grandchild.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
