// "use client";

// import { useSyncExternalStore } from "react";
// import { getStoredAccessToken } from "@/lib/auth-storage";

// function subscribe(onStoreChange: () => void) {
//   if (typeof window === "undefined") return () => {};
//   const handler = () => onStoreChange();
//   window.addEventListener("storage", handler);
//   window.addEventListener("auth-session-changed", handler);
//   return () => {
//     window.removeEventListener("storage", handler);
//     window.removeEventListener("auth-session-changed", handler);
//   };
// }

// function getSnapshot(): boolean {
//   return Boolean(getStoredAccessToken());
// }

// function getServerSnapshot(): boolean {
//   return false;
// }

// /** True when a Supabase access token is present in sessionStorage (client-only). */
// export function useAuthSession() {
//   const isLoggedIn = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
//   return { isLoggedIn };
// }


"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useAuthSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // تحقق من الـ session الحالية
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // استمع لأي تغيير في الـ session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { isLoggedIn };
}