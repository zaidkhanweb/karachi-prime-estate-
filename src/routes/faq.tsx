import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/config/business";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — DHA Karachi Real Estate" },
      {
        name: "description",
        content: "Frequently asked questions about buying, selling, renting and viewing property in Karachi.",
      },
      { property: "og:title", content: "FAQ — DHA Karachi Real Estate" },
      { property: "og:description", content: "Frequently asked real estate questions." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});

const faqs = [
  ["Are the properties on this website currently available?", "The listings in this demo are sample content. Availability, pricing and property details must be verified with the agency before publishing."],
  ["Which areas do you cover?", "The demo is set up for DHA Karachi, Clifton, Gulshan-e-Iqbal, Bahria Town Karachi and PECHS. Update the areas in the business configuration when the agency confirms its service area."],
  ["Can you help me sell my property?", "Yes. The sales service section is designed to cover pricing guidance, presentation, buyer enquiries and negotiation support."],
  ["Can I request a property viewing?", "Yes. Open a property and use the viewing form. It is currently demo-only until a real submission method is connected."],
  ["How do enquiries reach the agency?", "WhatsApp and phone links can work immediately once the real business number is added. Website form submissions need a backend or form service before launch."],
  ["Can you help with commercial property?", "Yes. The demo includes commercial property support for shops, offices and mixed-use spaces."],
];

function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Need to know</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Frequently Asked Questions</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Common questions for buyers, sellers, landlords and tenants. Review these answers with the agency before launch.
      </p>

      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card px-6">
        {faqs.map(([question, answer]) => (
          <details key={question} className="group py-5">
            <summary className="cursor-pointer list-none pr-8 font-display text-lg font-medium marker:hidden">
              {question}
              <span className="float-right text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{answer}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-7">
        <h2 className="text-2xl">Still have a question?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Speak to an agent directly or send an enquiry.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={waLink("Hello, I have a question about a property.")} className="btn-base btn-accent">
            <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp Us
          </a>
          <Link to="/contact" className="btn-base btn-primary">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
