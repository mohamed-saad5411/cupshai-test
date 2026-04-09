import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// ─── Supabase Client ──────────────────────────────────────────────────────────
// استخدم SERVICE_ROLE_KEY هنا عشان الـ API تقدر تكتب من غير RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Validation Helpers ───────────────────────────────────────────────────────
const USERNAME_REGEX = /^[a-z0-9_-]{3,20}$/;
const EMAIL_REGEX    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/early-access?username=xxx  →  { available: boolean }
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username")?.toLowerCase().trim();

  if (!username || !USERNAME_REGEX.test(username)) {
    return NextResponse.json({ available: false });
  }

  const { data, error } = await supabase
    .from("early_access_users")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    console.error("[GET] Supabase error:", error.message);
    return NextResponse.json({ available: false });
  }

  return NextResponse.json({ available: data === null });
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/early-access
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { step } = body;

  // ── Step 1: email ──────────────────────────────────────────────────────────
  if (step === "email") {
    const email = (body.email as string)?.toLowerCase().trim();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // هل الإيميل ده اتسجل خلاص وخلّص كل الخطوات؟
    const { data: existing } = await supabase
      .from("early_access_users")
      .select("completed_at")
      .eq("email", email)
      .maybeSingle();

    if (existing?.completed_at) {
      return NextResponse.json({ error: "already_completed" }, { status: 409 });
    }

    // Upsert — لو الإيميل موجود بس مش مكمّل، نفضّله
    const { error } = await supabase
      .from("early_access_users")
      .upsert({ email }, { onConflict: "email" });

    if (error) {
      console.error("[Step 1] Supabase error:", error.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  // ── Step 2: profile ────────────────────────────────────────────────────────
  if (step === "profile") {
    const email     = (body.email as string)?.toLowerCase().trim();
    const name      = (body.name as string)?.trim();
    const socialUrl = (body.socialUrl as string | undefined)?.trim() || null;
    const phone     = (body.phone as string | undefined)?.trim()     || null;
    const niche     = (body.niche as string | undefined)?.trim()     || null;

    if (!email || !name) {
      return NextResponse.json({ error: "email and name are required" }, { status: 400 });
    }

    // تأكد إن الإيميل ده موجود (مرّ بـ step 1)
    const { data: existing } = await supabase
      .from("early_access_users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (!existing) {
      return NextResponse.json({ error: "Email not registered. Start from step 1." }, { status: 400 });
    }

    const { error } = await supabase
      .from("early_access_users")
      .update({ name, social_url: socialUrl, phone, niche })
      .eq("email", email);

    if (error) {
      console.error("[Step 2] Supabase error:", error.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  // ── Step 3: claim-username ─────────────────────────────────────────────────
  if (step === "claim-username") {
    const email    = (body.email as string)?.toLowerCase().trim();
    const username = (body.username as string)?.toLowerCase().trim();

    if (!email || !username) {
      return NextResponse.json({ error: "email and username are required" }, { status: 400 });
    }

    if (!USERNAME_REGEX.test(username)) {
      return NextResponse.json({ error: "Invalid username format" }, { status: 400 });
    }

    // تأكد إن الـ user مرّ بـ step 1
    const { data: existing } = await supabase
      .from("early_access_users")
      .select("id, completed_at")
      .eq("email", email)
      .maybeSingle();

    if (!existing) {
      return NextResponse.json({ error: "Email not registered. Start from step 1." }, { status: 400 });
    }

    if (existing.completed_at) {
      return NextResponse.json({ error: "already_completed" }, { status: 409 });
    }

    // احجز الـ founder_number من الـ sequence
    const { data: seqData, error: seqError } = await supabase
      .rpc("next_founder_number");

    if (seqError || !seqData) {
      console.error("[Step 3] Sequence error:", seqError?.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const founderNumber = seqData as number;
    const profileUrl    = `https://cupshai.com/${username}`;

    // حاول تحجز الـ username — لو متحجز خليه يفشل بـ unique constraint
    const { error: updateError } = await supabase
      .from("early_access_users")
      .update({
        username,
        profile_url:    profileUrl,
        founder_number: founderNumber,
        completed_at:   new Date().toISOString(),
      })
      .eq("email", email);

    if (updateError) {
      // الـ unique constraint على الـ username
      if (updateError.code === "23505") {
        return NextResponse.json({ error: "Username already taken" }, { status: 409 });
      }
      console.error("[Step 3] Supabase error:", updateError.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      profile: {
        url:           profileUrl,
        founderNumber: founderNumber,
      },
    });
  }

  // ── Unknown step ───────────────────────────────────────────────────────────
  return NextResponse.json({ error: "Invalid step" }, { status: 400 });
}

