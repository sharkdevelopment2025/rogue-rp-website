import type { MetadataRoute } from "next";
import { listNews } from "@/lib/repositories/news";
import { listDepartments } from "@/lib/repositories/departments";
import { getSiteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const staticRoutes = [
    "",
    "/about",
    "/server",
    "/departments",
    "/rules",
    "/whitelist",
    "/applications",
    "/news",
    "/media",
    "/staff",
    "/faq",
    "/discord",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const [news, departments] = await Promise.all([listNews(), listDepartments()]);

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...news.map((article) => ({
      url: `${base}/news/${article.slug}`,
      lastModified: new Date(article.updatedAt),
    })),
    ...departments.map((department) => ({
      url: `${base}/departments/${department.slug}`,
      lastModified: new Date(),
    })),
  ];
}
