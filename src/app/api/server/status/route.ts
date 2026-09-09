import { getServerStatus } from "@/lib/fivem/status";

export async function GET() {
  const status = await getServerStatus();
  return Response.json(status, {
    headers: {
      "Cache-Control": "public, s-maxage=15, stale-while-revalidate=45",
    },
  });
}
