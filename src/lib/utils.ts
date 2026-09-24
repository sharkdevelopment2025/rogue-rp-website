export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatUkDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatUkDateTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/$/, "");
}

function isLocalSiteUrl(value: string) {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(value);
}

export function getSiteUrl(): string {
  const configured = stripTrailingSlash((process.env.NEXT_PUBLIC_SITE_URL || "").trim());
  if (configured && !isLocalSiteUrl(configured)) {
    return configured;
  }

  // Vercel builds sometimes keep a localhost NEXT_PUBLIC_SITE_URL. Prefer the
  // real deployment host so cookies, canonical URLs and origin checks stay valid.
  const vercelHost = (
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    ""
  )
    .trim()
    .replace(/^https?:\/\//i, "");
  if (vercelHost) {
    return `https://${stripTrailingSlash(vercelHost)}`;
  }

  return configured || "http://localhost:3000";
}

export function absoluteUrl(path = "/"): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalised}`;
}

export function isSafeRelativePath(value: string | null | undefined): value is string {
  return Boolean(value && value.startsWith("/") && !value.startsWith("//"));
}

export function discordAvatarUrl(
  discordId: string,
  avatar: string | null,
  size = 128,
): string {
  if (!/^\d+$/.test(discordId)) {
    return "/logo.jpg";
  }

  if (avatar) {
    const ext = avatar.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.${ext}?size=${size}`;
  }

  const index = Number(BigInt(discordId) >> BigInt(22)) % 6;
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

export function clampText(value: string, max: number): string {
  if (value.length <= max) {
    return value;
  }

  return `${value.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}
