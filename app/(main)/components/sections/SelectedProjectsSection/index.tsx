import { fetchSelectedProjects } from "@/app/services/notion";
import { SelectedProjectCards } from "./SelectedProjectCards";
import { GreenText } from "../../GreenText";

export async function SelectedProjectsSection() {
  const selectedProjects = await fetchSelectedProjects(4);
  const hasMore = (selectedProjects?.length || 0) > 3;
  const displayProjects = selectedProjects?.slice(0, 3) || [];

  return (
    <section className="container sm:pt-6 pb-8">
      <div className="space-y-8">
        <div className="space-y-1 md:space-y-2">
          <h2 className="text-2xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold">
            Proyek <GreenText>Pilihan</GreenText>
          </h2>
          <p className="text-base sm:text-lg max-w-[60ch] -tracking-[.2px] text-gray-600">
            Proyek pilihan dengan detail, interaksi, dan desain menarik.
          </p>
        </div>
        <div className="pb-10 [&::-webkit-scrollbar]:hidden overflow-x-auto -mx-6 sm:-mx-10">
          <SelectedProjectCards
            selectedProjects={displayProjects}
            hasMore={hasMore}
          />
        </div>
      </div>
    </section>
  );
}
