const DISCORD_INVITE_PLACEHOLDERS = new Set([
  "",
  "https://discord.gg/your-invite",
  "http://discord.gg/your-invite",
  "https://discord.gg/",
  "http://discord.gg/",
]);

export const DEFAULT_DISCORD_INVITE = "https://discord.gg/roguerp";

export function resolveDiscordInvite(value?: string | null): string {
  const raw = (value || "").trim();
  if (!raw || DISCORD_INVITE_PLACEHOLDERS.has(raw)) {
    return DEFAULT_DISCORD_INVITE;
  }
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }
  if (raw.startsWith("discord.gg/")) {
    return `https://${raw}`;
  }
  return raw;
}

export const publicEnv = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  discordInvite: resolveDiscordInvite(process.env.NEXT_PUBLIC_DISCORD_INVITE),
  analyticsProvider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "none",
  analyticsWriteKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY || "",
};

export function getServerEnv() {
  return {
    discordBotToken: process.env.DISCORD_BOT_TOKEN || "",
    discordGuildId: process.env.DISCORD_GUILD_ID || "",
    discordRoles: {
      owner: process.env.DISCORD_ROLE_OWNER || "",
      director: process.env.DISCORD_ROLE_DIRECTOR || "",
      management: process.env.DISCORD_ROLE_MANAGEMENT || "",
      administrator: process.env.DISCORD_ROLE_ADMINISTRATOR || "",
      moderator: process.env.DISCORD_ROLE_MODERATOR || "",
      development: process.env.DISCORD_ROLE_DEVELOPMENT || "",
    },
    applicationApiUrl: (process.env.APPLICATION_API_URL || "").replace(/\/$/, ""),
    applicationApiKey: process.env.APPLICATION_API_KEY || "",
    applicationStartUrl: process.env.APPLICATION_START_URL || "",
    fivemServerIp: process.env.FIVEM_SERVER_IP || "play.rogueroleplay.co.uk",
    fivemServerPort: process.env.FIVEM_SERVER_PORT || "30120",
    fivemConnectCode: process.env.FIVEM_CONNECT_CODE || "vqqd59q",
    fivemConnectUrl: process.env.FIVEM_CONNECT_URL || "",
    fivemMaxPlayers: Number(process.env.FIVEM_MAX_PLAYERS || 64),
    sessionSecret:
      process.env.SESSION_SECRET ||
      "rogue-rp-website-encrypted-session-secret-v1",
    staffUsername: (process.env.STAFF_USERNAME || "admin").trim(),
    staffAccessCode:
      process.env.STAFF_ACCESS_CODE || process.env.STAFF_PASSWORD || "RogueRP2026",
  };
}

export function isStaffAccessConfigured(): boolean {
  const env = getServerEnv();
  return env.staffUsername.length > 0 && env.staffAccessCode.trim().length >= 8;
}

export function isDiscordBotConfigured(): boolean {
  const env = getServerEnv();
  return Boolean(env.discordBotToken && env.discordGuildId);
}

export function isApplicationApiConfigured(): boolean {
  const env = getServerEnv();
  return Boolean(env.applicationApiUrl && env.applicationApiKey);
}

export function isFiveMConfigured(): boolean {
  const env = getServerEnv();
  return Boolean(env.fivemServerIp || env.fivemConnectCode || env.fivemConnectUrl);
}

export function getFiveMConnectUrl(): string | null {
  const env = getServerEnv();
  if (env.fivemConnectUrl) {
    return env.fivemConnectUrl;
  }
  if (env.fivemConnectCode) {
    return `https://cfx.re/join/${env.fivemConnectCode}`;
  }
  if (env.fivemServerIp) {
    return `fivem://connect/${env.fivemServerIp}:${env.fivemServerPort}`;
  }
  return null;
}
