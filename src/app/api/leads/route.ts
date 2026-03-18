import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, business_name, instagram, city, venues, message, plan } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 });
    }

    // Store lead in a simple leads table (or you can use contacts)
    const { error } = await supabaseAdmin.from("leads").insert({
      name,
      email,
      phone,
      business_name,
      instagram,
      city,
      venues,
      message,
      plan,
    });

    if (error) {
      console.error("Lead insert error:", error);
      // Don't fail — still acknowledge
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
