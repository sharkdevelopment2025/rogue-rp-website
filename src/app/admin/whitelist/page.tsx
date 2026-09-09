import { getApplications } from "@/lib/applications/client";
import { requireStaffPage } from "@/lib/auth/guards";
import { ApplicationCard } from "@/components/applications/ApplicationCard";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin Whitelist",
  description: "Whitelist applications from the Rogue RP applications bot.",
  path: "/admin/whitelist",
});

export default async function AdminWhitelistPage() {
  await requireStaffPage("applications");
  const result = await getApplications({ search: "whitelist" });

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Whitelist</h1>
      <p className="mt-3 text-sm text-rogue-muted">{result.message}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {result.items.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            href={`/admin/applications/${application.id}`}
          />
        ))}
      </div>
    </div>
  );
}
