"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

import { SelectedProject } from "@/app/services/notion";

type SelectedProjectCardsProps = {
  selectedProjects: SelectedProject[];
};

export function SelectedProjectCards({
  selectedProjects,
}: SelectedProjectCardsProps) {
  return (
    <div className="flex gap-5 [&>div]:shrink-0">
      {(selectedProjects || []).map((project, index) => (
        <SelectedProjectCard
          key={project.slug}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}

type SelectedProjectCardProps = {
  project: SelectedProject;
  index: number;
};

function SelectedProjectCard({ project, index }: SelectedProjectCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const projectCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isImageLoaded) return;

    gsap.fromTo(
      projectCardRef.current,
      {
        opacity: 0,
        y: 4,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.3 + index * 0.1,
      }
    );
  }, [isImageLoaded]);

  return (
    <div ref={projectCardRef} className="h-full opacity-0">
      <div className="rounded-3xl bg-accent w-[439px] h-[217px] shadow-xl flex gap-3 text-white overflow-hidden">
        <div className="w-full py-5 pl-5 flex flex-col justify-between gap-3 [&>*]:max-w-fit">
          <div className="space-y-3">
            <h3 className="font-semibold text-xl/[24px] tracking-[-0.35px]">
              {project.title}
            </h3>
            <p className="text-sm/[20px] max-w-[156px]">{project.desc}</p>
          </div>
          <Link
            href={`/articles/${project.slug}`}
            className="white-solid-button animate-hover"
          >
            Lihat Jurnal
          </Link>
        </div>
        {project.cover && (
          <div className="shrink-0 min-w-[104px] py-5 pr-5 relative">
            <div className="absolute left-[-130px] bottom-[-48px] blur-[1px] opacity-60">
              <div className="relative w-[378px] h-[187px] shadow-2xl rounded-md -rotate-2 overflow-hidden">
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
            <div className="absolute left-[-120px] bottom-[-42px]">
              <div className="relative w-[378px] h-[187px] shadow-2xl rounded-md rotate-2 overflow-hidden">
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 30vw"
                  className="object-cover right-0 project-image"
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
