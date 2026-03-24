import { useLocale } from "next-intl";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import OurStorySection from "@/components/landing/OurStorySection";
import Link from "next/link";

export default function AboutPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <>
      <Navbar />
      <main className="pt-16" dir={isAr ? "rtl" : "ltr"}>
        <div className="bg-[#FAFAF8] py-20 px-4 text-center">
          <span className="text-xs font-bold text-orange tracking-widest uppercase">
            {isAr ? "من نحن" : "About"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E1E1E] mt-3 leading-tight tracking-tight">
            {isAr ? "قصة كوبشاي" : "The Cupshai Story"}
          </h1>
        </div>

        <OurStorySection locale={locale} />

        <section className="py-20 px-4 bg-white text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#1E1E1E] mb-4">
              {isAr ? "كن جزء من القصة" : "Be part of the story"}
            </h2>
            <p className="text-[#1E1E1E]/60 mb-8">
              {isAr
                ? "سواء كنت مبدعاً أو محبًا، كوبشاي بيحتاجك."
                : "Whether you're a creator or a fan, Cupshai needs you."
              }
            </p>
            <Link
              href={`/${locale}`}
              className="inline-block bg-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-orange/90 transition-all shadow-lg shadow-orange/20"
            >
              {isAr ? "انضم إلينا" : "Join us"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
