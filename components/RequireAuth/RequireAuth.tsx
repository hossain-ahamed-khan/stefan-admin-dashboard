"use client";
import React from "react";
import { useRouter } from "next/navigation";

type RequireAuthProps = {
  tokenKey: string;
  redirectTo: string;
  children: React.ReactNode;
};

export default function RequireAuth({ tokenKey, redirectTo, children }: RequireAuthProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem(tokenKey) : null;
      if (!token) {
        router.replace(redirectTo);
        setAuthorized(false);
        return;
      }
      setAuthorized(true);
    } catch {
      router.replace(redirectTo);
      setAuthorized(false);
    }
  }, [router, tokenKey, redirectTo]);

  if (authorized !== true) return null;
  return <>{children}</>;
}