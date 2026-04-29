import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ exists: false }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();

    const { data, error } = await supabase
      .from("early_access_users")
      .select("id, completed_at")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error) {
      console.error("[check-email]", error.message);
      return NextResponse.json({ exists: false }, { status: 500 });
    }

    // Only allow login if they completed all 3 steps
    const exists = !!data && !!data.completed_at;
    return NextResponse.json({ exists });

  } catch {
    return NextResponse.json({ exists: false }, { status: 500 });
  }
}