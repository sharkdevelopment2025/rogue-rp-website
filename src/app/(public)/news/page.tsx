import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { NewsCard } from "@/components/news/NewsCard";
import { listNews } from "@/lib/repositories/news";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "News",
  description: "Server updates, department notices, events and announcements from Rogue RP.",
  path: "/news",
});

export default async function NewsPage() {
  const articles = await listNews();

  return (
    <PageContainer>
      <PageHeader
        kicker="City desk"
        title="News"
        description="Official Rogue RP updates. These articles come from the news system, not from hardcoded homepage cards."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </PageContainer>
  );
}
