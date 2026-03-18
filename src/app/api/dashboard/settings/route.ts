import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function GET() {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    name: promoter.name,
    email: promoter.email,
    business_name: promoter.business_name,
    phone: promoter.phone,
    instagram: promoter.instagram,
    bot_name: promoter.bot_name,
    bot_personality: promoter.bot_personality,
    brand_color: promoter.brand_color,
    plan: promoter.plan,
    twilio_phone: promoter.twilio_phone,
    sms_used: promoter.sms_used,
    sms_limit: promoter.sms_limit,
    subscription_status: promoter.subscription_status,
  });
}

export async function PUT(req: NextRequest) {
  const promoter = await getSession();
  if (!promoter) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const allowed = ["name", "business_name", "phone", "instagram", "bot_name", "bot_personality", "brand_color"];
  const updates: Record<string, string> = {};

  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  updates.updated_at = new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("promoters")
    .update(updates)
    .eq("id", promoter.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
