// import { createClient } from "@supabase/supabase-js";
// import { NextRequest, NextResponse } from "next/server";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// const USERNAME_REGEX = /^[a-z0-9_-]{3,20}$/;
// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// export async function GET(req: NextRequest) {
//   const username = req.nextUrl.searchParams.get("username")?.toLowerCase().trim();

//   if (!username || !USERNAME_REGEX.test(username)) {
//     return NextResponse.json({ available: false });
//   }

//   const { data, error } = await supabase
//     .from("early_access_users")
//     .select("id")
//     .eq("username", username)
//     .maybeSingle();

//   if (error) {
//     console.error("[GET] Supabase error:", error.message);
//     return NextResponse.json({ available: false });
//   }

//   return NextResponse.json({ available: data === null });
// }

// export async function POST(req: NextRequest) {
//   let body: Record<string, unknown>;

//   try {
//     body = await req.json();
//   } catch {
//     return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
//   }

//   const { step } = body;

//   // ── Step 1: email ──────────────────────────────────────────────────────────
//   if (step === "email") {
//     const email = (body.email as string)?.toLowerCase().trim();

//     if (!email || !EMAIL_REGEX.test(email)) {
//       return NextResponse.json({ error: "Invalid email" }, { status: 400 });
//     }

//     const { data: existing } = await supabase
//       .from("early_access_users")
//       .select("completed_at")
//       .eq("email", email)
//       .maybeSingle();

//     if (existing?.completed_at) {
//       return NextResponse.json({ error: "already_completed" }, { status: 409 });
//     }

//     const { error } = await supabase
//       .from("early_access_users")
//       .upsert({ email }, { onConflict: "email" });

//     if (error) {
//       console.error("[Step 1] Supabase error:", error.message);
//       return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }

//     return NextResponse.json({ ok: true });
//   }

//   // ── Step 2: profile ────────────────────────────────────────────────────────
//   if (step === "profile") {
//     const email = (body.email as string)?.toLowerCase().trim();
//     const name = (body.name as string)?.trim();
//     const socialUrl = (body.socialUrl as string | undefined)?.trim() || null;
//     const phone = (body.phone as string | undefined)?.trim() || null;
//     const niche = (body.niche as string | undefined)?.trim() || null;

//     if (!email || !name) {
//       return NextResponse.json({ error: "email and name are required" }, { status: 400 });
//     }

//     const { data: existing } = await supabase
//       .from("early_access_users")
//       .select("id")
//       .eq("email", email)
//       .maybeSingle();

//     if (!existing) {
//       return NextResponse.json(
//         { error: "Email not registered. Start from step 1." },
//         { status: 400 }
//       );
//     }

//     const { error } = await supabase
//       .from("early_access_users")
//       .update({ name, social_url: socialUrl, phone, niche })
//       .eq("email", email);

//     if (error) {
//       console.error("[Step 2] Supabase error:", error.message);
//       return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }

//     return NextResponse.json({ ok: true });
//   }

//   // ── Step 3: claim-username ─────────────────────────────────────────────────
//   if (step === "claim-username") {
//     const email = (body.email as string)?.toLowerCase().trim();
//     const username = (body.username as string)?.toLowerCase().trim();

//     if (!email || !username) {
//       return NextResponse.json(
//         { error: "email and username are required" },
//         { status: 400 }
//       );
//     }

//     if (!USERNAME_REGEX.test(username)) {
//       return NextResponse.json({ error: "Invalid username format" }, { status: 400 });
//     }

//     const { data: existing } = await supabase
//       .from("early_access_users")
//       .select("id, completed_at")
//       .eq("email", email)
//       .maybeSingle();

//     if (!existing) {
//       return NextResponse.json(
//         { error: "Email not registered. Start from step 1." },
//         { status: 400 }
//       );
//     }

//     if (existing.completed_at) {
//       return NextResponse.json({ error: "already_completed" }, { status: 409 });
//     }

//     const { data: seqData, error: seqError } = await supabase.rpc("next_founder_number");

//     if (seqError || !seqData) {
//       console.error("[Step 3] Sequence error:", seqError?.message);
//       return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }

//     const founderNumber = seqData as number;
//     const profileUrl = `https://cupshai.com/${username}`;

//     const { error: updateError } = await supabase
//       .from("early_access_users")
//       .update({
//         username,
//         profile_url: profileUrl,
//         founder_number: founderNumber,
//         completed_at: new Date().toISOString(),
//       })
//       .eq("email", email);

//     if (updateError) {
//       if (updateError.code === "23505") {
//         return NextResponse.json({ error: "Username already taken" }, { status: 409 });
//       }
//       console.error("[Step 3] Update error:", updateError.message);
//       return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }

//     const { data: authData, error: authError } = await supabase.auth.admin.createUser({
//       email,
//       email_confirm: true,
//       user_metadata: { username, founder_number: founderNumber },
//     });

//     if (authError && authError.message !== "User already registered") {
//       console.error("[Step 3] Auth error:", authError.message);
//       return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }

//     let userId = authData?.user?.id;
//     if (!userId) {
//       const { data: list } = await supabase.auth.admin.listUsers();
//       userId = list?.users?.find((u) => u.email === email)?.id;
//     }

//     if (!userId) {
//       return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }

//     // const { data: sessionData, error: sessionError } =
//     //   await supabase.auth.admin.createSession(userId);

//     // if (sessionError || !sessionData) {
//     //   console.error("[Step 3] Session error:", sessionError?.message);
//     //   return NextResponse.json({ error: "Server error" }, { status: 500 });
//     // }

//     // return NextResponse.json({
//     //   ok: true,
//     //   profile: {
//     //     url: profileUrl,
//     //     founderNumber: founderNumber,
//     //   },
//     //   session: {
//     //     access_token: sessionData.session.access_token,
//     //     refresh_token: sessionData.session.refresh_token,
//     //   },
//     // });

//     const { data: linkData, error: linkError } =
//       await supabase.auth.admin.generateLink({
//         type: "magiclink",
//         email,
//         options: {
//           redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/en/dashboard/${username}`,
//         },

//       });

//     if (linkError || !linkData) {
//       console.error("[Step 3] Link error:", linkError?.message);
//       return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }

//     return NextResponse.json({
//       ok: true,
//       profile: {
//         url: profileUrl,
//         founderNumber: founderNumber,
//       },
//       username: username,
//       magicLink: linkData.properties.action_link,
//     });

//   }

//   return NextResponse.json({ error: "Invalid step" }, { status: 400 });
// }


import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const USERNAME_REGEX = /^[a-z0-9_-]{3,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const { data: existing } = await supabase
      .from("early_access_users")
      .select("completed_at")
      .eq("email", email)
      .maybeSingle();

    if (existing?.completed_at) {
      return NextResponse.json({ error: "already_completed" }, { status: 409 });
    }

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
    const email = (body.email as string)?.toLowerCase().trim();
    const name = (body.name as string)?.trim();
    const socialUrl = (body.socialUrl as string | undefined)?.trim() || null;
    const phone = (body.phone as string | undefined)?.trim() || null;
    const niche = (body.niche as string | undefined)?.trim() || null;

    if (!email || !name) {
      return NextResponse.json({ error: "email and name are required" }, { status: 400 });
    }

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
    const email = (body.email as string)?.toLowerCase().trim();
    const username = (body.username as string)?.toLowerCase().trim();
    const locale = (body.locale as string) || "en";

    if (!email || !username) {
      return NextResponse.json({ error: "email and username are required" }, { status: 400 });
    }

    if (!USERNAME_REGEX.test(username)) {
      return NextResponse.json({ error: "Invalid username format" }, { status: 400 });
    }

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

    const { data: seqData, error: seqError } = await supabase.rpc("next_founder_number");

    if (seqError || !seqData) {
      console.error("[Step 3] Sequence error:", seqError?.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const founderNumber = seqData as number;
    const profileUrl = `https://cupshai.com/${username}`;

    // 1. Save username in DB
    const { error: updateError } = await supabase
      .from("early_access_users")
      .update({
        username,
        profile_url: profileUrl,
        founder_number: founderNumber,
        completed_at: new Date().toISOString(),
      })
      .eq("email", email);

    if (updateError) {
      if (updateError.code === "23505") {
        return NextResponse.json({ error: "Username already taken" }, { status: 409 });
      }
      console.error("[Step 3] Update error:", updateError.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // 2. Create Supabase Auth user (or fetch existing one)
    let userId: string | undefined;

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: { username, founder_number: founderNumber },
    });

    if (authError) {
      // User already exists in Auth — fetch their ID
      const { data: list } = await supabase.auth.admin.listUsers();
      userId = list?.users?.find((u) => u.email === email)?.id;
      if (!userId) {
        console.error("[Step 3] Auth error:", authError.message);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
      }
    } else {
      userId = authData?.user?.id;
    }

    if (!userId) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // 4. Generate link and exchange it for tokens server-side
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?locale=${locale}`,
        // redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/dashboard`,
      },
    });

    if (linkError || !linkData) {
      console.error("[Step 3] Link error:", linkError?.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // Extract token_hash from the link and exchange for session
    const hashed_token = linkData.properties?.hashed_token;

    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: hashed_token,
      type: "magiclink",
    });

    if (verifyError || !verifyData.session) {
      console.error("[Step 3] Verify error:", verifyError?.message);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      profile: {
        url: profileUrl,
        founderNumber: founderNumber,
      },
      session: {
        access_token: verifyData.session.access_token,
        refresh_token: verifyData.session.refresh_token,
      },
    });
  }

  return NextResponse.json({ error: "Invalid step" }, { status: 400 });
}