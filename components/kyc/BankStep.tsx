"use client";
import { useTranslations, useLocale } from "next-intl";
import { EGYPTIAN_BANKS } from "./constants";

interface BankStepProps {
  data: {
    bankName: string;
    bankAccountName: string;
    bankAccountNum: string;
    bankSwift: string;
    vodafoneCash: string;
    payoutMethod: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function BankStep({ data, onChange, onSubmit, onBack, loading }: BankStepProps) {
  const t = useTranslations("kyc");
  const locale = useLocale();
  const isAr = locale === "ar";

  const isBankValid =
    data.payoutMethod === "bank" &&
    data.bankName.length > 0 &&
    data.bankAccountName.trim().length >= 3 &&
    data.bankAccountNum.trim().length >= 10;

  const isWalletValid =
    data.payoutMethod === "vodafone_cash" &&
    /^(01[0125]\d{8})$/.test(data.vodafoneCash.replace(/\s/g, ""));

  const canProceed = isBankValid || isWalletValid;

  return (
    <div className="space-y-5">
      <div className="bg-orange/5 border border-orange/20 rounded-xl p-4">
        <p className="text-sm text-dark/70 leading-relaxed">
          {t("bankDesc")}
        </p>
      </div>

      {/* Payout method selection */}
      <div>
        <label className="block text-sm font-semibold text-dark mb-3">{t("payoutMethod")}</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange("payoutMethod", "bank")}
            className={`p-4 rounded-xl border-2 text-start transition-all ${
              data.payoutMethod === "bank"
                ? "border-orange bg-orange/5"
                : "border-gray-light hover:border-orange/30"
            }`}
          >
            <span className="text-2xl">🏦</span>
            <p className="font-semibold text-dark text-sm mt-2">{t("bankAccount")}</p>
            <p className="text-xs text-dark/40 mt-0.5">{t("bankAccountDesc")}</p>
          </button>
          <button
            type="button"
            onClick={() => onChange("payoutMethod", "vodafone_cash")}
            className={`p-4 rounded-xl border-2 text-start transition-all ${
              data.payoutMethod === "vodafone_cash"
                ? "border-orange bg-orange/5"
                : "border-gray-light hover:border-orange/30"
            }`}
          >
            <span className="text-2xl">📱</span>
            <p className="font-semibold text-dark text-sm mt-2">{t("vodafoneCash")}</p>
            <p className="text-xs text-dark/40 mt-0.5">{t("vodafoneCashDesc")}</p>
          </button>
        </div>
      </div>

      {/* Bank fields */}
      {data.payoutMethod === "bank" && (
        <>
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">{t("bankName")}</label>
            <select
              value={data.bankName}
              onChange={(e) => onChange("bankName", e.target.value)}
              className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors bg-white"
            >
              <option value="">{t("selectBank")}</option>
              {EGYPTIAN_BANKS.map((b) => (
                <option key={b.en} value={b.en}>
                  {isAr ? b.ar : b.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">{t("accountHolderName")}</label>
            <input
              type="text"
              value={data.bankAccountName}
              onChange={(e) => onChange("bankAccountName", e.target.value)}
              placeholder={t("accountHolderPlaceholder")}
              className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
            />
            <p className="text-xs text-dark/30 mt-1">{t("accountNameNote")}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">{t("accountNumber")}</label>
            <input
              type="text"
              value={data.bankAccountNum}
              onChange={(e) => onChange("bankAccountNum", e.target.value.replace(/\D/g, ""))}
              placeholder={t("accountNumberPlaceholder")}
              className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors font-mono tracking-wider"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              {t("swiftCode")} <span className="text-dark/30 font-normal">({t("optional")})</span>
            </label>
            <input
              type="text"
              value={data.bankSwift}
              onChange={(e) => onChange("bankSwift", e.target.value.toUpperCase().slice(0, 11))}
              placeholder="XXXXEGCAXXX"
              maxLength={11}
              className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors font-mono"
            />
          </div>
        </>
      )}

      {/* Vodafone Cash */}
      {data.payoutMethod === "vodafone_cash" && (
        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5">{t("walletNumber")}</label>
          <input
            type="tel"
            value={data.vodafoneCash}
            onChange={(e) => onChange("vodafoneCash", e.target.value)}
            placeholder="01X XXXX XXXX"
            className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
          />
          <p className="text-xs text-dark/30 mt-1">{t("walletNote")}</p>
        </div>
      )}

      {/* AML notice */}
      <div className="bg-dark/5 rounded-xl p-4">
        <div className="flex gap-2">
          <span className="text-sm">🔒</span>
          <div>
            <p className="text-xs font-semibold text-dark">{t("amlNotice")}</p>
            <p className="text-xs text-dark/50 mt-0.5 leading-relaxed">{t("amlNoticeDesc")}</p>
          </div>
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
          {loading ? "..." : t("submitVerification")}
        </button>
      </div>
    </div>
  );
}
