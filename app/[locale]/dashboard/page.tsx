// import DashboardTopBar from "@/components/creator/DashboardTopBar";
// import { getTranslations } from "next-intl/server";

// export default async function DashboardPage({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params;
//   const isAr = locale === "ar";
//   const t = await getTranslations("auth");

//   return (
//     <div
//       className="min-h-screen bg-[#FAFAF8] text-[#2B2D42] font-[family-name:var(--font-manrope)]"
//       dir={isAr ? "rtl" : "ltr"}
//     >
//       <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//         {/* <DashboardTopBar locale={locale} /> */}
//         <main className="rounded-2xl bg-white p-5 sm:p-7 md:p-8 shadow-sm border border-slate-200">
//           <h1 className="text-2xl md:text-3xl font-semibold text-[#2B2D42] mb-2">
//             {t("dashboard")}
//           </h1>
//           <p className="text-[#BFC0C0] max-w-xl">
//             {isAr
//               ? "هذه لوحة التحكم — يمكنك لاحقاً إضافة الإحصائيات والمدفوعات والمزيد."
//               : "This is your dashboard — stats, payouts, and more will show here as you build."}
//           </p>
//         </main>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardTopBar from "@/components/creator/DashboardTopBar";

// ── Icons ─────────────────────────────────────────────────────────────────────
function IconHome() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
    </svg>
  );
}
function IconExternal() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
function IconShop() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
function IconPen() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="4" rx="1" />
      <rect x="2" y="10" width="20" height="4" rx="1" />
      <rect x="2" y="17" width="20" height="4" rx="1" />
    </svg>
  );
}
function IconZap() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function IconDollar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function IconShare() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
    </svg>
  );
}
function IconInfo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Period = "last_7" | "last_30" | "all_time";

interface DashboardProps {
  locale: string;
  user: {
    name: string;
    username: string;
    avatarInitials: string;
  };
}

// ── Sidebar nav item ──────────────────────────────────────────────────────────
function NavItem({
  icon,
  label,
  active = false,
  href = "#",
  hasChevron = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
  hasChevron?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-3 px-[18px] py-[9px] text-[13px] border-l-2 transition-all",
        active
          ? "border-[#F4A259] bg-[#EDEDE9]/60 text-[#2B2D42] font-medium"
          : "border-transparent text-[#BFC0C0] hover:bg-[#EDEDE9]/40 hover:text-[#2B2D42]",
      ].join(" ")}
    >
      <span className={active ? "opacity-100" : "opacity-60"}>{icon}</span>
      <span className="flex-1">{label}</span>
      {hasChevron && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      )}
    </Link>
  );
}

// ── Earn feature card ─────────────────────────────────────────────────────────
function EarnCard({
  icon,
  title,
  desc,
  btnLabel,
  href = "#",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  btnLabel: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-3 bg-white border border-[#BFC0C0]/20 rounded-xl p-5">
      <div className="w-9 h-9 rounded-lg bg-[#EDEDE9]/60 flex items-center justify-center text-[#2B2D42]/60">
        {icon}
      </div>
      <div>
        <p className="text-[13px] font-medium text-[#2B2D42] mb-1">{title}</p>
        <p className="text-[12px] text-[#BFC0C0] leading-relaxed">{desc}</p>
      </div>
      <Link
        href={href}
        className="flex items-center gap-2 text-[12px] text-[#BFC0C0] hover:text-[#2B2D42] pt-3 border-t border-[#BFC0C0]/15 mt-auto transition-colors"
      >
        {btnLabel}
        <IconArrow />
      </Link>
    </div>
  );
}

// ── Dashboard page ────────────────────────────────────────────────────────────
export default function Dashboard({ locale, user }: DashboardProps) {
  const [period, setPeriod] = useState<Period>("last_30");

  const periodLabel: Record<Period, string> = {
    last_7: "Last 7 days",
    last_30: "Last 30 days",
    all_time: "All time",
  };

  return <>
    {/* <div className="hidden lg:block">
      <DashboardTopBar locale={locale} />
    </div> */}
    <div className="flex min-h-screen bg-[#EDEDE9]/30 font-sans">


      {/* ── Main ── */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 p-6 flex flex-col gap-5 max-w-4xl w-full mx-auto">

          {/* ── Section 1: Greeting + Earnings ── */}
          <div className="bg-white border border-[#BFC0C0]/20 rounded-xl p-6">

            {/* Greeting row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#faeeda] flex items-center justify-center text-[16px] font-medium text-[#854F0B]">
                  {/* {user.avatarInitials} */}
                  <p>user</p>
                </div>
                <div>
                  {/* <p className="text-[15px] font-medium text-[#2B2D42]">Hi, {user.name}</p>
                  <p className="text-[12px] text-[#BFC0C0]">cupshai.com/{user.username}</p> */}
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#2B2D42] text-white text-[13px] font-medium rounded-full hover:bg-[#2B2D42]/90 transition-colors">
                <IconShare />
                Share page
              </button>
            </div>

            {/* Earnings */}
            <div className="flex items-center gap-3 mb-2">
              <p className="text-[14px] font-medium text-[#2B2D42]">Earnings</p>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as Period)}
                className="text-[12px] text-[#2B2D42] border border-[#BFC0C0]/30 rounded-md px-2 py-1 bg-white cursor-pointer focus:outline-none focus:border-[#F4A259]"
              >
                <option value="last_7">Last 7 days</option>
                <option value="last_30">Last 30 days</option>
                <option value="all_time">All time</option>
              </select>
            </div>

            <p className="text-[36px] font-medium text-[#2B2D42] mb-3">$0</p>

            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-2 text-[12px] text-[#BFC0C0]">
                <span className="w-2 h-2 rounded-full bg-[#F4A259] inline-block" />
                $0 Supporters
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#BFC0C0]">
                <span className="w-2 h-2 rounded-full bg-[#ED93B1] inline-block" />
                $0 Membership
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#BFC0C0]">
                <span className="w-2 h-2 rounded-full bg-[#5DCAA5] inline-block" />
                $0 Shop
              </div>
            </div>
          </div>

          {/* ── ************************** Section 2: Setup banner  ************************** ── */}
          {/* <div className="bg-[#EDEDE9]/40 border border-[#BFC0C0]/20 rounded-xl p-7 flex flex-col items-center gap-3 text-center">
            <div className="w-10 h-10 rounded-full border border-[#BFC0C0]/30 flex items-center justify-center text-[#BFC0C0]">
              <IconInfo />
            </div>
            <p className="text-[13px] text-[#BFC0C0] max-w-sm leading-relaxed">
              Your page is currently inactive. Please connect a payout method to make your page live.
            </p>
            <button className="px-8 py-2.5 bg-[#2B2D42] text-white text-[13px] font-medium rounded-full hover:bg-[#2B2D42]/90 transition-colors">
              Setup
            </button>
          </div> */}
          {/* ── ************************** Section 2: Setup banner  ************************** ── */}

          {/* ── Supporters empty state ── */}
          <div className="bg-[#EDEDE9]/40 border border-[#BFC0C0]/20 rounded-xl p-10 flex flex-col items-center gap-3 text-center">
            <div className="text-[#BFC0C0]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-[14px] font-medium text-[#2B2D42]">You don&apos;t have any supporters yet</p>
            <p className="text-[12px] text-[#BFC0C0]">Share your page with your audience to get started.</p>
          </div>

          {/* ── Section 3: More ways to earn ── */}
          <div>
            <p className="text-[16px] font-medium text-[#2B2D42] mb-4">More ways to earn</p>
            <div className="grid grid-cols-3 gap-4">
              <EarnCard
                icon={<IconLock />}
                title="Membership"
                desc="Monthly membership for your biggest fans and supporters."
                btnLabel="Enable"
                href={`/${locale}/dashboard/memberships`}
              />
              <EarnCard
                icon={<IconShop />}
                title="Shop"
                desc="Introducing Shop, the creative way to sell."
                btnLabel="Enable"
                href={`/${locale}/dashboard/shop`}
              />
              <EarnCard
                icon={<IconPen />}
                title="Exclusive posts"
                desc="Publish your best content exclusively for your supporters and members."
                btnLabel="Write a post"
                href={`/${locale}/dashboard/publish`}
              />
            </div>
          </div>

          {/* Footer links */}
          <div className="flex justify-center gap-5 pb-4">
            {["Help Center", "FAQ", "Contact", "Refer a Creator"].map((item) => (
              <Link key={item} href="#" className="text-[12px] text-[#BFC0C0] hover:text-[#2B2D42] transition-colors">
                {item}
              </Link>
            ))}
          </div>

        </main>
      </div>
    </div>
  </>
    ;
}
