"use client";

import { useEffect, useState } from "react";
import { Plus, Calendar, Music } from "lucide-react";
import type { Event } from "@/types/database";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ venue_name: "", date: "", artist: "", genre: "" });

  useEffect(() => {
    fetch("/api/dashboard/events")
      .then((r) => r.json())
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/dashboard/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const event = await res.json();
      setEvents([...events, event].sort((a, b) => a.date.localeCompare(b.date)));
      setShowAdd(false);
      setForm({ venue_name: "", date: "", artist: "", genre: "" });
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter((e) => e.date >= today);
  const past = events.filter((e) => e.date < today);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-sm text-muted-foreground">
            {upcoming.length} upcoming &middot; {past.length} past
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-gradient-velvet flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </div>

      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-border/50 bg-card/50 p-4 sm:p-5 md:grid-cols-5"
        >
          <input
            required
            placeholder="Venue"
            value={form.venue_name}
            onChange={(e) => setForm({ ...form, venue_name: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <input
            required
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <input
            required
            placeholder="Artist / DJ"
            value={form.artist}
            onChange={(e) => setForm({ ...form, artist: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <input
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-velvet col-span-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white md:col-span-1"
          >
            Add
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-velvet-light border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-8">
          {upcoming.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold">Upcoming</h2>
              <div className="space-y-3">
                {upcoming.map((event) => (
                  <EventCard key={event.id} event={event} isToday={event.date === today} />
                ))}
              </div>
            </div>
          )}
          {past.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-muted-foreground">Past</h2>
              <div className="space-y-3 opacity-60">
                {past.slice(0, 10).map((event) => (
                  <EventCard key={event.id} event={event} isToday={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EventCard({ event, isToday }: { event: Event; isToday: boolean }) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
        isToday ? "border-velvet-light/30 bg-velvet/5" : "border-border/50 bg-card/50"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-secondary text-center">
          <div className="text-xs text-muted-foreground">
            {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" })}
          </div>
          <div className="text-sm font-bold">
            {new Date(event.date + "T00:00:00").getDate()}
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Music className="h-3.5 w-3.5 shrink-0 text-velvet-light" />
            <span className="font-medium truncate">{event.artist}</span>
            {isToday && (
              <span className="rounded-full bg-velvet/20 px-2 py-0.5 text-xs text-velvet-light">
                Tonight
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 shrink-0" />
            <span className="truncate">{event.venue_name} &middot; {event.day_of_week}</span>
          </div>
        </div>
      </div>
      {event.genre && (
        <span className="self-start rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground sm:self-auto">
          {event.genre}
        </span>
      )}
    </div>
  );
}
