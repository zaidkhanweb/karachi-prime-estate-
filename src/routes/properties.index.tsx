import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PropertyFilters, matchesFilter, type FilterId } from "@/components/site/PropertyFilters";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Properties in Karachi — DHA Karachi Real Estate" },
      { name: "description", content: "Browse example house, apartment, plot and commercial property layouts across key Karachi locations." },
      { property: "og:title", content: "Properties in Karachi" },
      { property: "og:description", content: "Explore house, apartment, plot and commercial property examples across Karachi." },
      { property: "og:url", content: "/properties" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const visible = useMemo(() => properties.filter((p) => matchesFilter(p, filter)), [filter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Property showcase</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Properties</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Explore example property presentations across Karachi. These cards demonstrate the listing experience and should be replaced with verified agency inventory before publishing live availability.
      </p>

      <div className="mt-8"><PropertyFilters active={filter} onChange={setFilter} /></div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => <PropertyCard key={p.id} property={p} />)}
      </div>
      {visible.length === 0 && (
        <p className="mt-10 rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">No property examples match this category.</p>
      )}
    </div>
  );
}
