import prop1 from "@/assets/prop-1.jpg";
import type { Property, PropertyType, Purpose } from "@/data/properties";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

type PropertyRow = {
  id: number | string;
  title: string | null;
  price: number | string | null;
  location: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area: string | null;
  property_type: string | null;
  description: string | null;
  status: string | null;
  image_url: string | null;
  featured: boolean | null;
  purpose: string | null;
};

function normalizeType(value: string | null): PropertyType {
  const type = (value ?? "house").toLowerCase();
  if (type === "apartment" || type === "plot" || type === "commercial") return type;
  return "house";
}

function normalizePurpose(value: string | null): Purpose {
  return (value ?? "sale").toLowerCase() === "rent" ? "rent" : "sale";
}

function formatPrice(value: number, purpose: Purpose) {
  const formatted = new Intl.NumberFormat("en-PK").format(value);
  return purpose === "rent" ? `PKR ${formatted} / month` : `PKR ${formatted}`;
}

function rowToProperty(row: PropertyRow): Property {
  const type = normalizeType(row.property_type);
  const purpose = normalizePurpose(row.purpose);
  const priceValue = Number(row.price ?? 0);
  const title = row.title || "Property listing";
  const description = row.description || "Property details available on request.";
  const image = row.image_url || prop1;

  return {
    id: String(row.id),
    title,
    type,
    typeLabel: type.charAt(0).toUpperCase() + type.slice(1),
    purpose,
    price: formatPrice(priceValue, purpose),
    priceValue,
    location: row.location || "Karachi",
    area: row.area || "Area on request",
    beds: Number(row.bedrooms ?? 0),
    baths: Number(row.bathrooms ?? 0),
    description,
    longDescription: description,
    features: [],
    parking: "Contact the agent for parking details.",
    nearby: [],
    images: [{ src: image, alt: `${title} in ${row.location || "Karachi"}` }],
  };
}

async function requestRows(query = ""): Promise<PropertyRow[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  const response = await fetch(`${SUPABASE_URL}/rest/v1/properties?${query}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!response.ok) throw new Error(`Supabase request failed (${response.status})`);
  return response.json() as Promise<PropertyRow[]>;
}

export async function fetchProperties(): Promise<Property[]> {
  const rows = await requestRows("select=*&order=created_at.desc");
  return rows.map(rowToProperty);
}

export async function fetchProperty(id: string): Promise<Property | null> {
  const rows = await requestRows(`select=*&id=eq.${encodeURIComponent(id)}&limit=1`);
  return rows[0] ? rowToProperty(rows[0]) : null;
}
