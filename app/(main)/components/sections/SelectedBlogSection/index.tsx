import { fetchSelectedBlogs } from "@/app/services/notion";
import { SelectedBlogsList } from "./SelectedBlogsList";
import { SelectedBlogsHeader } from "./SelectedBlogsHeader";

export async function SelectedBlogsSection() {
  const selectedBlogs = await fetchSelectedBlogs();

  return (
    <section className="container py-8">
      <div className="space-y-8">
        <SelectedBlogsHeader />
        <SelectedBlogsList selectedBlogs={selectedBlogs || []} />
      </div>
    </section>
  );
}
