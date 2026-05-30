"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { KeyboardEvent, useRef } from "react";

import { RichText } from "../../NotionRenderer/common/RichText";
import { SelectedBlog } from "@/app/services/notion";

type SelectedBlogsListProps = {
  selectedBlogs: SelectedBlog[];
  hasMore: boolean;
};

const scrollDistancePx = 600;
const scrollBehavior: ScrollBehavior = "smooth";

export function SelectedBlogsList({
  selectedBlogs,
  hasMore,
}: SelectedBlogsListProps) {
  const scrollableRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    scrollableRef.current?.scrollBy({
      left: -scrollDistancePx,
      behavior: scrollBehavior,
    });
  }

  function scrollRight() {
    scrollableRef.current?.scrollBy({
      left: scrollDistancePx,
      behavior: scrollBehavior,
    });
  }

  return (
    <div className="relative [&>.scroll-button]:absolute [&>.scroll-button]:z-10 [&>.scroll-button]:top-24">
      <RoundButton
        groupClassName="left-0 -translate-x-1/2 hidden sm:block"
        onClick={scrollLeft}
      >
        <ChevronLeft />
      </RoundButton>
      <RoundButton
        groupClassName="right-0 translate-x-1/2 hidden sm:block"
        onClick={scrollRight}
      >
        <ChevronRight />
      </RoundButton>
      <div
        ref={scrollableRef}
        className="pb-6 pt-2 -mt-2 overflow-x-auto overflow-y-hidden -mx-6 sm:-mx-10 [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-4 *:shrink-0">
          <div className="w-2 sm:w-6" />
          {(selectedBlogs || []).map((blog) => (
            <Link
              key={blog.slug}
              href={`/articles/${blog.slug}`}
              aria-label={`Buka artikel: Mengenai ${blog.title}`}
              className="selected-blog-card invisible group w-85"
            >
              <div className="space-y-4 group-animate-hover h-full">
                <div className="shrink-0 relative w-full aspect-video rounded-2xl overflow-hidden transition-shadow image-wrapper bg-gray-100 border border-gray-200">
                  {blog.cover ? (
                    <Image
                      src={blog.cover}
                      alt=""
                      fill
                      quality={10}
                      sizes="(max-width: 768px) 40vw, 20vw"
                      className="object-cover right-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Tidak ada gambar
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="group-hover:text-text-accent font-bold text-lg/normal tracking-[-0.4px] line-clamp-2">
                    <RichText items={blog.rawTitle} />
                  </h3>
                  <p className="text-sm/normal text-gray-500 line-clamp-2">
                    <RichText items={blog.rawDesc} />
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {hasMore && (
            <div className="group">
              <Link
                href="/articles?category=Blog"
                className="flex flex-col items-center justify-center gap-4 w-50 shrink-0 rounded-2xl border-2 border-dashed border-zinc-200 group-hover:border-accent group-hover:bg-accent/2 h-full group-active:scale-98 transition-transform duration-150 ease-silky"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-100 group-hover:bg-accent-hover group-hover:text-white flex items-center justify-center">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <span className="font-medium text-zinc-600 group-hover:text-text-accent">
                  Lihat Lainnya
                </span>
              </Link>
            </div>
          )}
          <div className="w-2 sm:w-6" />
        </div>
      </div>
    </div>
  );
}

function RoundButton({
  children,
  className,
  groupClassName,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  groupClassName?: string;
  onClick?: () => void;
}) {
  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!["Space", "Enter"].includes(e.code)) return;
    onClick?.();
  }

  return (
    <div
      className={twMerge("scroll-button group rounded-full", groupClassName)}
    >
      <button
        className={twMerge(
          "size-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 cursor-pointer group-animate-hover",
          className,
        )}
        onPointerDown={onClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </button>
    </div>
  );
}
