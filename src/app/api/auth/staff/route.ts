import { NextRequest, NextResponse } from "next/server";
import { sessionRedirect } from "@/lib/auth/session";
import { createStaffKeyUser, staffCredentialsMatch } from "@/lib/auth/staff-access";
import { isStaffAccessConfigured } from "@/lib/env";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { isSafeRelativePath } from "@/lib/utils";

function nextPath(value: string | null) {
  return isSafeRelativePath(value) ? value : "/admin";
}

function sameOrigin(request: NextRequest, pathname: string, search: Record<string, string>) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  for (const [key, value] of Object.entries(search)) {
    url.searchParams.set(key, value);
  }
  return url;
}

function loginRedirect(request: NextRequest, code: string, next: string) {
  const url = sameOrigin(request, "/login", { next, error: code });
  const response = NextResponse.redirect(url, 303);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const next = nextPath(String(formData.get("next") || ""));
  const destination = next.startsWith("/admin") ? next : "/admin";

  if (!rateLimit(`staff-login:${clientKey(request)}`, 5, 15 * 60_000)) {
    return loginRedirect(request, "staff-rate", destination);
  }

  if (!isStaffAccessConfigured()) {
    return loginRedirect(request, "staff-off", destination);
  }

  const matched = await staffCredentialsMatch(
    String(formData.get("username") || ""),
    String(formData.get("password") || formData.get("code") || ""),
  );
  if (!matched) {
    return loginRedirect(request, "staff-invalid", destination);
  }

  const url = request.nextUrl.clone();
  url.pathname = destination.split("?")[0] || "/admin";
  url.search = destination.includes("?") ? destination.slice(destination.indexOf("?")) : "";
  return sessionRedirect(url, createStaffKeyUser());
}
