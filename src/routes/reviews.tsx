import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, MessageCircle, Star } from "lucide-react";
import { business, waLink } from "@/config/business";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — DHA Karachi Real Estate" },
      {
        name: "description",
        content: "Read client feedback and see how DHA Karachi Real Estate supports buyers, sellers and renters.",
      },
      { property: "og:title", content: "Reviews — DHA Karachi Real Estate" },
      { property: "og:description", content: "Client feedback for DHA Karachi Real Estate." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

const reviews = [
  {
    quote: "[Client review placeholder — replace with a verified Google review.]",
    name: "[Client Name]",
    detail: "Buyer · DHA Karachi",
  },
  {
    quote: "[Client review placeholder — replace with a verified Google review.]",
    name: "[Client Name]",
    detail: "Landlord · Clifton",
  },
  {
    quote: "[Client review placeholder — replace with a verified Google review.]",
    name: "[Client Name]",
    detail: "Tenant · PECHS",
  },
];

function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Client feedback</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Reviews</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        This demo uses placeholders until the agency supplies verified customer feedback.
        Replace the cards below with real reviews before launch.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.name + review.detail} className="rounded-xl border border-border bg-card p-6">
            <div className="flex gap-1 text-accent" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-5 text-sm leading-relaxed">“{review.quote}”</blockquote>
            <div className="mt-6 border-t border-border pt-4">
              <p className="font-semibold">{review.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{review.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-2xl border border-border bg-secondary/40 p-7 sm:p-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Want to see more?</p>
            <h2 className="mt-2 text-2xl sm:text-3xl">Check our verified Google reviews</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              The link below is ready to be replaced with the agency's actual Google Business review URL.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={business.googleReviewsUrl} target="_blank" rel="noreferrer" className="btn-base btn-primary">
              <ExternalLink className="size-4" aria-hidden="true" /> Google Reviews
            </a>
            <a href={waLink("Hello, I'd like to know more about your properties.")} className="btn-base btn-outline">
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
            </a>
            <Link to="/contact" className="btn-base btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
