import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { ContactCTA } from "@/app/components/ContactCTA";
import {
  fetchArticleByBlockId,
  fetchArticleMetadataBySlug,
  fetchSelectedProjects,
} from "@/app/services/notion";
import { formatDate } from "@/app/lib/dayjs";
import { NotionRenderer } from "@/app/components/NotionRenderer";
import { SITE_NAME } from "@/app/constants";

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
  const blockMetadata = await fetchArticleMetadataBySlug(slug);

  return {
    title: `${blockMetadata?.title || "Artikel"} - HiRahmat.Dev`,
    description: `${blockMetadata?.desc || ""}`,
    openGraph: {
      title: `${blockMetadata?.title || "Artikel"} - HiRahmat.Dev`,
      description: `${blockMetadata?.desc || ""}`,
      siteName: SITE_NAME,
      url: `/articles/${blockMetadata?.slug || ""}`,
      images: [`${blockMetadata?.cover}`],
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
  const blockMetadata = await fetchArticleMetadataBySlug(slug);

  if (!blockMetadata?.slug) {
    notFound();
  }

  const article = await fetchArticleByBlockId(blockMetadata.blockId);

  return (
    <>
      <article className="space-y-11">
        <section className="pt-6 space-y-6">
          <div className="container-for-reading space-y-6">
            <header className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-4xl/[44px] tracking-[-1px] font-bold">
                  {blockMetadata.title}
                </h1>
                <p className="text-lg/[28px] tracking-[-0.35px] text-zinc-500">
                  {blockMetadata.desc}
                </p>
              </div>
              <p className="text-sm/[24px] tracking-[-0.15px]">
                <strong className="font-medium">
                  {blockMetadata.category || "-"}
                </strong>
                &ensp;•&ensp;
                <em className="text-zinc-500">Dipublikasikan pada</em>{" "}
                <strong className="font-medium">
                  {formatDate(blockMetadata.publishedOn) || "-"}
                </strong>
                , <em className="text-zinc-500">terakhir diperbarui pada</em>{" "}
                <strong className="font-medium">
                  {formatDate(blockMetadata.updatedOn) || "-"}
                </strong>
                .
              </p>
            </header>
          </div>
          <div className="container">
            {blockMetadata.cover ? (
              <figure>
                <Image
                  src={blockMetadata.cover}
                  alt={`Gambar ${blockMetadata.title}`}
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
            <NotionRenderer listBlockChildren={article} />
          </div>
        </section>
      </article>
      <ContactCTA />
    </>
  );
}
