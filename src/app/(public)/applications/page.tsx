import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { ApplicationCard } from "@/components/applications/ApplicationCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getSession } from "@/lib/auth/session";
import { getMyApplications } from "@/lib/applications/client";
import { getServerEnv, isApplicationApiConfigured } from "@/lib/env";
import { getSettings } from "@/lib/repositories/settings";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Applications",
  description: "Rogue RP applications are processed through the Discord applications bot and shown on this website.",
  path: "/applications",
});

export default async function ApplicationsPage() {
  const session = await getSession();
  const settings = await getSettings();
  const env = getServerEnv();
  const mine = session ? await getMyApplications(session.discordId) : null;
  const startHref = env.applicationStartUrl || settings.discordInvite || "/discord";

  return (
    <PageContainer>
      <PageHeader
        kicker="My applications"
        title="Applications"
        description="Whitelist and department applications are handled by the Rogue RP Discord applications bot. This website reads that system. It does not replace it."
      />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href={startHref} external={Boolean(env.applicationStartUrl || settings.discordInvite)}>
          Start application
        </Button>
        {!session ? (
          <Button href={settings.discordInvite || "/discord"} variant="secondary" external>
            Join Discord
          </Button>
        ) : null}
      </div>

      {!isApplicationApiConfigured() ? (
        <Card className="mt-10">
          <h2 className="font-display text-2xl uppercase text-white">Applications bot</h2>
          <p className="mt-3 text-rogue-muted">
            The applications API is not connected yet. Use Discord to apply. Staff can connect
            APPLICATION_API_URL when the bot backend is ready.
          </p>
        </Card>
      ) : null}

      {mine ? (
        <div className="mt-12">
          <h2 className="font-display text-3xl uppercase text-white">My applications</h2>
          <p className="mt-2 text-sm text-rogue-muted">{mine.message}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {mine.items.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                href={`/applications/${application.id}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </PageContainer>
  );
}
