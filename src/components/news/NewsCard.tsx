import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatUkDate } from "@/lib/utils";
import type { NewsArticle } from "@/types";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="group panel block overflow-hidden">
      <div className="relative h-48 overflow-hidden bg-rogue-ink">
        <Image
          src={article.featuredImage || "/logo.jpg"}
          alt=""
          fill
          className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <Badge>{article.category}</Badge>
        <h3 className="mt-4 font-display text-2xl uppercase text-white group-hover:text-rogue-blue">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-rogue-muted">{article.description}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-chrome">
          {article.author} · {formatUkDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
