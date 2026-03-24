"use client";
import { useLocale } from "next-intl";
import { use } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

// Mock blog content
const POSTS: Record<string, {
  title: string; titleAr: string;
  category: string; categoryAr: string;
  date: string; readTime: number;
  coverColor: string; emoji: string;
  content: string[]; contentAr: string[];
}> = {
  "why-cupshai": {
    title: "Why We Built Cupshai",
    titleAr: "لماذا بنينا كبشاي",
    category: "Story", categoryAr: "قصتنا",
    date: "2026-03-10", readTime: 5,
    coverColor: "#2DAA8F", emoji: "☕",
    content: [
      "The Arab creator economy is one of the fastest-growing in the world. From Egyptian comedians on TikTok to Saudi educators on YouTube, millions of creators are building audiences — but most of them can't monetize.",
      "The problem isn't talent. It's infrastructure. Platforms like Patreon and Buy Me a Coffee don't support Egyptian Pounds. They don't offer Arabic interfaces. They don't integrate with local payment methods like Fawry or Vodafone Cash.",
      "We built Cupshai to fix this. A platform designed from day one for Egypt and the Arab world. Tips in EGP. Full Arabic support. Local payment methods. A \"cup of shai\" instead of a coffee — because that's what we actually drink.",
      "Our mission is simple: make it possible for every Arab creator to earn from their passion. Whether you have 1,000 followers or 1 million, you deserve a way to get supported by the people who love what you do.",
      "We're starting with Egypt, but our vision is the entire MENA region. The creator economy here is just getting started, and Cupshai will grow with it.",
    ],
    contentAr: [
      "اقتصاد المبدعين العرب هو أحد أسرع الاقتصادات نمواً في العالم. من الكوميديانات المصريين على تيك توك إلى المعلمين السعوديين على يوتيوب، ملايين المبدعين يبنون جماهير — لكن معظمهم لا يستطيعون تحقيق الدخل.",
      "المشكلة ليست الموهبة. إنها البنية التحتية. منصات مثل باتريون و Buy Me a Coffee لا تدعم الجنيه المصري. لا تقدم واجهات عربية. ولا تتكامل مع طرق الدفع المحلية مثل فوري أو فودافون كاش.",
      "بنينا كبشاي لإصلاح هذا. منصة مصممة من اليوم الأول لمصر والعالم العربي. إكراميات بالجنيه المصري. دعم كامل للعربية. طرق دفع محلية. \"كوباية شاي\" بدلاً من القهوة — لأن هذا ما نشربه فعلاً.",
      "مهمتنا بسيطة: أن نجعل من الممكن لكل مبدع عربي أن يكسب من شغفه. سواء كان لديك ١٠٠٠ متابع أو مليون، تستحق طريقة ليدعمك الناس الذين يحبون ما تفعله.",
      "نبدأ من مصر، لكن رؤيتنا هي منطقة الشرق الأوسط وشمال أفريقيا بأكملها. اقتصاد المبدعين هنا بدأ للتو، وكبشاي ستنمو معه.",
    ],
  },
  "creator-tips-egypt": {
    title: "5 Ways Egyptian Creators Can Earn More in 2026",
    titleAr: "٥ طرق يمكن للمبدعين المصريين كسب المزيد في ٢٠٢٦",
    category: "Tips", categoryAr: "نصائح",
    date: "2026-03-08", readTime: 4,
    coverColor: "#F0851D", emoji: "💡",
    content: [
      "1. Add your tip link everywhere — Your TikTok bio, Instagram link-in-bio, YouTube description, Twitter/X bio. Every platform where you create should have your Cupshai link.",
      "2. Ask directly — Don't be shy about asking for support. The creators who earn the most are the ones who tell their audience about their tip page. A simple \"support my work\" goes a long way.",
      "3. Thank your supporters publicly — When someone tips you, shout them out. This encourages others to tip too, and makes your supporters feel valued.",
      "4. Create exclusive content — Give your biggest supporters something special. Behind-the-scenes, early access, exclusive posts. This turns one-time tippers into regular supporters.",
      "5. Be consistent — Post regularly, engage with your audience, and keep sharing your tip link. Consistency builds trust, and trust leads to support.",
    ],
    contentAr: [
      "١. أضف رابط الدعم في كل مكان — بايو تيك توك، رابط إنستغرام، وصف يوتيوب، بايو تويتر. كل منصة تنشئ عليها محتوى يجب أن تحتوي على رابط كبشاي.",
      "٢. اطلب مباشرة — لا تخجل من طلب الدعم. المبدعون الذين يكسبون أكثر هم الذين يخبرون جمهورهم عن صفحة الدعم. \"ادعم عملي\" البسيطة تفعل الكثير.",
      "٣. اشكر داعميك علناً — عندما يدعمك شخص ما، اذكره. هذا يشجع الآخرين على الدعم أيضاً، ويجعل داعميك يشعرون بالتقدير.",
      "٤. أنشئ محتوى حصرياً — أعطِ أكبر داعميك شيئاً مميزاً. كواليس، وصول مبكر، منشورات حصرية. هذا يحول الداعم لمرة واحدة إلى داعم منتظم.",
      "٥. كن منتظماً — انشر بانتظام، تفاعل مع جمهورك، واستمر في مشاركة رابط الدعم. الانتظام يبني الثقة، والثقة تؤدي إلى الدعم.",
    ],
  },
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const locale = useLocale();
  const isAr = locale === "ar";

  const post = POSTS[slug];

  // 404 fallback
  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">📝</p>
            <h1 className="text-2xl font-bold text-dark">{isAr ? "المقال غير موجود" : "Post not found"}</h1>
            <Link href={`/${locale}/blog`} className="mt-4 inline-block text-orange font-semibold hover:underline">
              {isAr ? "العودة للمدونة" : "Back to blog"}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const title = isAr ? post.titleAr : post.title;
  const category = isAr ? post.categoryAr : post.category;
  const content = isAr ? post.contentAr : post.content;

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-cream">
        {/* Cover */}
        <div
          className="h-64 sm:h-80 flex items-center justify-center"
          style={{ backgroundColor: post.coverColor }}
        >
          <span className="text-7xl">{post.emoji}</span>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 -mt-10 pb-20">
          <div className="bg-white rounded-2xl border border-gray-light p-6 sm:p-10 shadow-sm">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
              <Link href={`/${locale}/blog`} className="text-dark/30 hover:text-orange text-sm transition-colors">
                {isAr ? "المدونة" : "Blog"}
              </Link>
              <span className="text-dark/20">/</span>
              <span className="text-dark/50 text-sm">{category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-dark leading-tight">{title}</h1>

            <div className="flex items-center gap-4 mt-4 text-sm text-dark/40">
              <span>
                {new Date(post.date).toLocaleDateString(isAr ? "ar-EG" : "en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span>{post.readTime} {isAr ? "دقائق قراءة" : "min read"}</span>
            </div>

            <hr className="my-6 border-gray-light" />

            {/* Content */}
            <div className="space-y-5">
              {content.map((para, i) => (
                <p key={i} className="text-dark/70 leading-loose text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 bg-cream rounded-xl p-6 text-center">
              <p className="text-2xl mb-2">☕</p>
              <p className="font-bold text-dark">
                {isAr ? "جاهز تبدأ مع كبشاي؟" : "Ready to start with Cupshai?"}
              </p>
              <p className="text-dark/50 text-sm mt-1">
                {isAr ? "انضم للمبدعين المؤسسين واحجز صفحتك." : "Join our founding creators and claim your page."}
              </p>
              <Link
                href={`/${locale}`}
                className="mt-4 inline-block bg-orange text-white font-bold py-2.5 px-6 rounded-xl hover:bg-orange/90 transition-colors text-sm"
              >
                {isAr ? "احصل على وصول مبكر" : "Get Early Access"}
              </Link>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-6 text-center">
            <Link href={`/${locale}/blog`} className="text-dark/40 text-sm hover:text-orange transition-colors">
              {isAr ? "← العودة لجميع المقالات" : "← Back to all posts"}
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
