import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function GET() {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("promoter_id", promoter.id)
    .order("date", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { venue_name, venue_id, date, day_of_week, artist, genre, notes } = body;

  if (!venue_name || !date || !artist) {
    return NextResponse.json({ error: "Venue, date, and artist required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("events")
    .insert({
      promoter_id: promoter.id,
      venue_name,
      venue_id,
      date,
      day_of_week: day_of_week || new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
      artist,
      genre,
      notes,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
