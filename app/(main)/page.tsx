import serializeJavascript from "serialize-javascript";

import { AboutMeSection } from "@/app/(main)/components/sections/AboutMeSection";
import { ContactCTA } from "@/app/(main)/components/ContactCTA";
import { HeroSection } from "@/app/(main)/components/sections/HeroSection";
import { SelectedBlogsSection } from "@/app/(main)/components/sections/SelectedBlogSection";
import { SelectedProjectsSection } from "@/app/(main)/components/sections/SelectedProjectsSection";

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
