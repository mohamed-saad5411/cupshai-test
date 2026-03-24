"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { mockCreator } from "./constants";

export default function CreatorCover() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return <>
    <div
      className=" w-full relative "
      style={{ backgroundColor: mockCreator.coverColor }}
    >
      <Link
        href={`/${locale}/dashboard`}
        className="absolute top-4 end-4 flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm text-dark text-sm font-semibold rounded-full hover:bg-white transition-all shadow-sm"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
          <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {isAr ? "لوحة التحكم" : "Dashboard"}
      </Link>
    </div>
  </>;
}
