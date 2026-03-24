"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === "en" ? "ar" : "en";
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}/home`, label: t("home") },
    { href: `/${locale}/compare`, label: t("compare") },
    { href: `/${locale}/about`, label: locale === "ar" ? "من نحن" : "About" },
    { href: `/${locale}/help`, label: locale === "ar" ? "مساعدة" : "Help" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-silver-light/60">
      <div className="max-w-[1040px] mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        <Logo locale={locale} />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium px-3.5 py-2 rounded-full transition-all duration-200 ${
                pathname === link.href
                  ? "text-dark bg-silver-light/50"
                  : "text-dark/55 hover:text-dark hover:bg-silver-light/30"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

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
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                  pathname === link.href
                    ? "text-dark bg-silver-light/50"
                    : "text-dark/55 hover:text-dark hover:bg-silver-light/30"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
