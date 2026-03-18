"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Phone, Mail } from "lucide-react";
import type { Contact } from "@/types/database";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", instagram: "" });

  useEffect(() => {
    fetch("/api/dashboard/contacts")
      .then((r) => r.json())
      .then(setContacts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/dashboard/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const contact = await res.json();
      setContacts([contact, ...contacts]);
      setShowAdd(false);
      setForm({ name: "", phone: "", email: "", instagram: "" });
    }
  }

  const filtered = contacts.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      (c.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-sm text-muted-foreground">
            {contacts.length} total contacts
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-gradient-velvet flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Add Contact
        </button>
      </div>

      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-border/50 bg-card/50 p-4 sm:p-5 md:grid-cols-5"
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <input
            required
            placeholder="Phone *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <input
            placeholder="Instagram"
            value={form.instagram}
            onChange={(e) => setForm({ ...form, instagram: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-velvet-light focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-velvet col-span-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white md:col-span-1"
          >
            Save
          </button>
        </form>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:border-velvet-light focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-velvet-light border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          No contacts found
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((contact) => (
            <div
              key={contact.id}
              className="rounded-xl border border-border/50 bg-card/50 p-4 transition-all hover:border-border"
            >
              <div className="mb-2 font-medium">
                {contact.name || "Unknown"}
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  {contact.phone}
                </div>
                {contact.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    {contact.email}
                  </div>
                )}
                {contact.instagram && (
                  <div className="text-velvet-light">@{contact.instagram.replace("@", "")}</div>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{contact.total_visits} visits</span>
                {contact.tags.length > 0 && (
                  <div className="flex gap-1">
                    {contact.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded bg-secondary px-1.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
