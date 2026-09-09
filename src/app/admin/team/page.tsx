import { requireStaffPage } from "@/lib/auth/guards";
import { isSeededTeamMember, listTeam } from "@/lib/repositories/team";
import { saveTeamAction, deleteTeamAction } from "@/app/admin/actions";
import { teamGroups } from "@/data/team";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";
import type { TeamMember } from "@/types";

export const metadata = createMetadata({
  title: "Admin Staff",
  description: "Configure Rogue RP staff members shown on the public Staff page.",
  path: "/admin/team",
});

export default async function AdminTeamPage() {
  await requireStaffPage("content");
  const members = await listTeam();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Staff</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-rogue-muted">
        Members saved here appear on the public Staff page. Core roster names can be edited. Extra
        members can be added or removed.
      </p>
      <section className="panel mt-8 p-6">
        <h2 className="font-display text-2xl uppercase text-white">Add staff member</h2>
        <TeamForm />
      </section>
      <div className="mt-8 space-y-6">
        {members.map((member) => (
          <section key={member.id} className="panel p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl uppercase text-white">{member.discordName}</h2>
              {isSeededTeamMember(member.id) ? (
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-muted">
                  Core roster
                </p>
              ) : (
                <form
                  action={async () => {
                    "use server";
                    await deleteTeamAction(member.id);
                  }}
                >
                  <Button type="submit" variant="danger">
                    Remove
                  </Button>
                </form>
              )}
            </div>
            <TeamForm member={member} />
          </section>
        ))}
      </div>
    </div>
  );
}

function TeamForm({ member }: { member?: TeamMember }) {
  return (
    <form action={saveTeamAction} className="mt-4 grid gap-3">
      {member ? <input type="hidden" name="id" value={member.id} /> : null}
      <input
        name="discordName"
        required
        placeholder="Discord name"
        defaultValue={member?.discordName}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      />
      <input
        name="role"
        required
        placeholder="Role title"
        defaultValue={member?.role}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      />
      <select
        name="group"
        defaultValue={member?.group ?? "Admin"}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      >
        {teamGroups.map((group) => (
          <option key={group}>{group}</option>
        ))}
      </select>
      <input
        name="avatar"
        placeholder="Image path, or upload below"
        defaultValue={member?.avatar ?? "/logo.jpg"}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      />
      <label className="grid gap-2 text-sm text-rogue-muted">
        Photo
        <input name="avatarFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
      </label>
      <textarea
        name="description"
        required
        rows={3}
        placeholder="Short bio"
        defaultValue={member?.description}
        className="border border-white/10 bg-black/40 px-3 py-2 text-white"
      />
      <input
        name="order"
        type="number"
        defaultValue={member?.order ?? 10}
        className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
      />
      <Button type="submit">{member ? "Save changes" : "Add member"}</Button>
    </form>
  );
}
