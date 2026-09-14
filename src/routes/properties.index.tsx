import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/site/PropertyCard";
import {
  PropertyFilters,
  matchesFilter,
  type FilterId,
} from "@/components/site/PropertyFilters";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Properties in Karachi — DHA Karachi Real Estate" },
      {
        name: "description",
        content:
          "Browse sample house, apartment, plot and commercial listings across DHA, Clifton, Gulshan-e-Iqbal, Bahria Town and PECHS.",
      },
      { property: "og:title", content: "Properties in Karachi" },
      {
        property: "og:description",
        content: "Sample house, apartment, plot and commercial listings across Karachi.",
      },
      { property: "og:url", content: "/properties" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const visible = useMemo(
    () => properties.filter((p) => matchesFilter(p, filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Sample listings</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Properties</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        The listings below are demonstration examples showing how properties are
        presented. They are not verified, currently available properties. Contact us for
        what is actually on the market today.
      </p>

      <div className="mt-8">
        <PropertyFilters active={filter} onChange={setFilter} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-10 rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No sample listings in this category yet.
        </p>
      )}
    </div>
  );
}
