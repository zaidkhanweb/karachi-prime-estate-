import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Phone,
  MessageCircle,
  MapPinned,
  Handshake,
  Eye,
  ShieldCheck,
  Compass,
  Users,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { properties, locations } from "@/data/properties";
import { PropertyCard } from "@/components/site/PropertyCard";
import {
  PropertyFilters,
  matchesFilter,
  type FilterId,
} from "@/components/site/PropertyFilters";
import { business, contactReady, telLink, waLink } from "@/config/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DHA Karachi Real Estate — Find the Right Property in Karachi" },
      {
        name: "description",
        content:
          "Local real estate guidance for buying, selling, renting and investing across DHA, Clifton, Gulshan-e-Iqbal, Bahria Town and PECHS in Karachi.",
      },
      { property: "og:title", content: "Find the Right Property in Karachi" },
      {
        property: "og:description",
        content:
          "Browse property options across DHA, Clifton and other key Karachi neighbourhoods for buying, renting and investment.",
      },
      { property: "og:url", content: "/" },
    ],
  }),
  component: HomePage,
});

const whyUs = [
  {
    icon: MapPinned,
    title: "Karachi Area Search",
    body: "Compare property examples across DHA, Clifton and other featured Karachi locations.",
  },
  {
    icon: Compass,
    title: "Search Around Your Needs",
    body: "Narrow options by purpose, property type, location, budget and bedrooms.",
  },
  {
    icon: Eye,
    title: "Clear Property Details",
    body: "Keep the important listing information, features and next steps easy to review.",
  },
  {
    icon: Handshake,
    title: "Viewing Enquiries",
    body: "Move from a property page to a viewing or contact enquiry without losing context.",
  },
  {
    icon: Users,
    title: "Buy, Sell & Rent",
    body: "The website supports enquiries from buyers, sellers, landlords and tenants.",
  },
  {
    icon: ShieldCheck,
    title: "Residential & Commercial",
    body: "Present houses, apartments, plots and commercial spaces in one clear property flow.",
  },
];

function HomePage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState({
    purpose: "any",
    type: "any",
    location: "any",
    budget: "any",
    beds: "any",
  });
  const [applied, setApplied] = useState(search);

  const visible = useMemo(() => {
    return properties.filter((p) => {
      if (!matchesFilter(p, filter)) return false;
      if (applied.purpose !== "any" && p.purpose !== applied.purpose) return false;
      if (applied.type !== "any" && p.type !== applied.type) return false;
      if (applied.location !== "any" && !p.location.includes(applied.location)) return false;
      if (applied.beds !== "any" && p.beds < Number(applied.beds)) return false;
      if (applied.budget !== "any") {
        const [min, max] = applied.budget.split("-").map(Number);
        if (p.priceValue < (min ?? 0) || p.priceValue > (max ?? Infinity)) return false;
      }
      return true;
    });
  }, [filter, applied]);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <img
          src={heroImg}
          alt="Modern villa with landscaped driveway in DHA Karachi at golden hour"
          width={1920}
          height={1080}
          className="h-[70vh] min-h-[460px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl text-primary-foreground rise">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                D.H.A. Phase 4 · Karachi
              </p>
              <h1 className="mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Find the Right Property in Karachi
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80">
                Browse property options across DHA, Clifton and other key Karachi neighbourhoods,
                whether you're looking to buy, rent or invest.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/properties" className="btn-base btn-accent">
                  Explore Properties
                </Link>
                {contactReady.whatsapp && (
                  <a
                    href={waLink("Hello, I'd like to speak to an agent about a property.")}
                    className="btn-base border border-primary-foreground/30 text-primary-foreground hover:border-accent hover:text-accent"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp Us
                  </a>
                )}
                {contactReady.phone && (
                  <a
                    href={telLink}
                    className="btn-base border border-primary-foreground/30 text-primary-foreground hover:border-accent hover:text-accent"
                  >
                    <Phone className="size-4" aria-hidden="true" /> Call Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 sm:px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setApplied(search);
            setFilter("all");
            document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg">Search properties</h2>
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Filter the property examples below
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
            <div className="col-span-2 md:col-span-1">
              <label className="label-xs" htmlFor="s-purpose">
                Buy / Rent
              </label>
              <select
                id="s-purpose"
                className="field"
                value={search.purpose}
                onChange={(e) => setSearch({ ...search, purpose: e.target.value })}
              >
                <option value="any">Any</option>
                <option value="sale">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>
            <div>
              <label className="label-xs" htmlFor="s-type">
                Property Type
              </label>
              <select
                id="s-type"
                className="field"
                value={search.type}
                onChange={(e) => setSearch({ ...search, type: e.target.value })}
              >
                <option value="any">Any</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="label-xs" htmlFor="s-location">
                Location
              </label>
              <select
                id="s-location"
                className="field"
                value={search.location}
                onChange={(e) => setSearch({ ...search, location: e.target.value })}
              >
                <option value="any">Any</option>
                {locations.map((l) => (
                  <option key={l} value={l.replace(" Karachi", "")}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-xs" htmlFor="s-budget">
                Budget
              </label>
              <select
                id="s-budget"
                className="field"
                value={search.budget}
                onChange={(e) => setSearch({ ...search, budget: e.target.value })}
              >
                <option value="any">Any</option>
                <option value="0-1000000">Rentals up to PKR 10 Lac / mo</option>
                <option value="1000000-30000000">Up to PKR 3 Cr</option>
                <option value="30000000-1000000000">PKR 3 Cr and above</option>
              </select>
            </div>
            <div>
              <label className="label-xs" htmlFor="s-beds">
                Bedrooms
              </label>
              <select
                id="s-beds"
                className="field"
                value={search.beds}
                onChange={(e) => setSearch({ ...search, beds: e.target.value })}
              >
                <option value="any">Any</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div className="col-span-2 flex items-end md:col-span-1">
              <button type="submit" className="btn-base btn-primary w-full">
                <Search className="size-4" aria-hidden="true" /> Search
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* FEATURED */}
      <section id="featured" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Property showcase</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Featured Properties</h2>
          </div>
          <Link to="/properties" className="text-sm font-semibold text-accent hover:underline">
            View all properties →
          </Link>
        </div>

        <PropertyFilters active={filter} onChange={setFilter} />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="mt-10 rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No property examples match this search. Try widening your filters, or{" "}
            <Link to="/contact" className="text-accent underline">
              tell us what you're looking for
            </Link>
            .
          </p>
        )}
      </section>

      {/* WHY CHOOSE US */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="eyebrow">A clearer property search</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
            From search to enquiry, without the clutter
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-xl border border-border bg-card p-6">
                <w.icon className="size-6 text-accent" aria-hidden="true" />
                <h3 className="mt-4 text-lg">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-primary p-8 text-primary-foreground sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl">Tell us what you're looking for</h2>
              <p className="mt-2 max-w-lg text-sm text-primary-foreground/75">
                Visit us at {business.address}, or send a message and we'll get back to you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-base btn-accent">
                Contact Us
              </Link>
              {contactReady.whatsapp && (
                <a
                  href={waLink("Hello, I'd like some help finding a property.")}
                  className="btn-base border border-primary-foreground/30 text-primary-foreground hover:border-accent hover:text-accent"
                >
                  WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
