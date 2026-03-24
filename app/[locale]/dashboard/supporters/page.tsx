"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SupporterHeader from "@/components/supporter/SupporterHeader";
import OverviewTab from "@/components/supporter/OverviewTab";
import BadgesTab from "@/components/supporter/BadgesTab";
import ActivityTab from "@/components/supporter/ActivityTab";

export default function SupporterPage() {
  const t = useTranslations("supporter");
  const [activeTab, setActiveTab] = useState<"overview" | "badges" | "activity">("overview");

  return (
    <>
      {/* <Navbar /> */}
      <main className="pt-16 min-h-screen bg-cream">
        <SupporterHeader />

        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 bg-white border border-gray-light rounded-xl p-1 -mt-5 shadow-sm">
            {(["overview", "badges", "activity"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-orange text-white"
                    : "text-dark/50 hover:text-dark"
                }`}
              >
                {t(`tab_${tab}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "badges" && <BadgesTab />}
          {activeTab === "activity" && <ActivityTab />}
        </div>
      </main>
      <Footer />
    </>
  );
}
