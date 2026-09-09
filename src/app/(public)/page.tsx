import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DepartmentLinkCard } from "@/components/departments/DepartmentCard";
import { NewsCard } from "@/components/news/NewsCard";
import { PlayRogueButton } from "@/components/server/PlayRogueButton";
import { ServerStatus } from "@/components/server/ServerStatus";
import { getSession } from "@/lib/auth/session";
import { brand } from "@/lib/config";
import { listDepartments } from "@/lib/repositories/departments";
import { listNews } from "@/lib/repositories/news";
import { getSettings } from "@/lib/repositories/settings";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Rogue RP | Serious FiveM Roleplay",
  description: brand.description,
  path: "/",
});

export default async function HomePage() {
  const [departments, news, session, settings] = await Promise.all([
    listDepartments(),
    listNews(),
    getSession(),
    getSettings(),
  ]);
  const applyHref = session ? "/applications" : "/whitelist";
  const discordHref = settings.discordInvite || "/discord";

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 city-grid opacity-60" />
        <div className="absolute inset-0 bg-[url('/backgrounds/city-night.svg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-rogue-void/20 via-rogue-void/55 to-rogue-void" />
        <div className="light-streaks" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rise-in">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-rogue-blue">
              United Kingdom · Serious Roleplay
            </p>
            <div className="mt-6 flex items-center gap-5">
              <Image
                src="/logo.jpg"
                alt="Rogue RP logo"
                width={112}
                height={112}
                priority
                className="rounded-full border border-rogue-blue/50 object-cover shadow-[0_0_40px_rgba(0,163,255,0.45)]"
              />
              <h1 className="font-display text-5xl font-semibold uppercase leading-[0.85] text-white md:text-7xl">
                Rogue RP
              </h1>
            </div>
            <p className="mt-8 max-w-xl font-display text-3xl uppercase leading-tight text-rogue-chrome md:text-5xl">
              Serious roleplay.
              <br />
              Realistic stories.
              <br />
              Your choice.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <PlayRogueButton />
              <Button href={discordHref} variant="secondary" external={discordHref.startsWith("http")}>
                Join Discord
              </Button>
              <Button href={applyHref} variant="ghost">
                Apply now
              </Button>
            </div>
          </div>
          <div className="rise-in">
            <ServerStatus />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-rogue-blue">
              Rogue RP departments
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase text-white">The city is organised</h2>
          </div>
          <Link href="/departments" className="font-display uppercase tracking-[0.16em] text-rogue-blue">
            All departments
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {departments.map((department) => (
            <DepartmentLinkCard key={department.id} department={department} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-rogue-blue">Latest news</p>
            <h2 className="mt-3 font-display text-4xl uppercase text-white">From the city desk</h2>
          </div>
          <Link href="/news" className="font-display uppercase tracking-[0.16em] text-rogue-blue">
            View all news →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {news.slice(0, 3).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
        <div className="panel panel-glow px-8 py-12 md:px-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-rogue-blue">Whitelist</p>
          <h2 className="mt-4 font-display text-4xl uppercase text-white md:text-6xl">
            Ready to start your story?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-rogue-muted">Become part of Rogue RP.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={session ? "/applications" : "/whitelist"}>Apply for whitelist</Button>
            <Button href={discordHref} variant="secondary">
              Join Discord
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
