"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { clearStoredSession } from "@/lib/auth-storage";
import { useAuthSession } from "@/hooks/useAuthSession";


type Props = {
  /** Compact layout for tight headers */
  variant?: "default" | "compact";
};

export function AuthNavActions({ variant = "default" }: Props) {
  const { isLoggedIn } = useAuthSession();
  const router = useRouter();
  const t = useTranslations("auth");
  const pathname = usePathname();
  const locale = useLocale();
  const isAr = locale === "ar";


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
        {/* <Link
          href={`/${locale}/dashboard`}
          className={`${baseBtn} bg-[#2B2D42] text-white hover:bg-[#1f2133] flex items-center`}
        >
          {t("dashboard")}
        </Link> */}
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

  return <>
    <div className="flex  items-center gap-3">
      {pathname === `/${locale}/signup` ?
        <Link
          href={`/${locale}/login`}
          className=" font-semibold hidden sm:block text-gray-700 hover:text-gray-900 transition-colors " >
          {t("login")}
        </Link>

        : pathname === `/${locale}/login` ?
          <Link
            href={`/${locale}/signup`}
            className=" bg-yellow-400 hidden sm:block hover:bg-yellow-300 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-yellow-200 "
          >
            {/* Start my page */}
            {t("Start my page")}
          </Link>
          :
          <>
            <Link
              href="/login"
              className=" hidden sm:block text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors "      >
              {t("login")}
            </Link>
            <Link
              href="/signup"
              className=" bg-yellow-400 hidden sm:block h-11 text-center hover:bg-yellow-300 text-gray-900 font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-yellow-200"
            >
              {/* Start my page */}
              {t("Start my page")}
            </Link>
          </>
      }


    </div>
  </>;
}
