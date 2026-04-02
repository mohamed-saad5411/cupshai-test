"use client";
import Link from "next/link";
import { useNavigationLoader } from "@/lib/useNavigationLoader";

export default function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { setLoading } = useNavigationLoader();

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        setLoading(true); // ✅ Spinner starts instantly on click
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}