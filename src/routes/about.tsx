import { createFileRoute, Link } from "@tanstack/react-router";
import { business } from "@/config/business";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — DHA Karachi Real Estate" },
      {
        name: "description",
        content:
          "A local Karachi real estate agency based in DHA Phase 4, supporting buyers, sellers, landlords and tenants across the city.",
      },
      { property: "og:title", content: "About DHA Karachi Real Estate" },
      {
        property: "og:description",
        content:
          "A local agency based in DHA Phase 4, supporting buyers, sellers, landlords and tenants across Karachi.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">About us</p>
      <h1 className="mt-2 max-w-2xl text-4xl sm:text-5xl">
        A local agency, rooted in DHA Karachi
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="text-2xl">Our story</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            [Placeholder — company story to be supplied by the business.] {business.name}{" "}
            operates from {business.address}, working with buyers, sellers, landlords and
            tenants across Karachi. Replace this paragraph with the agency's own account of
            how it started and who it serves.
          </p>

          <h2 className="mt-10 text-2xl">Our mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            To make property decisions in Karachi clearer — by giving straightforward
            guidance, presenting options honestly, and staying with clients through the
            whole process rather than just the introduction.
          </p>

          <h2 className="mt-10 text-2xl">Our values</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              ["Transparency", "Clear information about price, condition and process."],
              ["Patience", "No pressure to commit before you're ready."],
              ["Accountability", "One point of contact who follows through."],
              ["Local focus", "Depth in a few areas rather than a thin city-wide list."],
            ].map(([title, body]) => (
              <li key={title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-lg">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl">Local market expertise</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            [Placeholder — the agency's specific areas of expertise and typical client
            profile to be confirmed.] Our day-to-day work centres on the residential and
            commercial pockets around DHA Phase 4 and the neighbouring Karachi districts
            listed below.
          </p>

          <h3 className="mt-8 text-lg">Areas served</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {business.areasServed.map((a) => (
              <li
                key={a}
                className="rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground"
              >
                {a}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/properties" className="btn-base btn-primary">
              Browse properties
            </Link>
            <Link to="/contact" className="btn-base btn-outline">
              Contact us
            </Link>
          </div>
        </div>

        <div>
          <img
            src={heroImg}
            alt="Residential street in DHA Karachi with modern homes"
            loading="lazy"
            width={1920}
            height={1080}
            className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
          />
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg">Visit our office</h2>
            <p className="mt-2 text-sm text-muted-foreground">{business.address}</p>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              {business.hours.map((h) => (
                <li key={h.day}>
                  <span className="text-foreground">{h.day}:</span> {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
