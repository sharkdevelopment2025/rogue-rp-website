import Link from "next/link";
import { requireStaffPage } from "@/lib/auth/guards";
import { listNews } from "@/lib/repositories/news";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { deleteNewsAction, publishNewsAction } from "@/app/admin/actions";
import { formatUkDate } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin News",
  description: "Create, edit, publish and schedule Rogue RP news.",
  path: "/admin/news",
});

export default async function AdminNewsPage() {
  await requireStaffPage("content");
  const articles = await listNews({ includeUnpublished: true });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-4xl uppercase text-white">News</h1>
        <Button href="/admin/news/new">Create article</Button>
      </div>
      <div className="mt-8 space-y-4">
        {articles.map((article) => (
          <article key={article.id} className="panel p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <Badge tone={article.published ? "ok" : "muted"}>
                  {article.published ? "Published" : "Draft"}
                </Badge>
                <h2 className="mt-2 font-display text-2xl uppercase text-white">{article.title}</h2>
                <p className="text-sm text-rogue-muted">
                  {article.category} · {formatUkDate(article.publishedAt)}
                  {article.scheduledFor ? ` · scheduled ${formatUkDate(article.scheduledFor)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button href={`/admin/news/${article.id}`} variant="secondary">
                  Edit
                </Button>
                <form
                  action={async () => {
                    "use server";
                    await publishNewsAction(article.id, !article.published);
                  }}
                >
                  <Button type="submit" variant="ghost">
                    {article.published ? "Unpublish" : "Publish"}
                  </Button>
                </form>
                <form
                  action={async () => {
                    "use server";
                    await deleteNewsAction(article.id);
                  }}
                >
                  <Button type="submit" variant="danger">
                    Delete
                  </Button>
                </form>
                <Link href={`/news/${article.slug}`} className="px-3 py-2 font-display text-sm uppercase text-rogue-blue">
                  View
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
