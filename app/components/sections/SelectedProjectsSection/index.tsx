import { fetchSelectedProjects } from "@/app/services/notion";
import { SelectedProjectCards } from "./SelectedProjectCards";
import { SectionHeader } from "./SectionHeader";

export async function SelectedProjectsSection() {
  const selectedProjects = await fetchSelectedProjects();

  return (
    <section className="container py-6">
      <div className="space-y-6">
        <SectionHeader />
        <div className="pb-10 overflow-x-auto">
          <SelectedProjectCards selectedProjects={selectedProjects || []} />
        </div>
      </div>
    </section>
  );
}
