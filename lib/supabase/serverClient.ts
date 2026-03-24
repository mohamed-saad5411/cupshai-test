import { type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export type SupabaseRole = "anon" | "service";

export function getSupabaseClient(
  req: NextRequest,
  role: SupabaseRole = "anon",
) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase environment variables are not configured. Make sure NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY are set.",
    );
  }

  if (role === "service" && !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required when using the service role Supabase client.",
    );
  }

  // Prefer user access token from the Authorization header when available.
  const authHeader = req.headers.get("authorization") ?? "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : undefined;

  const key = role === "service" ? SUPABASE_SERVICE_ROLE_KEY! : SUPABASE_ANON_KEY!;

  return createClient(SUPABASE_URL, key, {
    global: {
      headers: bearerToken
        ? {
            Authorization: `Bearer ${bearerToken}`,
          }
        : {},
    },
  });
}

