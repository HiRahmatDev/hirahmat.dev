"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { RichText } from "../../NotionRenderer/common/RichText";
import { SelectedBlog } from "@/app/services/notion";

type SelectedBlogsListProps = {
  selectedBlogs: SelectedBlog[];
  hasMore: boolean;
};

export function SelectedBlogsList({
  selectedBlogs,
  hasMore,
}: SelectedBlogsListProps) {
  return (
    <div className="pb-6 pt-2 -mt-2 overflow-x-auto overflow-y-hidden -mx-6 sm:-mx-10 [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-4 *:shrink-0">
        <div className="w-1 sm:w-6" />
        {(selectedBlogs || []).map((blog) => (
          <Link
            key={blog.slug}
            href={`/articles/${blog.slug}`}
            aria-label={`Buka artikel: Mengenai ${blog.title}`}
            className="w-85 space-y-4 animate-hover hover:[&>.image-wrapper]:shadow-lg active:[&>.image-wrapper]:shadow-sm blog-card"
          >
            <div className="shrink-0 relative w-full aspect-video rounded-2xl overflow-hidden shadow-md transition-shadow image-wrapper">
              {blog.cover && (
                <Image
                  src={blog.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 30vw"
                  className="object-cover right-0"
                />
              )}
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg/normal tracking-[-0.4px] line-clamp-2">
                <RichText items={blog.rawTitle} />
              </h3>
              <p className="text-sm/normal text-gray-500 line-clamp-2">
                <RichText items={blog.rawDesc} />
              </p>
            </div>
          </Link>
        ))}
        {hasMore && (
          <div className="group">
            <Link
              href="/articles?category=Blog"
              className="flex flex-col items-center justify-center gap-4 w-50 shrink-0 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-accent hover:bg-accent/5 h-full group-active:scale-98 transition-transform duration-150 ease-(--ease-silky)"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 group-hover:bg-accent group-hover:text-white flex items-center justify-center">
                <ArrowRight className="w-6 h-6" />
              </div>
              <span className="font-medium text-zinc-600 group-hover:text-accent transition-colors">
                Lihat Lainnya
              </span>
            </Link>
          </div>
        )}
        <div className="w-1 sm:w-6" />
      </div>
    </div>
  );
}
