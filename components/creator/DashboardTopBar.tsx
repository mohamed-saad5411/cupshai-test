"use client";

import Link from "next/link";
import { AuthNavActions } from "@/components/auth/AuthNavActions";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "use-intl";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";


export default function DashboardTopBar({ lo1cale }: { lo1cale: string }) {
  const router = useRouter();
  const supabase = createClient();
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("nav");



  async function handleLogout() {
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
  }
  return (
    <div className="sticky top-0 z-20 flex items-center justify-end gap-4 px-6 py-4 border-b border-gray-light bg-[#FAFAF8]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FAFAF8]/80">
      <div className="flex items-center gap-3 shrink-0">
        {/* <AuthNavActions locale={locale} variant="compact" /> */}
        <button
          className="text-sm font-semibold px-5 py-2 bg-dark text-white rounded-full hover:bg-dark-soft transition-colors duration-150"
          onClick={() => {
            // Handle logout logic here
            handleLogout()
          }}
        >
          {t("logOut")}
        </button>
        <Link
          href={locale === "en" ? "/ar/dashboard" : "/en/dashboard"}
          className="flex items-center justify-center rounded-full h-9 px-4 bg-[#EDEDE9]/50 text-[#2B2D42] text-xs font-semibold hover:bg-[#EDEDE9] transition-colors"
        >
          {isAr ? "En" : "Ar"}
        </Link>
      </div>
    </div>
  );
}
