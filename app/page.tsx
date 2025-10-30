import serializeJavascript from "serialize-javascript";

import { AboutMeSection } from "@/app/components/sections/AboutMeSection";
import { ContactCTA } from "@/app/components/ContactCTA";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { SelectedBlogsSection } from "./components/sections/SelectedBlogSection";
import { SelectedProjectsSection } from "@/app/components/sections/SelectedProjectsSection";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: "Rahmat Hidayatullah",
    url: "https://hirahmat.dev",
    image: "https://hirahmat.dev/icon.ico",
    sameAs: [
      "https://www.linkedin.com/in/rahmathidayatullah/",
      "https://github.com/hirahmatdev",
      "https://www.instagram.com/hirahmat_",
      "https://www.youtube.com/@ahmadalhidayah",
    ],
    jobTitle: "Frontend Developer",
    worksFor: {
      "@type": "Organization",
      name: "Kulina",
    },
  };

  return (
    <>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJavascript(jsonLd),
          }}
        />
      </section>

      <HeroSection />
      <SelectedProjectsSection />
      <AboutMeSection />
      <SelectedBlogsSection />
      <ContactCTA />
    </>
  );
}
