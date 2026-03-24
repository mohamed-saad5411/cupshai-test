"use client";
import { useTranslations } from "next-intl";

type StepOneProps = {
  email: string;
  password: string;
  onChange: (field: "email" | "password", value: string) => void;
  onNext: () => void | Promise<void>;
  loading: boolean;
  error: string | null;
};

export function RegisterStepOne({
  email,
  password,
  onChange,
  onNext,
  loading,
  error,
}: StepOneProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (password.length < 8) return;
    await onNext();
  };

  // async function handleStep1(e: React.FormEvent) {
  //   e.preventDefault();
  //   if (!email) return;
  //   setStatus("loading"); setErrorMsg("");
  //   try {
  //     const res = await fetch("/api/early-access", {
  //       method: "POST", headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ step: "email", email }),
  //     });
  //     const data = await res.json();
  //     if (res.ok) { setStep(2); setStatus("idle"); }
  //     else if (data.error === "already_completed") { setErrorMsg(t("alreadyCompleted")); setStatus("error"); }
  //     else { setErrorMsg(data.error || t("errorGeneric")); setStatus("error"); }
  //   } catch { setErrorMsg(t("errorGeneric")); setStatus("error"); }
  // }
  const t = useTranslations("earlyAccess");

  return <>
    <form onSubmit={handleSubmit} className="space-y-4">
    

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
        >
          {error}
        </div>
      )}
      {/* email */}
      <div>
        <label
          htmlFor="step1-email"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email
        </label>
        <input
          id="step1-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
          placeholder="you@example.com"
        />
      </div>
      {/* <div className="relative flex items-center">
        <div className="absolute left-4 text-[#BFC0C0]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
        </div>
        <input type="email" value={userEmail} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPlaceholder")} required className={`${inputClass} pl-12`} />
      </div> */}
      {/* password */}
      {/* <div className="relative flex items-center">
        <div className="absolute left-4 text-[#BFC0C0]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
        </div>
        <input type="password" value={userPassword} onChange={(e) => setPassword(e.target.value)} placeholder={t("passwordPlaceholder")} required className={`${inputClass} pl-12`} />
      </div> */}
      <div>
        <label
          htmlFor="step1-password"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Password
        </label>
        <input
          id="step1-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => onChange("password", e.target.value)}
          className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
          placeholder="At least 8 characters"
        />
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
          Minimum 8 characters
        </p>
      </div>
      {/* button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {loading ? "Continue…" : "Claim early access"}
      </button>
    </form>

    {/* <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-[480px]">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">

        <button type="submit" disabled={status === "loading"} className={buttonClass}>
          {status === "loading" ? t("loading") : t("claimAccess")}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </button>
      </form>
      <p className="text-sm text-[#BFC0C0]">{t("step1SmallText")}</p>
      {status === "error" && <p className="text-red-500 text-sm text-center mt-2">{errorMsg}</p>}
    </motion.div> */}
  </>;
}

