import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// ─── Supabase Client ──────────────────────────────────────────────────────────
// استخدم SERVICE_ROLE_KEY هنا عشان الـ API تقدر تكتب من غير RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET /api/early-access/users
export async function GET() {
  const { data, error } = await supabase
    .from("early_access_users")
    .select("id, email, name, social_url, phone, niche, username, profile_url, founder_number, completed_at, created_at")
    .order("founder_number", { ascending: true });
 
  if (error) {
    console.error("[GET users] Supabase error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
 
  return NextResponse.json({ users: data, total: data.length });
}