import Image from "next/image";
import Link from "next/link";
import { CommonArticle } from "@/app/services/notion";

type ArticleCardProps = {
  article: CommonArticle;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      aria-label={`Buka artikel: ${article.title}`}
      className="group w-full space-y-4 block"
    >
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xs transition-shadow group-hover:shadow-lg bg-gray-100">
        {article.cover ? (
          <Image
            src={article.cover}
            alt={`Cover for ${article.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Cover
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
            {article.category}
          </span>
        </div>
        <h3 className="font-bold text-xl/[26px] tracking-[-0.4px] line-clamp-2 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        <p className="text-sm/[20px] text-zinc-600 line-clamp-3">
          {article.desc}
        </p>
      </div>
    </Link>
  );
}
