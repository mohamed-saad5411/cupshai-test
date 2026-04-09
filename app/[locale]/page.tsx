"use client";
import EarlyAccessForm from "@/components/prelaunch/EarlyAccessForm";
import SocialFooter from "@/components/prelaunch/SocialFooter";
import TopBar from "@/components/prelaunch/TopBar";
import Navbar from "@/components/shared/Navbar";
import { getLocale } from "next-intl/server";
import { useLocale } from "next-intl";

export default async function Home() {
  const locale = await useLocale();
  const isAr = locale === "ar";

  return (
    <main
      className="min-h-screen bg-[#FAFAF8] text-[#2B2D42] flex flex-col font-[family-name:var(--font-manrope)]"
      dir={isAr ? "rtl" : "ltr"}
    >
      <TopBar locale={locale} />
      {/* <Nadevbar locale={locale} /> */}
      <EarlyAccessForm locale={locale} />
      <SocialFooter />
    </main>
  );
}

