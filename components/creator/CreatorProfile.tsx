"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { mockCreator } from "./constants";

export default function CreatorProfile() {
  const t = useTranslations("creator");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [copied, setCopied] = useState(false);

  const creatorName = isAr ? mockCreator.nameAr : mockCreator.name;
  const bio = isAr ? mockCreator.bioAr : mockCreator.bio;
  const category = isAr ? mockCreator.categoryAr : mockCreator.category;

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex-1 w-[90%] mt-20">
      {/* Avatar */}
      <div className="w-28 h-28 rounded-full border-4 border-cream bg-orange/20 flex items-center justify-center text-4xl mb-4 shadow-lg">
        ☕
      </div>

      <h1 className="text-2xl font-bold text-dark">{creatorName}</h1>
      {mockCreator.founderNumber && (
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-orange/10 border border-orange/20 rounded-full">
          <span className="text-orange text-xs font-bold">
            {isAr ? `مؤسس #${mockCreator.founderNumber}` : `Founder #${mockCreator.founderNumber}`}
          </span>
        </div>
      )}
      <p className="text-teal font-medium text-sm mt-1">{category}</p>
      <p className="text-dark/70 mt-3 leading-relaxed max-w-lg">{bio}</p>

      {/* Share button */}
      <button
        onClick={handleCopy}
        className="mt-4 flex items-center gap-2 text-sm text-dark/50 hover:text-teal transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={2}>
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {copied ? t("copiedLink") : t("shareProfile")}
      </button>

      {/* Recent supporters */}
      <div className="mt-10">
        <h2 className="font-bold text-dark text-lg mb-4">{t("recentSupporters")}</h2>
        {mockCreator.recentSupporters.length === 0 ? (
          <div className="text-center py-10 text-dark/40">
            <div className="text-4xl mb-2">☕</div>
            <p>{t("noSupporters")}</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {mockCreator.recentSupporters.map((s, i) => (
              <li key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-light">
                <div className="w-9 h-9 rounded-full bg-orange/10 flex items-center justify-center text-sm font-bold text-orange">
                  {s.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-dark text-sm">{s.name}</span>
                  {s.message && <p className="text-dark/60 text-xs">{s.message}</p>}
                </div>
                <div className="ms-auto text-teal font-semibold text-sm">
                  {s.amount} {t("egp")}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
