import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ─── Utility: simple cn helper ───────────────────────────────────────────────
const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── FadeUp wrapper ───────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-out", className)}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
      }}
    >
      {children}
    </div>
  );
}




// ─── CTA Section ──────────────────────────────────────────────────────────────
export default function CTASection() {
  return (
    <section className="py-24 px-4 bg-yellow-400">
      <FadeUp className="text-center">
        <h2 className="text-5xl font-black text-gray-900 mb-4">Ready to get started?</h2>
        <p className="text-gray-700 text-lg mb-8 max-w-md mx-auto">
          Join over 2 million creators already using Buy Me a Coffee.
        </p>
        <button className="bg-gray-900 hover:bg-gray-700 text-white font-black text-lg px-12 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-2xl">
          <Link href="/signup">☕ Start my page — it's free</Link>
        </button>
      </FadeUp>
    </section>
  );
}