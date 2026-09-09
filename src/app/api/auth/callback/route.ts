import { NextRequest } from "next/server";
import { consumeOAuthState, sessionRedirect } from "@/lib/auth/session";
import { exchangeDiscordCode, getDiscordUser } from "@/lib/discord/oauth";
import { getGuildMember } from "@/lib/discord/roles";
import { upsertUser } from "@/lib/repositories/users";
import { isSafeRelativePath } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const errorTarget = new URL("/login?error=oauth", request.url);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expected = await consumeOAuthState();

  if (!code || !state || !expected || state !== expected) {
    return Response.redirect(errorTarget);
  }

  const next = state.split(".").slice(1).join(".") || "/dashboard";

  try {
    const accessToken = await exchangeDiscordCode(code);
    const profile = await getDiscordUser(accessToken);
    const member = await getGuildMember(profile.discordId);
    const now = Date.now();

    await upsertUser({
      ...profile,
      issuedAt: now,
      lastLogin: now,
      guildMember: Boolean(member),
      roleIds: member?.roleIds ?? [],
    });

    const stored = await import("@/lib/repositories/users").then((mod) =>
      mod.getUserByDiscordId(profile.discordId),
    );
    if (stored?.websiteAccess === "suspended") {
      return Response.redirect(new URL("/login?error=suspended", request.url));
    }

    return sessionRedirect(new URL(isSafeRelativePath(next) ? next : "/dashboard", request.url), {
      ...profile,
      issuedAt: now,
      lastLogin: now,
    });
  } catch {
    return Response.redirect(errorTarget);
  }
}
