import Link from "next/link";

interface LogoProps {
  locale: string;
  size?: "sm" | "md" | "lg";
  white?: boolean;
}

export default function Logo({ locale, size = "md", white = false }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <Link href={`/${locale}`} className="inline-flex items-center gap-1.5 group">
      <svg
        width={size === "lg" ? 40 : size === "md" ? 28 : 22}
        height={size === "lg" ? 40 : size === "md" ? 28 : 22}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:rotate-12"
      >
        <path d="M8 12h24l-3 18H11L8 12z" fill="#F4A259" />
        <path d="M32 16h4a4 4 0 010 8h-4" stroke="#F4A259" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M14 8 Q15 5 14 2" stroke={white ? "#fff" : "#17C3B2"} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M20 8 Q21 5 20 2" stroke={white ? "#fff" : "#17C3B2"} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M26 8 Q27 5 26 2" stroke={white ? "#fff" : "#17C3B2"} strokeWidth="2" strokeLinecap="round" fill="none" />
        <ellipse cx="20" cy="31" rx="14" ry="3" fill={white ? "rgba(255,255,255,0.2)" : "#E2E3E0"} />
      </svg>
      <span className={`${sizes[size]} font-bold tracking-tight ${white ? "text-white" : "text-dark"}`}>
        cup<span className="text-orange">shai</span>
      </span>
    </Link>
  );
}
