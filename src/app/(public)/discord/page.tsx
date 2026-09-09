import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { getSettings } from "@/lib/repositories/settings";
import { hasDiscordInvite } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Discord",
  description: "Join the Rogue RP Discord for support, applications, departments and announcements.",
  path: "/discord",
});

export default async function DiscordPage() {
  const settings = await getSettings();
  const ready = hasDiscordInvite() || Boolean(settings.discordInvite);

  return (
    <PageContainer>
      <PageHeader
        kicker="Community"
        title="Join the Rogue RP community"
        description="Connect with other players, get support, apply for departments and stay up to date."
      />
      <div className="panel panel-glow mt-10 max-w-2xl p-8">
        {ready ? (
          <Button href={settings.discordInvite} external>
            Join Discord
          </Button>
        ) : (
          <p className="text-rogue-muted">
            The public Discord invite is not configured yet. Staff can set NEXT_PUBLIC_DISCORD_INVITE
            or publish an invite from the admin settings page.
          </p>
        )}
      </div>
    </PageContainer>
  );
}
