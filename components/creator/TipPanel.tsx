// "use client";
// import { useState } from "react";
// import { useTranslations, useLocale } from "next-intl";
// import PostTipSignup from "@/components/supporter/PostTipSignup";
// import { calculateShaiTiers, SHAI_DEFAULT } from "@/lib/shai";

// const TIER_ICONS: Record<string, string> = {
//   koshari: "🥘",
//   zardaa: "🍵",
//   barad: "🫖",
// };

// export default function TipPanel({ basicPrice = SHAI_DEFAULT }: { basicPrice?: number }) {
//   const t = useTranslations("creator");
//   const locale = useLocale();
//   const isAr = locale === "ar";

//   const tiers = calculateShaiTiers(basicPrice);
//   const [selectedTier, setSelectedTier] = useState<string>("koshari");
//   const [customAmount, setCustomAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [fanName, setFanName] = useState("");
//   const [tipStatus, setTipStatus] = useState<"idle" | "loading" | "success">("idle");

//   const selectedShaiTier = tiers.find((t) => t.name === selectedTier);
//   const finalAmount =
//     selectedTier === "custom"
//       ? customAmount
//         ? parseInt(customAmount)
//         : 0
//       : selectedShaiTier?.amount ?? 0;

//   async function handleTip(e: React.FormEvent) {
//     e.preventDefault();
//     if (!finalAmount || finalAmount < 1) return;
//     setTipStatus("loading");
//     // Simulate API call — payment integration comes later
//     await new Promise((r) => setTimeout(r, 1000));
//     setTipStatus("success");
//   }

//   return (
//     <div>
//       <div className="sticky top-24 bg-white border border-gray-light rounded-2xl p-6 shadow-sm">
//         {tipStatus === "success" ? (
//           <PostTipSignup fanName={fanName} onReset={() => setTipStatus("idle")} />
//         ) : (
//           <form onSubmit={handleTip} className="space-y-4">
//             <h2 className="font-bold text-dark text-lg text-center">
//               {t("supportButton")}
//             </h2>

//             {/* Shai tiers */}
//             <div className="grid grid-cols-2 gap-2">
//               {tiers.map((tier) => {
//                 const isSelected = selectedTier === tier.name;
//                 const tierLabel = t(`tiers.${tier.name}`);
//                 const icon = TIER_ICONS[tier.name];

//                 return (
//                   <button
//                     key={tier.name}
//                     type="button"
//                     onClick={() => {
//                       setSelectedTier(tier.name);
//                       if (tier.name !== "custom") setCustomAmount("");
//                     }}
//                     className={`py-3 px-2 rounded-xl text-center border-2 transition-all ${
//                       isSelected
//                         ? "border-orange bg-orange/10"
//                         : "border-gray-light hover:border-orange/50"
//                     }`}
//                   >
//                     {tier.name === "custom" ? (
//                       <>
//                         <span className="text-lg">✨</span>
//                         <p className={`text-xs font-semibold mt-0.5 ${isSelected ? "text-orange" : "text-dark/60"}`}>
//                           {tierLabel}
//                         </p>
//                       </>
//                     ) : (
//                       <>
//                         <span className="text-lg">{icon}</span>
//                         <p className={`text-sm font-bold ${isSelected ? "text-orange" : "text-dark"}`}>
//                           {tier.amount} {t("egp")}
//                         </p>
//                         <p className={`text-xs font-medium mt-0.5 ${isSelected ? "text-orange/70" : "text-dark/45"}`}>
//                           {tierLabel}
//                         </p>
//                       </>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Custom amount input */}
//             {selectedTier === "custom" && (
//               <input
//                 type="number"
//                 value={customAmount}
//                 onChange={(e) => setCustomAmount(e.target.value)}
//                 placeholder={t("customPlaceholder")}
//                 min={basicPrice}
//                 className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
//                 autoFocus
//               />
//             )}

//             {/* Name */}
//             <input
//               type="text"
//               value={fanName}
//               onChange={(e) => setFanName(e.target.value)}
//               placeholder={t("yourName")}
//               className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors"
//             />

//             {/* Message */}
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder={t("messagePlaceholder")}
//               rows={3}
//               className="w-full border border-gray-light rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-orange transition-colors resize-none"
//             />

//             <button
//               type="submit"
//               disabled={!finalAmount || finalAmount < 1 || tipStatus === "loading"}
//               className="w-full bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange/90 transition-colors disabled:opacity-50"
//             >
//               {tipStatus === "loading"
//                 ? "..."
//                 : `${t("sendTip")} ${finalAmount ? `— ${finalAmount} ${t("egp")}` : ""}`}
//             </button>

//             <p className="text-xs text-center text-dark/30">
//               {isAr ? "الدفع قريباً • طرق الدفع المصرية" : "Payments coming soon • Egyptian payment methods"}
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }
