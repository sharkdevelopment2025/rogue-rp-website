import { discordAvatarUrl } from "@/lib/utils";
import { isStaffKeyUser } from "@/lib/auth/staff-access";
import type { PublicUser, SessionUser } from "@/types";

export function userFromSession(input: SessionUser | null): PublicUser | null {
  if (!input) {
    return null;
  }
  return {
    discordId: input.discordId,
    username: input.username,
    displayName: input.globalName || input.username,
    avatarUrl: isStaffKeyUser(input) ? "/logo.jpg" : discordAvatarUrl(input.discordId, input.avatar, 64),
  };
}
