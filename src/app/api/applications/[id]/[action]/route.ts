import { AuthError, requireStaff } from "@/lib/auth/guards";
import { mutateApplication } from "@/lib/applications/client";
import { isAllowedOrigin, jsonError } from "@/lib/server/http";
import { writeAuditLog } from "@/lib/repositories/audit";

const actions = ["claim", "approve", "deny", "interview", "assign"] as const;

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string; action: string }> },
) {
  if (!isAllowedOrigin(request)) {
    return jsonError("Invalid request origin.", 403);
  }

  try {
    const staff = await requireStaff("applications");
    const { id, action } = await context.params;
    if (!actions.includes(action as (typeof actions)[number])) {
      return jsonError("Unknown action.", 400);
    }
    const payload = (await request.json().catch(() => ({}))) as Record<string, string>;
    const result = await mutateApplication(id, action as (typeof actions)[number], payload);
    await writeAuditLog({
      actorDiscordId: staff.user.discordId,
      actorName: staff.user.username,
      action: `application.${action}`,
      target: id,
      detail: result.message,
    });
    return Response.json(result, { status: result.ok ? 200 : 502 });
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError("Not authorised.", error.code === "unauthenticated" ? 401 : 403);
    }
    return jsonError("Action failed.", 500);
  }
}
