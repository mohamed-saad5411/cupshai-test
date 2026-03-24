import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSupabaseClient } from "@/lib/supabase/serverClient";
import { getApiErrorMessage, normalizeSupabaseError } from "@/lib/api/errors";

const CreatePayoutSchema = z.object({
  creatorId: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  destination: z
    .object({
      type: z.enum(["bank_transfer", "paypal", "manual"]),
      value: z.string().min(1).max(255),
    })
    .optional(),
  notes: z.string().max(1000).optional(),
});

const UpdatePayoutStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "approved", "rejected", "paid"]),
  adminNote: z.string().max(1000).optional(),
});

const ADMIN_TOKEN = process.env.INTERNAL_ADMIN_TOKEN;

export async function GET(req: NextRequest) {
  const supabase = getSupabaseClient(req, "anon");
  const { searchParams } = new URL(req.url);

  const creatorId = searchParams.get("creatorId");
  const status = searchParams.get("status");
  const limit = Number(searchParams.get("limit") ?? "20");
  const offset = Number(searchParams.get("offset") ?? "0");

  const safeLimit = Number.isFinite(limit) && limit > 0 && limit <= 100 ? limit : 20;
  const safeOffset = Number.isFinite(offset) && offset >= 0 ? offset : 0;

  try {
    let query = supabase
      .from("payout_requests")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(safeOffset, safeOffset + safeLimit - 1);

    if (creatorId) {
      query = query.eq("creator_id", creatorId);
    }
    if (status) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query;

    if (error) {
      const { body, status } = normalizeSupabaseError(error);
      return NextResponse.json(body, { status });
    }

    return NextResponse.json(
      {
        payouts: data ?? [],
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

  let body: z.infer<typeof CreatePayoutSchema>;
  try {
    const json = await req.json();
    body = CreatePayoutSchema.parse(json);
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

  // Require an authenticated user.
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

  // Ownership check: creator must belong to the authenticated user.
  const { data: creator, error: creatorError } = await supabase
    .from("creators")
    .select("id, user_id")
    .eq("id", body.creatorId)
    .single();

  if (creatorError || !creator) {
    return NextResponse.json(
      { error: "Creator not found" },
      { status: 404 },
    );
  }

  if (creator.user_id !== user.id) {
    return NextResponse.json(
      { error: "Forbidden: cannot create payout for this creator" },
      { status: 403 },
    );
  }

  try {
    const { data, error } = await supabase
      .from("payout_requests")
      .insert({
        creator_id: body.creatorId,
        amount: body.amount,
        currency: body.currency.toUpperCase(),
        destination: body.destination ?? null,
        notes: body.notes ?? null,
        status: "pending",
      })
      .select("*")
      .single();

    if (error) {
      const { body, status } = normalizeSupabaseError(error);
      return NextResponse.json(body, { status });
    }

    return NextResponse.json({ payout: data }, { status: 201 });
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

export async function PATCH(req: NextRequest) {
  if (!ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Admin token not configured on server" },
      { status: 500 },
    );
  }

  const authHeader = req.headers.get("x-internal-admin-token");
  if (authHeader !== ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Forbidden: invalid admin token" },
      { status: 403 },
    );
  }

  const supabase = getSupabaseClient(req, "service");

  let body: z.infer<typeof UpdatePayoutStatusSchema>;
  try {
    const json = await req.json();
    body = UpdatePayoutStatusSchema.parse(json);
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
    const { data, error } = await supabase
      .from("payout_requests")
      .update({
        status: body.status,
        admin_note: body.adminNote ?? null,
      })
      .eq("id", body.id)
      .select("*")
      .single();

    if (error) {
      const { body, status } = normalizeSupabaseError(error);
      return NextResponse.json(body, { status });
    }

    return NextResponse.json({ payout: data }, { status: 200 });
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

