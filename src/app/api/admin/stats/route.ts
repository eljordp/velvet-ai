import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [promoters, guests, contacts, messages, leads] = await Promise.all([
    supabaseAdmin.from("promoters").select("id, plan, subscription_status", { count: "exact" }),
    supabaseAdmin.from("guest_list").select("id", { count: "exact" }),
    supabaseAdmin.from("contacts").select("id", { count: "exact" }),
    supabaseAdmin.from("messages").select("id", { count: "exact" }),
    supabaseAdmin.from("leads").select("id", { count: "exact" }),
  ]);

  const promoterData = promoters.data || [];
  const planBreakdown = {
    starter: promoterData.filter((p) => p.plan === "starter").length,
    pro: promoterData.filter((p) => p.plan === "pro").length,
    elite: promoterData.filter((p) => p.plan === "elite").length,
  };

  // Estimate MRR
  const mrr = planBreakdown.starter * 99 + planBreakdown.pro * 179 + planBreakdown.elite * 299;

  return NextResponse.json({
    totalPromoters: promoters.count || 0,
    totalGuests: guests.count || 0,
    totalContacts: contacts.count || 0,
    totalMessages: messages.count || 0,
    totalLeads: leads.count || 0,
    planBreakdown,
    mrr,
  });
}
