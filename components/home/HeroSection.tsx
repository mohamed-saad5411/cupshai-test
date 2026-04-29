// import { useState, useEffect, useRef } from "react";

// // ─── Utility: simple cn helper ───────────────────────────────────────────────
// const cn = (...classes) => classes.filter(Boolean).join(" ");


// // ─── Hero Section ─────────────────────────────────────────────────────────────
// const creatorTiles = [
//   { name: "Cara App", emoji: "🎨", bg: "bg-purple-100", supporters: "12.4k" },
//   { name: "Kaleigh Cohen", emoji: "✍️", bg: "bg-blue-100", supporters: "8.2k" },
//   { name: "Teacher Stefano", emoji: "📚", bg: "bg-green-100", supporters: "5.7k" },
//   { name: "Hazel Idgal", emoji: "🎵", bg: "bg-pink-100", supporters: "3.1k" },
//   { name: "Beach Talk Radio", emoji: "🎙️", bg: "bg-orange-100", supporters: "9.8k" },
//   { name: "Simple Politics", emoji: "🗳️", bg: "bg-teal-100", supporters: "21k" },
// ];

// export default function HeroSection() {
//   return (
//     <section className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-white flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
//       {/* Badge */}
//       <div
//         className="mb-6 inline-flex items-center gap-2 bg-white border border-yellow-200 rounded-full px-4 py-1.5 text-sm font-semibold text-yellow-700 shadow-sm"
//         style={{ animation: "fadeDown 0.6s ease-out both" }}
//       >
//         <span>❤️</span> Loved by 2,000,000+ creators
//       </div>

//       {/* Headline */}
//       <h1
//         className="text-5xl md:text-7xl font-black text-gray-900 text-center leading-tight max-w-3xl mb-6"
//         style={{ animation: "fadeDown 0.7s 0.1s ease-out both" }}
//       >
//         Fund your{" "}
//         <span className="relative inline-block">
//           creative
//           <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
//             <path d="M2 9 Q75 2 150 9 Q225 16 298 9" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
//           </svg>
//         </span>{" "}
//         work
//       </h1>

//       <p
//         className="text-lg text-gray-500 text-center max-w-lg mb-10"
//         style={{ animation: "fadeDown 0.7s 0.2s ease-out both" }}
//       >
//         Accept support. Start a membership. Setup a shop.{" "}
//         <span className="text-gray-800 font-semibold">It's easier than you think.</span>
//       </p>

//       {/* CTA */}
//       <div
//         className="flex flex-col items-center gap-2 mb-16"
//         style={{ animation: "fadeDown 0.7s 0.3s ease-out both" }}
//       >
//         <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-10 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-yellow-300/60 shadow-lg">
//           ☕ Start my page
//         </button>
//         <span className="text-xs text-gray-400">It's free and takes less than a minute!</span>
//       </div>

//       {/* Creator Tiles Grid */}
//       <div
//         className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-3xl w-full"
//         style={{ animation: "fadeUp 0.8s 0.4s ease-out both" }}
//       >
//         {creatorTiles.map((tile, i) => (
//           <div
//             key={i}
//             className={cn(
//               "group cursor-pointer rounded-2xl p-4 flex flex-col items-center gap-2 border border-white/60",
//               "hover:scale-110 hover:shadow-lg transition-all duration-200",
//               tile.bg
//             )}
//             style={{ animationDelay: `${i * 60}ms` }}
//           >
//             <span className="text-2xl">{tile.emoji}</span>
//             <span className="text-xs font-bold text-gray-700 text-center leading-tight">{tile.name}</span>
//             <span className="text-xs text-gray-500">{tile.supporters}</span>
//           </div>
//         ))}
//       </div>

//       <style>{`
//         @keyframes fadeDown {
//           from { opacity: 0; transform: translateY(-20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </section>
//   );
// }

// ==========================================

// "use client";
// import { useState, useEffect, useRef } from "react";

// // ─── Utility: simple cn helper ───────────────────────────────────────────────
// const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(" ");

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface CreatorTile {
//   name: string;
//   emoji: string;
//   bg: string;
//   supporters: string;
// }

// interface HeroSectionProps {
//   locale?: "en" | "ar";
// }

// // ─── Translations ─────────────────────────────────────────────────────────────
// const t = {
//   en: {
//     badge: "Loved by 2,000,000+ creators",
//     headline_1: "Fund your",
//     headline_word: "creative",
//     headline_2: "work",
//     subtext: "Accept support. Start a membership. Setup a shop.",
//     subtext_bold: "It's easier than you think.",
//     cta: "☕ Start my page",
//     cta_sub: "It's free and takes less than a minute!",
//   },
//   ar: {
//     badge: "يثق بنا أكثر من 2,000,000 مبدع",
//     headline_1: "موّل",
//     headline_word: "إبداعك",
//     headline_2: "",
//     subtext: "استقبل الدعم. ابدأ اشتراكاً. أنشئ متجرك.",
//     subtext_bold: "أسهل مما تتخيل.",
//     cta: "☕ ابدأ صفحتك",
//     cta_sub: "مجاني تماماً ولا يستغرق دقيقة!",
//   },
// };

// // ─── Creator Tiles ─────────────────────────────────────────────────────────────
// const creatorTiles: CreatorTile[] = [
//   { name: "Cara App",        emoji: "🎨", bg: "bg-purple-100", supporters: "12.4k" },
//   { name: "Kaleigh Cohen",   emoji: "✍️", bg: "bg-blue-100",   supporters: "8.2k"  },
//   { name: "Teacher Stefano", emoji: "📚", bg: "bg-green-100",  supporters: "5.7k"  },
//   { name: "Hazel Idgal",     emoji: "🎵", bg: "bg-pink-100",   supporters: "3.1k"  },
//   { name: "Beach Talk Radio",emoji: "🎙️", bg: "bg-orange-100", supporters: "9.8k"  },
//   { name: "Simple Politics", emoji: "🗳️", bg: "bg-teal-100",   supporters: "21k"   },
// ];

// // ─── Component ────────────────────────────────────────────────────────────────
// export default function HeroSection({ locale = "en" }: HeroSectionProps) {
//   const isAr = locale === "ar";
//   const copy = t[locale];

//   return (
//     <section
//       dir={isAr ? "rtl" : "ltr"}
//       className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-white flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
//     >
//       {/* Badge */}
//       <div
//         className="mb-6 inline-flex items-center gap-2 bg-white border border-yellow-200 rounded-full px-4 py-1.5 text-sm font-semibold text-yellow-700 shadow-sm"
//         style={{ animation: "fadeDown 0.6s ease-out both" }}
//       >
//         <span>❤️</span> {copy.badge}
//       </div>

//       {/* Headline */}
//       <h1
//         className="text-5xl md:text-7xl font-black text-gray-900 text-center leading-tight max-w-3xl mb-6"
//         style={{ animation: "fadeDown 0.7s 0.1s ease-out both" }}
//       >
//         {copy.headline_1}{" "}
//         <span className="relative inline-block">
//           {copy.headline_word}
//           <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
//             <path d="M2 9 Q75 2 150 9 Q225 16 298 9" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
//           </svg>
//         </span>
//         {copy.headline_2 ? <> {copy.headline_2}</> : null}
//       </h1>

//       {/* Subtext */}
//       <p
//         className="text-lg text-gray-500 text-center max-w-lg mb-10"
//         style={{ animation: "fadeDown 0.7s 0.2s ease-out both" }}
//       >
//         {copy.subtext}{" "}
//         <span className="text-gray-800 font-semibold">{copy.subtext_bold}</span>
//       </p>

//       {/* CTA */}
//       <div
//         className="flex flex-col items-center gap-2 mb-16"
//         style={{ animation: "fadeDown 0.7s 0.3s ease-out both" }}
//       >
//         <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-10 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-yellow-300/60 shadow-lg">
//           {copy.cta}
//         </button>
//         <span className="text-xs text-gray-400">{copy.cta_sub}</span>
//       </div>

//       {/* Creator Tiles Grid */}
//       <div
//         className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-3xl w-full"
//         style={{ animation: "fadeUp 0.8s 0.4s ease-out both" }}
//       >
//         {creatorTiles.map((tile, i) => (
//           <div
//             key={i}
//             className={cn(
//               "group cursor-pointer rounded-2xl p-4 flex flex-col items-center gap-2 border border-white/60",
//               "hover:scale-110 hover:shadow-lg transition-all duration-200",
//               tile.bg
//             )}
//             style={{ animationDelay: `${i * 60}ms` }}
//           >
//             <span className="text-2xl">{tile.emoji}</span>
//             <span className="text-xs font-bold text-gray-700 text-center leading-tight">{tile.name}</span>
//             <span className="text-xs text-gray-500">{tile.supporters}</span>
//           </div>
//         ))}
//       </div>

//       <style>{`
//         @keyframes fadeDown {
//           from { opacity: 0; transform: translateY(-20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </section>
//   );
// }




// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";

// const floatingCards = [
//   { name: "Ahmed", amount: "50", emoji: "🎨", pos: "top-[18%] left-[6%]", delay: 0.6 },
//   { name: "Sara", amount: "100", emoji: "🎵", pos: "top-[12%] right-[7%]", delay: 0.8 },
//   { name: "Omar", amount: "25", emoji: "🎮", pos: "bottom-[22%] left-[4%]", delay: 1.0 },
//   { name: "Nour", amount: "75", emoji: "📚", pos: "bottom-[18%] right-[5%]", delay: 1.2 },
// ];

// export default function HeroSection({ locale }: { locale: string }) {
//   const isAr = locale === "ar";

//   return (
//     <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-[#FAFAF8] overflow-hidden">
//       <div className="absolute inset-0 pointer-events-none">
//         {floatingCards.map((card) => (
//           <motion.div
//             key={card.name}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: card.delay, duration: 0.5 }}
//             className={`absolute ${card.pos} hidden lg:block`}
//           >
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
//               <span className="text-xl">{card.emoji}</span>
//               <div className="text-start">
//                 <p className="text-sm font-semibold text-[#1E1E1E]">{card.name}</p>
//                 <p className="text-xs text-[#1E1E1E]/50">sent {card.amount} EGP ☕</p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 28 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.55 }}
//         className="relative z-10 max-w-3xl"
//       >
//         <div className="inline-flex items-center gap-2 bg-orange/10 text-orange border border-orange/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
//           ☕ {isAr ? "منصة المبدعين العرب الأولى" : "The First Arab Creator Platform"}
//         </div>

//         <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#1E1E1E] leading-[1.08] tracking-tight mb-6">
//           {isAr ? (
//             <>احصل على دعم جمهورك<br /><span className="text-orange">بالطريقة العربية.</span></>
//           ) : (
//             <>Fund your creative work<br /><span className="text-orange">the Arab way.</span></>
//           )}
//         </h1>

//         <p className="text-[#1E1E1E]/60 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
//           {isAr
//             ? "كوبشاي بيخلي جمهورك يبعتلك كوباية شاي ☕ — دعم مباشر بالجنيه المصري، بدون رسوم دولية."
//             : "Cupshai lets your fans send you a cup of shai ☕ — support you directly in EGP, no international fees."
//           }
//         </p>

//         <div className="flex flex-wrap gap-4 justify-center">
//           <Link
//             href={`/${locale}`}
//             className="bg-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 hover:-translate-y-0.5"
//           >
//             {isAr ? "ابدأ صفحتك" : "Start your page"}
//           </Link>
//         </div>

//         <p className="text-[#1E1E1E]/35 text-sm mt-5">
//           {isAr ? "مجاني تماماً • بدون بطاقة بنكية" : "It's free and takes less than a minute"}
//         </p>
//       </motion.div>
//     </section>
//   );
// }
// ==========================================


"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const floatingCards = [
  { name: "Ahmed", nameAr: "أحمد", amount: "50", emoji: "🎨", pos: "top-[18%] left-[6%]", delay: 0.6 },
  { name: "Sara", nameAr: "سارة", amount: "100", emoji: "🎵", pos: "top-[12%] right-[7%]", delay: 0.8 },
  { name: "Omar", nameAr: "عمر", amount: "25", emoji: "🎮", pos: "bottom-[22%] left-[4%]", delay: 1.0 },
  { name: "Nour", nameAr: "نور", amount: "75", emoji: "📚", pos: "bottom-[18%] right-[5%]", delay: 1.2 },
];

export default function HeroSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-[#FAFAF8] overflow-hidden"
    >
      {/* Floating Cards */}
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
              <div className={isAr ? "text-end" : "text-start"}>
                <p className="text-sm font-semibold text-[#1E1E1E]">
                  {isAr ? card.nameAr : card.name}
                </p>
                <p className="text-xs text-[#1E1E1E]/50">
                  {isAr ? `أرسل ${card.amount} جنيه ☕` : `sent ${card.amount} EGP ☕`}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 max-w-3xl"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange/10 text-orange border border-orange/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
          ☕ {isAr ? "منصة المبدعين العرب الأولى" : "The First Arab Creator Platform"}
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#1E1E1E] leading-[1.08] tracking-tight mb-6">
          {isAr ? (
            <>احصل على دعم جمهورك<br /><span className="text-orange">بالطريقة العربية.</span></>
          ) : (
            <>Fund your creative work<br /><span className="text-orange">the Arab way.</span></>
          )}
        </h1>

        {/* Subtext */}
        <p className="text-[#1E1E1E]/60 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          {isAr
            ? "كوبشاي بيخلي جمهورك يبعتلك كوباية شاي ☕ — دعم مباشر بالجنيه المصري، بدون رسوم دولية."
            : "Cupshai lets your fans send you a cup of shai ☕ — support you directly in EGP, no international fees."
          }
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={`/${locale}/signup`}
            className="bg-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-orange/90 transition-all shadow-lg shadow-orange/20 hover:-translate-y-0.5"
          >
            {isAr ? "ابدأ صفحتك" : "Start your page"}
          </Link>
        </div>

        {/* Sub CTA */}
        <p className="text-[#1E1E1E]/35 text-sm mt-5">
          {isAr ? "مجاني تماماً • بدون بطاقة بنكية" : "It's free and takes less than a minute"}
        </p>
      </motion.div>
    </section>
  );
}
