"use client";

import { useEffect, useState } from "react";
import { Send, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import type { Blast } from "@/types/database";

export default function BlastsPage() {
  const [blasts, setBlasts] = useState<Blast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCompose, setShowCompose] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/blasts")
      .then(async (r) => {
        if (r.status === 403) {
          setError("Upgrade to Pro to use blasts");
          return [];
        }
        return r.json();
      })
      .then(setBlasts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/dashboard/blasts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        const blast = await res.json();
        setBlasts([blast, ...blasts]);
        setShowCompose(false);
        setMessage("");
      }
    } catch {
      alert("Failed to create blast");
    } finally {
      setSending(false);
    }
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <AlertCircle className="mb-3 h-8 w-8 text-gold" />
        <h2 className="mb-2 text-lg font-semibold">{error}</h2>
        <p className="text-sm text-muted-foreground">
          Blast messaging lets you hit your entire contact list before a big
          night.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blasts</h1>
          <p className="text-sm text-muted-foreground">
            Send mass messages to your contacts
          </p>
        </div>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className="bg-gradient-velvet flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
        >
          <Send className="h-4 w-4" />
          New Blast
        </button>
      </div>

      {showCompose && (
        <form
          onSubmit={handleSend}
          className="mb-6 rounded-xl border border-border/50 bg-card/50 p-5"
        >
          <textarea
            required
            rows={4}
            placeholder="Hey! Tonight is going to be crazy — Fisher at Omnia. Text back your name + party size to get on the list."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-3 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-muted-foreground">
              {message.length} characters
            </span>
            <button
              type="submit"
              disabled={sending}
              className="bg-gradient-velvet flex w-full items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50 sm:w-auto"
            >
              {sending ? "Creating..." : "Create Blast"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-velvet-light border-t-transparent" />
        </div>
      ) : blasts.length === 0 ? (
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          No blasts sent yet
        </div>
      ) : (
        <div className="space-y-3">
          {blasts.map((blast) => (
            <div
              key={blast.id}
              className="rounded-xl border border-border/50 bg-card/50 p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {blast.status === "sent" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  ) : blast.status === "sending" ? (
                    <Clock className="h-4 w-4 text-gold" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium capitalize">
                    {blast.status}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(blast.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                {blast.message}
              </p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>{blast.recipients} recipients</span>
                <span>{blast.sent} sent</span>
                {blast.failed > 0 && (
                  <span className="text-red-400">{blast.failed} failed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
