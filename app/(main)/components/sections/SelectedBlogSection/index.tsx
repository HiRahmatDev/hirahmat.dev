import { fetchSelectedBlogs } from "@/app/services/notion";
import { SelectedBlogsList } from "./SelectedBlogsList";
import { SelectedBlogsHeader } from "./SelectedBlogsHeader";

export async function SelectedBlogsSection() {
  const selectedBlogs = await fetchSelectedBlogs(4);
  const hasMore = (selectedBlogs?.length || 0) > 3;
  const displayBlogs = selectedBlogs?.slice(0, 3) || [];

  return (
    <section className="container py-8">
      <div className="space-y-8">
        <SelectedBlogsHeader />
        <SelectedBlogsList selectedBlogs={displayBlogs} hasMore={hasMore} />
      </div>
    </section>
  );
}
