// KYC verification tiers and status definitions

export type KYCStatus = "not_started" | "pending_review" | "basic_verified" | "full_verified" | "rejected";

export const KYC_STATUS_CONFIG: Record<KYCStatus, {
  label: string;
  labelAr: string;
  color: string;
  bgColor: string;
  icon: string;
}> = {
  not_started: {
    label: "Not Verified",
    labelAr: "غير موثق",
    color: "text-dark/40",
    bgColor: "bg-gray-light",
    icon: "⚪",
  },
  pending_review: {
    label: "Under Review",
    labelAr: "قيد المراجعة",
    color: "text-orange",
    bgColor: "bg-orange/10",
    icon: "🔄",
  },
  basic_verified: {
    label: "Basic Verified",
    labelAr: "توثيق أساسي",
    color: "text-teal",
    bgColor: "bg-teal/10",
    icon: "✓",
  },
  full_verified: {
    label: "Fully Verified",
    labelAr: "توثيق كامل",
    color: "text-teal",
    bgColor: "bg-teal/10",
    icon: "✓✓",
  },
  rejected: {
    label: "Rejected",
    labelAr: "مرفوض",
    color: "text-red-500",
    bgColor: "bg-red-50",
    icon: "✗",
  },
};

// Egyptian governorates
export const GOVERNORATES = [
  { en: "Cairo", ar: "القاهرة" },
  { en: "Giza", ar: "الجيزة" },
  { en: "Alexandria", ar: "الإسكندرية" },
  { en: "Qalyubia", ar: "القليوبية" },
  { en: "Dakahlia", ar: "الدقهلية" },
  { en: "Sharqia", ar: "الشرقية" },
  { en: "Gharbia", ar: "الغربية" },
  { en: "Monufia", ar: "المنوفية" },
  { en: "Beheira", ar: "البحيرة" },
  { en: "Kafr El Sheikh", ar: "كفر الشيخ" },
  { en: "Damietta", ar: "دمياط" },
  { en: "Port Said", ar: "بور سعيد" },
  { en: "Ismailia", ar: "الإسماعيلية" },
  { en: "Suez", ar: "السويس" },
  { en: "Fayoum", ar: "الفيوم" },
  { en: "Beni Suef", ar: "بني سويف" },
  { en: "Minya", ar: "المنيا" },
  { en: "Assiut", ar: "أسيوط" },
  { en: "Sohag", ar: "سوهاج" },
  { en: "Qena", ar: "قنا" },
  { en: "Luxor", ar: "الأقصر" },
  { en: "Aswan", ar: "أسوان" },
  { en: "Red Sea", ar: "البحر الأحمر" },
  { en: "New Valley", ar: "الوادي الجديد" },
  { en: "Matruh", ar: "مطروح" },
  { en: "North Sinai", ar: "شمال سيناء" },
  { en: "South Sinai", ar: "جنوب سيناء" },
];

// Egyptian banks
export const EGYPTIAN_BANKS = [
  { en: "National Bank of Egypt", ar: "البنك الأهلي المصري" },
  { en: "Banque Misr", ar: "بنك مصر" },
  { en: "Commercial International Bank (CIB)", ar: "البنك التجاري الدولي" },
  { en: "QNB Alahli", ar: "بنك قطر الوطني الأهلي" },
  { en: "HSBC Egypt", ar: "اتش اس بي سي مصر" },
  { en: "Arab African International Bank", ar: "البنك العربي الأفريقي الدولي" },
  { en: "Faisal Islamic Bank", ar: "بنك فيصل الإسلامي" },
  { en: "Bank of Alexandria", ar: "بنك الإسكندرية" },
  { en: "Egyptian Gulf Bank", ar: "بنك الخليج المصري" },
  { en: "Crédit Agricole Egypt", ar: "كريدي أجريكول مصر" },
  { en: "Abu Dhabi Islamic Bank", ar: "مصرف أبوظبي الإسلامي" },
  { en: "Al Baraka Bank", ar: "بنك البركة" },
  { en: "Other", ar: "أخرى" },
];

// KYC withdrawal limits per tier
export const KYC_LIMITS = {
  not_started: { daily: 0, monthly: 0 },
  pending_review: { daily: 0, monthly: 0 },
  basic_verified: { daily: 5000, monthly: 25000 }, // EGP
  full_verified: { daily: 50000, monthly: 500000 },
  rejected: { daily: 0, monthly: 0 },
};

// Mock KYC data for prototype
export const mockKYC = {
  status: "not_started" as KYCStatus,
  step: 1 as number, // 1=identity, 2=address, 3=bank
  fullNameEn: "",
  fullNameAr: "",
  dateOfBirth: "",
  nationalId: "",
  phone: "",
  phoneVerified: false,
  addressLine1: "",
  city: "",
  governorate: "",
  bankName: "",
  bankAccountName: "",
  bankAccountNum: "",
};
