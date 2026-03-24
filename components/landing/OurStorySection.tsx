"use client";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

export default function OurStorySection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section className="py-28 px-4 bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-xs font-bold text-teal tracking-widest uppercase">
            {isAr ? "قصتنا" : "Our Story"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E1E1E] mt-3 leading-tight tracking-tight">
            {isAr
              ? <>بنينا كوبشاي لأننا<br />عشنا المشكلة بنفسنا.</>
              : <>We built Cupshai because<br />we lived the problem ourselves.</>
            }
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div {...fadeUp} className="space-y-5">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-lg">🎬</span>
              </div>
              <div>
                <h3 className="font-bold text-[#1E1E1E] text-lg mb-1">
                  {isAr ? "كنا صنّاع أفلام" : "We were filmmakers"}
                </h3>
                <p className="text-[#1E1E1E]/60 leading-relaxed">
                  {isAr
                    ? "بدأنا مسيرتنا بشغف حقيقي لصناعة الأفلام. كانت الأفكار كتير، لكن التمويل كان دايماً العائق الأكبر."
                    : "We started with a genuine passion for making films. The ideas were endless — but funding was always the biggest obstacle."
                  }
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-lg">💼</span>
              </div>
              <div>
                <h3 className="font-bold text-[#1E1E1E] text-lg mb-1">
                  {isAr ? "اضطرينا نترك الشغف" : "We had to leave our passion"}
                </h3>
                <p className="text-[#1E1E1E]/60 leading-relaxed">
                  {isAr
                    ? "قلة التمويل خلتنا نضطر نشتغل في وظايف تانية عشان نعيش، وبالتدريج ابتعدنا عن إبداعنا وعن اللي بنحبه."
                    : "The lack of funding forced us to take other jobs to survive. Gradually, we drifted away from our craft and everything we loved doing."
                  }
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.15 }} className="space-y-5">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-lg">💡</span>
              </div>
              <div>
                <h3 className="font-bold text-[#1E1E1E] text-lg mb-1">
                  {isAr ? "قررنا نغير الواقع" : "We decided to change things"}
                </h3>
                <p className="text-[#1E1E1E]/60 leading-relaxed">
                  {isAr
                    ? "قررنا نبني المنصة اللي كنا محتاجينها — مكان يقدر فيه المبدع العربي يلاقي دعم مادي من جمهوره بسهولة وبالجنيه المصري."
                    : "We decided to build the platform we always needed — a place where Arab creators can receive financial support from their fans, easily, in EGP."
                  }
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-lg">🌍</span>
              </div>
              <div>
                <h3 className="font-bold text-[#1E1E1E] text-lg mb-1">
                  {isAr ? "هدفنا" : "Our goal"}
                </h3>
                <p className="text-[#1E1E1E]/60 leading-relaxed">
                  {isAr
                    ? "إن كل مبدع عربي يقدر يعمل اللي بيحبه في أي مكان، ويحقق الاستقرار المالي من جمهوره المحب."
                    : "Every Arab creator should be able to make what they love, anywhere, and achieve financial security through the support of their fans."
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.blockquote
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-16 border-l-4 border-orange pl-6 max-w-2xl mx-auto"
        >
          <p className="text-xl text-[#1E1E1E]/70 italic leading-relaxed">
            {isAr
              ? '"لو كان فيه منصة زي كوبشاي لما بدأنا، كنا استمرينا في صناعة أفلامنا."'
              : '"If a platform like Cupshai had existed when we started, we never would have stopped making films."'
            }
          </p>
          <footer className="mt-3 text-sm font-semibold text-orange">
            {isAr ? "— مؤسسو كوبشاي" : "— The Cupshai Founders"}
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
