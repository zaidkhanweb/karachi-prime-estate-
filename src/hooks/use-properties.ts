import { useEffect, useState } from "react";
import { demoProperties, type Property } from "@/data/properties";
import { fetchProperties, isSupabaseConfigured } from "@/lib/supabase-properties";

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>(isSupabaseConfigured ? [] : demoProperties);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;
    fetchProperties()
      .then((rows) => {
        if (active) setProperties(rows);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Could not load properties");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { properties, loading, error };
}
