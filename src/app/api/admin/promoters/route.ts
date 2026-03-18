import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdmin, hashPassword } from "@/lib/auth";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("promoters")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Get stats for each promoter
  const promotersWithStats = await Promise.all(
    (data || []).map(async (p) => {
      const [guests, contacts, messages] = await Promise.all([
        supabaseAdmin.from("guest_list").select("id", { count: "exact" }).eq("promoter_id", p.id),
        supabaseAdmin.from("contacts").select("id", { count: "exact" }).eq("promoter_id", p.id),
        supabaseAdmin.from("messages").select("id", { count: "exact" }).eq("promoter_id", p.id),
      ]);
      return {
        ...p,
        password_hash: undefined,
        stats: {
          guests: guests.count || 0,
          contacts: contacts.count || 0,
          messages: messages.count || 0,
        },
      };
    })
  );

  return NextResponse.json(promotersWithStats);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { email, password, name, business_name, plan, phone } = body;

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Email, password, and name required" }, { status: 400 });
  }

  const password_hash = await hashPassword(password);

  const { data, error } = await supabaseAdmin
    .from("promoters")
    .insert({
      email: email.toLowerCase().trim(),
      password_hash,
      name,
      business_name,
      plan: plan || "starter",
      phone,
      sms_limit: plan === "elite" ? 5000 : plan === "pro" ? 1500 : 500,
      venue_limit: plan === "elite" ? 999 : plan === "pro" ? 3 : 1,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ...data, password_hash: undefined });
}
