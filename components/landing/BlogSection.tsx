"use client";
import Link from "next/link";

// Mock blog posts
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
];

const CATEGORY_COLORS: Record<string, string> = {
  Story: "bg-teal/10 text-teal",
  Tips: "bg-orange/10 text-orange",
  Community: "bg-purple-100 text-purple-600",
};

export default function BlogSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-orange font-semibold text-sm mb-1">
              {isAr ? "المدونة" : "Blog"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              {isAr ? "أحدث المقالات" : "Latest from Cupshai"}
            </h2>
            <p className="text-dark/50 mt-2 max-w-md">
              {isAr
                ? "نصائح للمبدعين، تحديثات المنصة، وقصص من مجتمعنا."
                : "Creator tips, platform updates, and stories from our community."}
            </p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-orange hover:text-orange/80 transition-colors"
          >
            {isAr ? "عرض الكل" : "View all"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`}>
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Posts grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="bg-white rounded-2xl border border-gray-light overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              {/* Cover */}
              <div
                className="h-40 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: post.coverColor }}
              >
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {post.emoji}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[post.category] || "bg-cream text-dark/50"}`}>
                    {isAr ? post.categoryAr : post.category}
                  </span>
                  <span className="text-dark/30 text-xs">
                    {post.readTime} {isAr ? "دقائق قراءة" : "min read"}
                  </span>
                </div>

                <h3 className="font-bold text-dark text-lg leading-snug group-hover:text-orange transition-colors">
                  {isAr ? post.titleAr : post.title}
                </h3>

                <p className="text-dark/50 text-sm mt-2 leading-relaxed line-clamp-2">
                  {isAr ? post.excerptAr : post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-light">
                  <span className="text-dark/30 text-xs">
                    {new Date(post.date).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-orange text-xs font-semibold group-hover:underline">
                    {isAr ? "اقرأ المزيد" : "Read more"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange hover:text-orange/80 transition-colors"
          >
            {isAr ? "عرض جميع المقالات" : "View all posts"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`}>
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
