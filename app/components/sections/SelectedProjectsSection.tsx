import Link from "next/link";
import { GreenText } from "../GreenText";
import Image from "next/image";

type SelectedProject = {
  slug: string;
  title?: string;
  desc?: string;
  img?: string;
};

export function SelectedProjectsSection() {
  const selectedProjects: SelectedProject[] = [
    {
      slug: "kulina-ops-dashboard-app",
      title: "Aplikasi Dasbor Operasional Kulina",
      desc: "Dashboard lama Kulina, sentuhan baru.",
      img: "/images/kulina-ops.jpg",
    },
    {
      slug: "ai-recruiter-dashboard-app",
      title: "Aplikasi Dasbor Rekruter AI",
      desc: "Bukan sekadar dasbor — cara baru menyeleksi kandidat.",
      img: "/images/mimo.jpg",
    },
  ];

  return (
    <section className="container py-6">
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-4xl/[44px] tracking-[-1.5px] font-bold">
            Proyek <GreenText>Pilihan</GreenText>
          </h2>
          <p className="text-base/[24px] tracking-[-0.4px]">
            Kumpulan proyek di mana saya berkontribusi dengan rasa ingin tahu
            yang tinggi dan perhatian pada detail.
          </p>
        </div>
        <div className="pb-10 overflow-x-auto">
          <div className="flex gap-5 [&>div]:shrink-0">
            {selectedProjects.map((project) => (
              <SelectedProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type SelectedProjectCardProps = SelectedProject;

function SelectedProjectCard({ title, desc, img }: SelectedProjectCardProps) {
  return (
    <div className="rounded-2xl bg-accent w-[439px] h-[217px] shadow-xl flex gap-3 text-white overflow-hidden">
      <div className="w-full py-5 pl-5 flex flex-col justify-between gap-3 [&>*]:max-w-fit">
        <div className="space-y-3">
          <h3 className="font-semibold text-xl/[24px] tracking-[-0.35px]">
            {title}
          </h3>
          <p className="text-sm/[20px] max-w-[156px]">{desc}</p>
        </div>
        <Link href="#" className="white-solid-button animate-hover">
          Lihat Jurnal
        </Link>
      </div>
      <div className="shrink-0 min-w-[104px] py-5 pr-5 relative">
        <div className="absolute left-[-130px] bottom-[-48px] blur-[1px] opacity-60">
          <div className="relative w-[378px] h-[187px] shadow-2xl rounded-md -rotate-2 overflow-hidden">
            {img && (
              <Image
                fill
                src={img}
                alt=""
                className="object-cover right-0"
                quality={0}
              />
            )}
          </div>
        </div>
        <div className="absolute left-[-120px] bottom-[-42px]">
          <div className="relative w-[378px] h-[187px] shadow-2xl rounded-md rotate-2 overflow-hidden">
            {img && (
              <Image fill src={img} alt="" className="object-cover right-0" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
