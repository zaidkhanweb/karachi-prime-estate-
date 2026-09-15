import { createFileRoute, Link } from "@tanstack/react-router";
import { business, contactReady } from "@/config/business";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — DHA Karachi Real Estate" },
      { name: "description", content: "A Karachi real estate agency supporting buyers, sellers, landlords and tenants across the city." },
      { property: "og:title", content: "About DHA Karachi Real Estate" },
      { property: "og:description", content: "Property guidance for buyers, sellers, landlords and tenants across Karachi." },
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
      <h1 className="mt-2 max-w-2xl text-4xl sm:text-5xl">Property guidance built around clear decisions</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="text-2xl">Our approach</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Property decisions are easier when the process is clear. The focus is on understanding what a client needs, presenting suitable options and keeping communication straightforward from the first enquiry through the next step.
          </p>

          <h2 className="mt-10 text-2xl">What the website is built to support</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Buyers, sellers, landlords and tenants can move from area and property browsing to a focused enquiry without unnecessary steps.
          </p>

          <h2 className="mt-10 text-2xl">Our values</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              ["Transparency", "Clear information about price, condition and process."],
              ["Patience", "Space to compare options and make informed decisions."],
              ["Communication", "Straightforward updates and a clear next step."],
              ["Local focus", "Property guidance shaped around Karachi's neighbourhoods."],
            ].map(([title, body]) => (
              <li key={title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-lg">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl">Featured locations</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Explore property examples across several well-known Karachi locations. Final service areas can be tailored to the agency's verified coverage.
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {business.areasServed.map((a) => (
              <li key={a} className="rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">{a}</li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/properties" className="btn-base btn-primary">Browse properties</Link>
            <Link to="/contact" className="btn-base btn-outline">Contact us</Link>
          </div>
        </div>

        <div>
          <img src={heroImg} alt="Modern residential property in Karachi" loading="lazy" width={1920} height={1080} className="aspect-[4/3] w-full rounded-xl border border-border object-cover" />
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg">Visit our office</h2>
            <p className="mt-2 text-sm text-muted-foreground">{business.address}</p>
            {contactReady.hours && (
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                {business.hours.map((h) => <li key={h.day}><span className="text-foreground">{h.day}:</span> {h.time}</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
