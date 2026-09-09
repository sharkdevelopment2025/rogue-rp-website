import { publicEnv } from "@/lib/env";

export type AnalyticsEvent =
  | "page_view"
  | "discord_click"
  | "whitelist_view"
  | "application_view"
  | "connect_click";

export function canTrack(): boolean {
  return publicEnv.analyticsProvider !== "none" && publicEnv.analyticsProvider !== "";
}

export async function trackEvent(
  event: AnalyticsEvent,
  payload: Record<string, string> = {},
): Promise<void> {
  if (!canTrack()) {
    return;
  }

  if (publicEnv.analyticsProvider === "console" && process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event, payload);
  }
}
