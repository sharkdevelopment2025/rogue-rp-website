import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatUkDate } from "@/lib/utils";
import type { ApplicationSummary } from "@/types";

const tone = {
  submitted: "muted",
  under_review: "warn",
  interview: "blue",
  approved: "ok",
  denied: "danger",
  withdrawn: "muted",
} as const;

const labels = {
  submitted: "Submitted",
  under_review: "Under Review",
  interview: "Interview",
  approved: "Approved",
  denied: "Denied",
  withdrawn: "Withdrawn",
};

export function ApplicationCard({
  application,
  href,
}: {
  application: ApplicationSummary;
  href?: string;
}) {
  const content = (
    <Card className="h-full transition hover:border-rogue-blue/40">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-rogue-blue">
          {application.reference}
        </p>
        <Badge tone={tone[application.status]}>{labels[application.status]}</Badge>
      </div>
      <h3 className="mt-4 font-display text-2xl uppercase text-white">{application.type}</h3>
      <p className="mt-3 text-sm text-rogue-muted">{formatUkDate(application.submittedAt)}</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-chrome">
        {application.stage}
      </p>
    </Card>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}
