"use client";

import { ArticleCategory } from "@/app/services/notion";
import { isCategoryValid } from "./lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ArticleFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const filter = isCategoryValid(categoryParam) ? categoryParam : "All";

  const handleFilterChange = (type: ArticleCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "All") {
      params.delete("category");
    } else {
      params.set("category", type);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {(["All", "Blog", "Jurnal Proyek"] as ArticleCategory[]).map((type) => (
        <button
          key={type}
          onClick={() => handleFilterChange(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
            filter === type
              ? "bg-accent text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          {type === "All" ? "Semua" : type}
        </button>
      ))}
    </div>
  );
}
