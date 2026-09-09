import { requireStaff } from "@/lib/auth/guards";
import { getSettings } from "@/lib/repositories/settings";
import { saveSettingsAction } from "@/app/admin/actions";
import { isPersistentStore } from "@/lib/repositories/store";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin Settings",
  description: "Website settings for Rogue RP.",
  path: "/admin/settings",
});

export default async function AdminSettingsPage() {
  await requireStaff("settings");
  const settings = await getSettings();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Settings</h1>
      <p className="mt-3 max-w-2xl text-sm text-rogue-muted">
        {isPersistentStore()
          ? "Changes are saved to the local development store."
          : "This deployment has no attached database. Settings save in memory for the current serverless instance until a Vercel-compatible store is connected."}{" "}
        Staff login uses STAFF_ACCESS_CODE in the server environment, not this form.
      </p>
      <form action={saveSettingsAction} className="panel mt-8 grid max-w-xl gap-4 p-6">
        <label className="grid gap-2 text-sm text-rogue-muted">
          Discord invite
          <input name="discordInvite" defaultValue={settings.discordInvite} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
        </label>
        <label className="grid gap-2 text-sm text-rogue-muted">
          Server display name
          <input name="serverDisplayName" defaultValue={settings.serverDisplayName} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
        </label>
        <label className="grid gap-2 text-sm text-rogue-muted">
          Max players
          <input name="maxPlayers" type="number" defaultValue={settings.maxPlayers} className="min-h-11 border border-white/10 bg-black/40 px-3 text-white" />
        </label>
        <label className="grid gap-2 text-sm text-rogue-muted">
          Maintenance message
          <textarea name="maintenanceMessage" defaultValue={settings.maintenanceMessage} rows={3} className="border border-white/10 bg-black/40 px-3 py-2 text-white" />
        </label>
        <Button type="submit">Save settings</Button>
      </form>
    </div>
  );
}
