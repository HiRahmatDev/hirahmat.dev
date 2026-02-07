import serializeJavascript from "serialize-javascript";

import { AboutMeSection } from "@/app/(main)/components/sections/AboutMeSection";
import { ContactCTASection } from "@/app/(main)/components/sections/ContactCTASection";
import { HeroSection } from "@/app/(main)/components/sections/HeroSection";
import { SelectedBlogsSection } from "@/app/(main)/components/sections/SelectedBlogSection";
import { SelectedProjectsSection } from "@/app/(main)/components/sections/SelectedProjectsSection";

export const revalidate = 60;

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "@id": "https://hirahmat.dev/#person",
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
      "@id": "https://kulina.id/#organization",
      name: "Kulina",
    },
  };

  return (
    <main>
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
      <ContactCTASection />
    </main>
  );
}
