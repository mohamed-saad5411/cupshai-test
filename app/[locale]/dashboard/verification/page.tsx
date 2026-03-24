"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import KYCStatusBadge from "@/components/kyc/KYCStatusBadge";
import IdentityStep from "@/components/kyc/IdentityStep";
import AddressStep from "@/components/kyc/AddressStep";
import BankStep from "@/components/kyc/BankStep";
import { KYCStatus, KYC_LIMITS } from "@/components/kyc/constants";

export default function VerificationPage() {
  const t = useTranslations("kyc");
  const locale = useLocale();
  const isAr = locale === "ar";

  const [step, setStep] = useState(1); // 1=identity, 2=address, 3=bank
  const [status, setStatus] = useState<KYCStatus>("not_started");
  const [loading, setLoading] = useState(false);

  // Form data
  const [identity, setIdentity] = useState({
    fullNameEn: "", fullNameAr: "", dateOfBirth: "", nationalId: "", phone: "",
  });
  const [address, setAddress] = useState({
    addressLine1: "", addressLine2: "", city: "", governorate: "", postalCode: "",
  });
  const [bank, setBank] = useState({
    bankName: "", bankAccountName: "", bankAccountNum: "", bankSwift: "", vodafoneCash: "", payoutMethod: "bank",
  });

  function handleIdentityChange(field: string, value: string) {
    setIdentity((prev) => ({ ...prev, [field]: value }));
  }
  function handleAddressChange(field: string, value: string) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }
  function handleBankChange(field: string, value: string) {
    setBank((prev) => ({ ...prev, [field]: value }));
  }

  async function handleIdentitySubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setStep(2);
    setLoading(false);
  }
  async function handleAddressSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setStep(3);
    setLoading(false);
  }
  async function handleFinalSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("pending_review");
    setLoading(false);
  }

  const limits = KYC_LIMITS[status];

  return (
    <div className="p-6 sm:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-dark">{t("title")}</h1>
        <KYCStatusBadge status={status} size="md" />
      </div>
      <p className="text-sm text-dark/50 mb-8">{t("subtitle")}</p>

      {/* Pending review state */}
      {status === "pending_review" && (
        <div className="bg-white rounded-2xl border border-gray-light p-8 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-dark mb-2">{t("reviewTitle")}</h2>
          <p className="text-dark/50 text-sm leading-relaxed max-w-md mx-auto">{t("reviewDesc")}</p>
          <div className="mt-6 bg-cream rounded-xl p-4">
            <p className="text-xs font-semibold text-dark/40 uppercase tracking-wide mb-2">{t("reviewTimeline")}</p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange">24-48</p>
                <p className="text-xs text-dark/40">{t("hours")}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verified state */}
      {(status === "basic_verified" || status === "full_verified") && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-light p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-xl">✓</div>
              <div>
                <p className="font-bold text-dark">{t("verifiedTitle")}</p>
                <p className="text-sm text-dark/50">{t("verifiedDesc")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-cream rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-dark">{limits.daily.toLocaleString()}</p>
                <p className="text-xs text-dark/40">{t("dailyLimit")} ({isAr ? "ج.م" : "EGP"})</p>
              </div>
              <div className="bg-cream rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-dark">{limits.monthly.toLocaleString()}</p>
                <p className="text-xs text-dark/40">{t("monthlyLimit")} ({isAr ? "ج.م" : "EGP"})</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejected state */}
      {status === "rejected" && (
        <div className="bg-white rounded-2xl border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-lg">✗</div>
            <div>
              <p className="font-bold text-dark">{t("rejectedTitle")}</p>
              <p className="text-sm text-red-500">{t("rejectedDesc")}</p>
            </div>
          </div>
          <button
            onClick={() => { setStatus("not_started"); setStep(1); }}
            className="mt-3 bg-orange text-white font-bold py-2.5 px-6 rounded-xl text-sm hover:bg-orange/90 transition-colors"
          >
            {t("resubmit")}
          </button>
        </div>
      )}

      {/* KYC form — only show when not_started */}
      {status === "not_started" && (
        <>
          {/* Progress steps */}
          <div className="flex items-center gap-2 mb-8">
            {[
              { num: 1, label: t("stepIdentity") },
              { num: 2, label: t("stepAddress") },
              { num: 3, label: t("stepBank") },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    step > s.num
                      ? "bg-teal text-white"
                      : step === s.num
                      ? "bg-orange text-white"
                      : "bg-gray-light text-dark/30"
                  }`}
                >
                  {step > s.num ? "✓" : s.num}
                </div>
                <p className={`text-xs font-medium ${step >= s.num ? "text-dark" : "text-dark/30"}`}>
                  {s.label}
                </p>
                {i < 2 && (
                  <div className={`flex-1 h-0.5 ${step > s.num ? "bg-teal" : "bg-gray-light"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Withdrawal limits info */}
          <div className="bg-white rounded-2xl border border-gray-light p-5 mb-6">
            <h3 className="font-bold text-dark text-sm mb-3">{t("whyVerify")}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark/60">{t("tierBasic")}</span>
                <span className="font-semibold text-dark">{t("limitBasic")}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark/60">{t("tierFull")}</span>
                <span className="font-semibold text-dark">{t("limitFull")}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark/60">{t("tierNone")}</span>
                <span className="text-red-500 font-semibold">{t("limitNone")}</span>
              </div>
            </div>
          </div>

          {/* Step content */}
          <div className="bg-white rounded-2xl border border-gray-light p-6">
            {step === 1 && (
              <IdentityStep
                data={identity}
                onChange={handleIdentityChange}
                onSubmit={handleIdentitySubmit}
                loading={loading}
              />
            )}
            {step === 2 && (
              <AddressStep
                data={address}
                onChange={handleAddressChange}
                onSubmit={handleAddressSubmit}
                onBack={() => setStep(1)}
                loading={loading}
              />
            )}
            {step === 3 && (
              <BankStep
                data={bank}
                onChange={handleBankChange}
                onSubmit={handleFinalSubmit}
                onBack={() => setStep(2)}
                loading={loading}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
