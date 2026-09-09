import { AuthError, requireUser } from "@/lib/auth/guards";
import { getMyApplications } from "@/lib/applications/client";
import { jsonError } from "@/lib/server/http";

export async function GET() {
  try {
    const user = await requireUser();
    const result = await getMyApplications(user.discordId);
    return Response.json(result);
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError("Sign in required.", 401);
    }
    return jsonError("Applications could not be loaded.", 500);
  }
}
