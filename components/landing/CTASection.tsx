"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

export default function CTASection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section className="py-28 px-4 bg-[#FAFAF8] text-center">
      <motion.div {...fadeUp} className="max-w-xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E1E1E] mb-4 leading-tight tracking-tight">
          {isAr
            ? "ابدأ تكسب من شغفك النهارده."
            : "Start earning from your passion today."
          }
        </h2>
        <p className="text-[#1E1E1E]/55 text-lg mb-8">
          {isAr
            ? "انضم لأوائل المبدعين على كوبشاي واحجز اسمك قبل الإطلاق."
            : "Join the first creators on Cupshai and claim your username before launch."
          }
        </p>
        <Link
          href={`/${locale}`}
          className="inline-block bg-orange text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 hover:-translate-y-0.5"
        >
          {isAr ? "ابدأ صفحتك مجاناً" : "Start your page — it's free"}
        </Link>
        <p className="text-[#1E1E1E]/35 text-sm mt-4">
          {isAr ? "بدون بطاقة بنكية" : "No credit card required"}
        </p>
      </motion.div>
    </section>
  );
}
