export const filterOptions = [
  { id: "all", label: "All" },
  { id: "sale", label: "For Sale" },
  { id: "rent", label: "For Rent" },
  { id: "house", label: "Houses" },
  { id: "apartment", label: "Apartments" },
  { id: "plot", label: "Plots" },
  { id: "commercial", label: "Commercial" },
] as const;

export type FilterId = (typeof filterOptions)[number]["id"];

export function PropertyFilters({
  active,
  onChange,
}: {
  active: FilterId;
  onChange: (id: FilterId) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter properties">
      {filterOptions.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onChange(f.id)}
          aria-pressed={active === f.id}
          className={
            "rounded-full border px-4 py-2 text-xs font-semibold transition-colors " +
            (active === f.id
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-accent hover:text-accent")
          }
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export function matchesFilter(
  p: { purpose: string; type: string },
  filter: FilterId,
) {
  if (filter === "all") return true;
  if (filter === "sale" || filter === "rent") return p.purpose === filter;
  return p.type === filter;
}
