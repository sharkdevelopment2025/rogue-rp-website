import { AuthError, requireStaff, requireUser } from "@/lib/auth/guards";
import { getApplication } from "@/lib/applications/client";
import { jsonError } from "@/lib/server/http";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const application = await getApplication(id, user.discordId);
    if (!application) {
      try {
        await requireStaff("applications");
      } catch {
        return jsonError("Application not found.", 404);
      }
      const staffView = await getApplication(id);
      if (!staffView) {
        return jsonError("Application not found.", 404);
      }
      return Response.json(staffView);
    }
    return Response.json(application);
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError("Sign in required.", 401);
    }
    return jsonError("Application could not be loaded.", 500);
  }
}
