"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { BADGES, UNLOCK_TIERS } from "./constants";

interface PostTipSignupProps {
  fanName: string;
  onReset: () => void;
}

export default function PostTipSignup({ fanName, onReset }: PostTipSignupProps) {
  const t = useTranslations("supporter");
  const tc = useTranslations("creator");
  const locale = useLocale();
  const isAr = locale === "ar";

  const [signupEmail, setSignupEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!signupEmail) return;
    setSignupLoading(true);
    try {
      const res = await fetch("/api/supporter/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupEmail,
          name: signupName || fanName || (isAr ? "داعم" : "Supporter"),
        }),
      });
      if (res.ok) {
        setSignupDone(true);
      }
    } catch {
      // Silently handle
    }
    setSignupLoading(false);
  }

  if (signupDone) {
    return (
      <div className="text-center py-6">
        <div className="text-5xl mb-3">🎉</div>
        <p className="font-bold text-dark text-lg">{t("welcomeTitle")}</p>
        <p className="text-dark/60 text-sm mt-2 leading-relaxed">{t("welcomeSub")}</p>

        <div className="mt-5 bg-orange/5 border border-orange/20 rounded-xl p-4">
          <div className="text-3xl mb-1">☕</div>
          <p className="font-bold text-orange text-sm">{t("firstBadge")}</p>
          <p className="text-dark/50 text-xs mt-0.5">{t("firstBadgeSub")}</p>
        </div>

        <Link
          href={`/${locale}/supporter`}
          className="mt-4 inline-block bg-orange text-white font-bold py-2.5 px-6 rounded-xl hover:bg-orange/90 transition-colors text-sm"
        >
          {t("viewProfile")}
        </Link>

        <button
          onClick={() => { setSignupDone(false); onReset(); }}
          className="block mx-auto mt-2 text-teal text-sm hover:underline"
        >
          {isAr ? "أرسل مرة أخرى" : "Send again"}
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <div className="text-5xl mb-3">☕</div>
      <p className="font-bold text-dark text-lg">{t("thankYou")}</p>
      <p className="text-dark/60 text-sm mt-1">{t("thankYouSub")}</p>

      <div className="mt-6 bg-cream rounded-xl p-4 text-start">
        <p className="font-bold text-dark text-sm mb-1">{t("createAccount")}</p>
        <p className="text-dark/50 text-xs mb-3">{t("createAccountSub")}</p>

        <div className="space-y-2 mb-4">
          {UNLOCK_TIERS.map((tier, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="text-teal">
                {tier.amount === 0 ? "✓" : `🔒 ${tier.amount} ${tc("egp")}`}
              </span>
              <span className="text-dark/70">{isAr ? tier.labelAr : tier.label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-1.5 mb-4">
          {BADGES.slice(0, 4).map((b) => (
            <div
              key={b.type}
              className="w-8 h-8 rounded-full bg-white border border-gray-light flex items-center justify-center text-sm"
            >
              {b.icon}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full bg-white border border-gray-light flex items-center justify-center text-xs text-dark/40">
            +{BADGES.length - 4}
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-2.5">
          <input
            type="email"
            required
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className="w-full border border-gray-light rounded-lg px-3 py-2 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
          />
          <input
            type="text"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            placeholder={t("namePlaceholder")}
            className="w-full border border-gray-light rounded-lg px-3 py-2 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
          />
          <button
            type="submit"
            disabled={signupLoading}
            className="w-full bg-orange text-white font-bold py-2.5 rounded-lg hover:bg-orange/90 transition-colors text-sm disabled:opacity-50"
          >
            {signupLoading ? "..." : t("signupButton")}
          </button>
        </form>
      </div>

      <button
        onClick={onReset}
        className="mt-3 text-dark/40 text-xs hover:text-dark/60 transition-colors"
      >
        {t("skipForNow")}
      </button>
    </div>
  );
}
