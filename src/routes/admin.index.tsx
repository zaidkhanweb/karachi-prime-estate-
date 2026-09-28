import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2, LogOut, X } from "lucide-react";
import { adminDeleteProperty, adminListProperties, adminSaveProperty, adminUploadImage, clearAdminToken, verifyAdmin, type AdminPropertyRow } from "@/lib/admin-api";

type Row = AdminPropertyRow;

type FormState = Omit<Row, "id">;
const blank: FormState = { title: "", price: 0, location: "", bedrooms: 0, bathrooms: 0, area: "", property_type: "House", description: "", status: "Available", image_url: "", featured: false, purpose: "sale" };

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "Admin Dashboard — DHA Karachi Real Estate" }] }),
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(blank);

  async function load() {
    try { setRows(await adminListProperties()); } catch (err) { setMessage(err instanceof Error ? err.message : "Could not load properties"); }
  }

  useEffect(() => {
    verifyAdmin().then(async (ok) => { if (!ok) { navigate({ to: "/admin/login" }); return; } await load(); setChecking(false); });
  }, [navigate]);

  function edit(row: Row) {
    setEditingId(row.id);
    setForm({ title: row.title ?? "", price: row.price ?? 0, location: row.location ?? "", bedrooms: row.bedrooms ?? 0, bathrooms: row.bathrooms ?? 0, area: row.area ?? "", property_type: row.property_type ?? "House", description: row.description ?? "", status: row.status ?? "Available", image_url: row.image_url ?? "", featured: Boolean(row.featured), purpose: row.purpose ?? "sale" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() { setEditingId(null); setForm(blank); setMessage(""); }

  async function save(e: FormEvent) {
    e.preventDefault(); setLoading(true); setMessage("");
    const payload = { ...form, price: Number(form.price), bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms), image_url: form.image_url || null };
    try { await adminSaveProperty(payload, editingId ?? undefined); setMessage(editingId ? "Property updated successfully." : "Property added successfully."); setEditingId(null); setForm(blank); await load(); } catch (err) { setMessage(err instanceof Error ? err.message : "Could not save property"); } finally { setLoading(false); }
  }

  async function remove(id: number, title: string | null) {
    if (!window.confirm(`Delete ${title || "this property"}? This cannot be undone.`)) return;
    try { await adminDeleteProperty(id); setMessage("Property deleted."); await load(); } catch (err) { setMessage(err instanceof Error ? err.message : "Could not delete property"); }
  }

  async function uploadImage(file: File) {
    setLoading(true); setMessage("");
    try { const publicUrl = await adminUploadImage(file); setForm((f) => ({ ...f, image_url: publicUrl })); setMessage("Image uploaded. Save the property to apply it."); } catch (err) { setMessage(`Image upload failed: ${err instanceof Error ? err.message : "Unknown error"}`); } finally { setLoading(false); }
  }

  if (checking) return <div className="container-site py-20 text-sm text-muted-foreground">Checking admin session…</div>;

  const field = (key: keyof FormState, value: string | number | boolean) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <section className="section-pad bg-background">
      <div className="container-site">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin panel</p><h1 className="mt-2 font-display text-4xl">Manage Properties</h1><p className="mt-2 text-sm text-muted-foreground">Changes saved here appear on the live property website.</p></div>
          <button className="btn-base btn-outline" onClick={async () => { clearAdminToken(); navigate({ to: "/admin/login" }); }}><LogOut className="h-4 w-4" /> Sign out</button>
        </div>

        <form onSubmit={save} className="mt-8 rounded-2xl border border-border bg-card p-5 md:p-7">
          <div className="flex items-center justify-between"><h2 className="font-display text-2xl">{editingId ? "Edit property" : "Add property"}</h2>{editingId && <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /> Cancel edit</button>}</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AdminInput label="Title" value={form.title ?? ""} onChange={(v) => field("title", v)} required />
            <AdminInput label="Price (PKR)" type="number" value={form.price ?? 0} onChange={(v) => field("price", Number(v))} required />
            <AdminInput label="Location" value={form.location ?? ""} onChange={(v) => field("location", v)} required />
            <AdminInput label="Bedrooms" type="number" value={form.bedrooms ?? 0} onChange={(v) => field("bedrooms", Number(v))} />
            <AdminInput label="Bathrooms" type="number" value={form.bathrooms ?? 0} onChange={(v) => field("bathrooms", Number(v))} />
            <AdminInput label="Area" value={form.area ?? ""} onChange={(v) => field("area", v)} placeholder="e.g. 2000 sq ft" />
            <AdminSelect label="Property type" value={form.property_type ?? "House"} onChange={(v) => field("property_type", v)} options={["House", "Apartment", "Plot", "Commercial"]} />
            <AdminSelect label="Purpose" value={form.purpose ?? "sale"} onChange={(v) => field("purpose", v)} options={["sale", "rent"]} />
            <AdminSelect label="Status" value={form.status ?? "Available"} onChange={(v) => field("status", v)} options={["Available", "Sold", "Rented"]} />
          </div>
          <label className="mt-4 block text-sm font-medium">Description<textarea className="mt-2 min-h-28 w-full rounded-lg border border-border bg-background px-3 py-2.5" value={form.description ?? ""} onChange={(e) => field("description", e.target.value)} /></label>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <AdminInput label="Image URL" value={form.image_url ?? ""} onChange={(v) => field("image_url", v)} placeholder="Paste a public image URL or upload below" />
            <label className="block text-sm font-medium">Upload property image<input className="mt-2 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); }} /></label>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.featured)} onChange={(e) => field("featured", e.target.checked)} /> Featured property</label>
          {message && <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-sm">{message}</p>}
          <button disabled={loading} className="btn-base btn-primary mt-5"><Plus className="h-4 w-4" /> {loading ? "Saving…" : editingId ? "Save changes" : "Add property"}</button>
        </form>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4"><h2 className="font-display text-2xl">Current listings</h2><p className="text-sm text-muted-foreground">{rows.length} properties in Supabase</p></div>
          <div className="divide-y divide-border">
            {rows.map((row) => <div key={row.id} className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between"><div><p className="font-semibold">{row.title}</p><p className="mt-1 text-sm text-muted-foreground">{row.location} · PKR {Number(row.price ?? 0).toLocaleString("en-PK")} · {row.purpose === "rent" ? "For Rent" : "For Sale"}</p></div><div className="flex gap-2"><button className="btn-base btn-outline" onClick={() => edit(row)}><Pencil className="h-4 w-4" /> Edit</button><button className="btn-base btn-outline" onClick={() => remove(row.id, row.title)}><Trash2 className="h-4 w-4" /> Delete</button></div></div>)}
            {!rows.length && <p className="p-5 text-sm text-muted-foreground">No properties found.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminInput({ label, value, onChange, type = "text", required = false, placeholder = "" }: { label: string; value: string | number; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return <label className="block text-sm font-medium">{label}<input className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5" type={type} value={value} required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /></label>;
}
function AdminSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="block text-sm font-medium">{label}<select className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5" value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select></label>;
}
