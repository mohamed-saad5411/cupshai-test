"use client";
import { useTranslations } from "next-intl";
import { BADGES, mockSupporter } from "./constants";

export default function BadgesTab() {
  const t = useTranslations("supporter");
  const tc = useTranslations("creator");

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {BADGES.map((badge) => {
        const earned = mockSupporter.unlockedBadges.includes(badge.type);
        const progress = badge.thresholdType === "tips"
          ? Math.min((mockSupporter.totalTips / badge.threshold) * 100, 100)
          : Math.min((mockSupporter.totalSpent / badge.threshold) * 100, 100);

        return (
          <div
            key={badge.type}
            className={`bg-white border rounded-2xl p-5 text-center transition-all ${
              earned
                ? "border-orange/30 shadow-sm"
                : "border-gray-light opacity-60"
            }`}
          >
            <div className={`text-4xl mb-2 ${earned ? "" : "grayscale"}`}>
              {badge.icon}
            </div>
            <p className={`font-bold text-sm ${earned ? "text-dark" : "text-dark/40"}`}>
              {t(`badge_${badge.type}`)}
            </p>
            <p className="text-dark/30 text-xs mt-0.5">
              {badge.thresholdType === "tips"
                ? `${badge.threshold} ${t("tips")}`
                : `${badge.threshold} ${tc("egp")}`}
            </p>
            {!earned && (
              <div className="w-full bg-gray-light rounded-full h-1.5 mt-3">
                <div
                  className="h-1.5 rounded-full bg-orange/50 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            {earned && (
              <p className="text-teal text-xs font-semibold mt-2">{t("earned")}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
