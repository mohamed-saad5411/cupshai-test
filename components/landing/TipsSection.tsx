"use client";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

export default function TipsSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section className="py-28 px-4 bg-white">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp}>
          <span className="text-xs font-bold text-orange tracking-widest uppercase">
            {isAr ? "الدعم" : "Tips & Support"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E1E1E] mt-3 mb-5 leading-tight tracking-tight">
            {isAr
              ? <>امنح جمهورك طريقة سهلة<br />يقولوا بيها شكراً.</>
              : <>Give your audience<br />an easy way to say thanks.</>
            }
          </h2>
          <p className="text-[#1E1E1E]/60 text-lg leading-relaxed mb-6">
            {isAr
              ? "جمهورك يقدر يبعتلك كوباية شاي في ثواني. اختار المبالغ، استقبل رسائل، واتقبض فوراً."
              : "Your fans can send you a cup of shai in just a few taps. Set your own amounts, receive messages, and get paid instantly."
            }
          </p>
          <ul className="space-y-3">
            {(isAr
              ? ["اختار مبالغ الدعم اللي تناسبك", "استقبل رسائل شخصية من جمهورك", "اتقبض على حسابك البنكي فوراً"]
              : ["Set your own tip amounts", "Receive personal messages from fans", "Get paid to your bank account instantly"]
            ).map((point) => (
              <li key={point} className="flex items-center gap-3 text-[#1E1E1E]/70">
                <span className="w-5 h-5 rounded-full bg-teal/15 flex items-center justify-center shrink-0">
                  <span className="text-teal text-xs font-bold">✓</span>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.15 }}>
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 max-w-sm mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange/80 to-orange flex items-center justify-center text-2xl shadow-md">
                🎨
              </div>
              <div>
                <p className="font-bold text-[#1E1E1E] text-lg">Ahmed Creator</p>
                <p className="text-[#1E1E1E]/45 text-sm">Digital Artist • Cairo</p>
              </div>
            </div>

            <p className="text-[#1E1E1E]/65 text-sm font-medium mb-3">
              {isAr ? "ابعت كوباية شاي ☕" : "Buy Ahmed a cup of shai ☕"}
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: isAr ? "كشري" : "Koshari", amt: "40", icon: "🥘", selected: true },
                { label: isAr ? "زردة" : "Zardaa", amt: "100", icon: "🍵", selected: false },
                { label: isAr ? "براد" : "Barad", amt: "200", icon: "🫖", selected: false },
                { label: isAr ? "مخصوص" : "Custom", amt: "???", icon: "✨", selected: false },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className={`py-3 px-2 rounded-xl text-center border-2 cursor-pointer select-none ${
                    tier.selected ? "border-orange bg-orange/10" : "border-gray-200 text-[#1E1E1E]/60"
                  }`}
                >
                  <span className="text-lg">{tier.icon}</span>
                  {tier.amt !== "???" ? (
                    <>
                      <p className={`text-sm font-bold ${tier.selected ? "text-orange" : "text-[#1E1E1E]"}`}>
                        {tier.amt} EGP
                      </p>
                      <p className={`text-xs font-medium ${tier.selected ? "text-orange/70" : "text-[#1E1E1E]/45"}`}>
                        {tier.label}
                      </p>
                    </>
                  ) : (
                    <p className={`text-xs font-semibold mt-0.5 text-[#1E1E1E]/60`}>{tier.label}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-4 text-sm text-[#1E1E1E]/35">
              {isAr ? "اكتب رسالة (اختياري)..." : "Say something nice... (optional)"}
            </div>

            <button className="w-full bg-orange text-white font-bold py-3.5 rounded-xl text-base">
              {isAr ? "ابعت دعم ☕" : "Support Ahmed ☕"}
            </button>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-[#1E1E1E]/35 mb-3 font-medium">
                {isAr ? "آخر الداعمين" : "Recent supporters"}
              </p>
              <div className="space-y-2.5">
                {[
                  { name: "Omar", msg: isAr ? "استمر يا بطل 🔥" : "Keep it up! 🔥", amt: "50" },
                  { name: "Nour", msg: isAr ? "شغلك جميل جداً ❤️" : "Love your work! ❤️", amt: "25" },
                ].map((s) => (
                  <div key={s.name} className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-orange/10 flex items-center justify-center text-xs font-bold text-orange shrink-0 mt-0.5">
                      {s.name[0]}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#1E1E1E]">{s.name}</span>
                      <span className="text-xs text-[#1E1E1E]/35"> • {s.amt} EGP</span>
                      <p className="text-xs text-[#1E1E1E]/55">{s.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
