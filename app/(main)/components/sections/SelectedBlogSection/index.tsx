import { AnimatedWrapper } from "./AnimatedWrapper";
import { fetchSelectedBlogs } from "@/app/services/notion";
import { SelectedBlogsList } from "./SelectedBlogsList";

export async function SelectedBlogsSection() {
  const selectedBlogs = await fetchSelectedBlogs(5);
  const hasMore = (selectedBlogs?.length || 0) > 4;
  const displayBlogs = selectedBlogs?.slice(0, 4) || [];

  return (
    <AnimatedWrapper>
      <div className="space-y-8">
        <div className="space-y-1 md:space-y-2">
          <h2 className="selected-blogs-text-element invisible text-2xl/[36px] sm:text-4xl/[44px] -tracking-[.2px] font-bold blog-header">
            Blog
          </h2>
          <p className="selected-blogs-text-element invisible text-base sm:text-lg max-w-[60ch] text-gray-600 blog-desc">
            Catatan reflektif dan hal-hal yang saya pelajari di luar proyek.
          </p>
        </div>
        <SelectedBlogsList selectedBlogs={displayBlogs} hasMore={hasMore} />
      </div>
    </AnimatedWrapper>
  );
}

function Skeletons() {
  return (
    <section className="container py-6 sm:py-8">
      <div className="space-y-8">
        <div className="space-y-1 md:space-y-2">
          <div className="text-2xl/[36px] sm:text-4xl/[44px] h-lh w-50 bg-gray-100 animate-pulse rounded-2xl" />
          <div className="text-base sm:text-lg h-lh w-100 bg-gray-100 animate-pulse rounded-2xl" />
        </div>
        <div className="pb-6 pt-2 -mt-2 overflow-x-auto overflow-y-hidden -mx-6 sm:-mx-10 [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4 [&>div]:shrink-0">
            <div className="w-2 sm:w-6" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="selected-blog-card space-y-4 min-h-[307.25px]"
              >
                <div className="shrink-0 w-84.5 aspect-video rounded-2xl bg-gray-100 border border-gray-50 animate-pulse" />
                <div className="space-y-1">
                  <div className="text-lg/normal h-lh w-full bg-gray-100 animate-pulse rounded-lg" />
                  <div className="text-lg/normal h-lh w-3/4 bg-gray-100 animate-pulse rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

SelectedBlogsSection.Skeletons = Skeletons;
