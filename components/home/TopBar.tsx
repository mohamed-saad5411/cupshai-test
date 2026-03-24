"use client";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { AuthNavActions } from "@/components/auth/AuthNavActions";

export default function TopBar({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  return (
    <header className="flex items-center justify-between gap-4 px-8 py-6 w-full max-w-7xl mx-auto flex-wrap">
      <Logo locale={locale} />
      <div className="flex items-center gap-3 ms-auto">
        <AuthNavActions locale={locale} />
        <Link
          href={locale === "en" ? "/ar" : "/en"}
          className="flex items-center justify-center rounded-full h-10 px-5 bg-[#EDEDE9]/50 text-[#2B2D42] text-sm font-semibold hover:bg-[#EDEDE9] transition-colors"
        >
          {isAr ? "English" : "العربية"}
        </Link>
      </div>
    </header>
  );
}
