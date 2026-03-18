"use client";

import { useEffect, useState } from "react";
import {
  Users,
  MessageSquare,
  ClipboardList,
  Calendar,
  TrendingUp,
  Zap,
} from "lucide-react";

interface Stats {
  tonight: { entries: number; total: number };
  week: { entries: number; total: number };
  allTime: { entries: number };
  contacts: number;
  messages: number;
  smsUsed: number;
  smsLimit: number;
  plan: string;
  upcomingEvents: Array<{
    id: string;
    venue_name: string;
    date: string;
    artist: string;
  }>;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-velvet-light border-t-transparent" />
      </div>
    );
  }

  if (!stats) return <div className="text-muted-foreground">Failed to load</div>;

  const smsPercent = Math.round((stats.smsUsed / stats.smsLimit) * 100);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={ClipboardList}
          label="Tonight's List"
          value={stats.tonight.total}
          sub={`${stats.tonight.entries} entries`}
          color="text-velvet-light"
        />
        <StatCard
          icon={TrendingUp}
          label="This Week"
          value={stats.week.total}
          sub={`${stats.week.entries} entries`}
          color="text-gold"
        />
        <StatCard
          icon={Users}
          label="Total Contacts"
          value={stats.contacts}
          color="text-blue-400"
        />
        <StatCard
          icon={MessageSquare}
          label="Messages"
          value={stats.messages}
          color="text-green-400"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SMS Usage */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">SMS Usage</h2>
            <span className="rounded-full bg-velvet/10 px-3 py-1 text-xs font-medium text-velvet-light uppercase">
              {stats.plan}
            </span>
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">
              {stats.smsUsed.toLocaleString()} / {stats.smsLimit.toLocaleString()}
            </span>
            <span className="text-muted-foreground">{smsPercent}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-secondary">
            <div
              className="bg-gradient-velvet h-full rounded-full transition-all"
              style={{ width: `${Math.min(smsPercent, 100)}%` }}
            />
          </div>
          {smsPercent > 80 && (
            <p className="mt-3 text-xs text-gold">
              Running low on SMS credits — consider upgrading
            </p>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="rounded-xl border border-border/50 bg-card/50 p-6">
          <h2 className="mb-4 font-semibold">Upcoming Events</h2>
          {stats.upcomingEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No upcoming events. Add events to get your bot ready.
            </p>
          ) : (
            <div className="space-y-3">
              {stats.upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-medium">{event.artist}</div>
                    <div className="text-xs text-muted-foreground">
                      {event.venue_name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="mb-4 font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <QuickAction href="/dashboard/guest-list" icon={ClipboardList} label="View Guest List" />
          <QuickAction href="/dashboard/contacts" icon={Users} label="Manage Contacts" />
          <QuickAction href="/dashboard/events" icon={Calendar} label="Add Event" />
          <QuickAction href="/dashboard/blasts" icon={Zap} label="Send Blast" />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-2 sm:mb-3">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="text-xl font-bold sm:text-2xl">{value.toLocaleString()}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/30 p-4 text-center transition-all hover:border-velvet-light/30 hover:bg-card/50"
    >
      <Icon className="h-5 w-5 text-velvet-light" />
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
}
