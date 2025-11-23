import { fetchSelectedProjects } from "@/app/services/notion";
import { SelectedProjectCards } from "./SelectedProjectCards";
import { SectionHeader } from "./SectionHeader";

export async function SelectedProjectsSection() {
  const selectedProjects = await fetchSelectedProjects(4);
  const hasMore = (selectedProjects?.length || 0) > 3;
  const displayProjects = selectedProjects?.slice(0, 3) || [];

  return (
    <section className="container py-6">
      <div className="space-y-8">
        <SectionHeader />
        <div className="pb-10 overflow-x-auto">
          <SelectedProjectCards
            selectedProjects={displayProjects}
            hasMore={hasMore}
          />
        </div>
      </div>
    </section>
  );
}
