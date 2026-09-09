import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { isStaffKeyUser } from "@/lib/auth/staff-access";
import { getGuildMember, hasAnyStaffRole, resolveStaffRoles } from "@/lib/discord/roles";
import { getUserByDiscordId } from "@/lib/repositories/users";
import { adminPermissions, type StaffRoleKey } from "@/lib/config";
import type { GuildMemberSnapshot } from "@/lib/discord/roles";
import type { SessionUser } from "@/types";

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code: "unauthenticated" | "suspended" | "forbidden",
  ) {
    super(message);
  }
}

function staffKeyContext(user: SessionUser) {
  const member: GuildMemberSnapshot = {
    discordId: user.discordId,
    nick: user.globalName || user.username,
    roleIds: [],
    joinedAt: null,
  };
  return { user, member, roles: ["owner"] as StaffRoleKey[] };
}

export async function requireUser(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new AuthError("Sign in with Discord to continue.", "unauthenticated");
  }

  if (isStaffKeyUser(session)) {
    return session;
  }

  const stored = await getUserByDiscordId(session.discordId);
  if (stored?.websiteAccess === "suspended") {
    throw new AuthError("This website account has been suspended.", "suspended");
  }

  return session;
}

export async function requireStaff(permission: keyof typeof adminPermissions = "full") {
  const user = await requireUser();
  if (isStaffKeyUser(user)) {
    return staffKeyContext(user);
  }

  const member = await getGuildMember(user.discordId);
  if (!member) {
    throw new AuthError("Staff tools require membership in the Rogue RP Discord.", "forbidden");
  }

  const roles = resolveStaffRoles(member.roleIds);
  const allowed = adminPermissions[permission];
  const ok = roles.some((role) => allowed.includes(role));
  if (!ok) {
    throw new AuthError("You do not have permission to use this staff area.", "forbidden");
  }

  return { user, member, roles };
}

export async function requireAnyStaff() {
  const user = await requireUser();
  if (isStaffKeyUser(user)) {
    return staffKeyContext(user);
  }

  const member = await getGuildMember(user.discordId);
  if (!member) {
    throw new AuthError("Staff tools require membership in the Rogue RP Discord.", "forbidden");
  }
  const roles = resolveStaffRoles(member.roleIds);
  if (!roles.length) {
    throw new AuthError("You do not have permission to use this staff area.", "forbidden");
  }
  return { user, member, roles };
}

export async function getStaffContext() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  if (isStaffKeyUser(session)) {
    return staffKeyContext(session);
  }
  const member = await getGuildMember(session.discordId);
  if (!member) {
    return null;
  }
  const roles = resolveStaffRoles(member.roleIds);
  if (!hasAnyStaffRole(roles)) {
    return null;
  }
  return { user: session, member, roles };
}

export function loginRedirect(next = "/dashboard"): never {
  redirect(`/login?next=${encodeURIComponent(next)}`);
}

export async function requireUserOrRedirect(next: string): Promise<SessionUser> {
  try {
    return await requireUser();
  } catch (error) {
    if (error instanceof AuthError && error.code === "unauthenticated") {
      loginRedirect(next);
    }
    throw error;
  }
}

export function hasPermission(roles: StaffRoleKey[], permission: keyof typeof adminPermissions) {
  return roles.some((role) => adminPermissions[permission].includes(role));
}
