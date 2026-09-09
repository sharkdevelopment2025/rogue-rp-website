import { timingSafeEqual } from "node:crypto";
import { STAFF_ACCESS_DISCORD_ID, STAFF_ACCESS_MIN_LENGTH } from "@/lib/auth/constants";
import { getServerEnv, isStaffAccessConfigured } from "@/lib/env";
import type { SessionUser } from "@/types";

function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

async function sha256(value: string): Promise<Buffer> {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Buffer.from(hash);
}

export function createStaffKeyUser(): SessionUser {
  const now = Date.now();
  const username = getServerEnv().staffUsername || "Staff";
  return {
    discordId: STAFF_ACCESS_DISCORD_ID,
    username,
    globalName: username,
    discriminator: "0",
    avatar: null,
    issuedAt: now,
    lastLogin: now,
    staffKey: true,
  };
}

export function isStaffKeyUser(user: Pick<SessionUser, "staffKey" | "discordId"> | null | undefined) {
  return Boolean(user?.staffKey || user?.discordId === STAFF_ACCESS_DISCORD_ID);
}

export async function staffCredentialsMatch(username: string, password: string): Promise<boolean> {
  const env = getServerEnv();
  const expectedUser = env.staffUsername;
  const expectedPass = env.staffAccessCode.trim();
  const providedUser = username;
  const providedPass = password.trim();

  if (!isStaffAccessConfigured() || expectedPass.length < STAFF_ACCESS_MIN_LENGTH) {
    return false;
  }

  const [userHash, expectedUserHash, passHash, expectedPassHash] = await Promise.all([
    sha256(normalizeUsername(providedUser)),
    sha256(normalizeUsername(expectedUser)),
    sha256(providedPass),
    sha256(expectedPass),
  ]);

  const userOk = timingSafeEqual(userHash, expectedUserHash);
  const passOk = timingSafeEqual(passHash, expectedPassHash);
  return userOk && passOk;
}
