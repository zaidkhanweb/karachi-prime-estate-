import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BedDouble, Bath, Ruler, MapPin, Phone, MessageCircle, Check } from "lucide-react";
import { getProperty } from "@/data/properties";
import { contactReady, telLink, waLink } from "@/config/business";
import { InquiryForm } from "@/components/site/InquiryForm";

export const Route = createFileRoute("/properties/$propertyId")({
  loader: ({ params }) => {
    const property = getProperty(params.propertyId);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Property unavailable — DHA Karachi Real Estate" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.property;
    const description = `${p.title} in ${p.location} — example property presentation. ${p.description}`;
    return {
      meta: [
        { title: `${p.title}, ${p.location} — DHA Karachi Real Estate` },
        { name: "description", content: description },
        { property: "og:title", content: `${p.title}, ${p.location}` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/properties/${params.propertyId}` },
      ],
      links: [{ rel: "canonical", href: `/properties/${params.propertyId}` }],
    };
  },
  notFoundComponent: PropertyNotFound,
  component: PropertyDetail,
});

function PropertyNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-3xl">Property not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This sample listing doesn't exist. Browse the other examples instead.
      </p>
      <Link to="/properties" className="btn-base btn-primary mt-6">
        View properties
      </Link>
    </div>
  );
}

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const main = property.images[active] ?? property.images[0]!;
  const waMessage = `Hello, I'd like to ask about the sample listing: ${property.title} (${property.location}).`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-accent">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/properties" className="hover:text-accent">
          Properties
        </Link>{" "}
        / <span className="text-foreground">{property.title}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          {/* GALLERY */}
          <img
            src={main.src}
            alt={main.alt}
            width={1024}
            height={768}
            className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
          />
          {property.images.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
              {property.images.map((img, i) => (
                <button
                  key={img.src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={
                    "shrink-0 overflow-hidden rounded-lg border-2 " +
                    (i === active ? "border-accent" : "border-transparent")
                  }
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-20 w-28 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                {property.purpose === "sale" ? "For Sale" : "For Rent"}
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold">
                {property.typeLabel}
              </span>
              <span className="rounded-full border border-accent px-3 py-1 text-[11px] font-semibold text-accent">
                Sample listing
              </span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl">{property.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" /> {property.location}
            </p>
            <p className="mt-4 font-display text-2xl font-semibold text-accent">
              {property.price}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-4">
              <div>
                <dt className="label-xs">Bedrooms</dt>
                <dd className="flex items-center gap-2 text-sm font-semibold">
                  <BedDouble className="size-4 text-accent" aria-hidden="true" />
                  {property.beds > 0 ? property.beds : "—"}
                </dd>
              </div>
              <div>
                <dt className="label-xs">Bathrooms</dt>
                <dd className="flex items-center gap-2 text-sm font-semibold">
                  <Bath className="size-4 text-accent" aria-hidden="true" />
                  {property.baths > 0 ? property.baths : "—"}
                </dd>
              </div>
              <div>
                <dt className="label-xs">Area</dt>
                <dd className="flex items-center gap-2 text-sm font-semibold">
                  <Ruler className="size-4 text-accent" aria-hidden="true" />
                  {property.area}
                </dd>
              </div>
              <div>
                <dt className="label-xs">Status</dt>
                <dd className="text-sm font-semibold">
                  {property.purpose === "sale" ? "For Sale" : "For Rent"}
                </dd>
              </div>
            </dl>

            <h2 className="mt-10 text-2xl">Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {property.longDescription}
            </p>

            <h2 className="mt-10 text-2xl">Features</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {property.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-xl">Parking</h2>
                <p className="mt-2 text-sm text-muted-foreground">{property.parking}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-xl">Nearby facilities</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {property.nearby.map((n) => (
                    <li
                      key={n}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl">Interested in this property?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Speak to an agent about this or similar properties in {property.location}.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              {contactReady.whatsapp && (
                <a href={waLink(waMessage)} className="btn-base btn-accent">
                  <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp Agent
                </a>
              )}
              {contactReady.phone && (
                <a href={telLink} className="btn-base btn-primary">
                  <Phone className="size-4" aria-hidden="true" /> Call Agent
                </a>
              )}
              <a href="#viewing" className="btn-base btn-outline">
                Request a Viewing
              </a>
            </div>
          </div>

          <div id="viewing" className="mt-6 rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl">Request a viewing</h2>
            <InquiryForm defaultProperty={`${property.title} — ${property.location}`} withDate />
          </div>
        </aside>
      </div>
    </div>
  );
}
