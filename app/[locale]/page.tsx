import { EarlyAccessWizard } from "@/components/home/EarlyAccessWizard";
import SocialFooter from "@/components/home/SocialFooter";
import TopBar from "@/components/home/TopBar";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <main
      className="min-h-screen bg-[#FAFAF8] text-[#2B2D42] flex flex-col font-[family-name:var(--font-manrope)]"
      dir={isAr ? "rtl" : "ltr"}
    >
      <TopBar locale={locale} />
      <EarlyAccessWizard locale={locale} />
      <SocialFooter />
    </main>
  );
}

