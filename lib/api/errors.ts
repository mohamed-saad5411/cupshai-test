const FETCH_FAILED_HINT =
  "Request to Supabase failed. Check NEXT_PUBLIC_SUPABASE_URL and network (VPN/firewall).";

/**
 * Supabase can return { error: { message: "TypeError: fetch failed" } } instead of throwing.
 * Use this when handling Supabase error objects to return a clear message and 502.
 */
export function normalizeSupabaseError(error: { message?: string; code?: string }): {
  body: { error: string; code?: string; details?: string };
  status: number;
} {
  const msg = error?.message ?? "";
  if (msg.includes("fetch failed") || msg.includes("TypeError: fetch failed")) {
    return {
      body: { error: FETCH_FAILED_HINT },
      status: 502,
    };
  }
  return {
    body: { error: msg || "Request failed", ...(error?.code ? { code: error.code } : {}) },
    status: 400,
  };
}

/**
 * Normalize thrown errors (including "fetch failed") into a safe API response message.
 * In development, include detail (e.g. ENOTFOUND) to help debug.
 */
export function getApiErrorMessage(err: unknown): {
  error: string;
  details?: string;
} {
  const isDev = process.env.NODE_ENV !== "production";

  if (err instanceof TypeError && err.message === "fetch failed") {
    const cause = err.cause as Error | undefined;
    const causeMessage = cause?.message ?? "";
    return {
      error: FETCH_FAILED_HINT,
      ...(isDev && causeMessage ? { details: causeMessage } : {}),
    };
  }

  if (err instanceof Error) {
    return {
      error: "Internal server error",
      ...(isDev ? { details: err.message } : {}),
    };
  }

  return { error: "Internal server error" };
}
