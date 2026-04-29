"use client";
import SocialFooter from "@/components/prelaunch/SocialFooter";
import TopBar from "@/components/prelaunch/TopBar";
import BuyMeACoffeeHome from "@/components/home/BuyMeACoffeeHome";
import { getLocale } from "next-intl/server";
import { useLocale } from "next-intl";
import Navbar from "@/components/shared/Navbar";
import EarlyAccessForm from "@/components/shared/EarlyAccessForm";


export default async function SignUp() {
  const locale = await useLocale();
  const isAr = locale === "ar";
  // min-h-screen bg-[#FAFAF8] text-[#2B2D42] flex flex-col font-[family-name:var(--font-manrope)]
  return (
    <main
      className="flex-1 flex flex-col items-center justify-center px-4 py-6 mt-4 md:mt-0  sm:py-20 lg:py-28 max-w-3xl mx-auto w-full text-center"
      dir={isAr ? "rtl" : "ltr"}
    >
      <EarlyAccessForm locale={locale} />

    </main>
  );
}

