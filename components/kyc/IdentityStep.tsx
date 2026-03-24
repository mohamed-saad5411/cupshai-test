"use client";
import { useTranslations, useLocale } from "next-intl";

interface IdentityStepProps {
  data: {
    fullNameEn: string;
    fullNameAr: string;
    dateOfBirth: string;
    nationalId: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function IdentityStep({ data, onChange, onSubmit, loading }: IdentityStepProps) {
  const t = useTranslations("kyc");
  const locale = useLocale();
  const isAr = locale === "ar";

  // Validate Egyptian National ID (14 digits)
  const isValidNationalId = /^\d{14}$/.test(data.nationalId);
  // Validate Egyptian phone (+20 or 01)
  const isValidPhone = /^(\+20|0)(1[0125]\d{8})$/.test(data.phone.replace(/\s/g, ""));

  const canProceed =
    data.fullNameEn.trim().length >= 3 &&
    data.fullNameAr.trim().length >= 3 &&
    data.dateOfBirth &&
    isValidNationalId &&
    isValidPhone;

  return (
    <div className="space-y-5">
      <div className="bg-orange/5 border border-orange/20 rounded-xl p-4">
        <p className="text-sm text-dark/70 leading-relaxed">
          {t("identityDesc")}
        </p>
      </div>

      {/* Full Name EN */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">{t("fullNameEn")}</label>
        <input
          type="text"
          value={data.fullNameEn}
          onChange={(e) => onChange("fullNameEn", e.target.value)}
          placeholder={t("fullNameEnPlaceholder")}
          className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
        />
        <p className="text-xs text-dark/30 mt-1">{t("matchIdNote")}</p>
      </div>

      {/* Full Name AR */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">{t("fullNameAr")}</label>
        <input
          type="text"
          value={data.fullNameAr}
          onChange={(e) => onChange("fullNameAr", e.target.value)}
          placeholder={t("fullNameArPlaceholder")}
          dir="rtl"
          className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">{t("dateOfBirth")}</label>
        <input
          type="date"
          value={data.dateOfBirth}
          onChange={(e) => onChange("dateOfBirth", e.target.value)}
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
          className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
        />
        <p className="text-xs text-dark/30 mt-1">{t("ageRequirement")}</p>
      </div>

      {/* National ID */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">{t("nationalId")}</label>
        <input
          type="text"
          value={data.nationalId}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 14);
            onChange("nationalId", val);
          }}
          placeholder="XXXXXXXXXXXXXX"
          maxLength={14}
          className={`w-full border rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none transition-colors font-mono tracking-wider ${
            data.nationalId.length === 14
              ? isValidNationalId ? "border-teal focus:border-teal" : "border-red-300 focus:border-red-400"
              : "border-gray-light focus:border-orange"
          }`}
        />
        <p className="text-xs text-dark/30 mt-1">
          {t("nationalIdNote")} ({data.nationalId.length}/14)
        </p>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">{t("phoneNumber")}</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+20 1XX XXX XXXX"
          className={`w-full border rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none transition-colors ${
            data.phone.length > 5
              ? isValidPhone ? "border-teal focus:border-teal" : "border-red-300 focus:border-red-400"
              : "border-gray-light focus:border-orange"
          }`}
        />
      </div>

      {/* ID Upload areas */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">{t("uploadId")}</label>
        <div className="grid grid-cols-2 gap-3">
          <div className="border-2 border-dashed border-gray-light rounded-xl p-6 text-center hover:border-orange/50 transition-colors cursor-pointer">
            <div className="text-2xl mb-1">🪪</div>
            <p className="text-xs text-dark/50 font-medium">{t("idFront")}</p>
          </div>
          <div className="border-2 border-dashed border-gray-light rounded-xl p-6 text-center hover:border-orange/50 transition-colors cursor-pointer">
            <div className="text-2xl mb-1">🪪</div>
            <p className="text-xs text-dark/50 font-medium">{t("idBack")}</p>
          </div>
        </div>
      </div>

      {/* Selfie */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">{t("selfieWithId")}</label>
        <div className="border-2 border-dashed border-gray-light rounded-xl p-8 text-center hover:border-orange/50 transition-colors cursor-pointer">
          <div className="text-3xl mb-2">🤳</div>
          <p className="text-xs text-dark/50 font-medium">{t("selfieDesc")}</p>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!canProceed || loading}
        className="w-full bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange/90 transition-colors disabled:opacity-40 text-sm"
      >
        {loading ? "..." : t("continueToAddress")}
      </button>
    </div>
  );
}
