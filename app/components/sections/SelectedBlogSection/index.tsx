import Image from "next/image";
import Link from "next/link";

import { fetchSelectedBlogs } from "@/app/services/notion";

export async function SelectedBlogsSection() {
  const selectedBlogs = await fetchSelectedBlogs();

  return (
    <section className="container py-8">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-3xl/[40px] sm:text-4xl/[44px] tracking-[-1px] font-bold">
            Blog
          </h2>
          <p className="text-base/[24px] tracking-[-0.4px] max-w-prose">
            Catatan reflektif dan hal-hal yang saya pelajari di luar proyek —
            mulai dari desain, pengembangan, sampai cara berpikir di balik
            keduanya.
          </p>
        </div>
        <div className="pb-10 pt-2 -mt-2 overflow-x-auto">
          <div className="flex gap-4 [&>div]:shrink-0">
            {(selectedBlogs || []).map((blog) => (
              <Link
                key={blog.slug}
                href={`/articles/${blog.slug}`}
                className="w-[301.33px] space-y-4 animate-hover hover:[&>.image-wrapper]:shadow-blog-image-hover active:[&>.image-wrapper]:shadow-sm"
              >
                <div className="shrink-0 relative w-full h-[165px] rounded-2xl overflow-hidden shadow-xl transition-shadow image-wrapper">
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
                  <h3 className="font-bold text-xl/[26px] tracking-[-0.4px]">
                    {blog.title}
                  </h3>
                  <p className="text-sm/[20px] text-zinc-600">{blog.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
