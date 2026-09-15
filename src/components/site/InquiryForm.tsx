import { useState, type FormEvent } from "react";
import { business, contactReady, waLink } from "@/config/business";

interface Props {
  defaultProperty?: string;
  withDate?: boolean;
}

export function InquiryForm({ defaultProperty = "", withDate = false }: Props) {
  const initialValues = { name: "", phone: "", property: defaultProperty, date: "", message: "" };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: keyof typeof initialValues, v: string) => {
    setValues((current) => ({ ...current, [k]: v }));
    setValidated(false);
    setEmailStatus("idle");
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[\d\s+()-]{7,20}$/.test(values.phone.trim())) next.phone = "Please enter a valid phone number.";
    if (!values.property.trim()) next.property = "Please tell us which property.";
    if (!values.message.trim()) next.message = "Please add a short message.";
    setErrors(next);
    const ok = Object.keys(next).length === 0;
    setValidated(ok);
    return ok;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    validate();
  };

  const whatsappMessage = [
    "Hello, I'd like to make a property enquiry.",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Property: ${values.property}`,
    ...(withDate && values.date ? [`Preferred viewing date: ${values.date}`] : []),
    `Message: ${values.message}`,
  ].join("\n");

  const sendWhatsApp = () => {
    if (!validate() || !contactReady.whatsapp) return;
    window.open(waLink(whatsappMessage), "_blank", "noopener,noreferrer");
  };

  const sendEmail = async () => {
    if (!validate() || !contactReady.formspree) return;
    setEmailStatus("sending");
    try {
      const response = await fetch(business.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          property: values.property,
          ...(withDate && values.date ? { preferredViewingDate: values.date } : {}),
          message: values.message,
        }),
      });
      if (!response.ok) throw new Error("Form submission failed");
      setEmailStatus("sent");
    } catch {
      setEmailStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 space-y-3">
      <div>
        <label className="label-xs" htmlFor="iq-name">Name *</label>
        <input id="iq-name" className="field" value={values.name} onChange={(e) => set("name", e.target.value)} />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
      </div>
      <div>
        <label className="label-xs" htmlFor="iq-phone">Phone *</label>
        <input id="iq-phone" type="tel" className="field" value={values.phone} onChange={(e) => set("phone", e.target.value)} />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
      </div>
      <div>
        <label className="label-xs" htmlFor="iq-property">Property *</label>
        <input id="iq-property" className="field" value={values.property} onChange={(e) => set("property", e.target.value)} />
        {errors.property && <p className="mt-1 text-xs text-destructive">{errors.property}</p>}
      </div>
      {withDate && (
        <div>
          <label className="label-xs" htmlFor="iq-date">Preferred viewing date</label>
          <input id="iq-date" type="date" className="field" value={values.date} onChange={(e) => set("date", e.target.value)} />
        </div>
      )}
      <div>
        <label className="label-xs" htmlFor="iq-message">Message *</label>
        <textarea id="iq-message" rows={4} className="field" value={values.message} onChange={(e) => set("message", e.target.value)} />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
      </div>

      {!validated ? (
        <button type="submit" className="btn-base btn-primary w-full">Review Enquiry</button>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          <button type="button" onClick={sendWhatsApp} disabled={!contactReady.whatsapp} className="btn-base btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
            Send via WhatsApp
          </button>
          <button type="button" onClick={sendEmail} disabled={!contactReady.formspree || emailStatus === "sending"} className="btn-base btn-outline w-full disabled:cursor-not-allowed disabled:opacity-50">
            {emailStatus === "sending" ? "Sending..." : "Send via Email"}
          </button>
        </div>
      )}

      {validated && (!contactReady.whatsapp || !contactReady.formspree) && (
        <p className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-xs text-foreground">
          Contact delivery will be enabled when the agency's verified WhatsApp number and email service are connected.
        </p>
      )}
      {emailStatus === "sent" && <p className="text-xs text-foreground">Your enquiry was sent successfully by email.</p>}
      {emailStatus === "error" && <p className="text-xs text-destructive">Email delivery failed. Please try again.</p>}
      <p className="text-[11px] text-muted-foreground">
        Choose WhatsApp or email after reviewing your enquiry. No information is sent until you choose a delivery option.
      </p>
    </form>
  );
}
