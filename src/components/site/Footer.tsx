import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Music2, MapPin, Phone, Mail } from "lucide-react";
import { business, contactReady, telLink, waLink } from "@/config/business";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="font-display text-xl">{business.name}</h2>
          <p className="mt-3 flex items-start gap-2 text-sm text-primary-foreground/70">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {business.address}
          </p>
          {contactReady.phone && (
            <p className="mt-2 flex items-center gap-2 text-sm text-primary-foreground/70">
              <Phone className="size-4" aria-hidden="true" />
              <a href={telLink} className="hover:text-accent">{business.phoneDisplay}</a>
            </p>
          )}
          {contactReady.email && (
            <p className="mt-2 flex items-center gap-2 text-sm text-primary-foreground/70">
              <Mail className="size-4" aria-hidden="true" />
              <a href={`mailto:${business.email}`} className="hover:text-accent">{business.email}</a>
            </p>
          )}
          {(contactReady.instagram || contactReady.facebook || contactReady.tiktok) && (
            <div className="mt-5 flex gap-3">
              {contactReady.instagram && (
                <a href={business.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-primary-foreground/20 hover:border-accent hover:text-accent">
                  <Instagram className="size-4" />
                </a>
              )}
              {contactReady.facebook && (
                <a href={business.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-11 place-items-center rounded-full border border-primary-foreground/20 hover:border-accent hover:text-accent">
                  <Facebook className="size-4" />
                </a>
              )}
              {contactReady.tiktok && (
                <a href={business.socials.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="grid size-11 place-items-center rounded-full border border-primary-foreground/20 hover:border-accent hover:text-accent">
                  <Music2 className="size-4" />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Explore</h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-primary-foreground/70">
            {[
              { to: "/properties", label: "Properties" },
              { to: "/services", label: "Services" },
              { to: "/about", label: "About Us" },
              { to: "/team", label: "Our Team" },
              { to: "/reviews", label: "Reviews" },
              { to: "/faq", label: "FAQ" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-accent">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Plan your next move</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Explore property options, compare locations and send an enquiry when you are ready to discuss the next step.
          </p>
          {contactReady.hours && (
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
              {business.hours.map((h) => (
                <li key={h.day}><span className="block text-primary-foreground">{h.day}</span>{h.time}</li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {contactReady.whatsapp ? (
              <a href={waLink("Hello, I'd like to enquire about a property.")} className="btn-base btn-accent">WhatsApp Us</a>
            ) : (
              <Link to="/contact" className="btn-base btn-accent">Send an Enquiry</Link>
            )}
            <a href={business.directionsUrl} target="_blank" rel="noreferrer" className="btn-base border border-primary-foreground/25">Get Directions</a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-primary-foreground/55 sm:px-6">
          Property examples are illustrative and should be confirmed with the agency before any decision or viewing.
        </div>
      </div>
    </footer>
  );
}
