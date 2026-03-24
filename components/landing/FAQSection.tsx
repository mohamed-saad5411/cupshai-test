"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

const faqs = [
  {
    en: {
      q: "What is Cupshai?",
      a: "Cupshai is a creator support platform built for Egypt and the Arab world. It lets your fans send you tips — a 'cup of shai' — directly in EGP, supporting you to keep doing what you love.",
    },
    ar: {
      q: "إيه هو كوبشاي؟",
      a: "كوبشاي منصة دعم للمبدعين مبنية لمصر والعالم العربي. بتخلي جمهورك يبعتلك 'كوباية شاي' — إكرامية مباشرة بالجنيه المصري، عشان تكمل في اللي بتحبه.",
    },
  },
  {
    en: {
      q: "How do I get paid?",
      a: "Tips go directly to your Egyptian bank account. No international transfers, no conversion fees — just EGP, straight to you.",
    },
    ar: {
      q: "إزاي هاتقبض؟",
      a: "الإكراميات بتروح مباشرة لحسابك البنكي المصري. مفيش تحويلات دولية، مفيش رسوم تحويل — جنيه مصري مباشرة ليك.",
    },
  },
  {
    en: {
      q: "Is Cupshai free to use?",
      a: "Yes — creating your Cupshai page is completely free. At launch, we're charging 0% platform fees so every pound from your fans goes straight to you.",
    },
    ar: {
      q: "كوبشاي مجاني؟",
      a: "أيوه — إنشاء صفحتك على كوبشاي مجاني تماماً. عند الإطلاق، هنكون بنأخد صفر رسوم على المنصة عشان كل جنيه من جمهورك يوصلك.",
    },
  },
  {
    en: {
      q: "What payment methods can my fans use?",
      a: "Currently Egyptian bank cards. Fawry and Vodafone Cash are coming soon so fans without cards can support you too.",
    },
    ar: {
      q: "إيه وسائل الدفع اللي جمهوري يقدر يستخدمها؟",
      a: "حالياً بطاقات البنوك المصرية. فوري وفودافون كاش قريباً عشان الجمهور اللي معهوش بطاقة يقدر يدعمك برضو.",
    },
  },
  {
    en: {
      q: "When is Cupshai launching?",
      a: "We're in early access right now. Sign up to claim your username and become a Founding Creator — you'll get exclusive benefits when we launch.",
    },
    ar: {
      q: "امتى كوبشاي هيتلاح؟",
      a: "احنا دلوقتي في مرحلة الوصول المبكر. سجل واحجز اسمك وبق مبدعاً مؤسساً — هتاخد مميزات حصرية لما نطلق.",
    },
  },
  {
    en: {
      q: "What types of creators can use Cupshai?",
      a: "Any creator — filmmakers, musicians, artists, educators, gamers, podcasters, writers. If you create content and have fans, Cupshai is for you.",
    },
    ar: {
      q: "أنهي أنواع المبدعين يقدروا يستخدموا كوبشاي؟",
      a: "أي مبدع — صنّاع أفلام، موسيقيين، فنانين، معلمين، لاعبين، بودكاسترز، كتّاب. لو بتعمل محتوى وعندك جمهور، كوبشاي ليك.",
    },
  },
];

export default function FAQSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-28 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="text-xs font-bold text-orange tracking-widest uppercase">FAQ</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E1E1E] mt-3 leading-tight tracking-tight">
            {isAr ? "أسئلة شائعة" : "Frequently asked questions"}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const item = isAr ? faq.ar : faq.en;
            const isOpen = open === i;

            return (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-start hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#1E1E1E] text-base">{item.q}</span>
                  <span className={`text-orange text-xl font-light transition-transform duration-200 shrink-0 ms-4 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[#1E1E1E]/60 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
