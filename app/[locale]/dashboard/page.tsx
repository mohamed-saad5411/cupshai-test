import DashboardTopBar from "@/components/creator/DashboardTopBar";
import { getTranslations } from "next-intl/server";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const t = await getTranslations("auth");

  return (
    <div
      className="min-h-screen bg-[#FAFAF8] text-[#2B2D42] font-[family-name:var(--font-manrope)]"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <DashboardTopBar locale={locale} />
        <main className="rounded-2xl bg-white p-5 sm:p-7 md:p-8 shadow-sm border border-slate-200">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#2B2D42] mb-2">
            {t("dashboard")}
          </h1>
          <p className="text-[#BFC0C0] max-w-xl">
            {isAr
              ? "هذه لوحة التحكم — يمكنك لاحقاً إضافة الإحصائيات والمدفوعات والمزيد."
              : "This is your dashboard — stats, payouts, and more will show here as you build."}
          </p>
        </main>
      </div>
    </div>
  );
}
