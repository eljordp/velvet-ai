"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Check, Calendar } from "lucide-react";
import Link from "next/link";

export default function GetStarted() {
  const [plan, setPlan] = useState<"free" | "starter" | "pro" | "elite">("free");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    instagram: "",
    city: "Las Vegas",
    venues: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const plans = {
    free: { setup: "Free", monthly: "$0", label: "Free", description: "Up to 25 contacts" },
    starter: { setup: "$500 setup", monthly: "$99/mo", label: "Starter", description: "Dedicated number" },
    pro: { setup: "$1,000 setup", monthly: "$179/mo", label: "Pro", description: "Blasts + 3 venues" },
    elite: { setup: "$2,500 setup", monthly: "$299/mo", label: "Elite", description: "Unlimited everything" },
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, plan }),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-velvet/20">
            <Check className="h-8 w-8 text-velvet-light" />
          </div>
          <h1 className="mb-4 text-3xl font-bold">You&apos;re In.</h1>
          <p className="mb-4 text-muted-foreground">
            {plan === "free"
              ? "Your free account is being set up. We'll email you your login within a few hours."
              : "We'll reach out within 24 hours to get your bot set up. Check your email and phone for next steps."}
          </p>
          {plan !== "free" && (
            <p className="mb-6 text-sm text-muted-foreground">
              Want to get started faster?{" "}
              <a
                href="https://calendar.app.google/hNGSbS3nKskMbF7S6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-velvet-light hover:underline"
              >
                <Calendar className="h-3.5 w-3.5" />
                Book a setup call now
              </a>
            </p>
          )}
          <Link href="/" className="text-velvet-light hover:underline">
            Back to VelvetAI
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-velvet-light" />
            <span className="text-xl font-bold">
              <span className="text-gradient">Velvet</span>AI
            </span>
          </Link>
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Get Your AI Bot</h1>
          <p className="text-muted-foreground">
            Start free or pick a plan. We&apos;ll have you live fast.
          </p>
        </div>

        {/* Plan selector */}
        <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {(Object.entries(plans) as [keyof typeof plans, (typeof plans)[keyof typeof plans]][]).map(
            ([key, p]) => (
              <button
                key={key}
                onClick={() => setPlan(key)}
                className={`rounded-xl border p-3 text-center transition-all sm:p-4 ${
                  plan === key
                    ? "border-velvet-light bg-velvet/10"
                    : "border-border/50 bg-card/30 hover:border-border"
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-velvet-light sm:text-sm">
                  {p.label}
                </div>
                <div className="mt-1 text-base font-bold sm:text-lg">{p.monthly}</div>
                <div className="text-[10px] text-muted-foreground sm:text-xs">
                  {p.description}
                </div>
              </button>
            )
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
                placeholder="Marcus Johnson"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
                placeholder="(555) 555-5555"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Instagram</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
                placeholder="@yourhandle"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Business / Brand Name</label>
              <input
                type="text"
                value={formData.business_name}
                onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
                placeholder="Your brand or promoter name"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
                placeholder="Las Vegas"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">What venues do you promote at?</label>
            <input
              type="text"
              value={formData.venues}
              onChange={(e) => setFormData({ ...formData, venues: e.target.value })}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
              placeholder="Omnia, Hakkasan, TAO, Zouk..."
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Anything else we should know?</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
              placeholder="How many guests do you typically do per week? Any specific needs?"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-velvet glow group flex w-full items-center justify-center gap-2 rounded-full py-4 text-lg font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? (
              "Submitting..."
            ) : (
              <>
                {plan === "free" ? "Start Free" : `Get Started with ${plans[plan].label}`}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <div className="space-y-2 text-center">
            <p className="text-xs text-muted-foreground">
              {plan === "free"
                ? "No credit card required. Free until you hit 25 contacts."
                : "We'll reach out within 24 hours to get you set up."}
            </p>
            <p className="text-xs text-muted-foreground">
              Want to talk first?{" "}
              <a
                href="https://calendar.app.google/hNGSbS3nKskMbF7S6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-velvet-light hover:underline"
              >
                <Calendar className="h-3 w-3" />
                Book a quick call
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
