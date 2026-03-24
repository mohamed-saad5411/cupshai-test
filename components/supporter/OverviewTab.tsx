"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { BADGES, DM_UNLOCK_AMOUNT, mockSupporter } from "./constants";

export default function OverviewTab() {
  const t = useTranslations("supporter");
  const tc = useTranslations("creator");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="space-y-6">
      {/* DM unlock — per creator */}
      <div className="bg-white border border-gray-light rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💬</span>
          <span className="font-bold text-dark text-sm">{t("dmFeature")}</span>
        </div>
        <p className="text-dark/40 text-xs mb-4">
          {isAr
            ? "ادعم مبدعك المفضل بـ 500 ج.م لفتح الرسائل المباشرة معه"
            : "Support a creator with 500 EGP to unlock DMs with them"}
        </p>
        <div className="space-y-3">
          {mockSupporter.supportedCreators.map((creator) => {
            const dmUnlocked = creator.totalGiven >= DM_UNLOCK_AMOUNT;
            const dmProgress = Math.min((creator.totalGiven / DM_UNLOCK_AMOUNT) * 100, 100);
            return (
              <div key={creator.username} className="bg-cream rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-dark text-xs font-semibold">{isAr ? creator.nameAr : creator.name}</span>
                  {dmUnlocked ? (
                    <span className="text-teal text-xs font-semibold bg-teal/10 px-2 py-0.5 rounded-full">{t("unlocked")}</span>
                  ) : (
                    <span className="text-dark/40 text-xs">{creator.totalGiven}/{DM_UNLOCK_AMOUNT} {tc("egp")}</span>
                  )}
                </div>
                <div className="w-full bg-gray-light rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${dmProgress}%`,
                      backgroundColor: dmUnlocked ? "#2DAA8F" : "#F0851D",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Creators supported */}
      <div>
        <h2 className="font-bold text-dark text-lg mb-3">{t("creatorsYouSupport")}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mockSupporter.supportedCreators.map((creator) => {
            const dmUnlocked = creator.totalGiven >= DM_UNLOCK_AMOUNT;
            return (
              <Link
                key={creator.username}
                href={`/${locale}/${creator.username}`}
                className="bg-white border border-gray-light rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="h-16" style={{ backgroundColor: creator.coverColor }} />
                <div className="p-4 -mt-5">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-white flex items-center justify-center text-lg shadow-sm mb-2">
                    ☕
                  </div>
                  <p className="font-bold text-dark text-sm group-hover:text-orange transition-colors">
                    {isAr ? creator.nameAr : creator.name}
                  </p>
                  <p className="text-dark/40 text-xs">{isAr ? creator.categoryAr : creator.category}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-light">
                    <span className="text-teal text-xs font-semibold">{creator.totalGiven} {tc("egp")}</span>
                    <span className="text-dark/30 text-xs">{creator.tips} {t("tips")}</span>
                  </div>
                  {dmUnlocked && (
                    <div className="mt-2 text-xs text-teal font-medium flex items-center gap-1">
                      <span>💬</span> {isAr ? "الرسائل مفتوحة" : "DM unlocked"}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Next badge preview */}
      <div className="bg-white border border-gray-light rounded-2xl p-5">
        <h3 className="font-bold text-dark text-sm mb-3">{t("nextBadge")}</h3>
        {(() => {
          const nextTipBadge = BADGES.find(
            b => b.thresholdType === "tips" && !mockSupporter.unlockedBadges.includes(b.type)
          );
          const nextSpentBadge = BADGES.find(
            b => b.thresholdType === "spent" && !mockSupporter.unlockedBadges.includes(b.type)
          );
          return (
            <div className="grid grid-cols-2 gap-3">
              {nextTipBadge && (
                <div className="flex items-center gap-3 bg-cream rounded-xl p-3">
                  <span className="text-2xl opacity-40">{nextTipBadge.icon}</span>
                  <div>
                    <p className="font-semibold text-dark text-xs">{t(`badge_${nextTipBadge.type}`)}</p>
                    <p className="text-dark/40 text-xs">
                      {mockSupporter.totalTips}/{nextTipBadge.threshold} {t("tips")}
                    </p>
                  </div>
                </div>
              )}
              {nextSpentBadge && (
                <div className="flex items-center gap-3 bg-cream rounded-xl p-3">
                  <span className="text-2xl opacity-40">{nextSpentBadge.icon}</span>
                  <div>
                    <p className="font-semibold text-dark text-xs">{t(`badge_${nextSpentBadge.type}`)}</p>
                    <p className="text-dark/40 text-xs">
                      {mockSupporter.totalSpent}/{nextSpentBadge.threshold} {tc("egp")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
