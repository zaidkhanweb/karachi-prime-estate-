import { createFileRoute, Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — DHA Karachi Real Estate" },
      { name: "description", content: "Meet the people who support property buyers, sellers, landlords and tenants in Karachi." },
      { property: "og:title", content: "Our Team — DHA Karachi Real Estate" },
      { property: "og:description", content: "The people who guide your property journey in Karachi." },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <p className="eyebrow">People behind the service</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Our Team</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        This page is reserved for the people clients will actually speak with about properties and enquiries.
      </p>

      <section className="mt-10 rounded-2xl border border-border bg-card p-8 sm:p-10">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="grid size-24 place-items-center rounded-full bg-secondary">
            <UserRound className="size-10 text-accent" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl">Meet the agency team</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Agent names, roles, photographs and short introductions can be added here when the agency provides its team information.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-base btn-primary">Contact the Agency</Link>
              <Link to="/properties" className="btn-base btn-outline">Explore Properties</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
