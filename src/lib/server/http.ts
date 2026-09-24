import { getSiteUrl } from "@/lib/utils";

function requestOrigin(request: Request): string | null {
  const host = (
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    ""
  )
    .split(",")[0]
    ?.trim();
  if (!host) {
    return null;
  }
  const proto = (
    request.headers.get("x-forwarded-proto") ||
    (host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https")
  )
    .split(",")[0]
    ?.trim();
  return `${proto}://${host}`;
}

export function isAllowedOrigin(request: Request): boolean {
  const allowed = new Set<string>([getSiteUrl()]);
  const liveOrigin = requestOrigin(request);
  if (liveOrigin) {
    allowed.add(liveOrigin);
  }

  const origin = request.headers.get("origin");
  if (!origin) {
    const referer = request.headers.get("referer");
    if (!referer) {
      return request.method === "GET" || request.method === "HEAD";
    }
    try {
      return allowed.has(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return allowed.has(origin);
}

export function jsonError(message: string, status = 400): Response {
  return Response.json({ error: message }, { status });
}
