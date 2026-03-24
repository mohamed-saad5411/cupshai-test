import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Logo from "./Logo";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/cupshai.co/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/Cupshai",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Cupshai",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@cupshai",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-dark-teal text-white relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

      <div className="relative max-w-[1040px] mx-auto px-5 sm:px-6 pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo locale={locale} white />
            <p className="mt-4 text-white/45 text-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
            <div className="flex gap-2.5 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/45 hover:text-orange hover:bg-white/15 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
              {locale === "ar" ? "المنصة" : "Product"}
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li><Link href={`/${locale}/home`} className="hover:text-orange transition-colors duration-200">{locale === "ar" ? "الرئيسية" : "Home"}</Link></li>
              <li><Link href={`/${locale}/compare`} className="hover:text-orange transition-colors duration-200">{locale === "ar" ? "لماذا كوبشاي" : "Why Cupshai"}</Link></li>
              <li><Link href={`/${locale}`} className="hover:text-orange transition-colors duration-200">{locale === "ar" ? "ابدأ مجاناً" : "Start for free"}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
              {locale === "ar" ? "الشركة" : "Company"}
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li><Link href={`/${locale}/about`} className="hover:text-orange transition-colors duration-200">{locale === "ar" ? "من نحن" : "About us"}</Link></li>
              <li><Link href={`/${locale}/help`} className="hover:text-orange transition-colors duration-200">{locale === "ar" ? "مركز المساعدة" : "Help center"}</Link></li>
              <li><Link href={`/${locale}/terms`} className="hover:text-orange transition-colors duration-200">{locale === "ar" ? "الشروط والأحكام" : "Terms"}</Link></li>
              <li><Link href={`/${locale}/privacy`} className="hover:text-orange transition-colors duration-200">{locale === "ar" ? "سياسة الخصوصية" : "Privacy"}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
              {locale === "ar" ? "تواصل معنا" : "Contact"}
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <a href="mailto:support@cupshai.com" className="hover:text-orange transition-colors duration-200">
                  support@cupshai.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/cupshai.co/" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors duration-200">
                  @cupshai.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
          <p>&copy; {new Date().getFullYear()} Cupshai. {t("rights")}</p>
          <p>{t("madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
