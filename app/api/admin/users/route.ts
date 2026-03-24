import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/serverClient";
import { getApiErrorMessage } from "@/lib/api/errors";

const ADMIN_TOKEN = process.env.INTERNAL_ADMIN_TOKEN;

export async function GET(req: NextRequest) {
  if (!ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Admin token not configured on server" },
      { status: 500 },
    );
  }

  const adminHeader = req.headers.get("x-internal-admin-token");
  if (adminHeader !== ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Forbidden: invalid admin token" },
      { status: 403 },
    );
  }

  const supabase = getSupabaseClient(req, "service");

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? "1");
  const perPage = Number(searchParams.get("perPage") ?? "50");

  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safePerPage =
    Number.isFinite(perPage) && perPage > 0 && perPage <= 200 ? perPage : 50;

  try {
    const { data, error } = await supabase.auth.admin.listUsers({
      page: safePage,
      perPage: safePerPage,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        users: data.users.map((u) => ({
          id: u.id,
          email: u.email,
          role: (u.user_metadata as { role?: string } | null)?.role ?? null,
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at,
        })),
        pagination: {
          page: safePage,
          perPage: safePerPage,
          total: data.total,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    const { error, details } = getApiErrorMessage(err);
    return NextResponse.json(
      details ? { error, details } : { error },
      { status: 500 },
    );
  }
}

