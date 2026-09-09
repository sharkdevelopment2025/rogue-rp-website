import { requireStaff } from "@/lib/auth/guards";
import { listAuditLogs } from "@/lib/repositories/audit";
import { formatUkDateTime } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Audit Logs",
  description: "Staff audit trail for the Rogue RP website.",
  path: "/admin/audit",
});

export default async function AdminAuditPage() {
  await requireStaff("settings");
  const logs = await listAuditLogs();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Audit logs</h1>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-muted">
            <tr>
              <th className="pb-3">When</th>
              <th className="pb-3">Actor</th>
              <th className="pb-3">Action</th>
              <th className="pb-3">Target</th>
              <th className="pb-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-white/10 text-rogue-chrome">
                <td className="py-3">{formatUkDateTime(log.createdAt)}</td>
                <td>{log.actorName}</td>
                <td>{log.action}</td>
                <td>{log.target}</td>
                <td>{log.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 ? <p className="mt-6 text-rogue-muted">No staff actions recorded yet.</p> : null}
      </div>
    </div>
  );
}
