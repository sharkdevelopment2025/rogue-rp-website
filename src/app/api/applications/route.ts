import { NextRequest } from "next/server";
import { AuthError, requireStaff, requireUser } from "@/lib/auth/guards";
import { getApplications } from "@/lib/applications/client";
import { jsonError } from "@/lib/server/http";
import { rateLimit, clientKey } from "@/lib/server/rate-limit";

export async function GET(request: NextRequest) {
  if (!rateLimit(`apps:${clientKey(request)}`, 40, 60_000)) {
    return jsonError("Too many requests.", 429);
  }

  try {
    const { searchParams } = request.nextUrl;
    const discordId = searchParams.get("discordId") || undefined;
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;

    if (discordId) {
      const user = await requireUser();
      if (user.discordId !== discordId) {
        await requireStaff("applications");
      }
    } else {
      await requireStaff("applications");
    }

    const result = await getApplications({ discordId, search, status });
    return Response.json(result);
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError("You do not have access to this resource.", error.code === "unauthenticated" ? 401 : 403);
    }
    return jsonError("Applications could not be loaded.", 500);
  }
}
