"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const POSTS = [
  {
    slug: "why-cupshai",
    title: "Why We Built Cupshai",
    titleAr: "لماذا بنينا كبشاي",
    excerpt: "The Arab creator economy is booming, but creators still struggle to monetize. Here's why we built a platform specifically for Egypt and MENA.",
    excerptAr: "اقتصاد المبدعين العرب يزدهر، لكن المبدعين لا يزالون يكافحون لتحقيق الدخل. إليكم لماذا بنينا منصة مخصصة لمصر والشرق الأوسط.",
    category: "Story",
    categoryAr: "قصتنا",
    date: "2026-03-10",
    readTime: 5,
    coverColor: "#2DAA8F",
    emoji: "☕",
  },
  {
    slug: "creator-tips-egypt",
    title: "5 Ways Egyptian Creators Can Earn More in 2026",
    titleAr: "٥ طرق يمكن للمبدعين المصريين كسب المزيد في ٢٠٢٦",
    excerpt: "From tipping to memberships, here are proven strategies for Arab creators to grow their income this year.",
    excerptAr: "من الإكراميات إلى العضويات، إليكم استراتيجيات مثبتة للمبدعين العرب لزيادة دخلهم هذا العام.",
    category: "Tips",
    categoryAr: "نصائح",
    date: "2026-03-08",
    readTime: 4,
    coverColor: "#F0851D",
    emoji: "💡",
  },
  {
    slug: "founding-creators",
    title: "Meet Our Founding Creators",
    titleAr: "تعرّف على مبدعينا المؤسسين",
    excerpt: "The first wave of creators who believed in Cupshai before anyone else. Their stories, their passion, their vision.",
    excerptAr: "الموجة الأولى من المبدعين الذين آمنوا بكبشاي قبل أي شخص آخر. قصصهم، شغفهم، رؤيتهم.",
    category: "Community",
    categoryAr: "المجتمع",
    date: "2026-03-05",
    readTime: 6,
    coverColor: "#6B4EE6",
    emoji: "🌟",
  },
  {
    slug: "local-payments-egypt",
    title: "The Problem with International Payment Platforms in Egypt",
    titleAr: "مشكلة منصات الدفع الدولية في مصر",
    excerpt: "Why Patreon and Buy Me a Coffee don't work for Egyptian creators — and how local payment methods change everything.",
    excerptAr: "لماذا باتريون و Buy Me a Coffee لا يعملان للمبدعين المصريين — وكيف تغير طرق الدفع المحلية كل شيء.",
    category: "Insights",
    categoryAr: "رؤى",
    date: "2026-03-01",
    readTime: 7,
    coverColor: "#E85D75",
    emoji: "💳",
  },
  {
    slug: "creator-economy-mena",
    title: "The MENA Creator Economy: 2026 Report",
    titleAr: "اقتصاد المبدعين في الشرق الأوسط: تقرير ٢٠٢٦",
    excerpt: "A deep dive into the numbers, trends, and opportunities for content creators across the Arab world.",
    excerptAr: "نظرة عميقة في الأرقام والاتجاهات والفرص لصانعي المحتوى في العالم العربي.",
    category: "Insights",
    categoryAr: "رؤى",
    date: "2026-02-25",
    readTime: 8,
    coverColor: "#1E1E1E",
    emoji: "📊",
  },
  {
    slug: "how-to-share-cupshai-link",
    title: "How to Share Your Cupshai Link Everywhere",
    titleAr: "كيف تشارك رابط كبشاي في كل مكان",
    excerpt: "Instagram bio, TikTok, YouTube description — a guide to placing your tip link where fans will actually click it.",
    excerptAr: "بايو إنستغرام، تيك توك، وصف يوتيوب — دليل لوضع رابط الدعم حيث سينقر عليه المتابعون فعلاً.",
    category: "Tips",
    categoryAr: "نصائح",
    date: "2026-02-20",
    readTime: 3,
    coverColor: "#F0851D",
    emoji: "🔗",
  },
];

const CATEGORIES = [
  { en: "All", ar: "الكل" },
  { en: "Story", ar: "قصتنا" },
  { en: "Tips", ar: "نصائح" },
  { en: "Community", ar: "المجتمع" },
  { en: "Insights", ar: "رؤى" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Story: "bg-teal/10 text-teal",
  Tips: "bg-orange/10 text-orange",
  Community: "bg-purple-100 text-purple-600",
  Insights: "bg-blue-50 text-blue-600",
};

export default function BlogPage() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-cream">
        {/* Header */}
        <div className="bg-dark text-cream py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">
              {isAr ? "مدونة كبشاي" : "Cupshai Blog"}
            </h1>
            <p className="text-cream/60 mt-3 max-w-lg mx-auto">
              {isAr
                ? "نصائح للمبدعين، قصص ملهمة، وتحديثات المنصة."
                : "Creator tips, inspiring stories, and platform updates."}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Category filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.en}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  i === 0
                    ? "bg-orange text-white"
                    : "bg-white border border-gray-light text-dark/50 hover:border-orange/50 hover:text-dark"
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            ))}
          </div>

          {/* Featured post */}
          <Link
            href={`/${locale}/blog/${POSTS[0].slug}`}
            className="block bg-white rounded-2xl border border-gray-light overflow-hidden mb-8 group hover:shadow-lg transition-all"
          >
            <div className="flex flex-col md:flex-row">
              <div
                className="h-48 md:h-auto md:w-80 flex items-center justify-center shrink-0"
                style={{ backgroundColor: POSTS[0].coverColor }}
              >
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {POSTS[0].emoji}
                </span>
              </div>
              <div className="p-6 md:p-8 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[POSTS[0].category]}`}>
                    {isAr ? POSTS[0].categoryAr : POSTS[0].category}
                  </span>
                  <span className="text-dark/30 text-xs">
                    {POSTS[0].readTime} {isAr ? "دقائق قراءة" : "min read"}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-dark group-hover:text-orange transition-colors">
                  {isAr ? POSTS[0].titleAr : POSTS[0].title}
                </h2>
                <p className="text-dark/50 mt-3 leading-relaxed">
                  {isAr ? POSTS[0].excerptAr : POSTS[0].excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-dark/30 text-xs">
                    {new Date(POSTS[0].date).toLocaleDateString(isAr ? "ar-EG" : "en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Posts grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="bg-white rounded-2xl border border-gray-light overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="h-36 flex items-center justify-center"
                  style={{ backgroundColor: post.coverColor }}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {post.emoji}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[post.category] || "bg-cream text-dark/50"}`}>
                      {isAr ? post.categoryAr : post.category}
                    </span>
                    <span className="text-dark/30 text-xs">
                      {post.readTime} {isAr ? "د" : "min"}
                    </span>
                  </div>
                  <h3 className="font-bold text-dark leading-snug group-hover:text-orange transition-colors">
                    {isAr ? post.titleAr : post.title}
                  </h3>
                  <p className="text-dark/50 text-sm mt-2 line-clamp-2">
                    {isAr ? post.excerptAr : post.excerpt}
                  </p>
                  <p className="text-dark/30 text-xs mt-3">
                    {new Date(post.date).toLocaleDateString(isAr ? "ar-EG" : "en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
