import { getSiteUrl } from "@/lib/utils";

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    const referer = request.headers.get("referer");
    if (!referer) {
      return request.method === "GET" || request.method === "HEAD";
    }
    try {
      return new URL(referer).origin === getSiteUrl();
    } catch {
      return false;
    }
  }

  return origin === getSiteUrl();
}

export function jsonError(message: string, status = 400): Response {
  return Response.json({ error: message }, { status });
}
