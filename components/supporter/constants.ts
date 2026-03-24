// Badge definitions
export const BADGES = [
  { type: "first_cup", icon: "☕", threshold: 1, thresholdType: "tips" as const },
  { type: "regular", icon: "🔥", threshold: 5, thresholdType: "tips" as const },
  { type: "super_fan", icon: "⭐", threshold: 10, thresholdType: "tips" as const },
  { type: "cup_master", icon: "👑", threshold: 25, thresholdType: "tips" as const },
  { type: "big_spender_100", icon: "💰", threshold: 100, thresholdType: "spent" as const },
  { type: "big_spender_500", icon: "💎", threshold: 500, thresholdType: "spent" as const },
  { type: "legend", icon: "🏆", threshold: 1000, thresholdType: "spent" as const },
];

// Unlock tiers
export const UNLOCK_TIERS = [
  { amount: 0, feature: "signup", label: "Track history & collect badges", labelAr: "تتبع سجلك واجمع الشارات" },
  { amount: 0, feature: "comment", label: "Comment on creator pages", labelAr: "علّق على صفحات المبدعين" },
  { amount: 500, feature: "dm", label: "Direct message creators", labelAr: "راسل المبدعين مباشرة" },
];

// DM unlock threshold — per creator, not global
// Supporter must spend 500 EGP on a specific creator to unlock DM with that creator
export const DM_UNLOCK_AMOUNT = 500;

// Mock supporter data for prototype
export const mockSupporter = {
  name: "Mohamed Ali",
  nameAr: "محمد علي",
  email: "mohamed@example.com",
  totalSpent: 275,
  totalTips: 8,
  joinedDate: "2026-03-01",
  unlockedBadges: ["first_cup", "regular", "big_spender_100"],
  supportedCreators: [
    { name: "Ahmed Shalaby", nameAr: "أحمد شلبي", username: "ahmedshalaby", category: "Digital Artist", categoryAr: "فنان رقمي", totalGiven: 150, tips: 5, coverColor: "#2DAA8F" },
    { name: "Sara Mostafa", nameAr: "سارة مصطفى", username: "saramostafa", category: "Educator", categoryAr: "معلمة", totalGiven: 75, tips: 2, coverColor: "#F0851D" },
    { name: "Youssef Kamal", nameAr: "يوسف كمال", username: "youssefkamal", category: "Gamer", categoryAr: "لاعب", totalGiven: 50, tips: 1, coverColor: "#6B4EE6" },
  ],
  recentActivity: [
    { type: "tip" as const, creatorName: "Ahmed Shalaby", creatorNameAr: "أحمد شلبي", amount: 50, date: "2026-03-12", message: "Keep creating!" },
    { type: "badge" as const, badge: "big_spender_100", date: "2026-03-12" },
    { type: "tip" as const, creatorName: "Sara Mostafa", creatorNameAr: "سارة مصطفى", amount: 25, date: "2026-03-10" },
    { type: "tip" as const, creatorName: "Ahmed Shalaby", creatorNameAr: "أحمد شلبي", amount: 25, date: "2026-03-08", message: "Love your work" },
    { type: "badge" as const, badge: "regular", date: "2026-03-08" },
    { type: "tip" as const, creatorName: "Youssef Kamal", creatorNameAr: "يوسف كمال", amount: 50, date: "2026-03-05" },
  ],
};
