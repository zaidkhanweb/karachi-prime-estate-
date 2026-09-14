import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { business, telLink } from "@/config/business";

const nav = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">
            {business.logoText}
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-semibold">
              {business.shortName}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {business.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-accent" }}
              className="transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={telLink} className="btn-base btn-primary hidden sm:inline-flex">
            <Phone className="size-4" aria-hidden="true" /> Call Now
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-accent" }}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 text-sm font-medium last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <a href={telLink} className="btn-base btn-primary my-4">
              <Phone className="size-4" aria-hidden="true" /> Call Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
