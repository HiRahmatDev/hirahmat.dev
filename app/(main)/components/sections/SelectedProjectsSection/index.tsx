import { AnimatedWrapper } from "./AnimatedWrapper";
import { fetchSelectedProjects } from "@/app/services/notion";
import { SelectedProjectCards } from "./SelectedProjectCards";
import { GreenText } from "../../GreenText";

export async function SelectedProjectsSection() {
  const selectedProjects = await fetchSelectedProjects(4);
  const hasMore = (selectedProjects?.length || 0) > 3;
  const displayProjects = selectedProjects?.slice(0, 3) || [];

  return (
    <AnimatedWrapper>
      <div className="space-y-8">
        <div className="space-y-1 md:space-y-2">
          <h2 className="selected-projects-text-element invisible text-2xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold">
            Proyek <GreenText>Pilihan</GreenText>
          </h2>
          <p className="selected-projects-text-element invisible text-base sm:text-lg max-w-[60ch] -tracking-[.2px] text-gray-600">
            Proyek pilihan dengan detail, interaksi, dan desain menarik.
          </p>
        </div>
        <SelectedProjectCards
          selectedProjects={displayProjects}
          hasMore={hasMore}
        />
      </div>
    </AnimatedWrapper>
  );
}

function Skeletons() {
  return (
    <section className="container py-8 sm:pt-6">
      <div className="space-y-8">
        <div className="space-y-1 md:space-y-2">
          <div className="text-2xl/[36px] sm:text-4xl/[44px] h-lh w-50 bg-gray-100 animate-pulse rounded-2xl" />
          <div className="text-base sm:text-lg h-lh w-100 bg-gray-100 animate-pulse rounded-2xl" />
        </div>
        <div className="pb-10 [&::-webkit-scrollbar]:hidden overflow-x-auto -mx-6 sm:-mx-10">
          <div className="flex gap-4 [&>div]:shrink-0">
            <div className="w-2 sm:w-6" />
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="w-109.75 h-54.25 rounded-3xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

SelectedProjectsSection.Skeletons = Skeletons;
