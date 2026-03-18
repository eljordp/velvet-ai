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
  TrendingUp,
  ClipboardList,
  Calendar,
  ChevronDown,
  MapPin,
  Quote,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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
    name: "FREE",
    subtitle: "Try It Out",
    setup: "$0",
    monthly: "$0",
    period: "",
    features: [
      "AI SMS bot (shared number)",
      "1 venue",
      "Up to 25 contacts",
      "Guest list dashboard",
      "50 SMS/mo included",
    ],
    cta: "Start Free",
    highlighted: false,
    isFree: true,
  },
  {
    name: "STARTER",
    subtitle: "New Promoters",
    setup: "$500",
    monthly: "$99",
    period: "/mo",
    features: [
      "AI SMS bot (dedicated number)",
      "1 venue integration",
      "Unlimited contacts",
      "Contact management",
      "500 SMS/mo included",
      "Mobile-friendly dashboard",
    ],
    cta: "Get Started",
    highlighted: false,
    isFree: false,
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
    isFree: false,
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
    isFree: false,
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

const faqs = [
  {
    q: "Can I try it before paying?",
    a: "Yes. The Free tier gives you a working AI bot, dashboard, and up to 25 contacts with no setup fee, no credit card, no time limit. When you outgrow it, upgrade to Starter.",
  },
  {
    q: "How fast can I get set up?",
    a: "Free tier is instant — sign up and your bot is live. Paid tiers with dedicated numbers and venue integrations take about 24 hours. We hop on a quick setup call and handle the rest.",
  },
  {
    q: "What happens to my contacts if I cancel?",
    a: "They're yours. We export your full contact list, guest history, and conversation logs. Nothing gets deleted without your say.",
  },
  {
    q: "Does the bot actually sound like me?",
    a: "Yes. We customize the bot's personality, tone, and knowledge to match how you talk. Your guests won't know the difference. You can tweak it anytime from your dashboard.",
  },
  {
    q: "What if I already have a contact list somewhere?",
    a: "We can migrate your existing contacts in. If it's in a spreadsheet, your phone, or another system — we'll get it imported. $150 one-time for contact migration.",
  },
  {
    q: "Do you work with venues outside Vegas?",
    a: "We're built for nightlife, not just Vegas. If your venue has a guest list system, we can integrate. Currently working with promoters in Vegas, LA, and Miami.",
  },
];

// Animated dashboard preview
function DashboardPreview() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-card px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <div className="ml-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-velvet-light" />
            VelvetAI Dashboard
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Stats row */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "Tonight's List", value: "147", sub: "23 entries", icon: ClipboardList, color: "text-velvet-light", delay: 0 },
              { label: "This Week", value: "892", sub: "64 entries", icon: TrendingUp, color: "text-gold", delay: 150 },
              { label: "Total Contacts", value: "2,847", icon: Users, color: "text-blue-400", delay: 300 },
              { label: "Messages", value: "12,403", icon: MessageSquare, color: "text-green-400", delay: 450 },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl border border-border/50 bg-background/50 p-3 sm:p-4 ${visible ? "animate-count-up" : "opacity-0"}`}
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <div className="mb-1 flex items-center gap-1.5 sm:mb-2">
                  <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
                  <span className="text-[10px] text-muted-foreground sm:text-xs">{stat.label}</span>
                </div>
                <div className="text-lg font-bold sm:text-xl">{stat.value}</div>
                {stat.sub && <div className="text-[10px] text-muted-foreground sm:text-xs">{stat.sub}</div>}
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* SMS Usage */}
            <div className="rounded-xl border border-border/50 bg-background/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium">SMS Usage</span>
                <span className="rounded-full bg-velvet/10 px-2.5 py-0.5 text-[10px] font-medium uppercase text-velvet-light">Pro</span>
              </div>
              <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                <span>847 / 1,500</span>
                <span>56%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className={`bg-gradient-velvet h-full rounded-full ${visible ? "animate-progress-fill" : ""}`}
                  style={{ "--progress-width": "56%" } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Recent guest list */}
            <div className="rounded-xl border border-border/50 bg-background/50 p-4">
              <span className="mb-3 block text-sm font-medium">Tonight&apos;s Guest List</span>
              <div className="space-y-2">
                {[
                  { name: "Marcus J.", venue: "Omnia", size: "+5", time: "2m ago" },
                  { name: "Ashley R.", venue: "Hakkasan", size: "+3", time: "8m ago" },
                  { name: "Dev P.", venue: "Omnia", size: "+7", time: "14m ago" },
                ].map((guest, i) => (
                  <div
                    key={guest.name}
                    className={`flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2 ${visible ? "animate-row-slide" : "opacity-0"}`}
                    style={{ animationDelay: `${800 + i * 200}ms` }}
                  >
                    <div>
                      <span className="text-xs font-medium sm:text-sm">{guest.name}</span>
                      <span className="ml-2 text-[10px] text-muted-foreground sm:text-xs">{guest.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-velvet-light">{guest.size}</span>
                      <span className="text-[10px] text-muted-foreground">{guest.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live notification */}
          <div className="animate-notification-pop mt-4 flex items-center gap-3 rounded-xl border border-velvet-light/20 bg-velvet/5 px-4 py-3">
            <Bot className="h-4 w-4 shrink-0 text-velvet-light" />
            <span className="text-xs sm:text-sm">
              <span className="font-medium text-velvet-light">New SMS:</span>{" "}
              <span className="text-muted-foreground">&quot;Hey is there a guest list for Saturday? Group of 4&quot;</span>
            </span>
            <span className="ml-auto shrink-0 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] text-green-400">Bot replied</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated SMS conversation
const smsMessages = [
  { dir: "in" as const, text: "Hey what's good for Saturday night? Group of 6" },
  { dir: "out" as const, text: "Saturday's stacked! Omnia has Fisher, Hakkasan has Tiesto. For a group of 6, I'd hit Omnia — vibes are crazy for that size group. Want me to get you on the list?" },
  { dir: "in" as const, text: "Yeah Omnia for sure, 4 guys 2 girls" },
  { dir: "out" as const, text: "Got you! What's the name for the list?" },
  { dir: "in" as const, text: "Marcus Johnson" },
  { dir: "out" as const, text: "You're on the list! Marcus Johnson +5 at Omnia Saturday. Guest list is open 10:30PM - 12:30AM. See you there!" },
];

function SMSDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || visibleCount >= smsMessages.length) return;

    const nextMsg = smsMessages[visibleCount];
    // Show typing indicator before bot replies
    const typingDelay = nextMsg.dir === "out" ? 1200 : 0;
    const msgDelay = nextMsg.dir === "out" ? 800 : 600;

    if (nextMsg.dir === "out") {
      const typingTimer = setTimeout(() => setTyping(true), visibleCount === 0 ? 800 : 400);
      const msgTimer = setTimeout(() => {
        setTyping(false);
        setVisibleCount((c) => c + 1);
      }, typingDelay + msgDelay);
      return () => { clearTimeout(typingTimer); clearTimeout(msgTimer); };
    } else {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), visibleCount === 0 ? 600 : msgDelay + 400);
      return () => clearTimeout(timer);
    }
  }, [started, visibleCount]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleCount, typing]);

  // Restart loop
  useEffect(() => {
    if (visibleCount >= smsMessages.length) {
      const timer = setTimeout(() => {
        setVisibleCount(0);
        setStarted(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <div ref={ref} className="flex justify-center">
      <div className="w-full max-w-[320px] rounded-[2rem] border-2 border-border/50 bg-card p-3 shadow-2xl sm:p-4">
        <div className="mb-3 flex items-center justify-center">
          <div className="h-6 w-24 rounded-full bg-background" />
        </div>
        <div ref={chatRef} className="h-[380px] space-y-3 overflow-y-auto rounded-2xl bg-background p-3 sm:p-4">
          {smsMessages.slice(0, visibleCount).map((msg, i) => (
            <div key={i} className={`flex ${msg.dir === "in" ? "justify-start" : "justify-end"} animate-msg-appear`}>
              <div className={`max-w-[220px] rounded-2xl px-4 py-2.5 text-sm ${
                msg.dir === "in"
                  ? "rounded-bl-sm bg-secondary"
                  : "bg-gradient-velvet rounded-br-sm text-white"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-end animate-msg-appear">
              <div className="bg-gradient-velvet flex gap-1 rounded-2xl rounded-br-sm px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-white/70 typing-dot-1" />
                <div className="h-2 w-2 rounded-full bg-white/70 typing-dot-2" />
                <div className="h-2 w-2 rounded-full bg-white/70 typing-dot-3" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// FAQ Accordion
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-medium">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-5 text-sm leading-relaxed text-muted-foreground">
          {a}
        </div>
      )}
    </div>
  );
}

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
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">How It Works</a>
            <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
            <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
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
        {mobileMenuOpen && (
          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">How It Works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">FAQ</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 sm:px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-bg-pulse absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-velvet blur-[150px] sm:h-[600px] sm:w-[600px]" />
          <div className="hero-bg-drift absolute right-1/4 top-1/2 h-[350px] w-[350px] rounded-full bg-gold blur-[130px] sm:h-[400px] sm:w-[400px]" />
          <div className="hero-bg-drift-2 absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-velvet-dark blur-[100px]" />
          <div className="hero-sweep absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-velvet-light/5 to-transparent" />
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
              Try Free — No Card Required
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
                <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study — Lauren */}
      <section className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Real <span className="text-gradient">Results</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              See how promoters are using VelvetAI to grow
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-velvet-light/20 bg-card/50">
            <div className="grid md:grid-cols-2">
              {/* Story */}
              <div className="p-6 sm:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-velvet text-lg font-bold text-white">
                    LR
                  </div>
                  <div>
                    <div className="font-semibold">Lauren Rees</div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      Promoter at The Bridge
                    </div>
                  </div>
                </div>
                <div className="mb-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Lauren was just starting out promoting at The Bridge — juggling texts, manually adding names to lists, and trying to build her contact base from scratch.
                  </p>
                  <p>
                    After switching to VelvetAI, she manages her entire guest list operation from her condo. The AI bot handles incoming texts while she focuses on building relationships and growing her brand.
                  </p>
                  <p>
                    Her CRM stays updated automatically — every guest who texts gets saved with their details, visit history, and preferences. No more lost contacts in Notes or screenshot folders.
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 bg-background/50 p-4">
                  <Quote className="mb-2 h-5 w-5 text-velvet-light" />
                  <p className="text-sm italic text-foreground">
                    &quot;I went from spending 3 hours a night texting people back to checking my dashboard for 5 minutes. The bot sounds exactly like me and my numbers are way up.&quot;
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">— @lauren.rees</p>
                </div>
              </div>

              {/* Before / After numbers */}
              <div className="border-t border-border/50 bg-background/30 p-6 sm:border-l sm:border-t-0 sm:p-10">
                <h3 className="mb-6 text-lg font-semibold">Before &amp; After VelvetAI</h3>
                <div className="space-y-5">
                  {[
                    { label: "Time on texts per night", before: "3+ hours", after: "5 minutes", improvement: "97% less" },
                    { label: "Guest list entries per week", before: "~40", after: "120+", improvement: "3x growth" },
                    { label: "Missed texts / lost guests", before: "10-15 per week", after: "0", improvement: "Zero" },
                    { label: "Contact list size", before: "Scattered", after: "800+ organized", improvement: "All in one place" },
                    { label: "Working location", before: "At the club, on phone", after: "From home", improvement: "Remote CRM" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-red-500/10 px-2.5 py-1 text-sm text-red-400 line-through decoration-red-400/50">
                          {stat.before}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="rounded-lg bg-velvet/10 px-2.5 py-1 text-sm font-medium text-velvet-light">
                          {stat.after}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <h3 className="mb-6 text-xl font-bold text-red-400">Without VelvetAI</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />Manually texting back hundreds of people every night</li>
                <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />Copy-pasting names into venue guest list systems</li>
                <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />Losing contacts in Notes app and group chats</li>
                <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />Missing texts at 3AM = lost guests</li>
                <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />No idea how your numbers actually look week to week</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-velvet-light/20 bg-velvet/5 p-8">
              <h3 className="mb-6 text-xl font-bold text-velvet-light">With VelvetAI</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velvet-light" />AI bot responds instantly, 24/7, sounds like you</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velvet-light" />Guest lists auto-submitted to venue systems</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velvet-light" />Every contact saved, organized, and blastable</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velvet-light" />Never miss a text — even at 3AM on a Tuesday</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velvet-light" />Real-time dashboard with your numbers and trends</li>
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
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Your <span className="text-gradient">Command Center</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Everything happening with your guest lists, contacts, and bot — live and in real time.
            </p>
          </div>
          <DashboardPreview />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
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
                <div className="mb-4 text-5xl font-black text-velvet/20">{step.step}</div>
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
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-velvet-light" />Responds in under 5 seconds</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-velvet-light" />Knows tonight&apos;s events and DJs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-velvet-light" />Captures name, email, party size automatically</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-velvet-light" />Submits to venue guest list system instantly</li>
              </ul>
            </div>
            <SMSDemo />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              <Sparkles className="h-4 w-4" />
              Launch Pricing — Locks In When You Sign Up
            </div>
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Simple <span className="text-gradient">Pricing</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Start free. Upgrade when you&apos;re ready. No hidden fees. Cancel anytime.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all sm:p-8 ${
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
                {!pkg.isFree && !pkg.highlighted && (
                  <div className="absolute -top-3 right-4 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-gold">
                    Launch Price
                  </div>
                )}
                <div className="mb-6">
                  <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-velvet-light">
                    {pkg.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{pkg.subtitle}</div>
                </div>
                {pkg.isFree ? (
                  <div className="mb-8">
                    <span className="text-4xl font-bold">Free</span>
                    <div className="mt-1 text-xs text-muted-foreground">No card required</div>
                  </div>
                ) : (
                  <>
                    <div className="mb-2">
                      <span className="text-sm text-muted-foreground">Setup: </span>
                      <span className="text-lg font-bold">{pkg.setup}</span>
                    </div>
                    <div className="mb-8">
                      <span className="text-4xl font-bold">{pkg.monthly}</span>
                      <span className="text-muted-foreground">{pkg.period}</span>
                    </div>
                  </>
                )}
                <ul className="mb-8 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
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
                      : pkg.isFree
                      ? "bg-gradient-velvet text-white"
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
              <span className="text-muted-foreground font-normal text-lg">(any tier)</span>
            </h3>
            <div className="mx-auto grid max-w-3xl gap-3 md:grid-cols-2">
              {addOns.map((addon) => (
                <div key={addon.name} className="flex items-center justify-between rounded-xl border border-border/50 bg-card/30 px-5 py-3">
                  <span className="text-sm">{addon.name}</span>
                  <span className="text-sm font-semibold text-velvet-light">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border/50 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Common <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="rounded-2xl border border-border/50 bg-card/50 px-6 sm:px-8">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
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
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/get-started"
                className="bg-gradient-velvet glow group inline-flex items-center gap-2 rounded-full px-10 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
              >
                Start Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://calendar.app.google/hNGSbS3nKskMbF7S6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-lg font-semibold text-foreground transition-all hover:bg-secondary"
              >
                <Calendar className="h-5 w-5" />
                Book a Demo Call
              </a>
            </div>
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
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#how-it-works" className="hover:text-foreground">How It Works</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </div>
          <div className="text-sm text-muted-foreground">
            Built by{" "}
            <a href="https://jdlo.site" className="text-velvet-light hover:underline" target="_blank" rel="noopener noreferrer">JDLO</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
