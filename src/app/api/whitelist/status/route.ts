import { AuthError, requireUser } from "@/lib/auth/guards";
import { getWhitelistStatus } from "@/lib/applications/client";
import { jsonError } from "@/lib/server/http";

export async function GET() {
  try {
    const user = await requireUser();
    const status = await getWhitelistStatus(user.discordId);
    return Response.json(status);
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError("Sign in required.", 401);
    }
    return jsonError("Whitelist status could not be loaded.", 500);
  }
}
