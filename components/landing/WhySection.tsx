"use client";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

const items = [
  {
    icon: "💰",
    en: { title: "100% EGP Support", desc: "Receive support in Egyptian Pounds directly to your bank account. No currency conversion fees." },
    ar: { title: "جنيه مصري بالكامل", desc: "استقبل الدعم بالجنيه المصري مباشرة لحسابك البنكي. بدون رسوم تحويل عملة." },
  },
  {
    icon: "🌍",
    en: { title: "Arabic First", desc: "Full Arabic interface with RTL support. Your fans can use Cupshai in their language." },
    ar: { title: "عربي بالكامل", desc: "واجهة عربية كاملة مع دعم RTL. جمهورك يستخدم كوبشاي بلغتهم." },
  },
  {
    icon: "📱",
    en: { title: "Local Payments Coming", desc: "Fawry and Vodafone Cash support coming soon. No international card needed from your fans." },
    ar: { title: "وسائل دفع محلية قريباً", desc: "فوري وفودافون كاش قريباً. مش محتاج جمهورك يكون عنده كريدت كارد." },
  },
  {
    icon: "🎯",
    en: { title: "0% Fees at Launch", desc: "No platform fees at launch. Every pound your fans send goes straight to you." },
    ar: { title: "صفر رسوم عند الإطلاق", desc: "لا رسوم على المنصة عند الإطلاق. كل جنيه من جمهورك بيوصلك مباشرة." },
  },
];

export default function WhySection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section className="py-28 px-4 bg-[#1E1E1E] text-[#F8F5EE]">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-xs font-bold text-teal tracking-widest uppercase">
            {isAr ? "لماذا كوبشاي" : "Why Cupshai"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4 leading-tight tracking-tight">
            {isAr
              ? <>مصمم للمبدعين العرب،<br />مش للمنصات الأجنبية.</>
              : <>Designed for Arab creators,<br />not for global platforms.</>
            }
          </h2>
          <p className="text-[#F8F5EE]/45 text-lg max-w-md mx-auto">
            {isAr
              ? "باتريون وبيمي كوفي مش بتدعم الجنيه المصري ولا اللغة العربية. كوبشاي اتبنى خصيصاً ليك."
              : "Patreon and Buy Me a Coffee don't support EGP or Arabic. Cupshai was built specifically for you."
            }
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 bg-white/5 border border-white/8 rounded-2xl p-5 hover:border-teal/30 transition-colors"
            >
              <span className="text-2xl mt-0.5">{item.icon}</span>
              <div>
                <h3 className="font-bold text-[#F8F5EE] mb-1">
                  {isAr ? item.ar.title : item.en.title}
                </h3>
                <p className="text-[#F8F5EE]/50 text-sm leading-relaxed">
                  {isAr ? item.ar.desc : item.en.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
