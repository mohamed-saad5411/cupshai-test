"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import KYCStatusBadge from "@/components/kyc/KYCStatusBadge";
import { KYCStatus, KYC_LIMITS } from "@/components/kyc/constants";

export default function PayoutsPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  // Mock states — will come from API
  const [kycStatus] = useState<KYCStatus>("not_started");
  const [accountFrozen] = useState(false);

  const canWithdraw = (kycStatus === "basic_verified" || kycStatus === "full_verified") && !accountFrozen;
  const limits = KYC_LIMITS[kycStatus];

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-dark mb-2">
        {isAr ? "المدفوعات" : "Payouts"}
      </h1>
      <p className="text-sm text-dark/50 mb-8">
        {isAr ? "إدارة طرق الدفع والسحب." : "Manage your payment methods and withdrawals."}
      </p>

      {/* Account frozen banner */}
      {accountFrozen && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚫</span>
            <div>
              <p className="font-bold text-red-600 text-sm">
                {isAr ? "الحساب مجمد" : "Account Frozen"}
              </p>
              <p className="text-red-500/70 text-xs mt-0.5">
                {isAr
                  ? "تم تجميد حسابك بسبب نشاط مشبوه. يرجى التواصل مع الدعم."
                  : "Your account has been frozen due to suspicious activity. Please contact support."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* KYC gate — shown when not verified */}
      {!canWithdraw && !accountFrozen && (
        <div className="bg-white rounded-2xl border-2 border-orange/30 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center text-xl shrink-0">
              🛡️
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-dark">
                  {isAr ? "التوثيق مطلوب للسحب" : "Verification Required to Withdraw"}
                </p>
                <KYCStatusBadge status={kycStatus} />
              </div>
              <p className="text-dark/50 text-sm leading-relaxed">
                {isAr
                  ? "لحماية منصتنا ومستخدمينا، يجب إكمال التوثيق (KYC) قبل سحب الأموال. هذا يتوافق مع لوائح البنك المركزي المصري لمكافحة غسل الأموال."
                  : "To protect our platform and users, you must complete identity verification (KYC) before withdrawing funds. This complies with Central Bank of Egypt anti-money laundering regulations."}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Link
                  href={`/${locale}/dashboard/verification`}
                  className="bg-orange text-white font-bold py-2.5 px-5 rounded-xl text-sm hover:bg-orange/90 transition-colors"
                >
                  {isAr ? "ابدأ التوثيق" : "Start Verification"}
                </Link>
                {kycStatus === "pending_review" && (
                  <span className="text-orange text-xs font-medium">
                    {isAr ? "قيد المراجعة — ٢٤-٤٨ ساعة" : "Under review — 24-48 hours"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Balance card */}
      <div className="bg-white rounded-2xl border border-gray-light p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-dark/50 mb-1">
              {isAr ? "الرصيد المتاح" : "Available balance"}
            </p>
            <p className="text-3xl font-bold text-dark">
              0 {isAr ? "ج.م" : "EGP"}
            </p>
            {canWithdraw && (
              <p className="text-xs text-dark/30 mt-1">
                {isAr ? `الحد اليومي: ${limits.daily.toLocaleString()} ج.م` : `Daily limit: ${limits.daily.toLocaleString()} EGP`}
              </p>
            )}
          </div>
          <button
            disabled={!canWithdraw}
            className="px-6 py-3 bg-orange text-white text-sm font-bold rounded-full disabled:opacity-40"
          >
            {isAr ? "سحب" : "Withdraw"}
          </button>
        </div>
      </div>

      {/* Payment method */}
      <div className="bg-white rounded-2xl border border-gray-light p-6 mb-6">
        <h2 className="font-bold text-dark mb-4">
          {isAr ? "طريقة الدفع" : "Payout method"}
        </h2>

        <div className="space-y-3">
          {[
            {
              icon: "🏦",
              label: isAr ? "حساب بنكي مصري" : "Egyptian bank account",
              desc: isAr ? "السحب مباشرة لحسابك البنكي" : "Withdraw directly to your bank",
              status: canWithdraw
                ? (isAr ? "متاح" : "Available")
                : (isAr ? "يتطلب التوثيق" : "Requires verification"),
              available: canWithdraw,
            },
            {
              icon: "📱",
              label: isAr ? "فودافون كاش" : "Vodafone Cash",
              desc: isAr ? "السحب لمحفظتك الإلكترونية" : "Withdraw to your mobile wallet",
              status: canWithdraw
                ? (isAr ? "متاح" : "Available")
                : (isAr ? "يتطلب التوثيق" : "Requires verification"),
              available: canWithdraw,
            },
            {
              icon: "💳",
              label: isAr ? "فوري" : "Fawry",
              desc: isAr ? "استلم من أي فرع فوري" : "Collect from any Fawry branch",
              status: isAr ? "قريباً" : "Coming soon",
              available: false,
            },
          ].map((method) => (
            <div
              key={method.label}
              className="flex items-center gap-4 p-4 border border-gray-light rounded-xl"
            >
              <span className="text-2xl">{method.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-dark text-sm">{method.label}</p>
                <p className="text-xs text-dark/40">{method.desc}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                method.available
                  ? "bg-teal/10 text-teal"
                  : "bg-cream text-dark/40"
              }`}>
                {method.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AML compliance notice */}
      <div className="bg-dark/5 rounded-2xl p-5 mb-6">
        <div className="flex gap-3">
          <span className="text-lg">🔒</span>
          <div>
            <p className="font-bold text-dark text-sm">
              {isAr ? "الامتثال لمكافحة غسل الأموال" : "AML Compliance"}
            </p>
            <p className="text-xs text-dark/50 mt-1 leading-relaxed">
              {isAr
                ? "جميع المعاملات تخضع لمراقبة تلقائية للكشف عن الأنشطة المشبوهة وفقاً لإرشادات البنك المركزي المصري. قد يتم تعليق عمليات السحب مؤقتاً للمراجعة."
                : "All transactions are automatically monitored for suspicious activity per Central Bank of Egypt guidelines. Withdrawals may be temporarily held for review."}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-2xl border border-gray-light p-6">
        <h2 className="font-bold text-dark mb-4">
          {isAr ? "سجل المعاملات" : "Transaction history"}
        </h2>
        <div className="text-center py-10">
          <div className="text-4xl mb-3">💰</div>
          <p className="font-semibold text-dark">
            {isAr ? "لا توجد معاملات بعد" : "No transactions yet"}
          </p>
          <p className="text-sm text-dark/40 mt-1">
            {isAr
              ? "عندما تتلقى دعماً، ستظهر المعاملات هنا."
              : "When you receive support, transactions will appear here."}
          </p>
        </div>
      </div>
    </div>
  );
}
