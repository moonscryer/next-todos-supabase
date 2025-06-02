import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | undefined;

/**
 * Returns a singleton Supabase client.
 * Kept the name `connect()` so existing imports continue to work.
 */
export function connect(): SupabaseClient {
  if (supabase) return supabase;

  // Works for plain Node, Next.js, Vite, etc.
  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseAnonKey =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "";

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_ANON_KEY env variables – check your .env(.local)"
    );
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }, // purely server-side API client
  });

  return supabase;
}
