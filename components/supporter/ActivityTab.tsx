"use client";
import { useTranslations, useLocale } from "next-intl";
import { BADGES, mockSupporter } from "./constants";

export default function ActivityTab() {
  const t = useTranslations("supporter");
  const tc = useTranslations("creator");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="space-y-3">
      {mockSupporter.recentActivity.map((item, i) => (
        <div key={i} className="bg-white border border-gray-light rounded-xl p-4 flex items-center gap-3">
          {item.type === "tip" ? (
            <>
              <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-lg shrink-0">
                ☕
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-dark text-sm">
                  <span className="font-semibold">{item.amount} {tc("egp")}</span>
                  {" "}{t("sentTo")}{" "}
                  <span className="font-semibold">{isAr ? item.creatorNameAr : item.creatorName}</span>
                </p>
                {item.message && (
                  <p className="text-dark/40 text-xs mt-0.5 truncate">&ldquo;{item.message}&rdquo;</p>
                )}
              </div>
              <span className="text-dark/30 text-xs shrink-0">
                {new Date(item.date).toLocaleDateString(isAr ? "ar-EG" : "en-US", { month: "short", day: "numeric" })}
              </span>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-lg shrink-0">
                {BADGES.find(b => b.type === item.badge)?.icon}
              </div>
              <div className="flex-1">
                <p className="text-dark text-sm">
                  {t("earnedBadge")}{" "}
                  <span className="font-semibold text-teal">{t(`badge_${item.badge}`)}</span>
                </p>
              </div>
              <span className="text-dark/30 text-xs shrink-0">
                {new Date(item.date).toLocaleDateString(isAr ? "ar-EG" : "en-US", { month: "short", day: "numeric" })}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
