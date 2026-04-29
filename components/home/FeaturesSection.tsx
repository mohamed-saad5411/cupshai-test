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


// // ─── Features Section ─────────────────────────────────────────────────────────
// const features = [
//   { icon: "👥", title: "Supporters, not customers", desc: "We never call them customers. They are your supporters, and you have 100% ownership." },
//   { icon: "⚡", title: "Get paid instantly", desc: "Payments go straight to your bank account. No more 30-day delays." },
//   { icon: "🔒", title: "Your privacy first", desc: "Receive fan support safely without disclosing your identity or address." },
//   { icon: "📧", title: "Free email marketing", desc: "Send unlimited emails to your fans without paying extra for tools like Mailchimp." },
//   { icon: "🌍", title: "6 new languages", desc: "Support in Spanish, French, Italian, German, and Ukrainian for your global audience." },
//   { icon: "🤝", title: "Real human support", desc: "Talk to a human for help, or just get advice on how to hit the ground running." },
// ];

// export default function FeaturesSection() {
//   return (
//     <section className="py-24 px-4 bg-gray-900 text-white">
//       <div className="max-w-6xl mx-auto">
//         <FadeUp className="text-center mb-14">
//           <h2 className="text-4xl font-black mb-4">
//             Designed for creators,{" "}
//             <span className="text-yellow-400">not for businesses.</span>
//           </h2>
//           <p className="text-gray-400 text-lg max-w-xl mx-auto">
//             Make 20% more compared to other platforms — with tools built around your creative needs.
//           </p>
//         </FadeUp>

//         <div className="grid md:grid-cols-3 gap-6">
//           {features.map((f, i) => (
//             <FadeUp key={i} delay={i * 80}>
//               <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:border-yellow-400/30 group">
//                 <span className="text-3xl mb-4 block">{f.icon}</span>
//                 <h3 className="font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">
//                   {f.title}
//                 </h3>
//                 <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useEffect, useRef, useState } from "react";

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
    heading:    "Designed for creators,",
    headingAcc: "not for businesses.",
    subtext:    "Make 20% more compared to other platforms — with tools built around your creative needs.",
  },
  ar: {
    heading:    "مصمم للمبدعين،",
    headingAcc: "وليس للشركات.",
    subtext:    "اكسب 20% أكثر مقارنة بالمنصات الأخرى — بأدوات مبنية حول احتياجاتك الإبداعية.",
  },
};

// ─── Features Data ────────────────────────────────────────────────────────────
const features = [
  {
    icon: "👥",
    title:   "Supporters, not customers",
    titleAr: "داعمون، وليس عملاء",
    desc:    "We never call them customers. They are your supporters, and you have 100% ownership.",
    descAr:  "لا نسميهم عملاء أبداً. هم داعموك، وأنت تملكهم بنسبة 100%.",
  },
  {
    icon: "⚡",
    title:   "Get paid instantly",
    titleAr: "استلم أموالك فوراً",
    desc:    "Payments go straight to your bank account. No more 30-day delays.",
    descAr:  "تذهب المدفوعات مباشرة إلى حسابك البنكي. لا مزيد من تأخير 30 يوماً.",
  },
  {
    icon: "🔒",
    title:   "Your privacy first",
    titleAr: "خصوصيتك أولاً",
    desc:    "Receive fan support safely without disclosing your identity or address.",
    descAr:  "استقبل دعم جمهورك بأمان دون الكشف عن هويتك أو عنوانك.",
  },
  {
    icon: "📧",
    title:   "Free email marketing",
    titleAr: "تسويق بالبريد مجاناً",
    desc:    "Send unlimited emails to your fans without paying extra for tools like Mailchimp.",
    descAr:  "أرسل رسائل بريدية غير محدودة لجمهورك دون دفع مقابل أدوات مثل Mailchimp.",
  },
  {
    icon: "🌍",
    title:   "6 new languages",
    titleAr: "6 لغات جديدة",
    desc:    "Support in Spanish, French, Italian, German, and Ukrainian for your global audience.",
    descAr:  "دعم للإسبانية والفرنسية والإيطالية والألمانية والأوكرانية لجمهورك العالمي.",
  },
  {
    icon: "🤝",
    title:   "Real human support",
    titleAr: "دعم بشري حقيقي",
    desc:    "Talk to a human for help, or just get advice on how to hit the ground running.",
    descAr:  "تحدث مع شخص حقيقي للمساعدة، أو احصل على نصيحة للبدء بثقة.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function FeaturesSection({ locale = "en" }: { locale?: "en" | "ar" }) {
  const isAr = locale === "ar";
  const copy = t[locale];

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="py-24 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="text-center mb-14">
          <h2 className="text-4xl font-black mb-4">
            {copy.heading}{" "}
            <span className="text-yellow-400">{copy.headingAcc}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{copy.subtext}</p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:border-yellow-400/30 group">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {isAr ? f.titleAr : f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {isAr ? f.descAr : f.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
