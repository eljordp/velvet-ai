"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import type { GuestListEntry } from "@/types/database";

export default function GuestListPage() {
  const [entries, setEntries] = useState<GuestListEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", venue: "", party_size: "1", men: "0", women: "0" });

  useEffect(() => {
    setLoading(true);
    fetch(`/api/dashboard/guest-list?date=${date}`)
      .then((r) => r.json())
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [date]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/dashboard/guest-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        event_date: date,
        party_size: parseInt(form.party_size),
        men: parseInt(form.men),
        women: parseInt(form.women),
      }),
    });
    if (res.ok) {
      const entry = await res.json();
      setEntries([entry, ...entries]);
      setShowAdd(false);
      setForm({ name: "", phone: "", venue: "", party_size: "1", men: "0", women: "0" });
    }
  }

  const filtered = entries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase())
  );

  const totalGuests = filtered.reduce((sum, e) => sum + e.party_size, 0);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Guest List</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} entries &middot; {totalGuests} total guests
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="bg-gradient-velvet flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-border/50 bg-card/50 p-4 sm:p-5 md:grid-cols-6"
        >
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="col-span-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-velvet-light focus:outline-none md:col-span-2"
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <input
            required
            placeholder="Venue"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <input
            type="number"
            min="1"
            placeholder="Party size"
            value={form.party_size}
            onChange={(e) => setForm({ ...form, party_size: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-velvet col-span-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white md:col-span-1"
          >
            Add Guest
          </button>
        </form>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or venue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:border-velvet-light focus:outline-none"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-velvet-light border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          No guests for this date
        </div>
      ) : (
        <>
        {/* Mobile card view */}
        <div className="space-y-3 md:hidden">
          {filtered.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-border/50 bg-card/50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{entry.name}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{entry.venue}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{entry.party_size} guests</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  entry.source === "sms" ? "bg-blue-500/10 text-blue-400" :
                  entry.source === "web" ? "bg-green-500/10 text-green-400" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {entry.source}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  entry.status === "confirmed" ? "bg-green-500/10 text-green-400" :
                  entry.status === "checked_in" ? "bg-velvet/10 text-velvet-light" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {entry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop table view */}
        <div className="hidden overflow-x-auto rounded-xl border border-border/50 md:block">
          <table className="w-full text-sm">
            <thead className="border-b border-border/50 bg-card/30">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Venue</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Party</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Source</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((entry) => (
                <tr key={entry.id} className="hover:bg-card/30">
                  <td className="px-4 py-3 font-medium">{entry.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{entry.venue}</td>
                  <td className="px-4 py-3 text-muted-foreground">{entry.party_size}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      entry.source === "sms" ? "bg-blue-500/10 text-blue-400" :
                      entry.source === "web" ? "bg-green-500/10 text-green-400" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {entry.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      entry.status === "confirmed" ? "bg-green-500/10 text-green-400" :
                      entry.status === "checked_in" ? "bg-velvet/10 text-velvet-light" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  );
}
