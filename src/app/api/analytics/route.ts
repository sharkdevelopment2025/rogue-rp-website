import { NextRequest } from "next/server";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { isAllowedOrigin, jsonError } from "@/lib/server/http";
import { rateLimit, clientKey } from "@/lib/server/rate-limit";

const events: AnalyticsEvent[] = [
  "page_view",
  "discord_click",
  "whitelist_view",
  "application_view",
  "connect_click",
];

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request) && request.headers.get("origin")) {
    return jsonError("Invalid origin.", 403);
  }
  if (!rateLimit(`analytics:${clientKey(request)}`, 60, 60_000)) {
    return jsonError("Too many requests.", 429);
  }

  const body = (await request.json().catch(() => null)) as { event?: string; path?: string } | null;
  if (!body?.event || !events.includes(body.event as AnalyticsEvent)) {
    return new Response(null, { status: 204 });
  }

  await trackEvent(body.event as AnalyticsEvent, { path: body.path || "" });
  return new Response(null, { status: 204 });
}
