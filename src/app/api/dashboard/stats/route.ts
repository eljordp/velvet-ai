import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function GET() {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date().toISOString().split("T")[0];

  const [guests, contacts, messages, events] = await Promise.all([
    supabaseAdmin
      .from("guest_list")
      .select("id, party_size, event_date", { count: "exact" })
      .eq("promoter_id", promoter.id),
    supabaseAdmin
      .from("contacts")
      .select("id", { count: "exact" })
      .eq("promoter_id", promoter.id),
    supabaseAdmin
      .from("messages")
      .select("id", { count: "exact" })
      .eq("promoter_id", promoter.id),
    supabaseAdmin
      .from("events")
      .select("*")
      .eq("promoter_id", promoter.id)
      .gte("date", today)
      .order("date", { ascending: true })
      .limit(5),
  ]);

  // Tonight's guests
  const tonightGuests = (guests.data || []).filter((g) => g.event_date === today);
  const tonightTotal = tonightGuests.reduce((sum, g) => sum + g.party_size, 0);

  // This week's guests
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekStr = weekAgo.toISOString().split("T")[0];
  const weekGuests = (guests.data || []).filter((g) => g.event_date >= weekStr);
  const weekTotal = weekGuests.reduce((sum, g) => sum + g.party_size, 0);

  return NextResponse.json({
    tonight: { entries: tonightGuests.length, total: tonightTotal },
    week: { entries: weekGuests.length, total: weekTotal },
    allTime: { entries: guests.count || 0 },
    contacts: contacts.count || 0,
    messages: messages.count || 0,
    smsUsed: promoter.sms_used,
    smsLimit: promoter.sms_limit,
    plan: promoter.plan,
    upcomingEvents: events.data || [],
  });
}
