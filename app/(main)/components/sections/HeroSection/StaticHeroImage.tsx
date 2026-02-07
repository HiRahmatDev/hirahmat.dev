import rahmatHero from "@/public/images/rahmat-hidayatullah-hero-static.png";
import Image from "next/image";

export function StaticHeroImage() {
  return (
    <div className="shrink-0 md:hidden block -mx-4">
      <div className="h-full flex justify-center md:justify-start">
        <Image
          src={rahmatHero}
          alt="Foto Rahmat Hidayatullah dengan background semi transparan | hirahmat.dev"
        />
      </div>
    </div>
  );
}
