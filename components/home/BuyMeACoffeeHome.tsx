import Navbar from "@/components/shared/Navbar";
import HomeNavBar from "@/components/home/HomeNavBar";
import HeroSection from "@/components/home/HeroSection";
import SupportSection from "@/components/home/SupportSection";
import MembershipsSection from "@/components/home/MembershipsSection";
import CTASection from "@/components/home/CTASection";
import ShopSection from "@/components/home/ShopSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import { useLocale } from "next-intl";


// ─── Footer ───────────────────────────────────────────────────────────────────
// function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-400 py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid md:grid-cols-4 gap-10 mb-12">
//           <div>
//             <p className="font-black text-white text-lg mb-3">☕ Buy Me a Coffee</p>
//             <p className="text-sm leading-relaxed">
//               The best way for creators to accept support and build a community.
//             </p>
//           </div>
//           {[
//             { title: "Product", links: ["FAQ", "Explore creators", "Help Center", "Security"] },
//             { title: "Resources", links: ["Buttons", "QR Code", "Stream Alerts", "Feature requests"] },
//             { title: "Compare", links: ["vs Ko-fi", "vs Patreon", "vs Gumroad", "vs Substack"] },
//           ].map((col, i) => (
//             <div key={i}>
//               <p className="font-bold text-white text-sm mb-3">{col.title}</p>
//               <ul className="space-y-2">
//                 {col.links.map((l, j) => (
//                   <li key={j}>
//                     <a href="#" className="text-sm hover:text-white transition-colors">{l}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-sm">© 2024 Buy Me a Coffee · All rights reserved</p>
//           <div className="flex gap-6 text-sm">
//             <a href="#" className="hover:text-white transition-colors">Privacy</a>
//             <a href="#" className="hover:text-white transition-colors">Terms</a>
//             <a href="#" className="hover:text-white transition-colors">iOS</a>
//             <a href="#" className="hover:text-white transition-colors">Android</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BuyMeACoffeeHome() {

  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="font-sans antialiased">
      {/* <Navbar /> */}

      <HeroSection locale={locale} />
      <SupportSection locale={locale}/>
      <MembershipsSection locale={locale}/>
      <ShopSection locale={locale}/>
      <FeaturesSection locale={locale}/>
      <CTASection locale={locale}/>
      {/* <Footer /> */}
    </div>
  );
}
