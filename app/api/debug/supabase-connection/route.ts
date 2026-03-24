import { NextResponse } from "next/server";

/**
 * Dev-only: test connectivity to Supabase and return the real error if fetch fails.
 * Call: GET /api/debug/supabase-connection
 * Remove or disable this route in production.
 */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    return NextResponse.json(
      { ok: false, error: "NEXT_PUBLIC_SUPABASE_URL is not set in .env.local" },
      { status: 500 },
    );
  }

  // Supabase health endpoint (no auth required)
  const testUrl = `${url.replace(/\/$/, "")}/rest/v1/`;
  try {
    const res = await fetch(testUrl, {
      method: "HEAD",
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "" },
    });
    return NextResponse.json({
      ok: true,
      message: "Supabase is reachable",
      status: res.status,
      url: testUrl,
    });
  } catch (err) {
    const cause = err instanceof Error ? err.cause as Error | undefined : undefined;
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        cause: cause?.message ?? null,
        hint:
          cause?.message?.includes("ENOTFOUND") || cause?.message?.includes("getaddrinfo")
            ? "Check that NEXT_PUBLIC_SUPABASE_URL is correct (e.g. https://xxxx.supabase.co) and there are no typos."
            : cause?.message?.includes("ECONNREFUSED")
              ? "Connection refused. Is the URL correct? Try opening it in a browser."
              : cause?.message?.includes("certificate") || cause?.message?.includes("SSL")
                ? "SSL/certificate issue. Check VPN or corporate proxy."
                : "Check VPN, firewall, or try another network.",
      },
      { status: 502 },
    );
  }
}
