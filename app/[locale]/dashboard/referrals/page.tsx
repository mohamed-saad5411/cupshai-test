"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

const MOCK_CODE = "a1b2c3d4";

const MOCK_REFERRALS = [
  {
    id: "1",
    refereeType: "creator",
    status: "rewarded",
    rewardType: "commission_share",
    commissionEarned: 125,
    createdAt: "2026-03-10T12:00:00Z",
  },
  {
    id: "2",
    refereeType: "supporter",
    status: "completed",
    rewardType: "commission_share",
    commissionEarned: 50,
    createdAt: "2026-03-08T15:30:00Z",
  },
  {
    id: "3",
    refereeType: "creator",
    status: "pending",
    rewardType: "commission_share",
    commissionEarned: 0,
    createdAt: "2026-03-12T09:00:00Z",
  },
];

export default function ReferralsPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [copied, setCopied] = useState(false);

  const referralLink = `cupshai.com/join?ref=${MOCK_CODE}`;

  const stats = {
    total: MOCK_REFERRALS.length,
    creators: MOCK_REFERRALS.filter((r) => r.refereeType === "creator").length,
    fans: MOCK_REFERRALS.filter((r) => r.refereeType === "supporter").length,
    commissionEarned: MOCK_REFERRALS.reduce((sum, r) => sum + (r.commissionEarned || 0), 0),
  };

  function handleCopy() {
    navigator.clipboard.writeText(`https://${referralLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-dark mb-2">
        {isAr ? "برنامج الإحالة" : "Referral Program"}
      </h1>
      <p className="text-sm text-dark/50 mb-8">
        {isAr
          ? "ادعُ أي شخص واحصل على ٥٠٪ من عمولة المنصة من كل اللي يسجلوا من رابطك."
          : "Invite anyone and earn 50% of the platform commission from everyone who signs up via your link."}
      </p>

      {/* How it works */}
      <div className="bg-white rounded-2xl border border-gray-light p-5 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-bold text-dark mb-1">
          {isAr ? "احصل على ٥٠٪ من عمولة المنصة" : "Earn 50% of platform commission"}
        </h3>
        <p className="text-sm text-dark/50 mb-3">
          {isAr
            ? "لكل شخص يسجل من رابطك — سواء مبدع أو داعم — تاخد ٥٠٪ من العمولة اللي المنصة بتاخدها منهم لفترة محددة."
            : "For everyone who signs up via your link — creator or supporter — you earn 50% of the platform fee from their transactions for a limited period or amount."}
        </p>
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal/10 text-teal rounded-full text-xs font-semibold">
            {isAr ? "٥٠٪ من عمولة ٥٪" : "50% of 5% fee"}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange/10 text-orange rounded-full text-xs font-semibold">
            {isAr ? "لفترة محددة أو حد أقصى" : "Time-limited or capped"}
          </div>
        </div>
      </div>

      {/* Referral link card */}
      <div className="bg-white rounded-2xl border border-gray-light p-6 mb-8">
        <h2 className="text-lg font-bold text-dark mb-1">
          {isAr ? "رابط الإحالة الخاص بك" : "Your Referral Link"}
        </h2>
        <p className="text-sm text-dark/40 mb-4">
          {isAr
            ? "شارك هذا الرابط مع المبدعين والمتابعين."
            : "Share this link with creators and fans."}
        </p>

        <div className="flex items-center gap-3">
          <div className="flex-1 bg-cream border border-gray-light rounded-xl px-4 py-3 text-sm text-dark font-mono truncate">
            {referralLink}
          </div>
          <button
            onClick={handleCopy}
            className={`shrink-0 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
              copied
                ? "bg-teal text-white"
                : "bg-dark text-white hover:bg-dark/90"
            }`}
          >
            {copied
              ? isAr ? "تم النسخ!" : "Copied!"
              : isAr ? "نسخ" : "Copy"}
          </button>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-3 mt-4">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Join me on Cupshai! https://${referralLink}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-light rounded-full text-sm font-medium text-dark/70 hover:border-teal hover:text-teal transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Join me on Cupshai! https://${referralLink}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-light rounded-full text-sm font-medium text-dark/70 hover:border-dark hover:text-dark transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: isAr ? "إجمالي الإحالات" : "Total Referrals",
            value: stats.total,
            color: "text-dark",
          },
          {
            label: isAr ? "مبدعين" : "Creators",
            value: stats.creators,
            color: "text-orange",
          },
          {
            label: isAr ? "متابعين" : "Fans",
            value: stats.fans,
            color: "text-teal",
          },
          {
            label: isAr ? "العمولة المكتسبة" : "Commission Earned",
            value: `${stats.commissionEarned} ${isAr ? "ج.م" : "EGP"}`,
            color: "text-orange",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-light p-5 text-center"
          >
            <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
            <p className="text-xs text-dark/40">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent referrals */}
      <div className="bg-white rounded-2xl border border-gray-light overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-light">
          <h2 className="font-bold text-dark">
            {isAr ? "الإحالات الأخيرة" : "Recent Referrals"}
          </h2>
        </div>

        {MOCK_REFERRALS.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-dark/20">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8.5" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="20" y1="8" x2="20" y2="14" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="23" y1="11" x2="17" y2="11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-dark mb-2">
              {isAr ? "لا توجد إحالات بعد" : "No referrals yet"}
            </h3>
            <p className="text-sm text-dark/40">
              {isAr
                ? "شارك رابطك وابدأ في كسب المكافآت!"
                : "Share your link and start earning rewards!"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-light">
            {MOCK_REFERRALS.map((referral) => (
              <div key={referral.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      referral.refereeType === "creator"
                        ? "bg-orange/10"
                        : "bg-teal/10"
                    }`}
                  >
                    {referral.refereeType === "creator" ? "☕" : "♥"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">
                      {referral.refereeType === "creator"
                        ? isAr ? "مبدع جديد" : "New Creator"
                        : isAr ? "متابع جديد" : "New Fan"}
                    </p>
                    <p className="text-xs text-dark/40">
                      {new Date(referral.createdAt).toLocaleDateString(
                        isAr ? "ar-EG" : "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {referral.commissionEarned > 0 && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal/10 text-teal">
                      {referral.commissionEarned} {isAr ? "ج.م" : "EGP"}
                    </span>
                  )}
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      referral.status === "rewarded"
                        ? "bg-teal/10 text-teal"
                        : referral.status === "completed"
                        ? "bg-orange/10 text-orange"
                        : "bg-dark/5 text-dark/40"
                    }`}
                  >
                    {referral.status === "rewarded"
                      ? isAr ? "مكافأ" : "Rewarded"
                      : referral.status === "completed"
                      ? isAr ? "مكتمل" : "Completed"
                      : isAr ? "قيد الانتظار" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
