import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Rogue RP",
  description:
    "Rogue RP is a serious roleplay community built around immersive, realistic and player-driven experiences.",
  path: "/about",
});

const chapters = [
  {
    title: "Our Community",
    body: "Rogue RP is a British FiveM community for players who want the city to feel occupied. We look for people who can hold a conversation, honour consequence, and leave other players better scenes than they found.",
  },
  {
    title: "Our Vision",
    body: "A living city with civilian lives, emergency services, crime, businesses and politics that actually touch each other. Not a lobby. Not a deathmatch server wearing a roleplay tag.",
  },
  {
    title: "Our Standards",
    body: "Serious does not mean humourless. It means the world is treated as real. Value of life, no metagaming, no powergaming, and no using staff tools or Discord knowledge as a weapon.",
  },
  {
    title: "Our Roleplay",
    body: "Stories are player-driven. Staff exist to keep the frame intact, not to write your character for you. If you want a story, start one. If you want a shortcut, this is the wrong city.",
  },
  {
    title: "Our Future",
    body: "The website, Discord applications bot, departments and FiveM resources are being built as one Rogue RP ecosystem. Integrations with MDT, economy and character systems will land through stable APIs — not a hard-wired framework lock-in.",
  },
];

export default function AboutPage() {
  return (
    <PageContainer>
      <PageHeader
        kicker="Who we are"
        title="Rogue RP"
        description="Rogue RP is a serious roleplay community built around immersive, realistic and player-driven experiences."
      />
      <div className="mt-12 grid gap-6">
        {chapters.map((chapter, index) => (
          <Card key={chapter.title} glow={index === 0}>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rogue-blue">
              0{index + 1}
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase text-white">{chapter.title}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-rogue-muted">{chapter.body}</p>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
