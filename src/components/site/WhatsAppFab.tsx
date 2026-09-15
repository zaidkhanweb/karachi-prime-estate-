import { MessageCircle } from "lucide-react";
import { contactReady, waLink } from "@/config/business";

export function WhatsAppFab() {
  if (!contactReady.whatsapp) return null;

  return (
    <a
      href={waLink("Hello, I found your website and would like to enquire.")}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
