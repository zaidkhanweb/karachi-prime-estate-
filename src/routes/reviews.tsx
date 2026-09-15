import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquareQuote } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — DHA Karachi Real Estate" },
      { name: "description", content: "Client feedback and property service experiences for DHA Karachi Real Estate." },
      { property: "og:title", content: "Reviews — DHA Karachi Real Estate" },
      { property: "og:description", content: "Client feedback and property service experiences." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Client feedback</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Reviews</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        This space is reserved for customer feedback supplied by the agency or connected from its official review profile.
      </p>

      <section className="mt-10 rounded-2xl border border-border bg-card p-8 sm:p-10">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="grid size-24 place-items-center rounded-full bg-secondary">
            <MessageSquareQuote className="size-10 text-accent" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl">Verified feedback will appear here</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Customer reviews can be added here when the agency provides them or connects its official review source.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-base btn-primary">Contact Us</Link>
              <Link to="/properties" className="btn-base btn-outline">View Properties</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
