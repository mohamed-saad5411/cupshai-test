"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

const BUTTON_STYLES = [
  { id: "default", color: "#F0851D", label: "Orange" },
  { id: "teal", color: "#2DAA8F", label: "Teal" },
  { id: "dark", color: "#1E1E1E", label: "Dark" },
  { id: "purple", color: "#8B5CF6", label: "Purple" },
  { id: "pink", color: "#EC4899", label: "Pink" },
];

export default function ButtonsPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [selectedColor, setSelectedColor] = useState("default");
  const [copied, setCopied] = useState(false);

  const activeColor = BUTTON_STYLES.find((b) => b.id === selectedColor)!;

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const profileUrl = "cupshai.com/username";

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-dark mb-2">
        {isAr ? "الأزرار والرسومات" : "Buttons & Graphics"}
      </h1>
      <p className="text-sm text-dark/50 mb-8">
        {isAr
          ? "أضف أزرار الدعم لموقعك أو سيرتك الذاتية."
          : "Add support buttons to your website or bio."}
      </p>

      {/* Profile link */}
      <div className="bg-white rounded-2xl border border-gray-light p-6 mb-6">
        <h2 className="font-bold text-dark mb-3">
          {isAr ? "رابط صفحتك" : "Your page link"}
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-cream rounded-xl px-4 py-3 text-sm text-dark font-mono">
            {profileUrl}
          </div>
          <button
            onClick={() => handleCopy(`https://${profileUrl}`)}
            className="px-5 py-3 bg-dark text-white text-sm font-semibold rounded-xl hover:bg-dark/90 transition-colors"
          >
            {copied ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ" : "Copy")}
          </button>
        </div>
      </div>

      {/* Button customization */}
      <div className="bg-white rounded-2xl border border-gray-light p-6 mb-6">
        <h2 className="font-bold text-dark mb-4">
          {isAr ? "زر الدعم" : "Support button"}
        </h2>

        {/* Color picker */}
        <div className="flex items-center gap-3 mb-6">
          {BUTTON_STYLES.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedColor(btn.id)}
              className={`w-10 h-10 rounded-full border-3 transition-all ${
                selectedColor === btn.id ? "border-dark scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: btn.color }}
              title={btn.label}
            />
          ))}
        </div>

        {/* Preview */}
        <div className="bg-cream rounded-xl p-8 flex items-center justify-center mb-4">
          <button
            className="flex items-center gap-2 px-6 py-3 text-white text-sm font-bold rounded-full transition-colors"
            style={{ backgroundColor: activeColor.color }}
          >
            ☕ {isAr ? "ادعمني على كبشاي" : "Support me on Cupshai"}
          </button>
        </div>

        {/* Embed code */}
        <div>
          <p className="text-sm font-semibold text-dark mb-2">
            {isAr ? "كود التضمين" : "Embed code"}
          </p>
          <div className="relative">
            <pre className="bg-dark text-cream text-xs p-4 rounded-xl overflow-x-auto">
              {`<a href="https://${profileUrl}" target="_blank"
  style="background:${activeColor.color};color:#fff;padding:12px 24px;
  border-radius:9999px;font-weight:bold;text-decoration:none;
  font-family:sans-serif;font-size:14px;display:inline-flex;
  align-items:center;gap:8px">
  ☕ Support me on Cupshai
</a>`}
            </pre>
            <button
              onClick={() =>
                handleCopy(
                  `<a href="https://${profileUrl}" target="_blank" style="background:${activeColor.color};color:#fff;padding:12px 24px;border-radius:9999px;font-weight:bold;text-decoration:none;font-family:sans-serif;font-size:14px;display:inline-flex;align-items:center;gap:8px">☕ Support me on Cupshai</a>`
                )
              }
              className="absolute top-3 end-3 px-3 py-1.5 bg-white/10 text-cream text-xs rounded-lg hover:bg-white/20 transition-colors"
            >
              {copied ? "✓" : isAr ? "نسخ" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* QR Code placeholder */}
      <div className="bg-white rounded-2xl border border-gray-light p-6">
        <h2 className="font-bold text-dark mb-3">
          {isAr ? "رمز QR" : "QR Code"}
        </h2>
        <div className="bg-cream rounded-xl p-8 flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-white rounded-xl border-2 border-gray-light flex items-center justify-center mb-3">
            <span className="text-3xl">📱</span>
          </div>
          <p className="text-sm text-dark/40">
            {isAr ? "رمز QR لصفحتك — قريباً" : "QR code for your page — coming soon"}
          </p>
        </div>
      </div>
    </div>
  );
}
