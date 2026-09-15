import { Link } from "@tanstack/react-router";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import type { Property } from "@/data/properties";
import { contactReady, waLink } from "@/config/business";

export function PropertyCard({ property }: { property: Property }) {
  const img = property.images[0]!;
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative overflow-hidden">
        <img src={img.src} alt={img.alt} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold text-primary-foreground">{property.purpose === "sale" ? "For Sale" : "For Rent"}</span>
        <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold">{property.typeLabel}</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-lg font-semibold text-accent">{property.price}</p>
        <h3 className="mt-1 text-lg">{property.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="size-3.5" aria-hidden="true" /> {property.location}</p>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
          {property.beds > 0 && <span className="flex items-center gap-1.5"><BedDouble className="size-4" aria-hidden="true" /> {property.beds} Beds</span>}
          {property.baths > 0 && <span className="flex items-center gap-1.5"><Bath className="size-4" aria-hidden="true" /> {property.baths} Baths</span>}
          <span className="flex items-center gap-1.5"><Ruler className="size-4" aria-hidden="true" /> {property.area}</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{property.description}</p>

        <div className="mt-5 flex flex-wrap gap-2 pt-1">
          <Link to="/properties/$propertyId" params={{ propertyId: property.id }} className="btn-base btn-primary flex-1">View Details</Link>
          {contactReady.whatsapp ? (
            <a href={waLink(`Hello, I'm interested in the property example: ${property.title} (${property.location}).`)} className="btn-base btn-outline">WhatsApp</a>
          ) : (
            <Link to="/contact" className="btn-base btn-outline">Enquire</Link>
          )}
        </div>
      </div>
    </article>
  );
}
