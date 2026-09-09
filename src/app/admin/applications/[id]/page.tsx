import { notFound } from "next/navigation";
import { ApplicationActions } from "@/components/admin/ApplicationActions";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { requireStaff } from "@/lib/auth/guards";
import { getApplication } from "@/lib/applications/client";
import { formatUkDateTime } from "@/lib/utils";

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireStaff("applications");
  const { id } = await params;
  const application = await getApplication(id);
  if (!application) {
    notFound();
  }

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-rogue-blue">
        {application.reference}
      </p>
      <h1 className="mt-2 font-display text-4xl uppercase text-white">{application.type}</h1>
      <div className="mt-4">
        <Badge>{application.status.replaceAll("_", " ")}</Badge>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl uppercase text-white">Review</h2>
          <p className="mt-3 text-sm text-rogue-muted">
            Actions are sent to the Rogue RP applications bot. Staff notes from Discord are not
            displayed here.
          </p>
          <div className="mt-6">
            <ApplicationActions id={application.id} />
          </div>
        </Card>
        <Card>
          <h2 className="font-display text-xl uppercase text-white">Public notifications</h2>
          {application.notifications.length ? (
            <ul className="mt-4 space-y-3 text-sm text-rogue-muted">
              {application.notifications.map((item) => (
                <li key={item.id}>
                  {formatUkDateTime(item.createdAt)} — {item.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-rogue-muted">None published.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
