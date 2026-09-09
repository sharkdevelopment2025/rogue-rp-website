import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { staffGroups } from "@/data/team";
import { listTeam } from "@/lib/repositories/team";
import { getSettings } from "@/lib/repositories/settings";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Staff",
  description:
    "Meet the Rogue RP staff team. Appointed members are listed by rank and managed from the admin panel.",
  path: "/staff",
});

export default async function StaffPage() {
  const [members, settings] = await Promise.all([listTeam(), getSettings()]);
  const discordHref = settings.discordInvite || "/discord";

  return (
    <PageContainer>
      <PageHeader
        kicker="Leadership"
        title="Staff"
        description="Appointed Rogue RP staff are listed here. These ranks are out of character. Staff characters still follow the same rules as everyone else."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Stat label="Published staff" value={String(members.length)} />
        <Stat label="Staff ranks" value={String(staffGroups.length)} />
        <Stat label="Contact" value="Discord" />
      </div>

      <div className="mt-14 space-y-14">
        {staffGroups.map((group, index) => {
          const groupMembers = members.filter((member) => member.group === group.name);
          return (
            <section key={group.name}>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rogue-blue">
                    Rank {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-3xl uppercase text-white">{group.name}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-rogue-muted">{group.summary}</p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rogue-muted">
                  {groupMembers.length} {groupMembers.length === 1 ? "member" : "members"}
                </p>
              </div>
              <hr className="hairline mt-5" />
              {groupMembers.length ? (
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {groupMembers.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm text-rogue-muted">No members listed in this rank yet.</p>
              )}
            </section>
          );
        })}
      </div>

      <section className="panel panel-glow mt-16 px-8 py-10 md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-rogue-blue">Support</p>
        <h2 className="mt-3 font-display text-3xl uppercase text-white">Need staff?</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-rogue-muted">
          Use Discord for tickets, appeals and department questions. Do not treat this page as
          in-character rank, and do not contact staff privately to skip applications.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={discordHref} external={discordHref.startsWith("http")}>
            Open Discord
          </Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </section>
    </PageContainer>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel px-5 py-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rogue-muted">{label}</p>
      <p className="mt-2 font-display text-2xl uppercase text-white">{value}</p>
    </div>
  );
}
