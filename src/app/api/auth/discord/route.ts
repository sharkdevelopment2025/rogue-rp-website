import { NextRequest } from "next/server";
import { discordAuthorizeUrl } from "@/lib/discord/oauth";
import { oauthStartRedirect } from "@/lib/auth/session";
import { isDiscordOAuthConfigured } from "@/lib/env";
import { isSafeRelativePath } from "@/lib/utils";
import { rateLimit, clientKey } from "@/lib/server/rate-limit";

export async function GET(request: NextRequest) {
  if (!rateLimit(`oauth:${clientKey(request)}`, 10, 60_000)) {
    return Response.redirect(new URL("/login?error=rate", request.url));
  }
  if (!isDiscordOAuthConfigured()) {
    return Response.redirect(new URL("/login?error=config", request.url));
  }

  const next = request.nextUrl.searchParams.get("next");
  const state = `${crypto.randomUUID()}.${isSafeRelativePath(next) ? next : "/dashboard"}`;
  return oauthStartRedirect(discordAuthorizeUrl(state), state);
}
