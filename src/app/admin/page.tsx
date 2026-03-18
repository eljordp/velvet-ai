"use client";

import { useEffect, useState } from "react";
import { Users, MessageSquare, ClipboardList, DollarSign, Mail, UserPlus } from "lucide-react";

interface AdminStats {
  totalPromoters: number;
  totalGuests: number;
  totalContacts: number;
  totalMessages: number;
  totalLeads: number;
  planBreakdown: { starter: number; pro: number; elite: number };
  mrr: number;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-velvet-light border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Admin Dashboard</h1>

      {/* MRR highlight */}
      <div className="mb-8 rounded-2xl border border-gold/20 bg-gold/5 p-5 text-center sm:p-8">
        <div className="text-sm text-gold uppercase tracking-wider font-medium">Monthly Recurring Revenue</div>
        <div className="mt-2 text-4xl font-bold text-gradient sm:text-5xl">
          ${stats.mrr.toLocaleString()}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {stats.totalPromoters} active promoters
        </div>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Stat icon={Users} label="Promoters" value={stats.totalPromoters} />
        <Stat icon={ClipboardList} label="Guest List Entries" value={stats.totalGuests} />
        <Stat icon={UserPlus} label="Total Contacts" value={stats.totalContacts} />
        <Stat icon={MessageSquare} label="Messages" value={stats.totalMessages} />
        <Stat icon={Mail} label="Leads" value={stats.totalLeads} />
      </div>

      {/* Plan breakdown */}
      <div className="rounded-xl border border-border/50 bg-card/50 p-6">
        <h2 className="mb-4 font-semibold">Plan Breakdown</h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="rounded-lg bg-secondary/50 p-3 text-center sm:p-4">
            <div className="text-xl font-bold sm:text-2xl">{stats.planBreakdown.starter}</div>
            <div className="text-sm text-muted-foreground">Starter</div>
            <div className="text-xs text-velvet-light">${stats.planBreakdown.starter * 99}/mo</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3 text-center sm:p-4">
            <div className="text-xl font-bold sm:text-2xl">{stats.planBreakdown.pro}</div>
            <div className="text-sm text-muted-foreground">Pro</div>
            <div className="text-xs text-velvet-light">${stats.planBreakdown.pro * 179}/mo</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3 text-center sm:p-4">
            <div className="text-xl font-bold sm:text-2xl">{stats.planBreakdown.elite}</div>
            <div className="text-sm text-muted-foreground">Elite</div>
            <div className="text-xs text-velvet-light">${stats.planBreakdown.elite * 299}/mo</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-5">
      <Icon className="mb-2 h-4 w-4 text-velvet-light" />
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
