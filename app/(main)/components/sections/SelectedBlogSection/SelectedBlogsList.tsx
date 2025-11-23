"use client";

import { ArrowRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

import { RichText } from "../../NotionRenderer/common/RichText";
import { SelectedBlog } from "@/app/services/notion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SelectedBlogsListProps = {
  selectedBlogs: SelectedBlog[];
  hasMore: boolean;
};

export function SelectedBlogsList({
  selectedBlogs,
  hasMore,
}: SelectedBlogsListProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        ".blog-card",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          onComplete: () => {
            gsap.set(".blog-card", { clearProps: "y" });
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="pb-10 pt-2 -mt-2 overflow-x-auto">
      <div className="flex gap-4 [&>a]:shrink-0">
        {(selectedBlogs || []).map((blog) => (
          <Link
            key={blog.slug}
            href={`/articles/${blog.slug}`}
            aria-label={`Buka artikel: Mengenai ${blog.title}`}
            className="w-[340px] space-y-4 animate-hover hover:[&>.image-wrapper]:shadow-lg active:[&>.image-wrapper]:shadow-sm blog-card opacity-0"
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
            <div className="space-y-2">
              <h3 className="font-bold text-xl/[26px] tracking-[-0.4px] line-clamp-2">
                <RichText items={blog.rawTitle} />
              </h3>
              <p className="text-sm/[20px] text-zinc-600 line-clamp-3">
                <RichText items={blog.rawDesc} />
              </p>
            </div>
          </Link>
        ))}
        {hasMore && (
          <Link
            href="/articles?category=Blog"
            className="group flex flex-col items-center justify-center gap-4 w-[200px] shrink-0 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-accent hover:bg-accent/5 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-100 group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-6 h-6" />
            </div>
            <span className="font-medium text-zinc-600 group-hover:text-accent transition-colors">
              Lihat Lainnya
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
