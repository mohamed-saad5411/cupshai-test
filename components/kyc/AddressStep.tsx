"use client";
import { useTranslations, useLocale } from "next-intl";
import { GOVERNORATES } from "./constants";

interface AddressStepProps {
  data: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    governorate: string;
    postalCode: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function AddressStep({ data, onChange, onSubmit, onBack, loading }: AddressStepProps) {
  const t = useTranslations("kyc");
  const locale = useLocale();
  const isAr = locale === "ar";

  const canProceed =
    data.addressLine1.trim().length >= 5 &&
    data.city.trim().length >= 2 &&
    data.governorate.length > 0;

  return (
    <div className="space-y-5">
      <div className="bg-orange/5 border border-orange/20 rounded-xl p-4">
        <p className="text-sm text-dark/70 leading-relaxed">
          {t("addressDesc")}
        </p>
      </div>

      {/* Address Line 1 */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">{t("addressLine1")}</label>
        <input
          type="text"
          value={data.addressLine1}
          onChange={(e) => onChange("addressLine1", e.target.value)}
          placeholder={t("addressLine1Placeholder")}
          className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
        />
      </div>

      {/* Address Line 2 */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">
          {t("addressLine2")} <span className="text-dark/30 font-normal">({t("optional")})</span>
        </label>
        <input
          type="text"
          value={data.addressLine2}
          onChange={(e) => onChange("addressLine2", e.target.value)}
          placeholder={t("addressLine2Placeholder")}
          className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
        />
      </div>

      {/* City + Governorate */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5">{t("city")}</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder={t("cityPlaceholder")}
            className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5">{t("governorate")}</label>
          <select
            value={data.governorate}
            onChange={(e) => onChange("governorate", e.target.value)}
            className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors bg-white"
          >
            <option value="">{t("selectGovernorate")}</option>
            {GOVERNORATES.map((g) => (
              <option key={g.en} value={g.en}>
                {isAr ? g.ar : g.en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Postal Code */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">
          {t("postalCode")} <span className="text-dark/30 font-normal">({t("optional")})</span>
        </label>
        <input
          type="text"
          value={data.postalCode}
          onChange={(e) => onChange("postalCode", e.target.value.replace(/\D/g, "").slice(0, 5))}
          placeholder="XXXXX"
          maxLength={5}
          className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors font-mono"
        />
      </div>

      {/* Address proof upload */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-1.5">{t("addressProof")}</label>
        <div className="border-2 border-dashed border-gray-light rounded-xl p-8 text-center hover:border-orange/50 transition-colors cursor-pointer">
          <div className="text-3xl mb-2">📄</div>
          <p className="text-xs text-dark/50 font-medium">{t("addressProofDesc")}</p>
          <p className="text-xs text-dark/30 mt-1">{t("addressProofTypes")}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border-2 border-gray-light text-dark/60 font-bold py-3 rounded-xl hover:border-dark/20 transition-colors text-sm"
        >
          {t("back")}
        </button>
        <button
          onClick={onSubmit}
          disabled={!canProceed || loading}
          className="flex-1 bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange/90 transition-colors disabled:opacity-40 text-sm"
        >
          {loading ? "..." : t("continueToBank")}
        </button>
      </div>
    </div>
  );
}
