import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ComparePage() {
  const t = useTranslations("compare");
  const locale = useLocale();

  const headers = t.raw("tableHeaders") as string[];
  const rows = t.raw("rows") as string[][];

  function getCellStyle(value: string) {
    if (value.startsWith("✅")) return "text-teal font-semibold";
    if (value.startsWith("❌")) return "text-dark/30";
    if (value.startsWith("🔜")) return "text-orange font-medium";
    return "text-dark/70";
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-cream">
        {/* Hero */}
        <section className="py-20 px-4 text-center bg-dark text-cream">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-cream/60 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </section>

        {/* Table */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Highlight cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              <div className="bg-orange/10 border border-orange/20 rounded-2xl p-5 text-center">
                <div className="text-2xl font-bold text-orange mb-1">0%</div>
                <div className="text-dark font-semibold text-sm">
                  {locale === "ar" ? "عمولة عند الإطلاق" : "Fee at Launch"}
                </div>
                <div className="text-dark/50 text-xs mt-1">
                  {locale === "ar" ? "ثم 5% فقط" : "Then only 5%"}
                </div>
              </div>
              <div className="bg-teal/10 border border-teal/20 rounded-2xl p-5 text-center">
                <div className="text-2xl font-bold text-teal mb-1">EGP</div>
                <div className="text-dark font-semibold text-sm">
                  {locale === "ar" ? "دعم الجنيه المصري" : "Egyptian Pound Support"}
                </div>
                <div className="text-dark/50 text-xs mt-1">
                  {locale === "ar" ? "لا رسوم تحويل عملة" : "No currency conversion"}
                </div>
              </div>
              <div className="bg-dark/5 border border-dark/10 rounded-2xl p-5 text-center">
                <div className="text-2xl font-bold text-dark mb-1">عربي</div>
                <div className="text-dark font-semibold text-sm">
                  {locale === "ar" ? "واجهة عربية كاملة" : "Full Arabic Interface"}
                </div>
                <div className="text-dark/50 text-xs mt-1">
                  {locale === "ar" ? "RTL + دعم العملاء بالعربي" : "RTL + Arabic support"}
                </div>
              </div>
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-light bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-light">
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        className={`px-4 py-4 font-bold text-start ${
                          i === 1
                            ? "bg-orange/5 text-orange"
                            : "text-dark/50"
                        }`}
                      >
                        {i === 1 && (
                          <span className="inline-block bg-orange text-white text-xs px-2 py-0.5 rounded-full me-2">
                            {locale === "ar" ? "مميَّز" : "Best"}
                          </span>
                        )}
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-gray-light/50 last:border-0 hover:bg-gray-light/20 transition-colors">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`px-4 py-3.5 ${
                            ci === 0 ? "font-medium text-dark" : getCellStyle(cell)
                          } ${ci === 1 ? "bg-orange/5" : ""}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-dark/40 text-sm mt-4">{t("disclaimer")}</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6">{t("ctaTitle")}</h2>
            <Link
              href={`/${locale}`}
              className="inline-block bg-orange text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-orange/90 transition-colors shadow-lg shadow-orange/20"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
