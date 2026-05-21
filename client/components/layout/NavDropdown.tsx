import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface NavDropdownItem {
  label: string;
  href: string;
  openInNewTab?: boolean;
  children?: NavDropdownItem[];
}

interface NavDropdownProps {
  item: NavDropdownItem;
  isHeaderNav?: boolean;
}

export default function NavDropdown({ item, isHeaderNav = false }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  // Close on outside click (safety net)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        to={item.href}
        className={`font-poppins text-[20px] uppercase font-semibold inline-flex items-center gap-1 transition-opacity duration-300 ${
          isHeaderNav
            ? "text-white hover:text-white/80"
            : "text-black hover:opacity-80"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Link>

      <div
        className={`absolute top-full left-0 mt-2 min-w-[240px] bg-white border border-brand-border rounded-md shadow-lg z-50 py-2 transition-all duration-200 ${
          open
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {item.children!.map((child, idx) => {
          const hasGrandchildren = child.children && child.children.length > 0;

          return (
            <div key={idx} className="group/item relative">
              <Link
                to={child.href}
                target={child.openInNewTab ? "_blank" : undefined}
                rel={child.openInNewTab ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between gap-4 px-5 py-2.5 font-poppins text-[16px] text-black hover:bg-brand-accent/10 hover:text-brand-accent transition-colors whitespace-nowrap"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  if (!hasGrandchildren) {
                    setOpen(false);
                  }
                }}
              >
                <span>{child.label}</span>
                {hasGrandchildren && <span className="text-black/50">›</span>}
              </Link>
              {hasGrandchildren && (
                <div className="invisible absolute left-full top-0 min-w-[240px] rounded-md border border-brand-border bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover/item:visible group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:opacity-100">
                  {child.children!.map((grandchild, grandchildIdx) => (
                    <Link
                      key={grandchildIdx}
                      to={grandchild.href}
                      target={grandchild.openInNewTab ? "_blank" : undefined}
                      rel={grandchild.openInNewTab ? "noopener noreferrer" : undefined}
                      className="block px-5 py-2.5 font-poppins text-[16px] text-black hover:bg-brand-accent/10 hover:text-brand-accent transition-colors whitespace-nowrap"
                      tabIndex={open ? 0 : -1}
                      onClick={() => setOpen(false)}
                    >
                      {grandchild.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
