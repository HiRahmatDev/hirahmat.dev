import Link from "next/link";
import Image from "next/image";

import { fetchSelectedProjects } from "@/app/services/notion";
import { GreenText } from "../GreenText";

type SelectedProject = {
  slug: string;
  title?: string;
  desc?: string;
  img?: string;
};

export async function SelectedProjectsSection() {
  const results = await fetchSelectedProjects();

  const selectedProjects: SelectedProject[] = (results || []).map((result) => ({
    slug:
      result.properties.slug.type === "title"
        ? result.properties.slug.title[0].plain_text
        : "",
    title:
      result.properties.name.type === "rich_text"
        ? result.properties.name.rich_text[0].plain_text
        : "",
    desc:
      result.properties.description.type === "rich_text"
        ? result.properties.description.rich_text[0].plain_text
        : "",
    img: result.cover?.type === "file" ? result.cover.file.url : "",
  }));

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

function SelectedProjectCard({
  title,
  slug,
  desc,
  img,
}: SelectedProjectCardProps) {
  return (
    <div className="rounded-2xl bg-accent w-[439px] h-[217px] shadow-xl flex gap-3 text-white overflow-hidden">
      <div className="w-full py-5 pl-5 flex flex-col justify-between gap-3 [&>*]:max-w-fit">
        <div className="space-y-3">
          <h3 className="font-semibold text-xl/[24px] tracking-[-0.35px]">
            {title}
          </h3>
          <p className="text-sm/[20px] max-w-[156px]">{desc}</p>
        </div>
        <Link href={`/${slug}`} className="white-solid-button animate-hover">
          Lihat Jurnal
        </Link>
      </div>
      <div className="shrink-0 min-w-[104px] py-5 pr-5 relative">
        <div className="absolute left-[-130px] bottom-[-48px] blur-[1px] opacity-60">
          <div className="relative w-[378px] h-[187px] shadow-2xl rounded-md -rotate-2 overflow-hidden">
            {img && (
              <Image
                src={img}
                alt=""
                fill
                quality={0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover right-0"
              />
            )}
          </div>
        </div>
        <div className="absolute left-[-120px] bottom-[-42px]">
          <div className="relative w-[378px] h-[187px] shadow-2xl rounded-md rotate-2 overflow-hidden">
            {img && (
              <Image
                src={img}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover right-0"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
