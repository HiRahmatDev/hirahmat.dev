import { ArticleCard } from "./ArticleCard";
import { ArticleCategory, fetchAllArticles } from "@/app/services/notion";

export async function ArticlesList({
  category,
}: {
  category?: ArticleCategory;
}) {
  const articles = await fetchAllArticles({ category });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {articles?.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {articles?.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          Tidak ada artikel ditemukan untuk kategori ini.
        </div>
      )}
    </>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-full space-y-4">
            <div className="relative w-full aspect-video rounded-2xl bg-zinc-200" />
            <div className="space-y-2">
              <div className="h-6 w-24 rounded-full bg-zinc-200" />
              <div className="space-y-1">
                <div className="h-7 w-full rounded-lg bg-zinc-200" />
              </div>
              <div className="space-y-1 pt-1">
                <div className="h-5 w-full rounded-md bg-zinc-200" />
                <div className="h-5 w-2/3 rounded-md bg-zinc-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ArticlesList.Skeleton = Skeleton;
