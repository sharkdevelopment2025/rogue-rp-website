import { NextRequest, NextResponse } from "next/server";
import { createSession, SESSION_COOKIE } from "@/lib/auth/session";
import { createStaffKeyUser, staffCredentialsMatch } from "@/lib/auth/staff-access";
import { isStaffAccessConfigured } from "@/lib/env";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { isSafeRelativePath } from "@/lib/utils";

const SESSION_MAX_AGE = 60 * 60 * 24 * 14;

function nextPath(value: string | null) {
  return isSafeRelativePath(value) ? value : "/admin";
}

function adminDestination(next: string) {
  const path = next.startsWith("/admin") ? next : "/admin";
  const pathname = path.split("?")[0] || "/admin";
  const search = path.includes("?") ? path.slice(path.indexOf("?")) : "";
  return { pathname, search };
}

function absoluteUrl(request: NextRequest, pathname: string, search = "") {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  if (!search) {
    url.search = "";
  } else {
    url.search = search.startsWith("?") ? search : `?${search}`;
  }
  return url;
}

function loginRedirect(request: NextRequest, code: string, next: string) {
  const destination = adminDestination(next);
  const nextValue = `${destination.pathname}${destination.search}`;
  const url = absoluteUrl(request, "/login");
  url.searchParams.set("next", nextValue);
  url.searchParams.set("error", code);
  const response = NextResponse.redirect(url, 303);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const next = nextPath(String(formData.get("next") || ""));
    const destination = adminDestination(next);
    const nextValue = `${destination.pathname}${destination.search}`;

    if (!rateLimit(`staff-login:${clientKey(request)}`, 5, 15 * 60_000)) {
      return loginRedirect(request, "staff-rate", nextValue);
    }

    if (!isStaffAccessConfigured()) {
      return loginRedirect(request, "staff-off", nextValue);
    }

    const matched = await staffCredentialsMatch(
      String(formData.get("username") || ""),
      String(formData.get("password") || formData.get("code") || ""),
    );
    if (!matched) {
      return loginRedirect(request, "staff-invalid", nextValue);
    }

    const url = absoluteUrl(request, destination.pathname, destination.search);
    const response = NextResponse.redirect(url, 303);
    const token = await createSession(createStaffKeyUser());
    const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "")
      .split(",")[0]
      ?.trim()
      .toLowerCase();
    const hostname = host.split(":")[0] || "";
    const localHost =
      hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local");

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: !localHost,
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return loginRedirect(request, "oauth", "/admin");
  }
}
