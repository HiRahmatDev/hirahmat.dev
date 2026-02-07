"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SelectedProject } from "@/app/services/notion";

type SelectedProjectCardsProps = {
  selectedProjects: SelectedProject[];
  hasMore: boolean;
};

export function SelectedProjectCards({
  selectedProjects,
  hasMore,
}: SelectedProjectCardsProps) {
  return (
    <div className="flex gap-4 [&>div]:shrink-0">
      <div className="w-1 sm:w-6" />
      {(selectedProjects || []).map((project, index) => (
        <SelectedProjectCard
          key={project.slug}
          project={project}
          index={index}
        />
      ))}
      {hasMore && (
        <div className="h-full flex items-center">
          <Link
            href="/articles?category=Jurnal Proyek"
            className="group flex flex-col items-center justify-center gap-4 w-50 h-54.25 rounded-3xl border-2 border-dashed border-zinc-200 hover:border-accent hover:bg-accent/5 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-100 group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-6 h-6" />
            </div>
            <span className="font-medium text-zinc-600 group-hover:text-accent transition-colors">
              Lihat Lainnya
            </span>
          </Link>
        </div>
      )}
      <div className="w-1 sm:w-6" />
    </div>
  );
}

type SelectedProjectCardProps = {
  project: SelectedProject;
  index: number;
};

function SelectedProjectCard({ project }: SelectedProjectCardProps) {
  return (
    <div className="h-full">
      <div className="rounded-3xl bg-accent w-109.75 h-54.25 shadow-xl flex gap-3 text-white overflow-hidden">
        <div className="w-full py-5 pl-5 flex flex-col justify-between gap-3 *:max-w-fit">
          <div className="space-y-3">
            <h3 className="font-semibold text-xl/[24px] tracking-[-0.35px]">
              {project.title}
            </h3>
            <p className="text-sm/[20px] max-w-39">{project.desc}</p>
          </div>
          <Link
            href={`/articles/${project.slug}`}
            className="white-outline-button animate-hover"
          >
            Detail Proyek
          </Link>
        </div>
        {project.cover && (
          <div className="shrink-0 min-w-26 py-5 pr-5 relative">
            <div className="absolute -left-32.5 -bottom-12 blur-[1px] opacity-60">
              <div className="relative w-94.5 h-46.75 shadow-2xl rounded-md -rotate-2 overflow-hidden">
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  quality={0}
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 30vw"
                  className="object-cover right-0"
                />
              </div>
            </div>
            <div className="absolute -left-30 -bottom-10.5">
              <div className="relative w-94.5 h-46.75 shadow-2xl rounded-md rotate-2 overflow-hidden">
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 30vw"
                  className="object-cover right-0 project-image"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
