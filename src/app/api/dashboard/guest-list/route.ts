import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  const { data, error } = await supabaseAdmin
    .from("guest_list")
    .select("*")
    .eq("promoter_id", promoter.id)
    .eq("event_date", date)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, phone, venue, event_date, party_size, men, women } = body;

  if (!name || !venue || !event_date) {
    return NextResponse.json({ error: "Name, venue, and date required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("guest_list")
    .insert({
      promoter_id: promoter.id,
      name,
      phone: phone || "",
      venue,
      event_date,
      party_size: party_size || 1,
      men: men || 0,
      women: women || 0,
      source: "manual",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
