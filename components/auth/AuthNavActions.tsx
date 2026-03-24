"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { clearStoredSession } from "@/lib/auth-storage";
import { useAuthSession } from "@/hooks/useAuthSession";

type Props = {
  locale: string;
  /** Compact layout for tight headers */
  variant?: "default" | "compact";
};

export function AuthNavActions({ locale, variant = "default" }: Props) {
  const { isLoggedIn } = useAuthSession();
  const router = useRouter();
  const t = useTranslations("auth");

  const baseBtn =
    variant === "compact"
      ? "rounded-full h-9 px-3 text-xs font-semibold transition-colors"
      : "rounded-full h-10 px-4 text-sm font-semibold transition-colors";

  function handleLogout() {
    clearStoredSession();
    router.refresh();
    router.push(`/${locale}`);
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/${locale}/dashboard`}
          className={`${baseBtn} bg-[#2B2D42] text-white hover:bg-[#1f2133] flex items-center`}
        >
          {t("dashboard")}
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className={`${baseBtn} border border-[#2B2D42]/20 text-[#2B2D42] hover:bg-[#EDEDE9]/80`}
        >
          {t("logOut")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Link
        href={`/${locale}/login`}
        className={`${baseBtn} flex items-center border border-[#2B2D42]/20 text-[#2B2D42] hover:bg-[#EDEDE9]/80`}
      >
        {t("login")}
      </Link>
      <Link
        href={`/${locale}#early-access`}
        className={`${baseBtn} bg-[#F4A259] flex items-center text-[#2B2D42] hover:bg-[#e8954a]`}
      >
        {t("signUp")}
      </Link>
    </div>
  );
}
