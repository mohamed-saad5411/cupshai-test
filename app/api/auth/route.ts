import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSupabaseClient } from "@/lib/supabase/serverClient";
import { getApiErrorMessage, normalizeSupabaseError } from "@/lib/api/errors";

function normalizeUsername(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");
}

async function authEmailExists(service: ReturnType<typeof getSupabaseClient>, email: string) {
  // Supabase doesn't provide a direct "get user by email" in client libraries,
  // so we scan in pages (fine for early stage; can be replaced later).
  const perPage = 200;
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await service.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const found = data.users.some(
      (u) => (u.email ?? "").trim().toLowerCase() === email,
    );
    if (found) return true;
    if (data.users.length < perPage) return false;
  }
  return false;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const check = searchParams.get("check"); // "email" | "username"

  if (check !== "email" && check !== "username") {
    return NextResponse.json(
      { error: "Unsupported check. Use ?check=email&email=... or ?check=username&username=..." },
      { status: 400 },
    );
  }

  const service = getSupabaseClient(req, "service");

  try {
    if (check === "email") {
      const email = (searchParams.get("email") ?? "").trim().toLowerCase();
      if (!email) {
        return NextResponse.json({ error: "Missing email" }, { status: 400 });
      }

      const exists = await authEmailExists(service, email);
      return NextResponse.json(
        { available: !exists, reason: exists ? "email_taken" : null },
        { status: 200 },
      );
    }

    const usernameRaw = searchParams.get("username") ?? "";
    const username = normalizeUsername(usernameRaw);
    if (!username || username.length < 3) {
      return NextResponse.json(
        { available: false, reason: "invalid_username" },
        { status: 200 },
      );
    }

    const { data, error } = await service
      .from("creators")
      .select("id")
      .eq("display_name", username)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { available: !data, reason: data ? "username_taken" : null },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    const { error, details } = getApiErrorMessage(err);
    return NextResponse.json(details ? { error, details } : { error }, { status: 500 });
  }
}

const AuthSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("signup"),
    email: z.string().email(),
    password: z.string().min(8),
    fullName: z.string().min(1).max(120).optional(),
    phone: z.string().min(6).max(30).optional(),
    username: z.string().min(3).max(30).optional(),
  }),
  z.object({
    action: z.literal("login"),
    email: z.string().email(),
    password: z.string().min(8),
  }),
  z.object({
    action: z.literal("refresh"),
    refresh_token: z.string().min(10),
  }),
]);

export async function POST(req: NextRequest) {
  const supabase = getSupabaseClient(req, "anon");

  let parsedBody;
  try {
    const body = await req.json();
    parsedBody = AuthSchema.parse(body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: err.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  try {
    if (parsedBody.action === "signup") {
      const email = parsedBody.email.trim().toLowerCase();
      const password = parsedBody.password;
      const fullName = parsedBody.fullName?.trim();
      const phone = parsedBody.phone?.trim();
      const username = parsedBody.username ? normalizeUsername(parsedBody.username) : undefined;

      const service = getSupabaseClient(req, "service");
      {
        const emailExists = await authEmailExists(service, email);
        if (emailExists) {
          return NextResponse.json(
            { error: "User already registered", code: "email_taken" },
            { status: 409 },
          );
        }

        if (username) {
          const { data: existingUsername } = await service
            .from("creators")
            .select("id")
            .eq("display_name", username)
            .maybeSingle();
          if (existingUsername) {
            return NextResponse.json(
              { error: "Username already used", code: "username_taken" },
              { status: 409 },
            );
          }
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...(fullName ? { full_name: fullName } : {}),
            ...(phone ? { phone } : {}),
            ...(username ? { username } : {}),
            role: "creator",
          },
        },
      });

      if (error) {
        const { body, status } = normalizeSupabaseError(error);
        return NextResponse.json(body, { status });
      }

      // Optional: create a matching creator profile row using service role (bypasses RLS).
      // This allows the user to land on /creator immediately even if email confirmation is enabled.
      let creator: unknown = null;
      if (data.user) {
        try {
          const { data: created, error: createErr } = await service
            .from("creators")
            .insert({
              user_id: data.user.id,
              display_name: username || fullName || email.split("@")[0],
              bio: null,
              avatar_url: null,
            })
            .select("*")
            .single();

          if (!createErr) creator = created;
        } catch (e) {
          // If the table doesn't exist yet, ignore to avoid blocking signup.
          console.error(e);
        }
      }

      return NextResponse.json(
        {
          user: data.user,
          session: data.session,
          creator,
        },
        { status: 201 },
      );
    }

    if (parsedBody.action === "login") {
      const { email, password } = parsedBody;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const { body, status } = normalizeSupabaseError(error);
        return NextResponse.json(body, { status });
      }

      return NextResponse.json(
        {
          user: data.user,
          session: data.session,
        },
        { status: 200 },
      );
    }

    if (parsedBody.action === "refresh") {
      const { refresh_token } = parsedBody;

      const { data, error } = await supabase.auth.refreshSession({
        refresh_token,
      });

      if (error) {
        const { body, status } = normalizeSupabaseError(error);
        return NextResponse.json(body, { status });
      }

      return NextResponse.json(
        {
          user: data.user,
          session: data.session,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "Unsupported auth action" },
      { status: 400 },
    );
  } catch (err) {
    console.error(err);
    const { error, details } = getApiErrorMessage(err);
    const isFetchFailed =
      err instanceof TypeError && (err as Error).message === "fetch failed";
    return NextResponse.json(
      details ? { error, details } : { error },
      { status: isFetchFailed ? 502 : 500 },
    );
  }
}

