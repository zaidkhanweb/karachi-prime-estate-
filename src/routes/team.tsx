import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, User } from "lucide-react";
import { business, telLink, waLink } from "@/config/business";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — DHA Karachi Real Estate" },
      {
        name: "description",
        content:
          "Meet the agents at DHA Karachi Real Estate. Team profiles are placeholders pending the agency's own details.",
      },
      { property: "og:title", content: "Our Team — DHA Karachi Real Estate" },
      {
        property: "og:description",
        content: "The people who will guide your property search in Karachi.",
      },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

const team = [
  { name: "[Agent Name]", role: "[Role placeholder]" },
  { name: "[Agent Name]", role: "[Role placeholder]" },
  { name: "[Agent Name]", role: "[Role placeholder]" },
];

function TeamPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Placeholder profiles</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Our Team</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Names, photographs, roles and biographies below are placeholders. They will be
        replaced with the agency's real team details before the site goes live.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid aspect-[4/3] place-items-center bg-secondary">
              <div className="text-center">
                <User className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Photo placeholder
                </p>
              </div>
            </div>
            <div className="p-5">
              <h2 className="text-xl">{m.name}</h2>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-accent">
                {m.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                [Short bio placeholder — to be provided by {business.shortName}.]
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={telLink} className="btn-base btn-primary">
                  <Phone className="size-4" aria-hidden="true" /> Call
                </a>
                <a
                  href={waLink("Hello, I'd like to speak to one of your agents.")}
                  className="btn-base btn-outline"
                >
                  <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
