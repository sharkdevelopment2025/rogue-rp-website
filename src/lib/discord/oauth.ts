import { getServerEnv, isDiscordOAuthConfigured } from "@/lib/env";
import { absoluteUrl } from "@/lib/utils";

const DISCORD_API = "https://discord.com/api/v10";

export function discordRedirectUri(): string {
  return absoluteUrl("/api/auth/callback");
}

export function discordAuthorizeUrl(state: string): string {
  const env = getServerEnv();
  const params = new URLSearchParams({
    client_id: env.discordClientId,
    redirect_uri: discordRedirectUri(),
    response_type: "code",
    scope: "identify",
    state,
    prompt: "consent",
  });
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export async function exchangeDiscordCode(code: string): Promise<string> {
  const env = getServerEnv();
  if (!isDiscordOAuthConfigured()) {
    throw new Error("Discord OAuth is not configured.");
  }

  const body = new URLSearchParams({
    client_id: env.discordClientId,
    client_secret: env.discordClientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: discordRedirectUri(),
  });

  const response = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Discord token exchange failed.");
  }

  const json = (await response.json()) as { access_token?: string };
  if (!json.access_token) {
    throw new Error("Discord token missing.");
  }
  return json.access_token;
}

export async function getDiscordUser(accessToken: string) {
  const response = await fetch(`${DISCORD_API}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load Discord profile.");
  }

  const json = (await response.json()) as {
    id: string;
    username: string;
    global_name: string | null;
    discriminator: string;
    avatar: string | null;
  };

  return {
    discordId: json.id,
    username: json.username,
    globalName: json.global_name,
    discriminator: json.discriminator,
    avatar: json.avatar,
  };
}
