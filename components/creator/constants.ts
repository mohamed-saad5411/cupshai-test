// Shai pricing — see lib/shai.ts for tier calculation logic
// Default tiers for Basic=40: Basic 40, Strong 100, Legendary 200, Custom
export { calculateShaiTiers, SHAI_DEFAULT } from "@/lib/shai";

// Mock creator data for prototype
export const mockCreator = {
  name: "Ahmed Shalaby",
  nameAr: "أحمد شلبي",
  username: "ahmedshalaby",
  founderNumber: 7,
  bio: "Digital artist & illustrator based in Cairo. I create illustrations, character designs, and visual stories that celebrate Egyptian culture.",
  bioAr: "فنان رقمي ومصور مقيم في القاهرة. أصنع رسومات وتصميمات شخصيات وقصص مرئية تحتفي بالثقافة المصرية.",
  category: "Digital Artist",
  categoryAr: "فنان رقمي",
  avatar: null,
  coverColor: "#2DAA8F",
  recentSupporters: [] as { name: string; amount: number; message?: string }[],
};
