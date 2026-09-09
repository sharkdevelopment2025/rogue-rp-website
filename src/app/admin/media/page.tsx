import { requireStaffPage } from "@/lib/auth/guards";
import { listAllMedia } from "@/lib/repositories/media";
import { saveMediaAction, deleteMediaAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin Media",
  description: "Publish Rogue RP media.",
  path: "/admin/media",
});

export default async function AdminMediaPage() {
  await requireStaffPage("content");
  const items = await listAllMedia();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-white">Media</h1>
      <p className="mt-3 max-w-2xl text-sm text-rogue-muted">
        Upload an image or paste a path. Published items appear on the Media page.
      </p>
      <form action={saveMediaAction} className="panel mt-8 grid gap-3 p-6 md:grid-cols-2">
        <input
          name="title"
          placeholder="Title"
          required
          className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
        />
        <select name="kind" className="min-h-11 border border-white/10 bg-black/40 px-3 text-white">
          <option value="screenshot">Screenshots</option>
          <option value="video">Videos</option>
          <option value="event">Events</option>
          <option value="community">Community</option>
          <option value="trailer">Trailers</option>
        </select>
        <input
          name="src"
          placeholder="Image or video path (optional if you upload a file)"
          className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
        />
        <input
          name="href"
          placeholder="Optional link"
          className="min-h-11 border border-white/10 bg-black/40 px-3 text-white"
        />
        <label className="grid gap-2 text-sm text-rogue-muted md:col-span-2">
          Image file
          <input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
        </label>
        <label className="flex items-center gap-2 text-sm text-rogue-chrome">
          <input type="checkbox" name="published" defaultChecked />
          Published
        </label>
        <Button type="submit">Add media</Button>
      </form>
      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <form
            key={item.id}
            className="flex items-center justify-between gap-4 border border-white/10 p-4"
            action={async () => {
              "use server";
              await deleteMediaAction(item.id);
            }}
          >
            <p className="text-white">
              {item.title} <span className="text-rogue-muted">({item.kind})</span>
            </p>
            <Button type="submit" variant="danger">
              Delete
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}
