import { getSession } from "@/lib/auth/session";
import { discordAvatarUrl } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ user: null });
  }
  return Response.json({
    user: {
      discordId: session.discordId,
      username: session.username,
      displayName: session.globalName || session.username,
      avatarUrl: discordAvatarUrl(session.discordId, session.avatar),
    },
  });
}
