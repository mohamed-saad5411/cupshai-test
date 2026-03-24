"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

export default function SettingsPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [coverColor, setCoverColor] = useState("#2DAA8F");

  const COVER_COLORS = ["#2DAA8F", "#F0851D", "#8B5CF6", "#EC4899", "#3B82F6", "#1E1E1E"];

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-dark mb-8">
        {isAr ? "الإعدادات" : "Settings"}
      </h1>

      {/* Profile section */}
      <div className="bg-white rounded-2xl border border-gray-light p-6 mb-6">
        <h2 className="font-bold text-dark mb-5">
          {isAr ? "الملف الشخصي" : "Profile"}
        </h2>

        {/* Avatar */}
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full bg-orange/20 flex items-center justify-center text-3xl">
            ☕
          </div>
          <div>
            <button className="px-4 py-2 bg-dark text-white text-sm font-semibold rounded-xl hover:bg-dark/90 transition-colors">
              {isAr ? "رفع صورة" : "Upload photo"}
            </button>
            <p className="text-xs text-dark/30 mt-1">
              {isAr ? "JPG, PNG بحد أقصى 5MB" : "JPG, PNG max 5MB"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Display name */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              {isAr ? "الاسم المعروض" : "Display name"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isAr ? "اسمك" : "Your name"}
              className="w-full border border-gray-light rounded-xl px-4 py-3 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              {isAr ? "اسم المستخدم" : "Username"}
            </label>
            <div className="flex items-center border border-gray-light rounded-xl overflow-hidden focus-within:border-orange transition-colors">
              <span className="px-4 py-3 bg-cream text-sm text-dark/40 border-e border-gray-light">
                cupshai.com/
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="flex-1 px-4 py-3 text-sm text-dark focus:outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              {isAr ? "النبذة التعريفية" : "Bio"}
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={isAr ? "اكتب نبذة عنك..." : "Tell your supporters about yourself..."}
              rows={4}
              className="w-full border border-gray-light rounded-xl px-4 py-3 text-sm text-dark focus:outline-none focus:border-orange transition-colors resize-none"
            />
          </div>

          {/* Cover color */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-2">
              {isAr ? "لون الغلاف" : "Cover color"}
            </label>
            <div className="flex items-center gap-3">
              {COVER_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setCoverColor(color)}
                  className={`w-10 h-10 rounded-full border-3 transition-all ${
                    coverColor === color ? "border-dark scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <button className="mt-6 px-6 py-3 bg-orange text-white text-sm font-bold rounded-full hover:bg-orange/90 transition-colors">
          {isAr ? "حفظ التغييرات" : "Save changes"}
        </button>
      </div>

      {/* Page settings */}
      <div className="bg-white rounded-2xl border border-gray-light p-6 mb-6">
        <h2 className="font-bold text-dark mb-4">
          {isAr ? "إعدادات الصفحة" : "Page settings"}
        </h2>

        <div className="space-y-4">
          {[
            {
              label: isAr ? "إظهار عدد الداعمين" : "Show supporter count",
              desc: isAr ? "اعرض عدد الداعمين على صفحتك" : "Display supporter count on your page",
            },
            {
              label: isAr ? "إظهار المبالغ" : "Show amounts",
              desc: isAr ? "اعرض مبالغ الدعم علنياً" : "Show support amounts publicly",
            },
            {
              label: isAr ? "السماح بالرسائل" : "Allow messages",
              desc: isAr ? "اسمح للداعمين بإرسال رسائل" : "Let supporters send messages with tips",
            },
          ].map((setting, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-light last:border-0">
              <div>
                <p className="text-sm font-semibold text-dark">{setting.label}</p>
                <p className="text-xs text-dark/40">{setting.desc}</p>
              </div>
              <button className="w-12 h-7 bg-orange rounded-full relative transition-colors">
                <span className="absolute end-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-200 p-6">
        <h2 className="font-bold text-red-600 mb-2">
          {isAr ? "منطقة الخطر" : "Danger zone"}
        </h2>
        <p className="text-sm text-dark/40 mb-4">
          {isAr
            ? "هذه الإجراءات لا يمكن التراجع عنها."
            : "These actions cannot be undone."}
        </p>
        <button className="px-5 py-2.5 border border-red-300 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors">
          {isAr ? "حذف الحساب" : "Delete account"}
        </button>
      </div>
    </div>
  );
}
