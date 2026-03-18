import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { PLAN_LIMITS } from "@/types/database";

export async function GET() {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!PLAN_LIMITS[promoter.plan].blasts) {
    return NextResponse.json({ error: "Upgrade to Pro to use blasts" }, { status: 403 });
  }

  const { data, error } = await supabaseAdmin
    .from("blasts")
    .select("*")
    .eq("promoter_id", promoter.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!PLAN_LIMITS[promoter.plan].blasts) {
    return NextResponse.json({ error: "Upgrade to Pro to use blasts" }, { status: 403 });
  }

  const { message, scheduled_for } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  // Count contacts for recipients
  const { count } = await supabaseAdmin
    .from("contacts")
    .select("id", { count: "exact" })
    .eq("promoter_id", promoter.id);

  const { data, error } = await supabaseAdmin
    .from("blasts")
    .insert({
      promoter_id: promoter.id,
      message,
      recipients: count || 0,
      scheduled_for,
      status: scheduled_for ? "draft" : "draft",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
