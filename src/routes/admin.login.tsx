import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { adminApiConfigured, adminLogin, verifyAdmin } from "@/lib/admin-api";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
  head: () => ({ meta: [{ title: "Admin Login — DHA Karachi Real Estate" }] }),
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    verifyAdmin().then((ok) => { if (ok) navigate({ to: "/admin" }); });
  }, [navigate]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!adminApiConfigured) return setError("Supabase environment variables are missing.");
    setLoading(true);
    try { await adminLogin(email, password); navigate({ to: "/admin" }); } catch (err) { setError(err instanceof Error ? err.message : "Login failed"); } finally { setLoading(false); }
  }

  return (
    <section className="section-pad bg-background">
      <div className="container-site flex min-h-[65vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Private access</p>
          <h1 className="mt-2 font-display text-3xl">Property Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to add, edit and remove property listings.</p>
          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block text-sm font-medium">Email
              <input className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-accent" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </label>
            <label className="block text-sm font-medium">Password
              <input className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-accent" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </label>
            {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
            <button className="btn-base btn-primary w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
