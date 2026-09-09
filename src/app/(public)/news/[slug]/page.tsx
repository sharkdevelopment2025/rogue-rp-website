import Image from "next/image";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { getNewsBySlug, listNews } from "@/lib/repositories/news";
import { renderMarkdown } from "@/lib/markdown";
import { createMetadata } from "@/lib/metadata";
import { formatUkDate } from "@/lib/utils";

export async function generateStaticParams() {
  const articles = await listNews();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article || !article.published) {
    return createMetadata({ title: "News", description: "Rogue RP news.", path: "/news" });
  }
  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/news/${article.slug}`,
    image: article.featuredImage || "/og.jpg",
  });
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article || !article.published) {
    notFound();
  }

  return (
    <PageContainer>
      <article className="mx-auto max-w-3xl">
        <Badge>{article.category}</Badge>
        <h1 className="mt-4 font-display text-4xl uppercase text-white md:text-6xl">{article.title}</h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-rogue-muted">
          {article.author} · {formatUkDate(article.publishedAt)}
        </p>
        {article.featuredImage ? (
          <div className="relative mt-8 h-72 overflow-hidden bg-rogue-ink">
            <Image src={article.featuredImage} alt="" fill className="object-cover" />
          </div>
        ) : null}
        <div className="mt-10 space-y-6">{renderMarkdown(article.content)}</div>
        {article.tags.length ? (
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-chrome">
            {article.tags.join(" · ")}
          </p>
        ) : null}
      </article>
    </PageContainer>
  );
}
