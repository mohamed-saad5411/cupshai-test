"use client";

import Link from "next/link";
import { AuthNavActions } from "@/components/auth/AuthNavActions";

export default function DashboardTopBar({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  return (
    <div className="sticky top-0 z-20 flex items-center justify-end gap-4 px-6 py-4 border-b border-gray-light bg-[#FAFAF8]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FAFAF8]/80">
      <div className="flex items-center gap-3 shrink-0">
        <AuthNavActions locale={locale} variant="compact" />
        <Link
          href={locale === "en" ? "/ar/dashboard" : "/en/dashboard"}
          className="flex items-center justify-center rounded-full h-9 px-4 bg-[#EDEDE9]/50 text-[#2B2D42] text-xs font-semibold hover:bg-[#EDEDE9] transition-colors"
        >
          {isAr ? "English" : "العربية"}
        </Link>
      </div>
    </div>
  );
}
