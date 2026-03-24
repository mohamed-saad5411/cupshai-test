
import type { Metadata } from "next";
import { Inter, Cairo, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Cupshai — Support Arab Creators",
  description:
    "Cupshai is the first creator monetization platform built for Egypt and the Arab world. Support your favorite creators with tips, subscriptions, and more.",
  keywords: [
    "creator",
    "Egypt",
    "MENA",
    "tips",
    "support",
    "Arabic",
    "منصة مبدعين",
    "مصر",
  ],
  openGraph: {
    title: "Cupshai — Support Arab Creators",
    description:
      "The first creator support platform built for Egypt and the Arab world.",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const isArabic = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${inter.variable} ${cairo.variable} ${manrope.variable}`}
    >
      <body
        className={`antialiased ${isArabic ? "font-cairo" : "font-inter"} bg-cream text-dark`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

