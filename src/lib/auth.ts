import { cookies } from "next/headers";
import { supabaseAdmin } from "./supabase";
import type { Promoter } from "@/types/database";

// Simple JWT-like session using signed cookies
// In production, use proper JWT or Supabase Auth

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + process.env.AUTH_SALT);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export async function getSession(): Promise<Promoter | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("velvet_session")?.value;
  if (!sessionId) return null;

  const { data } = await supabaseAdmin
    .from("promoters")
    .select("*")
    .eq("id", sessionId)
    .eq("is_active", true)
    .single();

  return data as Promoter | null;
}

export async function createSession(promoterId: string) {
  const cookieStore = await cookies();
  cookieStore.set("velvet_session", promoterId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("velvet_session");
}

// Admin auth (JP's super admin)
export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("velvet_admin")?.value === process.env.ADMIN_PASSWORD;
}
