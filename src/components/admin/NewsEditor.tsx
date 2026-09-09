import { saveNewsAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import type { NewsArticle } from "@/types";

const categories = [
  "Server Update",
  "Department Update",
  "Community News",
  "Development Update",
  "Event",
  "Announcement",
];

export function NewsEditor({ article }: { article?: NewsArticle }) {
  return (
    <form action={saveNewsAction} className="space-y-4">
      <input type="hidden" name="id" defaultValue={article?.id} />
      <Field label="Title" name="title" defaultValue={article?.title} required />
      <Field label="Slug" name="slug" defaultValue={article?.slug} />
      <Field label="Description" name="description" defaultValue={article?.description} required />
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-muted">Category</span>
        <select
          name="category"
          defaultValue={article?.category}
          className="mt-2 min-h-11 w-full border border-white/10 bg-black/40 px-3 text-white"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </label>
      <Field label="Tags" name="tags" defaultValue={article?.tags.join(", ")} />
      <Field label="Author" name="author" defaultValue={article?.author} />
      <Field label="Featured image path" name="featuredImage" defaultValue={article?.featuredImage || "/logo.jpg"} />
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-muted">
          Featured image file
        </span>
        <input
          name="featuredFile"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="mt-2 block w-full text-sm text-rogue-muted"
        />
      </label>
      <Field label="Schedule (ISO date, optional)" name="scheduledFor" defaultValue={article?.scheduledFor || ""} />
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-muted">Content</span>
        <textarea
          name="content"
          required
          defaultValue={article?.content}
          rows={12}
          className="mt-2 w-full border border-white/10 bg-black/40 px-3 py-3 text-sm text-white"
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-rogue-chrome">
        <input type="checkbox" name="published" defaultChecked={article?.published} />
        Publish immediately
      </label>
      <Button type="submit">Save article</Button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-muted">{label}</span>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 min-h-11 w-full border border-white/10 bg-black/40 px-3 text-white"
      />
    </label>
  );
}
