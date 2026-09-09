"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    fetch("/api/analytics", {
      method: "POST",
      headers,
      body: JSON.stringify({
        event: pathname.startsWith("/whitelist")
          ? "whitelist_view"
          : pathname.startsWith("/applications")
            ? "application_view"
            : "page_view",
        path: pathname,
      }),
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
