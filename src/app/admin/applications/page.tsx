import { ApplicationCard } from "@/components/applications/ApplicationCard";
import { ApplicationActions } from "@/components/admin/ApplicationActions";
import { Card } from "@/components/ui/Card";
import { requireStaff } from "@/lib/auth/guards";
import { getApplications } from "@/lib/applications/client";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin Applications",
  description: "Review Rogue RP applications through the connected bot backend.",
  path: "/admin/applications",
});

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  await requireStaff("applications");
  const params = await searchParams;
  const result = await getApplications({
    search: params.search,
    status: params.status,
  });

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Applications</h1>
      <p className="mt-3 max-w-2xl text-sm text-rogue-muted">{result.message}</p>
      <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="/admin/applications">
        <input
          name="search"
          defaultValue={params.search}
          placeholder="Search"
          className="min-h-11 flex-1 border border-white/10 bg-black/40 px-3 text-sm text-white"
        />
        <select
          name="status"
          defaultValue={params.status}
          className="min-h-11 border border-white/10 bg-black/40 px-3 text-sm text-white"
        >
          <option value="">All statuses</option>
          <option value="submitted">Submitted</option>
          <option value="under_review">Under review</option>
          <option value="interview">Interview</option>
          <option value="approved">Approved</option>
          <option value="denied">Denied</option>
        </select>
        <button className="btn-primary px-5 font-display uppercase tracking-[0.14em]">Filter</button>
      </form>
      <div className="mt-8 grid gap-5">
        {result.items.map((application) => (
          <Card key={application.id}>
            <ApplicationCard application={application} href={`/admin/applications/${application.id}`} />
            <div className="mt-4">
              <ApplicationActions id={application.id} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
