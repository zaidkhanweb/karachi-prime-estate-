const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
const TOKEN_KEY = "kpe_admin_access_token";

export const adminApiConfigured = Boolean(URL && KEY);
const headers = (token?: string) => ({ apikey: KEY ?? "", Authorization: `Bearer ${token ?? KEY ?? ""}` });
export const getAdminToken = () => typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);
export const clearAdminToken = () => { if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY); };

async function parseError(r: Response) { try { const j = await r.json(); return j.msg || j.message || j.error_description || j.error || `Request failed (${r.status})`; } catch { return `Request failed (${r.status})`; } }

export async function adminLogin(email: string, password: string) {
  if (!URL || !KEY) throw new Error("Supabase environment variables are missing.");
  const r = await fetch(`${URL}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: KEY, "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  if (!r.ok) throw new Error(await parseError(r));
  const data = await r.json(); localStorage.setItem(TOKEN_KEY, data.access_token); return data;
}

export async function verifyAdmin() {
  const token = getAdminToken(); if (!URL || !KEY || !token) return false;
  const r = await fetch(`${URL}/auth/v1/user`, { headers: headers(token) });
  if (!r.ok) { clearAdminToken(); return false; } return true;
}

export type AdminPropertyRow = { id: number; title: string | null; price: number | null; location: string | null; bedrooms: number | null; bathrooms: number | null; area: string | null; property_type: string | null; description: string | null; status: string | null; image_url: string | null; featured: boolean | null; purpose: string | null; };

export async function adminListProperties(): Promise<AdminPropertyRow[]> {
  const token = getAdminToken(); if (!URL || !token) throw new Error("Please sign in again.");
  const r = await fetch(`${URL}/rest/v1/properties?select=*&order=created_at.desc`, { headers: headers(token) });
  if (!r.ok) throw new Error(await parseError(r)); return r.json();
}

export async function adminSaveProperty(payload: Omit<AdminPropertyRow,"id">, id?: number) {
  const token = getAdminToken(); if (!URL || !token) throw new Error("Please sign in again.");
  const endpoint = id ? `${URL}/rest/v1/properties?id=eq.${id}` : `${URL}/rest/v1/properties`;
  const r = await fetch(endpoint, { method: id ? "PATCH" : "POST", headers: { ...headers(token), "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error(await parseError(r));
}

export async function adminDeleteProperty(id: number) {
  const token = getAdminToken(); if (!URL || !token) throw new Error("Please sign in again.");
  const r = await fetch(`${URL}/rest/v1/properties?id=eq.${id}`, { method: "DELETE", headers: headers(token) });
  if (!r.ok) throw new Error(await parseError(r));
}

export async function adminUploadImage(file: File) {
  const token = getAdminToken(); if (!URL || !token) throw new Error("Please sign in again.");
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-"); const path = `${Date.now()}-${safe}`;
  const r = await fetch(`${URL}/storage/v1/object/property-images/${encodeURIComponent(path)}`, { method: "POST", headers: { ...headers(token), "Content-Type": file.type || "application/octet-stream", "x-upsert": "false" }, body: file });
  if (!r.ok) throw new Error(await parseError(r));
  return `${URL}/storage/v1/object/public/property-images/${encodeURIComponent(path)}`;
}
