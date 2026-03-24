import { useLocale } from "next-intl";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FAQSection from "@/components/landing/FAQSection";
import Link from "next/link";

const topics = [
  { icon: "🚀", en: { title: "Getting Started", desc: "How to create your page and set up your profile." }, ar: { title: "البداية", desc: "ازاي تعمل صفحتك وتضبط بروفايلك." } },
  { icon: "💳", en: { title: "Payments & Payouts", desc: "How to receive tips and get paid to your bank account." }, ar: { title: "المدفوعات", desc: "ازاي تستقبل الإكراميات وتتقبض على حسابك." } },
  { icon: "👤", en: { title: "Your Creator Page", desc: "Customize your page, bio, and tip amounts." }, ar: { title: "صفحة المبدع", desc: "خصص صفحتك وبايوهاتك ومبالغ الدعم." } },
  { icon: "🔒", en: { title: "Account & Security", desc: "Manage your account settings and keep it secure." }, ar: { title: "الحساب والأمان", desc: "ادير إعدادات حسابك وخليه آمن." } },
];

export default function HelpPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <>
      <Navbar />
      <main className="pt-16" dir={isAr ? "rtl" : "ltr"}>
        {/* Header */}
        <section className="bg-[#1E1E1E] py-20 px-4 text-center text-[#F8F5EE]">
          <span className="text-xs font-bold text-teal tracking-widest uppercase">
            {isAr ? "مركز المساعدة" : "Help Center"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4 leading-tight tracking-tight">
            {isAr ? "كيف نقدر نساعدك؟" : "How can we help you?"}
          </h1>
          <p className="text-[#F8F5EE]/55 text-lg max-w-md mx-auto">
            {isAr
              ? "ابحث في الأسئلة الشائعة أو تواصل معنا مباشرة."
              : "Browse the FAQs below or reach out to us directly."
            }
          </p>
        </section>

        {/* Topic cards */}
        <section className="py-16 px-4 bg-[#FAFAF8]">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((t, i) => {
              const item = isAr ? t.ar : t.en;
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-orange/30 hover:shadow-md transition-all cursor-pointer">
                  <span className="text-3xl mb-3 block">{t.icon}</span>
                  <h3 className="font-bold text-[#1E1E1E] mb-1">{item.title}</h3>
                  <p className="text-[#1E1E1E]/55 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <FAQSection locale={locale} />

        {/* Contact */}
        <section className="py-16 px-4 bg-[#FAFAF8] text-center border-t border-gray-100">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-extrabold text-[#1E1E1E] mb-2">
              {isAr ? "لسه محتاج مساعدة؟" : "Still need help?"}
            </h2>
            <p className="text-[#1E1E1E]/55 mb-6">
              {isAr ? "فريقنا هنا عشان يساعدك بالعربي." : "Our team is here to help you in Arabic or English."}
            </p>
            <Link
              href="mailto:support@cupshai.com"
              className="inline-block bg-orange text-white font-bold px-8 py-3.5 rounded-full hover:bg-orange/90 transition-colors"
            >
              {isAr ? "تواصل مع الدعم" : "Contact Support"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
