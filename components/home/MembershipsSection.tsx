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


// // ─── Memberships Section ──────────────────────────────────────────────────────
// const plans = [
//   {
//     name: "Basic",
//     price: 5,
//     color: "from-blue-400 to-cyan-400",
//     bg: "bg-blue-50",
//     perks: ["33% OFF all my eBooks", "Access to members-only Discord", "Exclusive posts and messages"],
//   },
//   {
//     name: "Pro",
//     price: 15,
//     color: "from-yellow-400 to-orange-400",
//     bg: "bg-yellow-50",
//     perks: ["Support on a monthly basis", "Email alert for new posts", "Exclusive posts and messages"],
//     featured: true,
//   },
//   {
//     name: "Advanced",
//     price: 25,
//     color: "from-purple-400 to-pink-400",
//     bg: "bg-purple-50",
//     perks: ["Monthly printable journal pages", "Email alert for new posts", "Work in progress updates"],
//   },
// ];

// export default function MembershipsSection() {
//   return (
//     <section className="py-24 px-4 bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <FadeUp className="text-center mb-14">
//           <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100 px-3 py-1 rounded-full mb-4">
//             Memberships
//           </span>
//           <h2 className="text-4xl font-black text-gray-900 mb-4">
//             Start a membership for your biggest fans.
//           </h2>
//           <p className="text-gray-500 max-w-xl mx-auto text-lg">
//             Earn recurring income by accepting monthly or yearly subscriptions.
//           </p>
//         </FadeUp>

//         <div className="grid md:grid-cols-3 gap-6">
//           {plans.map((plan, i) => (
//             <FadeUp key={i} delay={i * 100}>
//               <div
//                 className={cn(
//                   "rounded-3xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer",
//                   plan.featured
//                     ? "bg-white border-yellow-300 shadow-lg shadow-yellow-100"
//                     : "bg-white border-gray-100"
//                 )}
//               >
//                 {plan.featured && (
//                   <span className="inline-block text-xs font-bold bg-yellow-400 text-gray-900 px-3 py-1 rounded-full mb-4">
//                     ⭐ Most Popular
//                   </span>
//                 )}
//                 <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br mb-4", plan.color)} />
//                 <h3 className="text-xl font-black text-gray-900">{plan.name} membership</h3>
//                 <p className="text-3xl font-black text-gray-900 mt-2">
//                   ${plan.price}<span className="text-base font-normal text-gray-400">/month</span>
//                 </p>
//                 <ul className="mt-4 space-y-2 mb-6">
//                   {plan.perks.map((p, j) => (
//                     <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
//                       <span className="text-green-500 font-bold mt-0.5">✓</span> {p}
//                     </li>
//                   ))}
//                 </ul>
//                 <button
//                   className={cn(
//                     "w-full py-3 rounded-xl font-bold text-sm transition-all duration-200",
//                     plan.featured
//                       ? "bg-yellow-400 hover:bg-yellow-300 text-gray-900"
//                       : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                   )}
//                 >
//                   Join
//                 </button>
//               </div>
//             </FadeUp>
//           ))}
//         </div>

//         {/* Stats */}
//         <FadeUp delay={300} className="flex justify-center gap-12 mt-12">
//           <div className="text-center">
//             <p className="text-3xl font-black text-gray-900">286</p>
//             <p className="text-sm text-gray-400 font-medium">Members</p>
//           </div>
//           <div className="w-px bg-gray-200" />
//           <div className="text-center">
//             <p className="text-3xl font-black text-gray-900">$1,500</p>
//             <p className="text-sm text-gray-400 font-medium">Earned this month</p>
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
    badge: "Memberships",
    heading: "Start a membership for your biggest fans.",
    subtext: "Earn recurring income by accepting monthly or yearly subscriptions.",
    popular: "⭐ Most Popular",
    membership: "membership",
    month: "/month",
    join: "Join",
    members: "Members",
    earned: "Earned this month",
  },
  ar: {
    badge: "الاشتراكات",
    heading: "ابدأ اشتراكاً لأكبر المعجبين بك.",
    subtext: "اكسب دخلاً متكرراً عبر قبول الاشتراكات الشهرية أو السنوية.",
    popular: "⭐ الأكثر شيوعاً",
    membership: "عضوية",
    month: "/شهر",
    join: "انضم",
    members: "عضو",
    earned: "المكتسب هذا الشهر",
  },
};

// ─── Plans Data ───────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Basic", nameAr: "أساسي",
    price: 5,
    color: "from-blue-400 to-cyan-400",
    perks: ["33% OFF all my eBooks", "Access to members-only Discord", "Exclusive posts and messages"],
    perksAr: ["خصم 33% على كتبي", "الوصول لـ Discord الحصري", "منشورات ورسائل حصرية"],
  },
  {
    name: "Pro", nameAr: "برو",
    price: 15,
    color: "from-yellow-400 to-orange-400",
    perks: ["Support on a monthly basis", "Email alert for new posts", "Exclusive posts and messages"],
    perksAr: ["دعم شهري مستمر", "تنبيه بريدي للمنشورات الجديدة", "منشورات ورسائل حصرية"],
    featured: true,
  },
  {
    name: "Advanced", nameAr: "متقدم",
    price: 25,
    color: "from-purple-400 to-pink-400",
    perks: ["Monthly printable journal pages", "Email alert for new posts", "Work in progress updates"],
    perksAr: ["صفحات يومية قابلة للطباعة", "تنبيه بريدي للمنشورات الجديدة", "تحديثات الأعمال الجارية"],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function MembershipsSection({ locale = "en" }: { locale?: "en" | "ar" }) {
  const isAr = locale === "ar";
  const copy = t[locale];

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100 px-3 py-1 rounded-full mb-4">
            {copy.badge}
          </span>
          <h2 className="text-4xl font-black text-gray-900 mb-4">{copy.heading}</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">{copy.subtext}</p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div
                className={cn(
                  "rounded-3xl p-6 border transition-all duration-300 ",
                  plan.featured
                    ? "bg-white border-yellow-300 shadow-lg shadow-yellow-100"
                    : "bg-white border-gray-100"
                )}
              >
                {plan.featured && (
                  <span className="inline-block text-xs font-bold bg-yellow-400 text-gray-900 px-3 py-1 rounded-full mb-4">
                    {copy.popular}
                  </span>
                )}
                <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br mb-4", plan.color)} />
                <h3 className="text-xl font-black text-gray-900">
                  {isAr ? plan.nameAr : plan.name} {copy.membership}
                </h3>
                <p className="text-3xl font-black text-gray-900 mt-2">
                  ${plan.price}<span className="text-base font-normal text-gray-400">{copy.month}</span>
                </p>
                <ul className="mt-4 space-y-2 mb-6">
                  {(isAr ? plan.perksAr : plan.perks).map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 font-bold mt-0.5">✓</span> {p}
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    "w-full py-3 rounded-xl font-bold text-sm transition-all duration-200",
                    plan.featured
                      ? "bg-yellow-400  text-gray-900"
                      : "bg-gray-100  text-gray-700"
                  )}
                >
                  {copy.join}
                </button>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Stats */}
        <FadeUp delay={300} className="flex justify-center gap-12 mt-12">
          <div className="text-center">
            <p className="text-3xl font-black text-gray-900">286</p>
            <p className="text-sm text-gray-400 font-medium">{copy.members}</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-3xl font-black text-gray-900">$1,500</p>
            <p className="text-sm text-gray-400 font-medium">{copy.earned}</p>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
