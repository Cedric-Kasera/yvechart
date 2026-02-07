"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

const PUBLIC_ROUTES = ["/", "/auth/signup", "/auth/login"];
const PUBLIC_PREFIXES = ["/auth/activate"];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token, isHydrated, hydrate } = useUserStore();
  const [isReady, setIsReady] = useState(false);

  // Hydrate store from localStorage on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Guard routes after hydration
  useEffect(() => {
    if (!isHydrated) return;

    const isPublic =
      PUBLIC_ROUTES.includes(pathname) ||
      PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));

    if (!token && !isPublic) {
      router.replace("/");
      return;
    }

    setIsReady(true);
  }, [isHydrated, token, pathname, router]);

  // Show nothing until hydrated + route checked
  if (!isReady) return null;

  return <>{children}</>;
}
