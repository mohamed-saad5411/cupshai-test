
// "use client";
// import { useState } from "react";
// import { useTranslations } from "next-intl";
// import { motion } from "framer-motion";
// import { createClient } from "@/lib/supabase/client";
// import Link from "next/link";
// import Navbar from "@/components/shared/Navbar";

// export default function LoginForm({ locale }: { locale: string }) {
//   const t = useTranslations("login");
//   const isAr = locale === "ar";

//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const inputClass = "w-full h-14 bg-[#EDEDE9]/60 border border-[#BFC0C0]/30 rounded-xl px-4 text-[#2B2D42] placeholder:text-[#BFC0C0] focus:outline-none focus:border-[#F4A259] focus:ring-1 focus:ring-[#F4A259] transition-all text-base";
//   const btnPrimary = "w-full h-12 rounded-full bg-[#2B2D42] text-white text-base font-bold hover:bg-[#2B2D42]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50";
//   const btnOutline = "w-full h-12 rounded-full bg-white border border-[#BFC0C0]/30 hover:border-[#BFC0C0]/60 hover:shadow-sm text-[#2B2D42] text-base font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50";

//   // ── Email check → magic link ─────────────────────────────────────────────────
//   async function handleEmailLogin(e: React.FormEvent) {
//     e.preventDefault();
//     if (!email) return;
//     setStatus("loading");
//     setErrorMsg("");
//     setSuccessMsg("");

//     try {
//       // 1. Check if email exists in DB
//       const res = await fetch("/api/auth/check-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await res.json();

//       if (!res.ok || !data.exists) {
//         setErrorMsg(isAr ? "هذا الإيميل غير مسجل." : "This email is not registered.");
//         setStatus("error");
//         return;
//       }

//       // 2. Email exists → send magic link
//       const supabase = createClient();
//       const { error } = await supabase.auth.signInWithOtp({
//         email,
//         options: { emailRedirectTo: `${window.location.origin}/${locale}/dashboard` },
//       });
//       if (error) throw error;

//       setSuccessMsg(isAr ? "تم إرسال رابط الدخول على إيميلك ✉️" : "Magic link sent! Check your inbox ✉️");
//       setStatus("idle");
//     } catch {
//       setErrorMsg(isAr ? "حدث خطأ، حاول مرة أخرى." : "Something went wrong. Please try again.");
//       setStatus("error");
//     }
//   }

//   // ── Google OAuth (no DB check needed) ────────────────────────────────────────
//   async function handleGoogleLogin() {
//     setStatus("loading");
//     setErrorMsg("");
//     setSuccessMsg("");
//     try {
//       const supabase = createClient();
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: { redirectTo: `${window.location.origin}/${locale}/dashboard` },
//       });
//       if (error) throw error;
//     } catch {
//       setErrorMsg(isAr ? "حدث خطأ، حاول مرة أخرى." : "Something went wrong. Please try again.");
//       setStatus("error");
//     }
//   }

//   return <>
//     <Navbar locale={locale} />
//     <div className="flex-1 flex flex-col items-center justify-center mt-10  px-4 py-12 sm:py-20 lg:py-28 max-w-3xl mx-auto w-full text-center">

//       {/* Badge */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center gap-2 rounded-full bg-[#EDEDE9]/60 px-4 py-1.5 mb-8 border border-[#BFC0C0]/20"
//       >
//         <div className="w-2 h-2 rounded-full bg-[#F4A259] relative">
//           <div className="absolute inset-0 rounded-full bg-[#F4A259] opacity-50 blur-sm" />
//         </div>
//         <span className="text-sm font-medium text-[#2B2D42]">{t("badge")}</span>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="w-full max-w-[480px]"
//       >
//         {/* Title */}
//         <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#2B2D42] mb-4">
//           {t("title")}
//         </h1>
//         <p className="text-lg text-[#BFC0C0] mb-10">
//           {t("desc")}
//         </p>

//         {/* Email form */}
//         <form onSubmit={handleEmailLogin} className="flex flex-col gap-4 mb-2">
//           <div className="relative flex items-center">
//             <div className="absolute left-4 text-[#BFC0C0]">
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect width="20" height="16" x="2" y="4" rx="2" />
//                 <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//               </svg>
//             </div>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); setSuccessMsg(""); }}
//               placeholder={t("emailPlaceholder")}
//               required
//               className={`${inputClass} pl-12`}
//             />
//           </div>

//           <button type="submit" disabled={status === "loading"} className={btnPrimary}>
//             {status === "loading" ? t("loading") : t("continueEmail")}
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
//             </svg>
//           </button>
//         </form>

//         {/* Feedback messages */}
//         {errorMsg && <p className="text-red-500 text-sm text-center mt-2">{errorMsg}</p>}
//         {successMsg && <p className="text-green-600 text-sm text-center mt-2">{successMsg}</p>}

//         {/* Divider */}
//         <div className="flex items-center gap-3 my-6">
//           <div className="flex-1 h-px bg-[#BFC0C0]/20" />
//           <span className="text-sm text-[#BFC0C0]">{t("orWith")}</span>
//           <div className="flex-1 h-px bg-[#BFC0C0]/20" />
//         </div>

//         {/* Google button */}
//         <button onClick={handleGoogleLogin} disabled={status === "loading"} className={btnOutline}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
//             <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z" />
//             <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
//             <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.5-2.9-11.3-7.1l-6.6 5.1C9.6 39.6 16.3 44 24 44z" />
//             <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.3-4.4 5.7l6.2 5.2C40.9 35.5 44 30.1 44 24c0-1.3-.1-2.7-.4-4z" />
//           </svg>
//           {t("googleBtn")}
//         </button>

//         {/* Signup link */}
//         <div className="mt-8 pt-6 border-t border-[#BFC0C0]/20">
//           <p className="text-sm text-[#BFC0C0]">
//             {t("noAccount")}{" "}
//             <Link href={`/signup`} className="text-[#F4A259] font-semibold hover:underline">
//               {t("signupLink")}
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   </>;
// }



"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";

export default function LoginForm({ locale }: { locale: string }) {
  const t = useTranslations("login");
  const isAr = locale === "ar";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const inputClass = "w-full h-14 bg-[#EDEDE9]/60 border border-[#BFC0C0]/30 rounded-xl px-4 text-[#2B2D42] placeholder:text-[#BFC0C0] focus:outline-none focus:border-[#F4A259] focus:ring-1 focus:ring-[#F4A259] transition-all text-base";
  const btnPrimary = "w-full h-12 rounded-full bg-[#2B2D42] text-white text-base font-bold hover:bg-[#2B2D42]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50";
  const btnOutline = "w-full h-12 rounded-full bg-white border border-[#BFC0C0]/30 hover:border-[#BFC0C0]/60 hover:shadow-sm text-[#2B2D42] text-base font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50";

  // ── Magic Link ───────────────────────────────────────────────────────────────
  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");
    setSuccessMsg("");
    const supabase = createClient(); // ← this line before using supabase


    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/${locale}/dashboard`,
      },
    });

    console.log("OTP error:", JSON.stringify(error)); // ← ADD THIS
    if (error) throw error;

    try {
      // 1. Check early_access_users table
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();

      if (!res.ok || !data.exists) {
        setErrorMsg(isAr ? "هذا الإيميل غير مسجل." : "This email is not registered.");
        setStatus("error");
        return;
      }

      // 2. Send magic link via Supabase Auth
      // Note: Supabase will auto-create the auth user on first OTP if not exists
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}/${locale}/dashboard`,
        },
      });
      // ✅ ADD THIS temporarily
      console.log("OTP error:", error);
      console.log("OTP error message:", error?.message);
      console.log("OTP error status:", error?.status);

      if (error) throw error;

      setSuccessMsg(
        isAr
          ? "تم إرسال رابط الدخول على إيميلك ✉️"
          : "Magic link sent! Check your inbox ✉️"
      );
      setStatus("idle");

    } catch {
      setErrorMsg(
        isAr
          ? "حدث خطأ، حاول مرة أخرى."
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  // ── Google OAuth ─────────────────────────────────────────────────────────────
  async function handleGoogleLogin() {
    setStatus("loading");
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/${locale}/dashboard`,
        },
      });
      if (error) throw error;
    } catch {
      setErrorMsg(
        isAr
          ? "حدث خطأ، حاول مرة أخرى."
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center mt-10 px-4 py-12 sm:py-20 lg:py-28 max-w-3xl mx-auto w-full text-center">

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-[480px]"
        >
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#2B2D42] mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-[#BFC0C0] mb-10">
            {t("desc")}
          </p>

          {/* Google button — on top */}
          <button
            onClick={handleGoogleLogin}
            disabled={status === "loading"}
            className={`${btnOutline} mb-6`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.5-2.9-11.3-7.1l-6.6 5.1C9.6 39.6 16.3 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.3-4.4 5.7l6.2 5.2C40.9 35.5 44 30.1 44 24c0-1.3-.1-2.7-.4-4z" />
            </svg>
            {t("googleBtn")}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#BFC0C0]/20" />
            <span className="text-sm text-[#BFC0C0]">{t("orWith")}</span>
            <div className="flex-1 h-px bg-[#BFC0C0]/20" />
          </div>

          {/* Magic link form */}
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4 mb-2">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#BFC0C0]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                placeholder={t("emailPlaceholder")}
                required
                className={`${inputClass} pl-12`}
              />
            </div>

            <button type="submit" disabled={status === "loading"} className={btnPrimary}>
              {status === "loading" ? t("loading") : t("continueEmail")}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>

          {/* Feedback */}
          {errorMsg && <p className="text-red-500 text-sm text-center mt-2">{errorMsg}</p>}
          {successMsg && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 text-sm text-center mt-2 font-medium"
            >
              {successMsg}
            </motion.p>
          )}

          {/* Signup link */}
          <div className="mt-8 pt-6 border-t border-[#BFC0C0]/20">
            <p className="text-sm text-[#BFC0C0]">
              {t("noAccount")}{" "}
              <Link href={`/signup`} className="text-[#F4A259] font-semibold hover:underline">
                {t("signupLink")}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}