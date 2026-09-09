import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { EncryptJWT, jwtDecrypt } from "jose";
import { getServerEnv, publicEnv } from "@/lib/env";
import { OAUTH_STATE_COOKIE, SESSION_COOKIE } from "@/lib/auth/constants";
import type { SessionUser } from "@/types";

export { SESSION_COOKIE };

async function secretKey(): Promise<Uint8Array> {
  const env = getServerEnv();
  const secret =
    env.sessionSecret ||
    (process.env.NODE_ENV === "production" ? "" : "local-dev-only-session-secret-32ch");

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters.");
  }

  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return new Uint8Array(hash);
}

function cookieSecure(): boolean {
  return publicEnv.siteUrl.startsWith("https://");
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: cookieSecure(),
    path: "/",
    maxAge,
  };
}

export async function createSession(user: SessionUser): Promise<string> {
  const key = await secretKey();
  return new EncryptJWT({ ...user })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("14d")
    .encrypt(key);
}

export async function readSessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtDecrypt(token, await secretKey());
    if (!payload.discordId || !payload.username) {
      return null;
    }
    return {
      discordId: String(payload.discordId),
      username: String(payload.username),
      globalName: payload.globalName ? String(payload.globalName) : null,
      discriminator: payload.discriminator ? String(payload.discriminator) : "0",
      avatar: payload.avatar ? String(payload.avatar) : null,
      issuedAt: Number(payload.issuedAt ?? Date.now()),
      lastLogin: Number(payload.lastLogin ?? Date.now()),
      ...(payload.staffKey === true ? { staffKey: true as const } : {}),
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return readSessionToken(token);
}

export async function setSessionCookie(user: SessionUser): Promise<void> {
  const jar = await cookies();
  const token = await createSession(user);
  jar.set(SESSION_COOKIE, token, cookieOptions(60 * 60 * 24 * 14));
}

export async function sessionRedirect(url: URL, user: SessionUser, status = 303) {
  const response = NextResponse.redirect(url, status);
  const token = await createSession(user);
  response.cookies.set(SESSION_COOKIE, token, cookieOptions(60 * 60 * 24 * 14));
  return response;
}

export function clearSessionRedirect(url: URL, status = 303) {
  const response = NextResponse.redirect(url, status);
  response.cookies.set(SESSION_COOKIE, "", cookieOptions(0));
  return response;
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", cookieOptions(0));
}

export function oauthStartRedirect(authorizeUrl: string, state: string) {
  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(OAUTH_STATE_COOKIE, state, cookieOptions(60 * 10));
  return response;
}

export async function consumeOAuthState(): Promise<string | null> {
  const jar = await cookies();
  const state = jar.get(OAUTH_STATE_COOKIE)?.value ?? null;
  jar.set(OAUTH_STATE_COOKIE, "", cookieOptions(0));
  return state;
}
