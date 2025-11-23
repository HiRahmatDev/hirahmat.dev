"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { ArticleCard } from "./ArticleCard";
import { CommonArticle } from "@/app/services/notion";

type FilterType = "All" | "Blog" | "Jurnal Proyek";

type ArticlesListProps = {
  articles: CommonArticle[];
};

export function ArticlesList({ articles }: ArticlesListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const filter: FilterType =
    categoryParam === "Blog" || categoryParam === "Jurnal Proyek"
      ? categoryParam
      : "All";

  const handleFilterChange = (type: FilterType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "All") {
      params.delete("category");
    } else {
      params.set("category", type);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredArticles = articles.filter((article) => {
    if (filter === "All") return true;
    return article.category === filter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {(["All", "Blog", "Jurnal Proyek"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === type
              ? "bg-zinc-800 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
          >
            {type === "All" ? "Semua" : type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          Tidak ada artikel ditemukan untuk kategori ini.
        </div>
      )}
    </div>
  );
}
