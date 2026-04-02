"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import PageSpinner from "./Spinner";
import { useNavigationLoader } from "@/lib/useNavigationLoader";

function NavigationLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { loading, setLoading } = useNavigationLoader();

  useEffect(() => {
    // Route has changed — stop the spinner
    setLoading(false);
  }, [pathname, searchParams]);

  return loading ? <PageSpinner /> : null;
}

export default function NavigationLoader() {
  return (
    <Suspense>
      <NavigationLoaderInner />
    </Suspense>
  );
}