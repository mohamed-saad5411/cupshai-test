"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Logo from "@/components/shared/Logo";
import { persistSession } from "@/lib/auth-storage";

export default function LoginPage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("auth");
  const isAr = locale === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: email.trim(),
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? t("loginError"));
        return;
      }
      if (data.session?.access_token) {
        persistSession(data.session.access_token, data.session.refresh_token ?? null);
      }
      router.push(`/${locale}`);
      router.refresh();
    } catch {
      setError(t("loginError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen bg-[#FAFAF8] text-[#2B2D42] flex flex-col items-center px-4 py-12 font-[family-name:var(--font-manrope)]"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md">
        <div className="mb-10">
          <Logo locale={locale} />
        </div>
        <h1 className="text-3xl font-semibold text-[#2B2D42] mb-2">{t("loginTitle")}</h1>
        <p className="text-[#BFC0C0] mb-8">{t("loginSubtitle")}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              {error}
            </div>
          )}
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-[#2B2D42]/80">
              {t("email")}
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-[#2B2D42]/80">
              {t("password")}
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#2B2D42] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f2133] disabled:opacity-50"
          >
            {loading ? "…" : t("submitLogin")}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#BFC0C0]">
          {t("noAccount")}{" "}
          <Link href={`/${locale}#early-access`} className="font-semibold text-[#F4A259] hover:underline">
            {t("createAccount")}
          </Link>
        </p>
      </div>
    </main>
  );
}
