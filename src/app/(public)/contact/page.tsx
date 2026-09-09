import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getSettings } from "@/lib/repositories/settings";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact Rogue RP through Discord for support, staff, development, partnership and appeals.",
  path: "/contact",
});

const options = [
  ["Discord Support", "Use the support channels for account, whitelist and in-game issues."],
  ["General Enquiry", "Community questions that are not an emergency and not a ban appeal."],
  ["Staff Enquiry", "Existing staff coordination. Do not use this to skip applications."],
  ["Development Enquiry", "Script, website or integration questions from trusted contributors."],
  ["Partnership", "Community or creator partnerships. Send a clear proposal, not a follow-for-follow pitch."],
  ["Appeal", "Whitelist denials and punishments are handled in the Discord appeal process."],
];

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <PageContainer>
      <PageHeader
        kicker="Contact"
        title="Talk to Rogue RP"
        description="We do not publish personal staff inboxes. Support goes through the official Discord so it can be logged, assigned and answered."
      />
      <div className="mt-8">
        <Button
          href={settings.discordInvite || "/discord"}
          external={Boolean(settings.discordInvite)}
        >
          Open Discord support
        </Button>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {options.map(([title, body]) => (
          <Card key={title}>
            <h2 className="font-display text-xl uppercase text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-rogue-muted">{body}</p>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
