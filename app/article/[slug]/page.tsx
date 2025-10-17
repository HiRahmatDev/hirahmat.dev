import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import {
  fetchBlockMetadataBySlug,
  fetchPageByBlockId,
  fetchSelectedProjects,
} from "@/app/services/notion";
import { formatPublishedDate } from "@/app/lib/dayjs";
import { NotionRenderer } from "@/app/components/NotionRenderer";

export const revalidate = 60;

export async function generateStaticParams() {
  const selectedProjects = await fetchSelectedProjects();
  return (selectedProjects || []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blockMetadata = await fetchBlockMetadataBySlug(slug);

  return {
    title: `${blockMetadata?.title || "Jurnal Proyek"} - HiRahmat.Dev`,
    description: `${blockMetadata?.desc || ""}`,
    openGraph: {
      title: `${blockMetadata?.title || "Jurnal Proyek"} - HiRahmat.Dev`,
      description: `${blockMetadata?.desc || ""}`,
      images: [`${blockMetadata?.img}`],
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blockMetadata = await fetchBlockMetadataBySlug(slug);

  if (!blockMetadata?.slug) {
    notFound();
  }

  const page = await fetchPageByBlockId(blockMetadata.blockId);

  return (
    <article className="space-y-11">
      <section className="pt-6 space-y-6">
        <div className="container-for-reading">
          <section className="space-y-1 text-foreground/60">
            <p className="text-lg/[24px] font-semibold tracking-[-0.35]">
              {blockMetadata.category || "-"}
            </p>
            <p className="text-xs/[16px]">
              <em>{formatPublishedDate(blockMetadata.publishedOn) || "-"}</em>
            </p>
          </section>
        </div>
        <div className="container-for-reading space-y-6">
          <header className="space-y-1">
            <h1 className="text-4xl/[44px] tracking-[-1px] font-bold">
              {blockMetadata.title}
            </h1>
            <p className="text-lg/[32px] tracking-[-0.35px]">
              {blockMetadata.desc}
            </p>
          </header>
        </div>
        <div className="container">
          {blockMetadata.img ? (
            <figure>
              <Image
                src={blockMetadata.img}
                alt="Screenshot Dasbor Operasional Kulina"
                width={1280}
                height={720}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80"
                className="object-cover top-0 right-0 left-0"
              />
            </figure>
          ) : null}
        </div>
      </section>
      <section className="pb-12">
        <div className="container-for-reading">
          <NotionRenderer page={page} />
        </div>
      </section>
    </article>
  );
}
