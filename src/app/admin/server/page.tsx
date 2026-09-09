import { requireStaffPage } from "@/lib/auth/guards";
import { getServerStatus } from "@/lib/fivem/status";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatUkDateTime } from "@/lib/utils";
import { getServerEnv } from "@/lib/env";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin Server",
  description: "Live Rogue RP FiveM status for staff.",
  path: "/admin/server",
});

export default async function AdminServerPage() {
  await requireStaffPage("server");
  const status = await getServerStatus();
  const env = getServerEnv();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Server</h1>
      <Card className="mt-8">
        <dl className="space-y-3 text-sm">
          <Row label="Server status" value={status.statusLabel} />
          <Row label="Player count" value={`${status.players}`} />
          <Row label="Maximum players" value={`${status.maxPlayers}`} />
          <Row label="Server IP" value={env.fivemServerIp || "Not set"} />
          <Row label="Server port" value={env.fivemServerPort || "Not set"} />
          <Row label="Connect code" value={env.fivemConnectCode || "Not set"} />
          <Row label="Join URL" value={status.connectUrl || "Not set"} />
          <Row label="Last checked" value={formatUkDateTime(status.lastChecked)} />
        </dl>
        <div className="mt-6">
          <Button href="/admin/server">Refresh</Button>
        </div>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-rogue-muted">{label}</dt>
      <dd className="text-white">{value}</dd>
    </div>
  );
}
