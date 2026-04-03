"use client";
import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import type { AdminData, Tab } from "@/components/admin/types";
import AdminLogin from "@/components/admin/AdminLogin";
import OverviewTab from "@/components/admin/OverviewTab";
import WaitlistTab from "@/components/admin/WaitlistTab";
import EarlyAccessTab from "@/components/admin/EarlyAccessTab";
import UsersTab from "@/components/admin/UsersTab";
import CreatorsTab from "@/components/admin/CreatorsTab";
import TipsTab from "@/components/admin/TipsTab";

export default function AdminPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchData = useCallback(async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        headers: { "x-admin-password": pwd },
      });
      if (res.status === 401) {
        setError(isAr ? "كلمة المرور غير صحيحة" : "Wrong password");
        setAuthenticated(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
      setAuthenticated(true);
      setLastRefresh(new Date());
    } catch {
      setError(isAr ? "فشل في تحميل البيانات" : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [isAr]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(password);
  };

  const refresh = () => fetchData(password);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!authenticated) return;
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [authenticated, password]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  // Password gate
  if (!authenticated) {
    return (
      <AdminLogin
        isAr={isAr}
        password={password}
        setPassword={setPassword}
        loading={loading}
        error={error}
        onSubmit={handleLogin}
      />
    );
  }

  if (!data) return null;

  const { stats } = data;

  const tabs: { key: Tab; label: string; labelAr: string; count?: number }[] = [
    { key: "overview", label: "Overview", labelAr: "نظرة عامة" },
    { key: "waitlist", label: "Waitlist", labelAr: "قائمة الانتظار", count: stats.waitlist },
    { key: "earlyAccess", label: "Early Access", labelAr: "الوصول المبكر", count: stats.earlyAccess },
    { key: "users", label: "Users", labelAr: "المستخدمون", count: stats.users },
    { key: "creators", label: "Creators", labelAr: "صناع المحتوى", count: stats.creators },
    { key: "tips", label: "Tips", labelAr: "الدعم", count: stats.tips },
  ];

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-dark text-cream">
      {/* Top bar */}
      <div className="border-b border-cream/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">☕</span>
          <h1 className="text-lg font-bold">{isAr ? "لوحة تحكم Cupshai" : "Cupshai Admin"}</h1>
          {!data.dbConnected && (
            <span className="px-2.5 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
              {isAr ? "قاعدة البيانات غير متصلة" : "DB not connected"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {lastRefresh && (
            <span className="text-xs text-cream/30">
              {isAr ? "آخر تحديث:" : "Updated:"} {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={refresh}
            disabled={loading}
            className="px-4 py-2 text-sm bg-cream/10 rounded-lg hover:bg-cream/20 transition-colors disabled:opacity-50"
          >
            {loading ? "..." : (isAr ? "تحديث" : "Refresh")}
          </button>
          <button
            onClick={() => { setAuthenticated(false); setData(null); setPassword(""); }}
            className="px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            {isAr ? "خروج" : "Logout"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-cream/10 px-6 flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-orange text-orange"
                : "border-transparent text-cream/50 hover:text-cream/80"
            }`}
          >
            {isAr ? tab.labelAr : tab.label}
            {tab.count !== undefined && (
              <span className={`ms-2 px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.key ? "bg-orange/20 text-orange" : "bg-cream/10 text-cream/40"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {activeTab === "overview" && <OverviewTab stats={stats} isAr={isAr} />}
        {activeTab === "waitlist" && <WaitlistTab entries={data.data.waitlist} isAr={isAr} formatDate={formatDate} />}
        {activeTab === "earlyAccess" && <EarlyAccessTab entries={data.data.earlyAccess} isAr={isAr} formatDate={formatDate} />}
        {activeTab === "users" && <UsersTab entries={data.data.users} isAr={isAr} formatDate={formatDate} />}
        {activeTab === "creators" && <CreatorsTab entries={data.data.creators} isAr={isAr} formatDate={formatDate} />}
        {activeTab === "tips" && <TipsTab entries={data.data.tips} isAr={isAr} formatDate={formatDate} />}
      </div>
    </div>
  );
}
