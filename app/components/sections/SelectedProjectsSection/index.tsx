import { fetchSelectedProjects } from "@/app/services/notion";
import { GreenText } from "@/app/components/GreenText";
import { SelectedProjectCards } from "./SelectedProjectCards";

export async function SelectedProjectsSection() {
  const selectedProjects = await fetchSelectedProjects();

  return (
    <section className="container py-6">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-3xl/[40px] sm:text-4xl/[44px] tracking-[-1px] font-bold">
            Proyek <GreenText>Pilihan</GreenText>
          </h2>
          <p className="text-base/[24px] tracking-[-0.4px]">
            Kumpulan proyek di mana saya berkontribusi dengan rasa ingin tahu
            yang tinggi dan perhatian pada detail.
          </p>
        </div>
        <div className="pb-10 overflow-x-auto">
          <SelectedProjectCards selectedProjects={selectedProjects || []} />
        </div>
      </div>
    </section>
  );
}
