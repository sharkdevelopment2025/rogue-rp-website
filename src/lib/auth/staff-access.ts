import { timingSafeEqual } from "node:crypto";
import { STAFF_ACCESS_DISCORD_ID, STAFF_ACCESS_MIN_LENGTH } from "@/lib/auth/constants";
import { getServerEnv, isStaffAccessConfigured } from "@/lib/env";
import type { SessionUser } from "@/types";

export function createStaffKeyUser(): SessionUser {
  const now = Date.now();
  return {
    discordId: STAFF_ACCESS_DISCORD_ID,
    username: "Staff",
    globalName: "Staff",
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

export async function staffAccessCodeMatches(input: string): Promise<boolean> {
  const expected = getServerEnv().staffAccessCode.trim();
  const provided = input.trim();

  if (!isStaffAccessConfigured() || expected.length < STAFF_ACCESS_MIN_LENGTH) {
    return false;
  }

  const encoder = new TextEncoder();
  const [providedHash, expectedHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(provided)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);

  return timingSafeEqual(Buffer.from(providedHash), Buffer.from(expectedHash));
}
