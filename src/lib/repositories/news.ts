import { randomUUID } from "node:crypto";
import { newsSeed } from "@/data/news";
import { storeGet, storeSet } from "@/lib/repositories/store";
import type { NewsArticle } from "@/types";

const KEY = "news";

function nowIso(): string {
  return new Date().toISOString();
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export async function listNews(options?: {
  includeUnpublished?: boolean;
}): Promise<NewsArticle[]> {
  const articles = await storeGet<NewsArticle[]>(KEY, newsSeed);
  const visible = options?.includeUnpublished
    ? articles
    : articles.filter((article) => {
        if (!article.published) {
          return false;
        }
        if (article.scheduledFor && new Date(article.scheduledFor) > new Date()) {
          return false;
        }
        return true;
      });

  return visible.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const articles = await listNews({ includeUnpublished: true });
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getNewsById(id: string): Promise<NewsArticle | null> {
  const articles = await storeGet<NewsArticle[]>(KEY, newsSeed);
  return articles.find((article) => article.id === id) ?? null;
}

export async function saveNews(
  input: Partial<NewsArticle> & { title: string; description: string; content: string },
): Promise<NewsArticle> {
  const articles = await storeGet<NewsArticle[]>(KEY, newsSeed);
  const existing = input.id ? articles.find((article) => article.id === input.id) : null;
  const slug = input.slug || slugify(input.title);
  const article: NewsArticle = {
    id: existing?.id ?? `news-${randomUUID()}`,
    slug,
    title: input.title,
    description: input.description,
    content: input.content,
    category: input.category ?? "Announcement",
    tags: input.tags ?? [],
    author: input.author ?? "Rogue RP",
    featuredImage: input.featuredImage ?? "/logo.jpg",
    published: input.published ?? false,
    scheduledFor: input.scheduledFor ?? null,
    publishedAt: existing?.publishedAt ?? input.publishedAt ?? nowIso(),
    updatedAt: nowIso(),
  };

  const next = existing
    ? articles.map((item) => (item.id === article.id ? article : item))
    : [article, ...articles];

  await storeSet(KEY, next);
  return article;
}

export async function deleteNews(id: string): Promise<boolean> {
  const articles = await storeGet<NewsArticle[]>(KEY, newsSeed);
  const next = articles.filter((article) => article.id !== id);
  if (next.length === articles.length) {
    return false;
  }
  await storeSet(KEY, next);
  return true;
}

export async function setNewsPublished(id: string, published: boolean): Promise<NewsArticle | null> {
  const article = await getNewsById(id);
  if (!article) {
    return null;
  }
  return saveNews({
    ...article,
    published,
    publishedAt: published ? nowIso() : article.publishedAt,
  });
}
