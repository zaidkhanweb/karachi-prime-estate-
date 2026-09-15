import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  Tag,
  KeyRound,
  LineChart,
  Calculator,
  Building2,
} from "lucide-react";
import { contactReady, waLink } from "@/config/business";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Real Estate Services in Karachi — DHA Karachi Real Estate" },
      {
        name: "description",
        content:
          "Buying, selling, renting, investment consultation, valuation and commercial real estate support across Karachi.",
      },
      { property: "og:title", content: "Real Estate Services in Karachi" },
      {
        property: "og:description",
        content:
          "Buying, selling, renting, investment consultation, valuation and commercial property support.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Home,
    title: "Property Buying",
    body: "We shortlist options that fit your budget and area preferences, arrange viewings and walk you through the paperwork.",
  },
  {
    icon: Tag,
    title: "Property Selling",
    body: "Positioning, pricing guidance and buyer negotiation, with your property presented properly from day one.",
  },
  {
    icon: KeyRound,
    title: "Property Renting",
    body: "Tenant sourcing for landlords and rental search for tenants, including agreements and handover support.",
  },
  {
    icon: LineChart,
    title: "Investment Consultation",
    body: "Area-by-area discussion of what to consider before committing capital to a Karachi property.",
  },
  {
    icon: Calculator,
    title: "Property Valuation",
    body: "A grounded view of what your property could achieve, based on comparable local activity.",
  },
  {
    icon: Building2,
    title: "Commercial Real Estate",
    body: "Shops, offices and mixed-use spaces across DHA's commercial areas and other Karachi business districts.",
  },
];

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">What we do</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Services</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Property services for buying, selling, renting and investing across Karachi,
        with a clear route from enquiry to the next step.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="flex flex-col rounded-xl border border-border bg-card p-6">
            <s.icon className="size-6 text-accent" aria-hidden="true" />
            <h2 className="mt-4 text-xl">{s.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/contact" className="btn-base btn-primary">
                Contact Us
              </Link>
              {contactReady.whatsapp && (
                <a
                  href={waLink(`Hello, I'd like to know more about your ${s.title} service.`)}
                  className="btn-base btn-outline"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
