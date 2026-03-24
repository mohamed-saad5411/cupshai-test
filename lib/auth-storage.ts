/** Keys used with sessionStorage for Supabase session (see EarlyAccessWizard & login flow). */
export const AUTH_ACCESS_TOKEN_KEY = "supabase_access_token";
export const AUTH_REFRESH_TOKEN_KEY = "supabase_refresh_token";

export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function persistSession(accessToken: string, refreshToken?: string | null) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUTH_ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    sessionStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
  }
  notifyAuthSessionChanged();
}

export function clearStoredSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
  notifyAuthSessionChanged();
}

/** Call after login/signup/logout so all `useAuthSession` subscribers update in the same tab. */
export function notifyAuthSessionChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("auth-session-changed"));
}
