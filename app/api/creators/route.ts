import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSupabaseClient } from "@/lib/supabase/serverClient";
import { getApiErrorMessage, normalizeSupabaseError } from "@/lib/api/errors";

const CreateCreatorSchema = z.object({
  displayName: z.string().min(2).max(120),
  bio: z.string().max(1000).optional(),
  avatarUrl: z.string().url().optional(),
});

export async function GET(req: NextRequest) {
  const supabase = getSupabaseClient(req, "anon");

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") ?? "20");
  const offset = Number(searchParams.get("offset") ?? "0");

  const safeLimit = Number.isFinite(limit) && limit > 0 && limit <= 100 ? limit : 20;
  const safeOffset = Number.isFinite(offset) && offset >= 0 ? offset : 0;

  try {
    const { data, error, count } = await supabase
      .from("creators")
      .select("*", { count: "exact" })
      .range(safeOffset, safeOffset + safeLimit - 1)
      .order("created_at", { ascending: false });

    if (error) {
      const { body, status } = normalizeSupabaseError(error);
      return NextResponse.json(body, { status });
    }

    return NextResponse.json(
      {
        creators: data ?? [],
        pagination: {
          limit: safeLimit,
          offset: safeOffset,
          total: count ?? 0,
        },
      },
      { status: 200 },
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

export async function POST(req: NextRequest) {
  const supabase = getSupabaseClient(req, "anon");

  let body: z.infer<typeof CreateCreatorSchema>;
  try {
    const json = await req.json();
    body = CreateCreatorSchema.parse(json);
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

  // Require an authenticated user; rely on Supabase Auth + RLS.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: "Unauthorized: valid Supabase session required" },
      { status: 401 },
    );
  }

  try {
    const { data, error } = await supabase
      .from("creators")
      .insert({
        user_id: user.id,
        display_name: body.displayName,
        bio: body.bio ?? null,
        avatar_url: body.avatarUrl ?? null,
      })
      .select("*")
      .single();

    if (error) {
      const { body, status } = normalizeSupabaseError(error);
      return NextResponse.json(body, { status });
    }

    return NextResponse.json({ creator: data }, { status: 201 });
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

