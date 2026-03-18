"use client";

import { useEffect, useState } from "react";
import { Plus, Users, MessageSquare, ClipboardList } from "lucide-react";

interface PromoterWithStats {
  id: string;
  name: string;
  email: string;
  business_name: string | null;
  plan: string;
  subscription_status: string;
  sms_used: number;
  sms_limit: number;
  twilio_phone: string | null;
  is_active: boolean;
  created_at: string;
  stats: { guests: number; contacts: number; messages: number };
}

export default function PromotersPage() {
  const [promoters, setPromoters] = useState<PromoterWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    business_name: "",
    plan: "starter",
    phone: "",
  });

  useEffect(() => {
    fetch("/api/admin/promoters")
      .then((r) => r.json())
      .then(setPromoters)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/promoters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const promoter = await res.json();
      setPromoters([{ ...promoter, stats: { guests: 0, contacts: 0, messages: 0 } }, ...promoters]);
      setShowAdd(false);
      setForm({ name: "", email: "", password: "", business_name: "", plan: "starter", phone: "" });
    } else {
      const data = await res.json();
      alert(data.error || "Failed to create");
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-velvet-light border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Promoters ({promoters.length})</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-gradient-velvet flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Add Promoter
        </button>
      </div>

      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-border/50 bg-card/50 p-4 sm:p-5 md:grid-cols-3"
        >
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <input required placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <input placeholder="Business Name" value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option value="starter">Starter ($99/mo)</option>
            <option value="pro">Pro ($179/mo)</option>
            <option value="elite">Elite ($299/mo)</option>
          </select>
          <button type="submit" className="bg-gradient-velvet col-span-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white md:col-span-3">
            Create Promoter Account
          </button>
        </form>
      )}

      <div className="space-y-3">
        {promoters.map((p) => (
          <div
            key={p.id}
            className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card/50 p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">{p.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase ${
                  p.plan === "elite" ? "bg-gold/10 text-gold" :
                  p.plan === "pro" ? "bg-velvet/10 text-velvet-light" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {p.plan}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  p.subscription_status === "active" ? "bg-green-500/10 text-green-400" :
                  p.subscription_status === "trialing" ? "bg-blue-500/10 text-blue-400" :
                  "bg-red-500/10 text-red-400"
                }`}>
                  {p.subscription_status}
                </span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {p.email} {p.business_name && `· ${p.business_name}`}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground sm:gap-6">
              <div className="flex items-center gap-1.5">
                <ClipboardList className="h-3.5 w-3.5" />
                {p.stats.guests}
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {p.stats.contacts}
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                {p.stats.messages}
              </div>
              <div>
                SMS: {p.sms_used}/{p.sms_limit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
