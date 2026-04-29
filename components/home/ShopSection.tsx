// import { useState, useEffect, useRef } from "react";

// // ─── Utility: simple cn helper ───────────────────────────────────────────────
// const cn = (...classes) => classes.filter(Boolean).join(" ");

// // ─── useInView hook ───────────────────────────────────────────────────────────
// function useInView(threshold = 0.15) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setInView(true); },
//       { threshold }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, [threshold]);
//   return [ref, inView];
// }

// // ─── FadeUp wrapper ───────────────────────────────────────────────────────────
// function FadeUp({ children, delay = 0, className = "" }) {
//   const [ref, inView] = useInView();
//   return (
//     <div
//       ref={ref}
//       className={cn("transition-all duration-700 ease-out", className)}
//       style={{
//         transitionDelay: `${delay}ms`,
//         opacity: inView ? 1 : 0,
//         transform: inView ? "translateY(0)" : "translateY(32px)",
//       }}
//     >
//       {children}
//     </div>
//   );
// }




// // ─── Shop Section ─────────────────────────────────────────────────────────────
// export default function ShopSection() {
//   const [bought, setBought] = useState(false);

//   return (
//     <section className="py-24 px-4 bg-white">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
//         <FadeUp>
//           <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-600 bg-green-100 px-3 py-1 rounded-full mb-4">
//             Shop
//           </span>
//           <h2 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
//             Introducing Shop, the creative way to sell.
//           </h2>
//           <p className="text-gray-500 text-lg mb-6">
//             Whether it's a 1-1 Zoom call, art commissions, or an ebook — Shop is designed from the ground up with creators in mind.
//           </p>
//           <div className="flex gap-4">
//             {["📦 Digital files", "📞 1-on-1 calls", "🎨 Commissions"].map((f, i) => (
//               <span key={i} className="text-xs bg-gray-100 text-gray-700 font-semibold px-3 py-1.5 rounded-full">
//                 {f}
//               </span>
//             ))}
//           </div>
//         </FadeUp>

//         <FadeUp delay={150}>
//           <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 max-w-xs mx-auto">
//             <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl h-40 flex items-center justify-center mb-4 text-5xl">
//               📄
//             </div>
//             <div className="flex items-start justify-between mb-2">
//               <div>
//                 <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">PDF</p>
//                 <h4 className="font-black text-gray-900">Design E-Book</h4>
//               </div>
//               <span className="text-xl font-black text-gray-900">$20</span>
//             </div>
//             <div className="flex items-center gap-1 mb-4">
//               {[...Array(5)].map((_, i) => (
//                 <span key={i} className={i < 4 ? "text-yellow-400" : "text-gray-200"}>★</span>
//               ))}
//               <span className="text-xs text-gray-400 ml-1">4.9 (36)</span>
//             </div>
//             <button
//               onClick={() => { setBought(true); setTimeout(() => setBought(false), 2000); }}
//               className={cn(
//                 "w-full py-3 rounded-xl font-black text-sm transition-all duration-300",
//                 bought
//                   ? "bg-green-400 text-white"
//                   : "bg-gray-900 hover:bg-gray-700 text-white hover:scale-105"
//               )}
//             >
//               {bought ? "✓ Added!" : "Buy — One tap checkout"}
//             </button>
//             <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
//               <span>🛒 753 sales</span>
//               <span>💰 $244 earned</span>
//             </div>
//           </div>
//         </FadeUp>
//       </div>
//     </section>
//   );
// }


"use client";
import { useState, useEffect, useRef } from "react";

// ─── Utility ──────────────────────────────────────────────────────────────────
const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

// ─── FadeUp ───────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-out", className)}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Translations ─────────────────────────────────────────────────────────────
const t = {
  en: {
    badge:    "Shop",
    heading:  "Introducing Shop, the creative way to sell.",
    subtext:  "Whether it's a 1-1 Zoom call, art commissions, or an ebook — Shop is designed from the ground up with creators in mind.",
    tags:     ["📦 Digital files", "📞 1-on-1 calls", "🎨 Commissions"],
    product:  "Design E-Book",
    buyBtn:   "Buy — One tap checkout",
    addedBtn: "✓ Added!",
    sales:    "🛒 753 sales",
    earned:   "💰 $244 earned",
  },
  ar: {
    badge:    "المتجر",
    heading:  "نقدم لك المتجر، الطريقة الإبداعية للبيع.",
    subtext:  "سواء كانت مكالمة زووم، عمولات فنية، أو كتاب إلكتروني — المتجر مصمم خصيصاً للمبدعين.",
    tags:     ["📦 ملفات رقمية", "📞 مكالمات فردية", "🎨 عمولات"],
    product:  "كتاب التصميم",
    buyBtn:   "اشتري — دفع بنقرة واحدة",
    addedBtn: "✓ تمت الإضافة!",
    sales:    "🛒 753 مبيعة",
    earned:   "💰 244$ مكتسبة",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ShopSection({ locale = "en" }: { locale?: "en" | "ar" }) {
  const [bought, setBought] = useState(false);

  const isAr = locale === "ar";
  const copy = t[locale];

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        <FadeUp>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-600 bg-green-100 px-3 py-1 rounded-full mb-4">
            {copy.badge}
          </span>
          <h2 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
            {copy.heading}
          </h2>
          <p className="text-gray-500 text-lg mb-6">{copy.subtext}</p>
          <div className="flex gap-4 flex-wrap">
            {copy.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-700 font-semibold px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={150}>
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 max-w-xs mx-auto">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl h-40 flex items-center justify-center mb-4 text-5xl">
              📄
            </div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">PDF</p>
                <h4 className="font-black text-gray-900">{copy.product}</h4>
              </div>
              <span className="text-xl font-black text-gray-900">$20</span>
            </div>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < 4 ? "text-yellow-400" : "text-gray-200"}>★</span>
              ))}
              <span className="text-xs text-gray-400 ms-1">4.9 (36)</span>
            </div>
            <button
              // onClick={() => { setBought(true); setTimeout(() => setBought(false), 2000); }}
              className={cn(
                "w-full py-3 rounded-xl font-black text-sm transition-all duration-300",
                bought
                  ? "bg-green-400 text-white"
                  : "bg-gray-900  text-white "
              )}
            >
              {bought ? copy.addedBtn : copy.buyBtn}
            </button>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
              <span>{copy.sales}</span>
              <span>{copy.earned}</span>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
