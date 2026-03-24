"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Logo from "@/components/shared/Logo";
import { useState } from "react";

const navItems = [
  {
    key: "home",
    href: "/dashboard",
    label: "Home",
    labelAr: "الرئيسية",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "viewPage",
    href: "/dashboard/username",
    label: "View page",
    labelAr: "عرض الصفحة",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const monetizeItems = [
  {
    key: "supporters",
    href: "/dashboard/supporters",
    label: "Supporters",
    labelAr: "الداعمون",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "referrals",
    href: "/dashboard/referrals",
    label: "Referrals",
    labelAr: "الإحالات",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="20" y1="8" x2="20" y2="14" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="23" y1="11" x2="17" y2="11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const settingsItems = [
  {
    key: "verification",
    href: "/dashboard/verification",
    label: "Verification",
    labelAr: "التوثيق",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "buttons",
    href: "/dashboard/buttons",
    label: "Buttons & Graphics",
    labelAr: "الأزرار والرسومات",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="8.5" r="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "payouts",
    href: "/dashboard/payouts",
    label: "Payouts",
    labelAr: "المدفوعات",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "settings",
    href: "/dashboard/settings",
    label: "Settings",
    labelAr: "الإعدادات",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function DashboardSidebarRes() {
  const locale = useLocale();
  const pathname = usePathname();
  const isAr = locale === "ar";

  function isActive(href: string) {
    const fullHref = `/${locale}${href}`;
    if (href === "/dashboard") {
      return pathname === fullHref;
    }
    return pathname.startsWith(fullHref);
  }

  function renderItem(item: (typeof navItems)[0] & { external?: boolean }) {
    const active = !item.external && isActive(item.href);
    const label = isAr ? item.labelAr : item.label;
    const href = item.external ? `/${locale}/${item.href}` : `/${locale}${item.href}`;
    // setMobileOpen(mobileOpen)
    return (
      <Link
        key={item.key}
        href={href}
        // target={item.external ? "" : undefined}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active
          ? "bg-orange/10 text-orange"
          : "text-dark/60 hover:bg-dark/5 hover:text-dark"
          }`}
      >
        {item.icon}
        <span>{label}</span>
        {item.external && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 ms-auto opacity-40">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Link>
    );
  }

  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === "en" ? "ar" : "en";
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);



  return <>
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-silver-light/60">
      <div className="max-w-[1040px] mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        <Logo locale={locale} />

        {/* Desktop nav */}
        {/* <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium px-3.5 py-2 rounded-full transition-all duration-200 ${pathname === link.href
                  ? "text-dark bg-silver-light/50"
                  : "text-dark/55 hover:text-dark hover:bg-silver-light/30"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div> */}

        <div className="flex items-center gap-2.5">
          <Link
            href={newPath}
            className="text-sm font-medium px-3.5 py-1.5 rounded-full text-dark/50 hover:text-dark hover:bg-silver-light/40 transition-all duration-200"
          >
            {locale === "en" ? "العربية" : "EN"}
          </Link>
          <Link
            href={`/${locale}`}
            className="text-sm font-semibold px-5 py-2 bg-dark text-white rounded-full hover:bg-dark-soft transition-colors duration-150"
          >
            {t("joinWaitlist")}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-silver-light/40 transition-colors"
            aria-label="Menu"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d={mobileOpen ? "M1 1l16 12M1 13L17 1" : "M0 1h18M0 7h18M0 13h18"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-silver-light/60 animate-fade-in">
          <div className="px-5 py-4 space-y-1">
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {navItems.map(renderItem)}

              {/* Monetize section */}
              <div className="pt-4 pb-1">
                <p className="px-3 text-xs font-semibold text-dark/30 uppercase tracking-wider">
                  {isAr ? "تحقيق الدخل" : "Monetize"}
                </p>
              </div>
              {monetizeItems.map(renderItem)}

              {/* Settings section */}
              <div className="pt-4 pb-1">
                <p className="px-3 text-xs font-semibold text-dark/30 uppercase tracking-wider">
                  {isAr ? "الإعدادات" : "Settings"}
                </p>
              </div>
              {settingsItems.map(renderItem)}
            </nav>
          </div>
        </div>
      )}
    </nav>
  </>
  // <nav className="w-full bg-white top-0 flex">
  //   {/* Logo */}
  //   <div className="px-5 py-5 border-b border-gray-light">
  //     <Logo locale={locale} />
  //   </div>

  //   {/* Navigation */}
  //   <nav className=" overflow-y-auto px-3 py-4 space-y-1">
  //     {navItems.map(renderItem)}

  //     {/* Monetize section */}
  //     <div className="pt-4 pb-1">
  //       <p className="px-3 text-xs font-semibold text-dark/30 uppercase tracking-wider">
  //         {isAr ? "تحقيق الدخل" : "Monetize"}
  //       </p>
  //     </div>
  //     {monetizeItems.map(renderItem)}

  //     {/* Settings section */}
  //     <div className="pt-4 pb-1">
  //       <p className="px-3 text-xs font-semibold text-dark/30 uppercase tracking-wider">
  //         {isAr ? "الإعدادات" : "Settings"}
  //       </p>
  //     </div>
  //     {settingsItems.map(renderItem)}
  //   </nav>

  //   {/* Bottom user area */}
  //   <div className="px-4 py-4 border-t border-gray-light">
  //     <div className="flex items-center gap-3">
  //       <div className="w-9 h-9 rounded-full bg-orange/20 flex items-center justify-center text-lg">
  //         ☕
  //       </div>
  //       <div className="min-w-0 flex-1">
  //         <p className="text-sm font-semibold text-dark truncate">Creator</p>
  //         <p className="text-xs text-dark/40 truncate">cupshai.com/username</p>
  //       </div>
  //     </div>
  //   </div>
  // </nav>

}
