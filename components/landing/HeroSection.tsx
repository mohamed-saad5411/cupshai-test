"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const floatingCards = [
  { name: "Ahmed", amount: "50", emoji: "🎨", pos: "top-[18%] left-[6%]", delay: 0.6 },
  { name: "Sara", amount: "100", emoji: "🎵", pos: "top-[12%] right-[7%]", delay: 0.8 },
  { name: "Omar", amount: "25", emoji: "🎮", pos: "bottom-[22%] left-[4%]", delay: 1.0 },
  { name: "Nour", amount: "75", emoji: "📚", pos: "bottom-[18%] right-[5%]", delay: 1.2 },
];

export default function HeroSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-[#FAFAF8] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {floatingCards.map((card) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay, duration: 0.5 }}
            className={`absolute ${card.pos} hidden lg:block`}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
              <span className="text-xl">{card.emoji}</span>
              <div className="text-start">
                <p className="text-sm font-semibold text-[#1E1E1E]">{card.name}</p>
                <p className="text-xs text-[#1E1E1E]/50">sent {card.amount} EGP ☕</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 bg-orange/10 text-orange border border-orange/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
          ☕ {isAr ? "منصة المبدعين العرب الأولى" : "The First Arab Creator Platform"}
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#1E1E1E] leading-[1.08] tracking-tight mb-6">
          {isAr ? (
            <>احصل على دعم جمهورك<br /><span className="text-orange">بالطريقة العربية.</span></>
          ) : (
            <>Fund your creative work<br /><span className="text-orange">the Arab way.</span></>
          )}
        </h1>

        <p className="text-[#1E1E1E]/60 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          {isAr
            ? "كوبشاي بيخلي جمهورك يبعتلك كوباية شاي ☕ — دعم مباشر بالجنيه المصري، بدون رسوم دولية."
            : "Cupshai lets your fans send you a cup of shai ☕ — support you directly in EGP, no international fees."
          }
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="bg-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 hover:-translate-y-0.5"
          >
            {isAr ? "ابدأ صفحتك" : "Start your page"}
          </Link>
        </div>

        <p className="text-[#1E1E1E]/35 text-sm mt-5">
          {isAr ? "مجاني تماماً • بدون بطاقة بنكية" : "It's free and takes less than a minute"}
        </p>
      </motion.div>
    </section>
  );
}
