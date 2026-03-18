"use client";

import {
  Bot,
  MessageSquare,
  Users,
  BarChart3,
  Zap,
  Send,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const features = [
  {
    icon: Bot,
    title: "AI SMS Concierge",
    description:
      "Your bot texts back instantly — at 3AM, on weekends, whenever. Answers questions, captures party details, and adds guests to the list automatically.",
  },
  {
    icon: Zap,
    title: "Auto Guest List Submission",
    description:
      "Names go straight from SMS to the venue's guest list system. No more manually entering hundreds of names every night.",
  },
  {
    icon: Send,
    title: "Mass Blasts",
    description:
      "Hit your entire contact list before a big night. SMS blasts with one click. Watch your guest list numbers explode.",
  },
  {
    icon: Users,
    title: "Contact Management",
    description:
      "Every person who texts you gets saved. Names, emails, preferences, history — all organized. No more lost contacts in your Notes app.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    description:
      "See your numbers live. Tonight's signups, party sizes, venue breakdown, weekly trends. Know exactly how you're performing.",
  },
  {
    icon: Shield,
    title: "Your Brand, Your Number",
    description:
      "Get your own dedicated phone number and branded landing page. Your guests see YOUR brand, not ours.",
  },
];

const packages = [
  {
    name: "STARTER",
    subtitle: "New Promoters",
    setup: "$500",
    monthly: "$99",
    period: "/mo",
    features: [
      "AI SMS bot (dedicated number)",
      "1 venue integration",
      "Guest list dashboard",
      "Contact management",
      "500 SMS/mo included",
      "Mobile-friendly dashboard",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "PRO",
    subtitle: "Growing Promoters",
    setup: "$1,000",
    monthly: "$179",
    period: "/mo",
    features: [
      "Everything in Starter",
      "Up to 3 venue integrations",
      "Mass blast messaging",
      "Booking management",
      "Weekly auto-blasts",
      "1,500 SMS/mo included",
      "Analytics & reporting",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "ELITE",
    subtitle: "Established Promoters",
    setup: "$2,500",
    monthly: "$299",
    period: "/mo",
    features: [
      "Everything in Pro",
      "Custom branded landing page",
      "Unlimited venue integrations",
      "VIP / bottle service booking",
      "Custom bot personality & branding",
      "5,000 SMS/mo included",
      "Priority support",
      "Weekly performance reports",
    ],
    cta: "Go Elite",
    highlighted: false,
  },
];

const addOns = [
  { name: "Extra venue integration", price: "$200 one-time" },
  { name: "Custom landing page (for Starter/Pro)", price: "$1,000 + $49/mo" },
  { name: "Additional phone number", price: "$29/mo" },
  { name: "SMS overage", price: "$0.02/msg" },
  { name: "Contact list migration", price: "$150 one-time" },
  { name: "Weekly auto-blast setup", price: "$49/mo" },
];

const steps = [
  {
    step: "01",
    title: "We Set You Up",
    description:
      "You get your own phone number, AI bot, and dashboard. We configure your venues and customize the bot to match your style.",
  },
  {
    step: "02",
    title: "Share Your Number",
    description:
      "Put it on your socials, flyers, in the club. When people text, the AI handles everything — captures names, answers questions, adds to the list.",
  },
  {
    step: "03",
    title: "Watch It Work",
    description:
      "Guest list fills up automatically. Blast your contacts before big nights. Check your dashboard to see the numbers. You focus on being at the club.",
  },
];

const testimonialStats = [
  { value: "3x", label: "Average guest list growth" },
  { value: "24/7", label: "Your bot never sleeps" },
  { value: "< 5s", label: "Average response time" },
  { value: "0", label: "Names manually entered" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-velvet-light" />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gradient">Velvet</span>
              <span className="text-foreground">AI</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/get-started"
              className="bg-gradient-velvet glow rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105 sm:px-6 sm:py-2.5"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Pricing
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 sm:px-6">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main velvet red glow - pulses */}
          <div className="hero-bg-pulse absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-velvet blur-[150px] sm:h-[600px] sm:w-[600px]" />
          {/* Drifting warm accent */}
          <div className="hero-bg-drift absolute right-1/4 top-1/2 h-[350px] w-[350px] rounded-full bg-gold blur-[130px] sm:h-[400px] sm:w-[400px]" />
          {/* Secondary red drift */}
          <div className="hero-bg-drift-2 absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-velvet-dark blur-[100px]" />
          {/* Club light sweep */}
          <div className="hero-sweep absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-velvet-light/5 to-transparent" />
          {/* Club color flashes */}
          <div className="hero-club-glow absolute inset-0 bg-gradient-to-br from-velvet/20 via-transparent to-gold/10" />
          <div className="hero-club-glow-2 absolute inset-0 bg-gradient-to-tl from-velvet-dark/15 via-transparent to-velvet-light/10" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-velvet-light/20 bg-velvet/10 px-4 py-1.5 text-sm text-velvet-light">
            <Bot className="h-4 w-4" />
            AI-Powered Nightlife
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Your Guest List
            <br />
            <span className="text-gradient-animated">Runs Itself.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            AI SMS bot that handles your guest list 24/7. Texts back instantly,
            captures every guest, auto-submits to venue systems. You focus on
            being at the club — not on your phone.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/get-started"
              className="bg-gradient-velvet glow group flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
            >
              Start Free Demo
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 rounded-full border border-border px-8 py-4 text-lg font-semibold text-foreground transition-all hover:bg-secondary"
            >
              See How It Works
            </a>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {testimonialStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <h3 className="mb-6 text-xl font-bold text-red-400">
                Without VelvetAI
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  Manually texting back hundreds of people every night
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  Copy-pasting names into venue guest list systems
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  Losing contacts in Notes app and group chats
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  Missing texts at 3AM = lost guests
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  No idea how your numbers actually look week to week
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-velvet-light/20 bg-velvet/5 p-8">
              <h3 className="mb-6 text-xl font-bold text-velvet-light">
                With VelvetAI
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velvet-light" />
                  AI bot responds instantly, 24/7, sounds like you
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velvet-light" />
                  Guest lists auto-submitted to venue systems
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velvet-light" />
                  Every contact saved, organized, and blastable
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velvet-light" />
                  Never miss a text — even at 3AM on a Tuesday
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velvet-light" />
                  Real-time dashboard with your numbers and trends
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Everything You Need to{" "}
              <span className="text-gradient">Scale</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Built by people who understand nightlife. Every feature exists
              because a real promoter needed it.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border/50 bg-card/50 p-8 transition-all hover:border-velvet-light/30 hover:bg-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-velvet/10">
                  <feature.icon className="h-6 w-6 text-velvet-light" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              You&apos;re up and running in 24 hours. No tech skills needed.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.step} className="relative">
                <div className="mb-4 text-5xl font-black text-velvet/20">
                  {step.step}
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMS Demo */}
      <section className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-4xl font-bold">
                See the Bot <span className="text-gradient">In Action</span>
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Your AI bot handles conversations naturally. It knows your
                venues, your events, and your vibe. Guests think they&apos;re
                texting you.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-velvet-light" />
                  Responds in under 5 seconds
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-velvet-light" />
                  Knows tonight&apos;s events and DJs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-velvet-light" />
                  Captures name, email, party size automatically
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-velvet-light" />
                  Submits to venue guest list system instantly
                </li>
              </ul>
            </div>
            {/* Phone mockup */}
            <div className="flex justify-center">
              <div className="w-full max-w-[320px] rounded-[2rem] border-2 border-border/50 bg-card p-3 shadow-2xl sm:p-4">
                <div className="mb-4 flex items-center justify-center">
                  <div className="h-6 w-24 rounded-full bg-background" />
                </div>
                <div className="space-y-3 rounded-2xl bg-background p-4">
                  {/* Incoming */}
                  <div className="flex justify-start">
                    <div className="max-w-[220px] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm">
                      Hey what&apos;s good for Saturday night? Group of 6
                    </div>
                  </div>
                  {/* Bot reply */}
                  <div className="flex justify-end">
                    <div className="bg-gradient-velvet max-w-[220px] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-white">
                      Saturday&apos;s stacked! Omnia has Fisher, Hakkasan has
                      Tiesto. For a group of 6, I&apos;d hit Omnia — vibes are
                      crazy for that size group. Want me to get you on the list?
                    </div>
                  </div>
                  {/* Incoming */}
                  <div className="flex justify-start">
                    <div className="max-w-[220px] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm">
                      Yeah Omnia for sure, 4 guys 2 girls
                    </div>
                  </div>
                  {/* Bot reply */}
                  <div className="flex justify-end">
                    <div className="bg-gradient-velvet max-w-[220px] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-white">
                      Got you! What&apos;s the name for the list?
                    </div>
                  </div>
                  {/* Incoming */}
                  <div className="flex justify-start">
                    <div className="max-w-[220px] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm">
                      Marcus Johnson
                    </div>
                  </div>
                  {/* Bot reply */}
                  <div className="flex justify-end">
                    <div className="bg-gradient-velvet max-w-[220px] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-white">
                      You&apos;re on the list! Marcus Johnson +5 at Omnia
                      Saturday. Guest list is open 10:30PM - 12:30AM. See you
                      there!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Simple <span className="text-gradient">Pricing</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              One-time setup + monthly retainer. No hidden fees. Cancel anytime.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                  pkg.highlighted
                    ? "border-velvet-light/50 bg-velvet/5 glow"
                    : "border-border/50 bg-card/50 hover:border-border"
                }`}
              >
                {pkg.highlighted && (
                  <div className="bg-gradient-velvet absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-velvet-light">
                    {pkg.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {pkg.subtitle}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">
                    Setup:{" "}
                  </span>
                  <span className="text-lg font-bold">{pkg.setup}</span>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-bold">{pkg.monthly}</span>
                  <span className="text-muted-foreground">{pkg.period}</span>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-velvet-light" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/get-started"
                  className={`flex items-center justify-center rounded-full py-3 text-sm font-semibold transition-all hover:scale-105 ${
                    pkg.highlighted
                      ? "bg-gradient-velvet text-white glow"
                      : "border border-border bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="mt-16">
            <h3 className="mb-6 text-center text-2xl font-bold">
              Add-Ons{" "}
              <span className="text-muted-foreground font-normal text-lg">
                (any tier)
              </span>
            </h3>
            <div className="mx-auto grid max-w-3xl gap-3 md:grid-cols-2">
              {addOns.map((addon) => (
                <div
                  key={addon.name}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-card/30 px-5 py-3"
                >
                  <span className="text-sm">{addon.name}</span>
                  <span className="text-sm font-semibold text-velvet-light">
                    {addon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-3xl border border-velvet-light/20 bg-velvet/5 p-6 sm:p-12">
            <Star className="mx-auto mb-4 h-10 w-10 text-gold" />
            <h2 className="mb-4 text-4xl font-bold">
              Ready to Stop Texting and{" "}
              <span className="text-gradient">Start Scaling?</span>
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Your competitors are still copy-pasting names at 2AM. You
              don&apos;t have to be.
            </p>
            <Link
              href="/get-started"
              className="bg-gradient-velvet glow group inline-flex items-center gap-2 rounded-full px-10 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
            >
              Get Your AI Bot Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-velvet-light" />
            <span className="font-bold">
              <span className="text-gradient">Velvet</span>AI
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a href="#how-it-works" className="hover:text-foreground">
              How It Works
            </a>
          </div>
          <div className="text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="https://jdlo.site"
              className="text-velvet-light hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              JDLO
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
