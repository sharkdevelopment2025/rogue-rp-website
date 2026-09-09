import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ApplicationCard } from "@/components/applications/ApplicationCard";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Button } from "@/components/ui/Button";
import { requireUserOrRedirect, getStaffContext } from "@/lib/auth/guards";
import { getMyApplications, getWhitelistStatus } from "@/lib/applications/client";
import { discordAvatarUrl } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Dashboard",
  description: "Your Rogue RP whitelist status, applications and Discord profile.",
  path: "/dashboard",
});

export default async function DashboardPage() {
  const user = await requireUserOrRedirect("/dashboard");
  const [whitelist, applications, staff] = await Promise.all([
    getWhitelistStatus(user.discordId),
    getMyApplications(user.discordId),
    getStaffContext(),
  ]);

  const whitelistState =
    whitelist.state === "approved" ? "ok" : whitelist.state === "pending" ? "pending" : "offline";

  return (
    <PageContainer>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-rogue-blue">My Rogue RP</p>
      <div className="mt-4 flex items-center gap-4">
        <Image
          src={discordAvatarUrl(user.discordId, user.avatar, 96)}
          alt=""
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h1 className="font-display text-4xl uppercase text-white">
            Welcome back, {user.globalName || user.username}
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-rogue-muted">
            {user.username}
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <DashboardCard title="Whitelist" href="/whitelist">
          <StatusIndicator
            state={whitelistState}
            label={whitelist.state === "none" ? "No record" : whitelist.state}
          />
          <p className="mt-3">{whitelist.message}</p>
        </DashboardCard>
        <DashboardCard title="Application status" href="/applications">
          {applications.items[0] ? (
            <p>
              Latest: {applications.items[0].reference} ·{" "}
              {applications.items[0].status.replaceAll("_", " ")}
            </p>
          ) : (
            <p>{applications.message}</p>
          )}
        </DashboardCard>
        <DashboardCard title="Discord" href="/discord">
          <p>Community, support and department channels live on the Rogue RP Discord.</p>
        </DashboardCard>
        <DashboardCard title="Profile">
          <p>Staff identity comes from the local login and cannot be edited into someone else.</p>
        </DashboardCard>
        <DashboardCard title="Applications" href="/applications">
          <p>{applications.items.length} application(s) on file.</p>
        </DashboardCard>
        {staff ? (
          <DashboardCard title="Staff" href="/admin">
            <p>
              {staff.user.staffKey
                ? "Open the website editor to post news, staff, media and other public pages."
                : "You have a Discord staff role. Open the admin dashboard."}
            </p>
          </DashboardCard>
        ) : null}
      </div>
      <div className="mt-12 flex gap-3">
        <Button href="/applications">View applications</Button>
        <Button href="/api/auth/logout" variant="secondary">
          Log out
        </Button>
      </div>
      {applications.items.length ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {applications.items.slice(0, 4).map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              href={`/applications/${application.id}`}
            />
          ))}
        </div>
      ) : null}
    </PageContainer>
  );
}
