"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const NICHES = [
  { en: "Entertainment", ar: "ترفيه" },
  { en: "Education", ar: "تعليم" },
  { en: "Lifestyle", ar: "لايف ستايل" },
  { en: "Creative", ar: "إبداعي" },
  { en: "Tech & Gaming", ar: "تقنية وألعاب" },
  { en: "Business & Finance", ar: "أعمال ومالية" },
  { en: "Other", ar: "أخرى" },
];

export default function EarlyAccessForm({ locale }: { locale: string }) {
  const t = useTranslations("earlyAccess");
  const isAr = locale === "ar";

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [niche, setNiche] = useState("");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [completed, setCompleted] = useState(false);
  const [claimedUrl, setClaimedUrl] = useState("");
  const [founderNumber, setFounderNumber] = useState<number | null>(null);

  useEffect(() => {
    if (!username || username.length < 3) { setUsernameAvailable(null); return; }
    const usernameRegex = /^[a-z0-9_-]{3,20}$/;
    if (!usernameRegex.test(username)) { setUsernameAvailable(false); return; }
    setCheckingUsername(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/early-access?username=${username}`);
        const data = await res.json();
        setUsernameAvailable(data.available);
      } catch { setUsernameAvailable(null); }
      finally { setCheckingUsername(false); }
    }, 500);
    return () => clearTimeout(timeout);
  }, [username]);

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading"); setErrorMsg("");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "email", email }),
      });
      const data = await res.json();
      if (res.ok) { setStep(2); setStatus("idle"); }
      else if (data.error === "already_completed") { setErrorMsg(t("alreadyCompleted")); setStatus("error"); }
      else { setErrorMsg(data.error || t("errorGeneric")); setStatus("error"); }
    } catch { setErrorMsg(t("errorGeneric")); setStatus("error"); }
  }

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;
    setStatus("loading"); setErrorMsg("");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "profile", email, name, socialUrl: socialUrl || undefined, phone: phone ? `+20${phone}` : undefined, niche: niche || undefined }),
      });
      if (res.ok) { setStep(3); setStatus("idle"); }
      else { const data = await res.json(); setErrorMsg(data.error || t("errorGeneric")); setStatus("error"); }
    } catch { setErrorMsg(t("errorGeneric")); setStatus("error"); }
  }

  async function handleStep3(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !usernameAvailable) return;
    setStatus("loading"); setErrorMsg("");
    try {
      const res = await fetch("/api/early-access", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "claim-username", email, username }),
      });
      const data = await res.json();
      if (res.ok) { setClaimedUrl(data.profile.url); setFounderNumber(data.profile.founderNumber); setCompleted(true); setStatus("idle"); }
      else { setErrorMsg(data.error || t("errorGeneric")); setStatus("error"); }
    } catch { setErrorMsg(t("errorGeneric")); setStatus("error"); }
  }

  const inputClass = "w-full h-14 bg-[#EDEDE9]/60 border border-[#BFC0C0]/30 rounded-xl px-4 text-[#2B2D42] placeholder:text-[#BFC0C0] focus:outline-none focus:border-[#F4A259] focus:ring-1 focus:ring-[#F4A259] transition-all text-base";
  const buttonClass = "w-full h-12 rounded-full bg-[#2B2D42] text-white text-base font-bold hover:bg-[#2B2D42]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50";

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20 lg:py-28 max-w-3xl mx-auto w-full text-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 rounded-full bg-[#EDEDE9]/60 px-4 py-1.5 mb-8 border border-[#BFC0C0]/20"
      >
        <div className="w-2 h-2 rounded-full bg-[#F4A259] relative">
          <div className="absolute inset-0 rounded-full bg-[#F4A259] opacity-50 blur-sm" />
        </div>
        <span className="text-sm font-medium text-[#2B2D42]">{t("badge")}</span>
      </motion.div>

      {/* Progress bars */}
      {!completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-10 w-full max-w-[200px]"
        >
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= s ? "bg-[#F4A259]" : "bg-[#EDEDE9]"
                }`}
            />
          ))}
        </motion.div>
      )}

      {/* Step label */}
      {!completed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-medium text-[#BFC0C0] mb-6 w-full max-w-[480px]"
          style={{ textAlign: isAr ? "right" : "left" }}
        >
          {isAr ? `${step} / 3 خطوة` : `Step ${step} / 3`}
        </motion.p>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait">
        {completed ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#BFC0C0]/20 rounded-2xl px-8 py-10 text-center max-w-md w-full shadow-lg"
          >
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-[#F4A259] mb-2">{t("successTitle")}</h2>
            {founderNumber && (
              <p className="text-[#BFC0C0] text-sm mb-1">
                {t("founderNumber")} <span className="text-[#F4A259] font-bold text-lg">#{founderNumber}</span>
              </p>
            )}
            <p className="text-[#BFC0C0] mb-6 text-sm">{t("successMessage")}</p>
            <div className="bg-[#FAFAF8] rounded-xl px-4 py-3 border border-[#EDEDE9] mb-6">
              <p className="text-[#BFC0C0] text-xs mb-1">{t("yourLink")}</p>
              <p className="text-[#F4A259] font-bold text-lg">{claimedUrl}</p>
            </div>
            <button
              onClick={() => { setCompleted(false); setStep(1); setEmail(""); setUsername(""); }}
              className="h-12 rounded-full bg-[#F4A259] text-white text-base font-bold hover:bg-[#F4A259]/90 transition-all px-8"
            >
              {isAr ? "تم" : "Done"}
            </button>
          </motion.div>
        ) : step === 1 ? (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-[480px]">
            <h1 className="text-4xl sm:text-5xl md:text-[68px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#2B2D42] mb-6">
              {t("step1Title")}
            </h1>
            <p className="text-lg sm:text-xl text-[#BFC0C0] mb-10">
              {t("step1Desc")}
            </p>
            <form onSubmit={handleStep1} className="flex flex-col gap-4 mb-4">
              <div className="relative flex items-center">
                <div className="absolute left-4 text-[#BFC0C0]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPlaceholder")} required className={`${inputClass} pl-12`} />
              </div>
              <button type="submit" disabled={status === "loading"} className={buttonClass}>
                {status === "loading" ? t("loading") : t("claimAccess")}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </button>
            </form>
            <p className="text-sm text-[#BFC0C0]">{t("step1SmallText")}</p>
            {status === "error" && <p className="text-red-500 text-sm text-center mt-2">{errorMsg}</p>}
          </motion.div>
        ) : step === 2 ? (
          <motion.form key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleStep2} className="w-full max-w-[480px] space-y-5">
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2D42] mb-3">{t("step2Title")}</h2>
              <p className="text-[#BFC0C0] text-sm leading-relaxed">{t("step2Desc")}</p>
            </div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("namePlaceholder")} required className={inputClass} />
            <input type="url" value={socialUrl} onChange={(e) => setSocialUrl(e.target.value)} placeholder={t("socialPlaceholder")} dir="ltr" className={inputClass} />
            <div className="space-y-1">
              <p className="text-[#BFC0C0] text-sm text-start">{t("phoneLabel")}</p>
              <div className="relative" dir="ltr">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BFC0C0] text-sm font-medium">+20</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} placeholder={t("phonePlaceholder")} dir="ltr" maxLength={10} className={`${inputClass} pl-14`} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[#BFC0C0] text-sm text-start">{t("nichePlaceholder")}</p>
              <div className="flex flex-wrap gap-2">
                {NICHES.map((n) => (
                  <button key={n.en} type="button" onClick={() => setNiche(niche === n.en ? "" : n.en)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${niche === n.en ? "bg-[#F4A259] text-white border border-[#F4A259]" : "bg-[#EDEDE9]/60 text-[#2B2D42]/70 border border-[#BFC0C0]/20 hover:border-[#BFC0C0]/50"}`}>
                    {isAr ? n.ar : n.en}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={status === "loading" || !name || !niche} className={buttonClass}>
              {status === "loading" ? t("loading") : t("continue")}
            </button>
            {status === "error" && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
          </motion.form>
        ) : (
          // Step 3 - Claim username
          <motion.form key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleStep3} className="w-full max-w-[480px] space-y-5">
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2D42] mb-3">{t("step3Title")}</h2>
              <p className="text-[#BFC0C0] text-sm leading-relaxed">{t("step3Desc")}</p>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BFC0C0] text-sm" dir="ltr">cupshai.com/</span>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))} placeholder={t("usernamePlaceholder")} required dir="ltr" maxLength={20} className={`${inputClass} pl-[120px]`} />
              </div>
              {username.length >= 3 && (
                <div className="flex items-center gap-2 px-1">
                  {checkingUsername ? <span className="text-[#BFC0C0] text-sm">{t("checking")}</span>
                    : usernameAvailable === true ? <span className="text-green-600 text-sm font-medium">&#10003; {t("available")}</span>
                      : usernameAvailable === false ? <span className="text-red-500 text-sm font-medium">&#10007; {t("taken")}</span>
                        : null}
                </div>
              )}
            </div>
            <button type="submit" disabled={status === "loading" || !usernameAvailable} className={buttonClass}>
              {status === "loading" ? t("loading") : t("reserveUsername")}
            </button>
            {status === "error" && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
