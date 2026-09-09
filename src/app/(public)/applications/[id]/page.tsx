import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { requireUserOrRedirect } from "@/lib/auth/guards";
import { getApplication } from "@/lib/applications/client";
import { formatUkDate, formatUkDateTime } from "@/lib/utils";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUserOrRedirect("/applications");
  const { id } = await params;
  const application = await getApplication(id, user.discordId);

  if (!application) {
    notFound();
  }

  return (
    <PageContainer>
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-rogue-blue">
        {application.reference}
      </p>
      <h1 className="mt-3 font-display text-4xl uppercase text-white">{application.type}</h1>
      <div className="mt-4">
        <Badge>{application.status.replaceAll("_", " ")}</Badge>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl uppercase text-white">Application status</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Submission date" value={formatUkDate(application.submittedAt)} />
            <Row label="Current stage" value={application.stage} />
            <Row label="Interview status" value={application.interviewStatus || "Not requested"} />
            <Row label="Decision" value={application.decision || "Pending"} />
          </dl>
        </Card>
        <Card>
          <h2 className="font-display text-xl uppercase text-white">Notifications</h2>
          {application.notifications.length ? (
            <ul className="mt-4 space-y-3">
              {application.notifications.map((item) => (
                <li key={item.id} className="text-sm text-rogue-muted">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-chrome">
                    {formatUkDateTime(item.createdAt)}
                  </p>
                  <p className="mt-1">{item.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-rogue-muted">No public notifications yet.</p>
          )}
        </Card>
      </div>
    </PageContainer>
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
