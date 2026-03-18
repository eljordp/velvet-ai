"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name: string | null;
  instagram: string | null;
  city: string | null;
  venues: string | null;
  message: string | null;
  plan: string;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then(setLeads)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-velvet-light border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Leads ({leads.length})</h1>

      {leads.length === 0 ? (
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          No leads yet. Share your landing page to start getting signups.
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-xl border border-border/50 bg-card/50 p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{lead.name}</span>
                    <span className="rounded-full bg-velvet/10 px-2 py-0.5 text-xs text-velvet-light uppercase">
                      {lead.plan}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      {lead.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      {lead.phone}
                    </span>
                    {lead.city && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {lead.city}
                      </span>
                    )}
                  </div>
                  {lead.venues && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <strong>Venues:</strong> {lead.venues}
                    </div>
                  )}
                  {lead.message && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <strong>Note:</strong> {lead.message}
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(lead.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
