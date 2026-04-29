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


// // ─── Support Widget Section ───────────────────────────────────────────────────
// const supporters = [
//   { name: "Cathy G", emoji: "☕", msg: "Love your work, keep it up!", amount: 1, reply: "Thanks Cathy! ❤️" },
//   { name: "Tony Steel", emoji: "☕☕☕", msg: "Have a coffee or three, cream AND sugar :)", amount: 3, reply: "Thanks Tony! ❤️" },
//   { name: "Alex", emoji: "☕×25", msg: "Incredible content, truly inspiring.", amount: 25, reply: "Thanks Alex! You're amazing 🙏" },
// ];

// export default function SupportSection() {
//   const [coffees, setCoffees] = useState(1);
//   const [message, setMessage] = useState("");
//   const [sent, setSent] = useState(false);

//   const handleSupport = () => {
//     if (message.trim()) { setSent(true); setTimeout(() => setSent(false), 2500); }
//   };

//   return (
//     <section className="py-24 px-4 bg-white">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
//         {/* Left */}
//         <FadeUp>
//           <span className="inline-block text-xs font-bold uppercase tracking-widest text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full mb-4">
//             Support
//           </span>
//           <h2 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
//             Give your audience an easy way to say thanks.
//           </h2>
//           <p className="text-gray-500 text-lg">
//             Buy Me a Coffee makes supporting fun and easy. In just a couple of taps, your fans can make the payment and leave a message.
//           </p>
//         </FadeUp>

//         {/* Right — Widget */}
//         <FadeUp delay={150}>
//           <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 max-w-sm mx-auto">
//             <div className="flex items-center gap-3 mb-5">
//               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-xl">
//                 ☕
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400">Buy</p>
//                 <p className="font-black text-gray-900">Juliet</p>
//               </div>
//               <p className="ml-auto text-2xl font-black text-yellow-500">a coffee</p>
//             </div>

//             {/* Coffee count */}
//             <div className="flex gap-2 mb-4">
//               {[1, 3, 5].map((n) => (
//                 <button
//                   key={n}
//                   onClick={() => setCoffees(n)}
//                   className={cn(
//                     "flex-1 py-2 rounded-xl font-bold text-sm transition-all duration-200",
//                     coffees === n
//                       ? "bg-yellow-400 text-gray-900 scale-105 shadow-md shadow-yellow-200"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   )}
//                 >
//                   {n === 1 ? "☕" : n === 3 ? "☕☕☕" : "×5"}
//                 </button>
//               ))}
//               <input
//                 type="number"
//                 min={1}
//                 value={coffees}
//                 onChange={(e) => setCoffees(Number(e.target.value))}
//                 className="w-14 text-center border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-yellow-400"
//               />
//             </div>

//             {/* Message */}
//             <textarea
//               rows={2}
//               placeholder="Say something nice... (optional)"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-yellow-400 mb-4 placeholder:text-gray-300"
//             />

//             {/* Button */}
//             <button
//               onClick={handleSupport}
//               className={cn(
//                 "w-full py-3 rounded-xl font-black text-sm transition-all duration-300",
//                 sent
//                   ? "bg-green-400 text-white scale-95"
//                   : "bg-yellow-400 hover:bg-yellow-300 text-gray-900 hover:scale-105 hover:shadow-lg shadow-yellow-200"
//               )}
//             >
//               {sent ? "✓ Thanks sent!" : `Support $${coffees * 3}`}
//             </button>

//             {/* Recent supporters */}
//             <div className="mt-5 space-y-3">
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Supporters</p>
//               {supporters.map((s, i) => (
//                 <div key={i} className="flex gap-2.5 items-start">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
//                     {s.name[0]}
//                   </div>
//                   <div className="bg-gray-50 rounded-2xl rounded-tl-none px-3 py-2 flex-1">
//                     <p className="text-xs font-bold text-gray-700">{s.name} <span className="font-normal text-gray-400">bought {s.amount > 1 ? `${s.amount} coffees` : "a coffee"}</span></p>
//                     <p className="text-xs text-gray-500 mt-0.5">{s.msg}</p>
//                   </div>
//                 </div>
//               ))}
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
    badge: "Support",
    heading: "Give your audience an easy way to say thanks.",
    subtext: "Buy Me a Coffee makes supporting fun and easy. In just a couple of taps, your fans can make the payment and leave a message.",
    buyLabel: "Buy",
    coffeeLabel: "a coffee",
    placeholder: "Say something nice... (optional)",
    supportBtn: (n: number) => `Support $${n * 3}`,
    sentBtn: "✓ Thanks sent!",
    recentLabel: "Recent Supporters",
    boughtOne: "bought a coffee",
    boughtMany: (n: number) => `bought ${n} coffees`,
  },
  ar: {
    badge: "الدعم",
    heading: "امنح جمهورك طريقة سهلة للشكر.",
    subtext: "كوبشاي بيخلي الدعم ممتع وسهل. بضغطتين، جمهورك يقدر يدعمك ويسيبلك رسالة.",
    buyLabel: "اشتري لـ",
    coffeeLabel: "قهوة",
    placeholder: "قول حاجة حلوة... (اختياري)",
    supportBtn: (n: number) => `ادعم بـ ${n * 3}$`,
    sentBtn: "✓ تم الإرسال!",
    recentLabel: "آخر الداعمين",
    boughtOne: "اشترى قهوة",
    boughtMany: (n: number) => `اشترى ${n} قهاوي`,
  },
};

// ─── Supporters Data ──────────────────────────────────────────────────────────
const supporters = [
  {
    name: "Cathy G", nameAr: "كاثي",
    msg: "Love your work, keep it up!", msgAr: "أحب عملك، استمر!",
    amount: 1,
  },
  {
    name: "Tony Steel", nameAr: "طوني",
    msg: "Have a coffee or three, cream AND sugar :)", msgAr: "خد قهوة أو تلاتة، بكريمة وسكر :)",
    amount: 3,
  },
  {
    name: "Alex", nameAr: "أليكس",
    msg: "Incredible content, truly inspiring.", msgAr: "محتوى رائع، ملهم حقاً.",
    amount: 25,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function SupportSection({ locale = "en" }: { locale?: "en" | "ar" }) {
  const [coffees, setCoffees] = useState(1);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const isAr = locale === "ar";
  const copy = t[locale];

  const handleSupport = () => {
    if (message.trim()) { setSent(true); setTimeout(() => setSent(false), 2500); }
  };

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left — Text */}
        <FadeUp>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full mb-4">
            {copy.badge}
          </span>
          <h2 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
            {copy.heading}
          </h2>
          <p className="text-gray-500 text-lg">
            {copy.subtext}
          </p>
        </FadeUp>

        {/* Right — Widget */}
        <FadeUp delay={150}>
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 max-w-sm mx-auto">

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-xl">
                ☕
              </div>
              <div>
                <p className="text-xs text-gray-400">{copy.buyLabel}</p>
                <p className="font-black text-gray-900">Juliet</p>
              </div>
              <p className="ms-auto text-2xl font-black text-yellow-500">{copy.coffeeLabel}</p>
            </div>

            {/* Coffee count */}
            <div className="flex gap-2 mb-4">
              {[1, 3, 5].map((n) => (
                <button
                  key={n}
                  className={cn(
                    "flex-1 py-2 rounded-xl font-bold text-sm transition-all duration-200",
                    coffees === n
                      ? "bg-yellow-400 text-gray-900 scale-105 shadow-md shadow-yellow-200"
                      : "bg-gray-100 text-gray-600 "
                  )}
                >
                  {n === 1 ? "☕" : n === 3 ? "☕☕☕" : "×5"}
                </button>
              ))}
              <input disabled
                type="number"
                min={1}
                value={1}
                className="w-14 text-center border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-yellow-400"
              />
            </div>

            {/* Message */}
            <textarea disabled
              rows={2}
              placeholder={copy.placeholder}
              value={message}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-yellow-400 mb-4 placeholder:text-gray-300"
            />

            {/* Button */}
            <button
              onClick={handleSupport}
              className={cn(
                "w-full py-3 rounded-xl font-black text-sm transition-all duration-300",
                sent
                  ? "bg-green-400 text-white scale-95"
                  : "bg-yellow-400  text-gray-900  shadow-yellow-200"
              )}
            >
              {sent ? copy.sentBtn : copy.supportBtn(coffees)}
            </button>

            {/* Recent Supporters */}
            <div className="mt-5 space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {copy.recentLabel}
              </p>
              {supporters.map((s, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                    {isAr ? s.nameAr[0] : s.name[0]}
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-none px-3 py-2 flex-1">
                    <p className="text-xs font-bold text-gray-700">
                      {isAr ? s.nameAr : s.name}{" "}
                      <span className="font-normal text-gray-400">
                        {s.amount === 1 ? copy.boughtOne : copy.boughtMany(s.amount)}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {isAr ? s.msgAr : s.msg}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
