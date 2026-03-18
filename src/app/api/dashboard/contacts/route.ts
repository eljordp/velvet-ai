import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function GET() {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("contacts")
    .select("*")
    .eq("promoter_id", promoter.id)
    .order("last_contact", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, phone, email, instagram, tags, notes } = body;

  if (!phone) {
    return NextResponse.json({ error: "Phone required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("contacts")
    .upsert(
      {
        promoter_id: promoter.id,
        phone,
        name,
        email,
        instagram,
        tags: tags || [],
        notes,
        last_contact: new Date().toISOString(),
      },
      { onConflict: "promoter_id,phone" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
