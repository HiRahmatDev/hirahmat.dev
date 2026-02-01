import { fetchSelectedBlogs } from "@/app/services/notion";
import { SelectedBlogsList } from "./SelectedBlogsList";

export async function SelectedBlogsSection() {
  const selectedBlogs = await fetchSelectedBlogs(4);
  const hasMore = (selectedBlogs?.length || 0) > 3;
  const displayBlogs = selectedBlogs?.slice(0, 3) || [];

  return (
    <section className="container py-6 sm:py-8">
      <div className="space-y-8">
        <div className="space-y-1 md:space-y-2">
          <h2 className="text-2xl/[36px] sm:text-4xl/[44px] -tracking-[.2px] font-bold blog-header">
            Blog
          </h2>
          <p className="text-base sm:text-lg max-w-[60ch] text-gray-600 blog-desc">
            Catatan reflektif dan hal-hal yang saya pelajari di luar proyek.
          </p>
        </div>
        <SelectedBlogsList selectedBlogs={displayBlogs} hasMore={hasMore} />
      </div>
    </section>
  );
}
