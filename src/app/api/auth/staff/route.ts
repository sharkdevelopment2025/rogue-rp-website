import { NextRequest, NextResponse } from "next/server";
import { sessionRedirect } from "@/lib/auth/session";
import { createStaffKeyUser, staffAccessCodeMatches } from "@/lib/auth/staff-access";
import { isStaffAccessConfigured } from "@/lib/env";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { isSafeRelativePath } from "@/lib/utils";

function nextPath(value: string | null) {
  return isSafeRelativePath(value) ? value : "/admin";
}

function loginRedirect(request: NextRequest, code: string, next: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("next", next);
  url.searchParams.set("error", code);
  return NextResponse.redirect(url, 303);
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

  const matched = await staffAccessCodeMatches(String(formData.get("code") || ""));
  if (!matched) {
    return loginRedirect(request, "staff-invalid", destination);
  }

  return sessionRedirect(new URL(destination, request.url), createStaffKeyUser());
}
