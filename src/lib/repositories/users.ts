import { storeGet, storeSet } from "@/lib/repositories/store";
import type { StoredUser, WebsiteAccess } from "@/types";

const KEY = "users";

export async function listUsers(): Promise<StoredUser[]> {
  const users = await storeGet<StoredUser[]>(KEY, []);
  return users.sort(
    (a, b) => new Date(b.lastLoginAt).getTime() - new Date(a.lastLoginAt).getTime(),
  );
}

export async function getUserByDiscordId(discordId: string): Promise<StoredUser | null> {
  const users = await listUsers();
  return users.find((user) => user.discordId === discordId) ?? null;
}

export async function upsertUser(
  user: Omit<StoredUser, "createdAt" | "websiteAccess" | "lastLoginAt"> & {
    websiteAccess?: WebsiteAccess;
    createdAt?: string;
    lastLoginAt?: string;
  },
): Promise<StoredUser> {
  const users = await storeGet<StoredUser[]>(KEY, []);
  const existing = users.find((item) => item.discordId === user.discordId);
  const record: StoredUser = {
    discordId: user.discordId,
    username: user.username,
    globalName: user.globalName,
    discriminator: user.discriminator,
    avatar: user.avatar,
    issuedAt: user.issuedAt,
    lastLogin: user.lastLogin,
    guildMember: user.guildMember,
    roleIds: user.roleIds,
    websiteAccess: existing?.websiteAccess ?? user.websiteAccess ?? "active",
    createdAt: existing?.createdAt ?? user.createdAt ?? new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };
  const next = existing
    ? users.map((item) => (item.discordId === record.discordId ? record : item))
    : [record, ...users];
  await storeSet(KEY, next);
  return record;
}

export async function setUserAccess(
  discordId: string,
  websiteAccess: WebsiteAccess,
): Promise<StoredUser | null> {
  const user = await getUserByDiscordId(discordId);
  if (!user) {
    return null;
  }
  return upsertUser({ ...user, websiteAccess });
}
