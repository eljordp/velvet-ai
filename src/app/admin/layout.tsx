"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Shield, Users, BarChart3, Mail, Menu, X } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  const navItems = [
    { href: "/admin", label: "Overview", icon: BarChart3 },
    { href: "/admin/promoters", label: "Promoters", icon: Users },
    { href: "/admin/leads", label: "Leads", icon: Mail },
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/50 bg-card/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-velvet-light" />
            <span className="font-bold">
              <span className="text-gradient">Velvet</span>AI
            </span>
            <div className="flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5">
              <Shield className="h-3 w-3 text-gold" />
              <span className="text-xs font-medium text-gold">Admin</span>
            </div>
          </div>
          {/* Desktop nav */}
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  pathname === item.href
                    ? "text-velvet-light"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div className="border-t border-border/50 bg-card px-4 py-3 md:hidden">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    pathname === item.href
                      ? "bg-velvet/10 text-velvet-light font-medium"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
