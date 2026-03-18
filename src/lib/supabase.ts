import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Server-side client (service role — full access, scoped by promoter_id in queries)
export const supabaseAdmin: SupabaseClient = supabaseUrl
  ? createClient(supabaseUrl, supabaseServiceKey)
  : (null as unknown as SupabaseClient);

// Client-side client (anon key — read only via RLS)
export const supabaseClient: SupabaseClient = supabaseUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as SupabaseClient);
