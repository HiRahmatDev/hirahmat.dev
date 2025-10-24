import { AboutMeSection } from "@/app/components/sections/AboutMeSection";
import { SelectedBlogsSection } from "./components/sections/SelectedBlogSection";
import { ContactCTA } from "@/app/components/ContactCTA";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { SelectedProjectsSection } from "@/app/components/sections/SelectedProjectsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SelectedProjectsSection />
      <AboutMeSection />
      <SelectedBlogsSection />
      <ContactCTA />
    </>
  );
}
