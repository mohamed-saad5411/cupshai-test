"use client";
import { useLocale } from "next-intl";
import { KYCStatus, KYC_STATUS_CONFIG } from "./constants";

interface KYCStatusBadgeProps {
  status: KYCStatus;
  size?: "sm" | "md";
}

export default function KYCStatusBadge({ status, size = "sm" }: KYCStatusBadgeProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const config = KYC_STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full ${config.bgColor} ${config.color} ${
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
    >
      <span>{config.icon}</span>
      {isAr ? config.labelAr : config.label}
    </span>
  );
}
