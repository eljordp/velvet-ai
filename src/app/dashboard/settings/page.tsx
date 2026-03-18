"use client";

import { useEffect, useState } from "react";
import { Save, Crown } from "lucide-react";

interface PromoterSettings {
  name: string;
  email: string;
  business_name: string;
  phone: string;
  instagram: string;
  bot_name: string;
  bot_personality: string;
  brand_color: string;
  plan: string;
  twilio_phone: string;
  sms_used: number;
  sms_limit: number;
  subscription_status: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<PromoterSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      await fetch("/api/dashboard/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-velvet-light border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and bot settings
        </p>
      </div>

      {/* Plan info */}
      <div className="mb-8 rounded-xl border border-velvet-light/20 bg-velvet/5 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 shrink-0 text-gold" />
            <div>
              <div className="font-semibold capitalize">{settings.plan} Plan</div>
              <div className="text-sm text-muted-foreground capitalize">
                {settings.subscription_status}
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground sm:text-right">
            <div>SMS: {settings.sms_used} / {settings.sms_limit}</div>
            {settings.twilio_phone && <div>Bot: {settings.twilio_phone}</div>}
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-6">
          <h2 className="mb-4 font-semibold">Profile</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" value={settings.name} onChange={(v) => setSettings({ ...settings, name: v })} />
            <Field label="Email" value={settings.email} onChange={(v) => setSettings({ ...settings, email: v })} type="email" />
            <Field label="Business Name" value={settings.business_name || ""} onChange={(v) => setSettings({ ...settings, business_name: v })} />
            <Field label="Phone" value={settings.phone || ""} onChange={(v) => setSettings({ ...settings, phone: v })} />
            <Field label="Instagram" value={settings.instagram || ""} onChange={(v) => setSettings({ ...settings, instagram: v })} />
          </div>
        </div>

        {/* Bot Settings */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-6">
          <h2 className="mb-4 font-semibold">Bot Personality</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Bot Name" value={settings.bot_name} onChange={(v) => setSettings({ ...settings, bot_name: v })} />
            <Field label="Brand Color" value={settings.brand_color} onChange={(v) => setSettings({ ...settings, brand_color: v })} type="color" />
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium">Bot Personality</label>
            <textarea
              rows={3}
              value={settings.bot_personality}
              onChange={(e) => setSettings({ ...settings, bot_personality: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
              placeholder="Describe how your bot should talk..."
            />
            <p className="mt-1 text-xs text-muted-foreground">
              This shapes how the AI bot responds to your guests
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-gradient-velvet flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
      />
    </div>
  );
}
