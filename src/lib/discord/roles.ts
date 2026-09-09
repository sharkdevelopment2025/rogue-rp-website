import { getServerEnv, isDiscordBotConfigured } from "@/lib/env";
import { adminPermissions, staffRoleLabels, type StaffRoleKey } from "@/lib/config";

export interface GuildMemberSnapshot {
  discordId: string;
  nick: string | null;
  roleIds: string[];
  joinedAt: string | null;
}

const memberCache = new Map<string, { expires: number; member: GuildMemberSnapshot | null }>();

export async function hasDiscordRole(userId: string, roleId: string): Promise<boolean> {
  if (!roleId) {
    return false;
  }
  const member = await getGuildMember(userId);
  return Boolean(member?.roleIds.includes(roleId));
}

export async function getGuildMember(userId: string): Promise<GuildMemberSnapshot | null> {
  const cached = memberCache.get(userId);
  if (cached && cached.expires > Date.now()) {
    return cached.member;
  }

  const env = getServerEnv();
  if (!isDiscordBotConfigured()) {
    memberCache.set(userId, { expires: Date.now() + 15_000, member: null });
    return null;
  }

  const response = await fetch(
    `https://discord.com/api/v10/guilds/${env.discordGuildId}/members/${userId}`,
    {
      headers: { Authorization: `Bot ${env.discordBotToken}` },
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    memberCache.set(userId, { expires: Date.now() + 30_000, member: null });
    return null;
  }

  if (!response.ok) {
    memberCache.set(userId, { expires: Date.now() + 10_000, member: null });
    return null;
  }

  const json = (await response.json()) as {
    user?: { id: string };
    nick: string | null;
    roles: string[];
    joined_at: string | null;
  };

  const member: GuildMemberSnapshot = {
    discordId: json.user?.id ?? userId,
    nick: json.nick,
    roleIds: json.roles ?? [],
    joinedAt: json.joined_at,
  };

  memberCache.set(userId, { expires: Date.now() + 30_000, member });
  return member;
}

export function resolveStaffRoles(roleIds: string[]): StaffRoleKey[] {
  const env = getServerEnv();
  const mapping: Array<[StaffRoleKey, string]> = [
    ["owner", env.discordRoles.owner],
    ["director", env.discordRoles.director],
    ["management", env.discordRoles.management],
    ["administrator", env.discordRoles.administrator],
    ["moderator", env.discordRoles.moderator],
    ["development", env.discordRoles.development],
  ];

  return mapping
    .filter(([, id]) => id && roleIds.includes(id))
    .map(([key]) => key);
}

export function hasAnyStaffRole(roles: StaffRoleKey[]): boolean {
  return roles.some((role) =>
    Object.values(adminPermissions).some((allowed) => allowed.includes(role)),
  );
}

export function staffRoleName(role: StaffRoleKey): string {
  return staffRoleLabels[role];
}
