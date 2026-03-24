"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RegisterStepOne } from "@/components/auth/RegisterStepOne";
import { RegisterStepTwo } from "@/components/auth/RegisterStepTwo";
import { RegisterStepThree } from "@/components/auth/RegisterStepThree";
import { useTranslations } from "next-intl";
import { useAuthSession } from "@/hooks/useAuthSession";
import { persistSession } from "@/lib/auth-storage";

type Step = 1 | 2 | 3;

export function EarlyAccessWizard({ locale }: { locale: string }) {
  const router = useRouter();
  const t = useTranslations("earlyAccess");
  const { isLoggedIn } = useAuthSession();
  void locale;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const checkEmail = async () => {
    const emailValue = email.trim();
    if (!emailValue) return false;
    const res = await fetch(
      `/api/auth?check=email&email=${encodeURIComponent(emailValue)}`,
      { method: "GET" },
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Unable to validate email");
      return false;
    }
    if (data.available === false) {
      setError("User already registered");
      return false;
    }
    return true;
  };

  const checkUsername = async (value: string) => {
    const v = value.trim();
    if (!v || v.length < 3) {
      setUsernameAvailable(null);
      return;
    }
    setCheckingUsername(true);
    try {
      const res = await fetch(
        `/api/auth?check=username&username=${encodeURIComponent(v)}`,
        { method: "GET" },
      );
      const data = await res.json();
      if (res.ok) {
        setUsernameAvailable(Boolean(data.available));
      } else {
        setUsernameAvailable(null);
      }
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleRegister = async () => {
    setError(null);
    setLoading(true);
    try {
      if (usernameAvailable === false) {
        setError("Username already used");
        return;
      }
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "signup",
          email: email.trim(),
          password,
          fullName: fullName.trim() || undefined,
          phone: phone.trim() || undefined,
          username: username.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Sign up failed");
        return;
      }
      if (data.session?.access_token && typeof window !== "undefined") {
        persistSession(data.session.access_token, data.session.refresh_token ?? null);
      }
      router.push(`/${locale}`);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div id="early-access" className="lg:w-[50%] w-[90%] m-auto pb-16">
        <h1 className="text-4xl sm:text-5xl md:text-[56px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#2B2D42] mb-6">
          {t("loggedInHeadline")}
        </h1>
        <p className="text-lg sm:text-xl text-[#BFC0C0] mb-10">{t("loggedInDesc")}</p>
        <Link
          href={`/${locale}/dashboard`}
          className="inline-flex items-center justify-center rounded-full h-12 px-8 bg-[#2B2D42] text-white text-sm font-semibold hover:bg-[#1f2133] transition-colors"
        >
          {t("goToDashboard")}
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* w-full max-w-[480px] */}
      <div id="early-access" className="lg:w-[50%] w-[90%]  m-auto ">
      <h1 className="text-4xl sm:text-5xl md:text-[56px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#2B2D42] mb-6">
        {t("step1Title")}
      </h1>
      <p className="text-lg sm:text-xl text-[#BFC0C0] mb-10">
        {t("step1Desc")}
      </p>

      {step === 1 && (
        <RegisterStepOne
          email={email}
          password={password}
          onChange={(field, value) => {
            if (field === "email") setEmail(value);
            if (field === "password") setPassword(value);
          }}
          onNext={async () => {
            setError(null);
            const ok = await checkEmail();
            if (ok) setStep(2);
          }}
          loading={loading}
          error={error}
        />
      )}

      {step === 2 && (
        <RegisterStepTwo
          fullName={fullName}
          phone={phone}
          onChange={(field, value) => {
            if (field === "fullName") setFullName(value);
            if (field === "phone") setPhone(value);
          }}
          onNext={() => {
            setError(null);
            setStep(3);
          }}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <RegisterStepThree
          username={username}
          onChange={(v) => {
            setUsername(v);
            setError(null);
            void checkUsername(v);
          }}
          onBack={() => setStep(2)}
          onSubmit={handleRegister}
          loading={loading}
          error={
            error ??
            (usernameAvailable === false
              ? "Username already used"
              : checkingUsername
                ? "Checking username…"
                : null)
          }
        />
      )}
    </div>
    </>
  );
}

