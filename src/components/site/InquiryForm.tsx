import { useState, type FormEvent } from "react";

interface Props {
  defaultProperty?: string;
  withDate?: boolean;
}

export function InquiryForm({ defaultProperty = "", withDate = false }: Props) {
  const initialValues = { name: "", phone: "", property: defaultProperty, date: "", message: "" };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState(false);

  const set = (k: keyof typeof initialValues, v: string) =>
    setValues((current) => ({ ...current, [k]: v }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[\d\s+()-]{7,20}$/.test(values.phone.trim())) next.phone = "Please enter a valid phone number.";
    if (!values.property.trim()) next.property = "Please tell us which property.";
    if (!values.message.trim()) next.message = "Please add a short message.";
    setErrors(next);
    setValidated(Object.keys(next).length === 0);
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

      <button type="submit" className="btn-base btn-primary w-full">Review Enquiry</button>

      {validated && (
        <p className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-xs text-foreground">
          Your enquiry details are complete. Online delivery will be enabled when the agency's enquiry service is connected.
        </p>
      )}
      <p className="text-[11px] text-muted-foreground">
        Enquiry delivery is not active yet; no information is transmitted by this form.
      </p>
    </form>
  );
}
