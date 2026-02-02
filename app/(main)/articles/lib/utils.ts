import { ArticleCategory } from "@/app/services/notion";

export function isCategoryValid(
  category?: string | string[] | null,
): category is ArticleCategory {
  return (
    category === "All" || category === "Blog" || category === "Jurnal Proyek"
  );
}
