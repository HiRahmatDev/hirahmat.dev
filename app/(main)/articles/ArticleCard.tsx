import Image from "next/image";
import Link from "next/link";
import { CommonArticle } from "@/app/services/notion";
import { formatDate } from "@/app/lib/dayjs";

type ArticleCardProps = {
  article: CommonArticle;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      aria-label={`Buka artikel: ${article.title}`}
      className="group w-full space-y-4 block animate-hover"
    >
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xs transition-shadow bg-gray-100">
        {article.cover ? (
          <Image
            src={article.cover}
            alt={`Cover for ${article.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Cover
          </div>
        )}
      </div>
      <div>
        <div className="mb-4 flex gap-3 items-center">
          <p className="text-xs/[20px] sm:text-sm/[24px] tracking-[-0.15px]">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
              {article.category || "-"}
            </span>
            &ensp;
            <strong className="font-medium text-zinc-500">
              {formatDate(article.publishedOn) || "-"}
            </strong>
          </p>
        </div>
        <h3 className="font-bold text-xl/[26px] tracking-[-0.4px] line-clamp-2 group-hover:text-accent mb-1">
          {article.title}
        </h3>
        <p className="text-sm/[20px] text-zinc-600 line-clamp-2">
          {article.desc}
        </p>
      </div>
    </Link>
  );
}
