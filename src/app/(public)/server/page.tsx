import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { ServerStatus } from "@/components/server/ServerStatus";
import { brand } from "@/lib/config";
import { getFiveMConnectUrl, getServerEnv } from "@/lib/env";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Server",
  description: "Server information, features and live status for Rogue RP on FiveM.",
  path: "/server",
});

const features = [
  ["Serious Roleplay", "Consequence, character and a city that does not reset every night."],
  ["Emergency Services", "Police, health and fire with training, radio and scene discipline."],
  ["Civilian Life", "Jobs, housing, ordinary nights and the people who make the city feel full."],
  ["Businesses", "Legal enterprise with staff support rather than copy-paste shops."],
  ["Criminal RP", "Crime with planning, risk and a police force that actually responds."],
  ["Player Economy", "Money that is earned in the world, not printed in Discord."],
  ["Custom Vehicles", "A Rogue RP fleet rather than a public server dump."],
  ["Custom Scripts", "Systems built for this community, connected through stable APIs."],
  ["Active Staff", "People who will pause a bad scene instead of ignoring it."],
  ["Community Events", "Briefings and city events that serve the story, not a follower count."],
];

export default function ServerPage() {
  const env = getServerEnv();
  const joinUrl = getFiveMConnectUrl();
  const facts = [
    { label: "Server Name", value: brand.name },
    { label: "Platform", value: brand.platform },
    { label: "Roleplay Style", value: brand.roleplayStyle },
    { label: "Location", value: brand.location },
    { label: "Address", value: env.fivemServerIp },
    { label: "Connect code", value: env.fivemConnectCode.toUpperCase() },
    { label: "Join", value: joinUrl || "Not set" },
    { label: "Slots", value: String(brand.slots) },
  ];

  return (
    <PageContainer>
      <PageHeader
        kicker="FiveM"
        title="The server"
        description="Rogue RP is a serious United Kingdom roleplay city. Live player count is read from the FiveM server. Direct connect uses play.rogueroleplay.co.uk and join code VQQD59Q."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <ServerStatus />
        <Card>
          <h2 className="font-display text-2xl uppercase text-white">Server information</h2>
          <dl className="mt-6 divide-y divide-white/10">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-center justify-between gap-4 py-3">
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-rogue-muted">
                  {fact.label}
                </dt>
                <dd className="break-all text-right text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
      <h2 className="mt-16 font-display text-3xl uppercase text-white">Features</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {features.map(([title, body]) => (
          <Card key={title}>
            <h3 className="font-display text-xl uppercase text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-rogue-muted">{body}</p>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
