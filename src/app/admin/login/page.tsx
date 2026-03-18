"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Shield } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Wrong password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-velvet-light" />
            <span className="text-xl font-bold">
              <span className="text-gradient">Velvet</span>AI
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-gold" />
            <span className="text-sm text-gold">Admin Access</span>
          </div>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-velvet-light focus:outline-none"
            placeholder="Admin password"
          />
          <button
            type="submit"
            className="bg-gradient-velvet w-full rounded-full py-3 text-sm font-semibold text-white"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
