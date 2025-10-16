import { AboutMeSection } from "@/app/components/sections/AboutMeSection";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { SelectedProjectsSection } from "@/app/components/sections/SelectedProjectsSection";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <HeroSection />
      <SelectedProjectsSection />
      <AboutMeSection />
    </>
  );
}
