import { MetadataRoute } from "next";

import { BASE_URL } from "@/app/config/constants";
import { fetchAllArticles } from "./services/notion";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allArticles = await fetchAllArticles();

  const allArticleUrls: MetadataRoute.Sitemap = (allArticles || []).map(
    (item) => ({
      url: `${BASE_URL}/articles/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  return [...staticUrls, ...allArticleUrls];
}
