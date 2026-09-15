import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, contactReady, telLink, waLink } from "@/config/business";
import { InquiryForm } from "@/components/site/InquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DHA Karachi Real Estate" },
      { name: "description", content: "Contact DHA Karachi Real Estate for property buying, selling, renting and viewing enquiries." },
      { property: "og:title", content: "Contact — DHA Karachi Real Estate" },
      { property: "og:description", content: "Get in touch about Karachi property." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Let's talk property</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Contact Us</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Tell us what you are looking for and start a conversation about your property needs.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl">Get in touch</h2>
            <div className="mt-5 space-y-4 text-sm">
              {contactReady.phone && (
                <a href={telLink} className="flex items-start gap-3 hover:text-accent">
                  <Phone className="mt-0.5 size-5 text-accent" aria-hidden="true" />
                  <span><strong className="block text-foreground">Phone</strong>{business.phoneDisplay}</span>
                </a>
              )}
              {contactReady.whatsapp && (
                <a href={waLink("Hello, I'd like to enquire about a property.")} className="flex items-start gap-3 hover:text-accent">
                  <MessageCircle className="mt-0.5 size-5 text-accent" aria-hidden="true" />
                  <span><strong className="block text-foreground">WhatsApp</strong>Message us directly</span>
                </a>
              )}
              {contactReady.email && (
                <a href={`mailto:${business.email}`} className="flex items-start gap-3 hover:text-accent">
                  <Mail className="mt-0.5 size-5 text-accent" aria-hidden="true" />
                  <span><strong className="block text-foreground">Email</strong>{business.email}</span>
                </a>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 text-accent" aria-hidden="true" />
                <span><strong className="block text-foreground">Office</strong>{business.address}</span>
              </div>
              {contactReady.hours && (
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 text-accent" aria-hidden="true" />
                  <span><strong className="block text-foreground">Hours</strong>{business.hours.map((h) => <span key={h.day} className="block">{h.day}: {h.time}</span>)}</span>
                </div>
              )}
              {!contactReady.phone && !contactReady.whatsapp && !contactReady.email && (
                <p className="rounded-lg bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
                  Direct contact details will be shown here once the agency's verified information is connected.
                </p>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <iframe
              title="DHA Karachi Real Estate office location"
              src={business.mapsEmbedUrl}
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-4">
              <a href={business.directionsUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-accent hover:underline">
                Get directions →
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-2xl">Send an enquiry</h2>
          <p className="mt-2 text-sm text-muted-foreground">Share a few details about what you are looking for.</p>
          <InquiryForm defaultProperty="General enquiry" />
        </div>
      </div>
    </div>
  );
}
