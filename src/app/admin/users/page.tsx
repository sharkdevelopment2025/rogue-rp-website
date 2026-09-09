import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { requireStaffPage } from "@/lib/auth/guards";
import { listUsers } from "@/lib/repositories/users";
import { setAccessAction } from "@/app/admin/actions";
import { discordAvatarUrl, formatUkDateTime } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin Users",
  description: "Website accounts that have signed in with Discord.",
  path: "/admin/users",
});

export default async function AdminUsersPage() {
  await requireStaffPage("users");
  const users = await listUsers();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Users</h1>
      <p className="mt-3 text-sm text-rogue-muted">
        Discord identities cannot be rewritten. Staff can only suspend or restore website access.
      </p>
      <div className="mt-8 space-y-4">
        {users.map((user) => (
          <Card key={user.discordId} className="p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={discordAvatarUrl(user.discordId, user.avatar, 64)}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-display text-xl uppercase text-white">
                    {user.globalName || user.username}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-rogue-muted">
                    {user.username} · {user.discordId}
                  </p>
                </div>
              </div>
              <div className="text-sm text-rogue-muted">
                <p>Whitelist source: applications bot</p>
                <p>Created {formatUkDateTime(user.createdAt)}</p>
                <p>Last login {formatUkDateTime(user.lastLoginAt)}</p>
                <p>Website access: {user.websiteAccess}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <form
                action={async () => {
                  "use server";
                  await setAccessAction(
                    user.discordId,
                    user.websiteAccess === "suspended" ? "active" : "suspended",
                  );
                }}
              >
                <Button type="submit" variant={user.websiteAccess === "suspended" ? "secondary" : "danger"}>
                  {user.websiteAccess === "suspended" ? "Restore access" : "Suspend website access"}
                </Button>
              </form>
              <Button href={`/admin/applications?search=${user.discordId}`} variant="ghost">
                View applications
              </Button>
            </div>
          </Card>
        ))}
        {users.length === 0 ? (
          <p className="text-rogue-muted">No website accounts yet. Users appear after they log in.</p>
        ) : null}
      </div>
    </div>
  );
}
