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

function adminPath(next: string) {
  const path = next.startsWith("/admin") ? next : "/admin";
  const pathname = path.split("?")[0] || "/admin";
  const search = path.includes("?") ? path.slice(path.indexOf("?")) : "";
  return `${pathname}${search}`;
}

function requestIsLocal(request: NextRequest) {
  const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "")
    .split(",")[0]
    ?.trim()
    .toLowerCase();
  const hostname = host.split(":")[0] || "";
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local");
}

function absolute(request: NextRequest, path: string) {
  return new URL(path, request.nextUrl.origin);
}

function fail(request: NextRequest, code: string, next: string) {
  const url = absolute(request, "/login");
  url.searchParams.set("next", adminPath(next));
  url.searchParams.set("error", code);
  const response = NextResponse.redirect(url, 303);
  response.headers.set("Cache-Control", "no-store");
  // Clear any broken session so the next attempt starts clean.
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: !requestIsLocal(request),
    path: "/",
    maxAge: 0,
  });
  return response;
}

function successPage(destination: string) {
  const safe = destination.replace(/"/g, "");
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta http-equiv="refresh" content="0;url=${safe}"/>
  <title>Signing in…</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#05070b;color:#d7dee8;font-family:system-ui,sans-serif}
  </style>
</head>
<body>
  <p>Signing in…</p>
  <script>location.replace(${JSON.stringify(destination)});</script>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const next = adminPath(nextPath(String(formData.get("next") || "")));

    if (!rateLimit(`staff-login:${clientKey(request)}`, 20, 15 * 60_000)) {
      return fail(request, "staff-rate", next);
    }

    if (!isStaffAccessConfigured()) {
      return fail(request, "staff-off", next);
    }

    const matched = await staffCredentialsMatch(
      String(formData.get("username") || ""),
      String(formData.get("password") || formData.get("code") || ""),
    );
    if (!matched) {
      return fail(request, "staff-invalid", next);
    }

    const token = await createSession(createStaffKeyUser());
    // Return 200 + Set-Cookie, then navigate. Some browsers (including Edge)
    // drop cookies attached to an immediate 303 from a form POST.
    const response = new NextResponse(successPage(next), {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: !requestIsLocal(request),
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return response;
  } catch {
    return fail(request, "oauth", "/admin");
  }
}
