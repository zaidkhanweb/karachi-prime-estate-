import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { contactReady, waLink } from "@/config/business";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — DHA Karachi Real Estate" },
      { name: "description", content: "Frequently asked questions about buying, selling, renting and viewing property in Karachi." },
      { property: "og:title", content: "FAQ — DHA Karachi Real Estate" },
      { property: "og:description", content: "Frequently asked real estate questions." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});

const faqs = [
  ["Are the properties on this website currently available?", "The property cards are illustrative examples. Availability, pricing and final property details should always be confirmed directly with the agency."],
  ["Which areas can be featured?", "The website can present properties across key Karachi locations, including DHA, Clifton, Gulshan-e-Iqbal, Bahria Town Karachi and PECHS. Final coverage can be tailored to the agency."],
  ["Can you help me sell my property?", "The service structure supports seller enquiries, including pricing guidance, property presentation, buyer enquiries and negotiation support."],
  ["Can I request a property viewing?", "Yes. Open a property and use the viewing enquiry section. Online delivery will be connected to the agency's preferred enquiry service during final setup."],
  ["How can I contact the agency?", "Verified phone, WhatsApp and email details can be connected to the website so visitors can contact the agency directly."],
  ["Can commercial properties be included?", "Yes. The website structure supports shops, offices and other commercial property listings alongside residential properties."],
];

function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Need to know</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Frequently Asked Questions</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Straightforward answers to common questions about property enquiries, viewings and services.
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
        <p className="mt-2 text-sm text-muted-foreground">Send an enquiry and continue the conversation with the agency.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {contactReady.whatsapp && (
            <a href={waLink("Hello, I have a question about a property.")} className="btn-base btn-accent">
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp Us
            </a>
          )}
          <Link to="/contact" className="btn-base btn-primary">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
