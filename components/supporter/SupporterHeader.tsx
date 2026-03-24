"use client";
import { useTranslations, useLocale } from "next-intl";
import { BADGES, mockSupporter } from "./constants";

export default function SupporterHeader() {
  const t = useTranslations("supporter");
  const tc = useTranslations("creator");
  const locale = useLocale();
  const isAr = locale === "ar";

  const supporterName = isAr ? mockSupporter.nameAr : mockSupporter.name;

  return (
    <div className="bg-dark text-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-orange/20 border-3 border-orange flex items-center justify-center text-3xl shrink-0">
            {supporterName[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{supporterName}</h1>
            <p className="text-cream/60 text-sm mt-0.5">
              {t("memberSince")} {new Date(mockSupporter.joinedDate).toLocaleDateString(isAr ? "ar-EG" : "en-US", { month: "long", year: "numeric" })}
            </p>
            <div className="flex gap-1.5 mt-2">
              {BADGES.filter(b => mockSupporter.unlockedBadges.includes(b.type)).map(b => (
                <div
                  key={b.type}
                  className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm"
                  title={t(`badge_${b.type}`)}
                >
                  {b.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-orange">{mockSupporter.totalSpent}</p>
            <p className="text-cream/50 text-xs mt-0.5">{t("totalSpent")} ({tc("egp")})</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-teal">{mockSupporter.totalTips}</p>
            <p className="text-cream/50 text-xs mt-0.5">{t("totalTips")}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-cream">{mockSupporter.supportedCreators.length}</p>
            <p className="text-cream/50 text-xs mt-0.5">{t("creatorsSupported")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
