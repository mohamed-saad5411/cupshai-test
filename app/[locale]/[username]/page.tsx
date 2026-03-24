"use client";
import { useLocale } from "next-intl";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CreatorCover from "@/components/creator/CreatorCover";
import CreatorProfile from "@/components/creator/CreatorProfile";
// import TipPanel from "@/components/creator/TipPanel";

export default function CreatorPage({ params }: { params: Promise<{ creator: string }> }) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-cream">
        <CreatorCover />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 pb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            <CreatorProfile />
            <div className="lg:w-80 mt-20 shrink-0 space-y-4">
              {/* <TipPanel /> */}
              {/* More ways to earn — coming soon */}
              <div className="bg-white border border-gray-light rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">☕</div>
                <p className="font-semibold text-dark text-sm">
                  {isAr ? "طرق أكثر للكسب قريباً" : "More ways to earn coming soon"}
                </p>
                <p className="text-dark/40 text-xs mt-1">
                  {isAr
                    ? "حالياً الإكراميات فقط — الاشتراكات والمنتجات الرقمية قادمة"
                    : "Only tips for now — subscriptions & digital products are coming"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

    </>
  );
}
