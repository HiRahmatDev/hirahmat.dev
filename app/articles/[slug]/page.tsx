import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { ContactCTA } from "@/app/components/ContactCTA";
import {
  fetchArticleByBlockId,
  fetchArticleMetadataBySlug,
  fetchArticleTOCByBlockId,
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
  const toc = await fetchArticleTOCByBlockId(blockMetadata.blockId);
  const isTocEmpty = !toc || !toc?.length;

  return (
    <>
      <div className="flex container px-0">
        <article className="space-y-8 flex-1">
          <section className="pt-6 space-y-6">
            <div
              className={
                "container-for-reading space-y-6" +
                (isTocEmpty ? "" : " mx-[unset]")
              }
            >
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
                  <span className="px-2 border border-zinc-400 leading-[20px] rounded-[12px] inline-block">
                    <strong className="font-medium">
                      {blockMetadata.category || "-"}
                    </strong>
                  </span>
                  <span className="text-zinc-500">&ensp;•&ensp;</span>
                  <em className="text-zinc-500">Dipublikasikan pada</em>{" "}
                  <strong className="font-medium">
                    {formatDate(blockMetadata.publishedOn) || "-"}
                  </strong>
                  <em className="text-zinc-500">, terakhir diperbarui pada</em>{" "}
                  <strong className="font-medium">
                    {formatDate(blockMetadata.updatedOn) || "-"}
                  </strong>
                  <em className="text-zinc-500">.</em>
                </p>
              </header>
            </div>
            <div className={"container" + (isTocEmpty ? "" : " mx-[unset]")}>
              {blockMetadata.cover ? (
                <Image
                  src={blockMetadata.cover}
                  alt={`Gambar ${blockMetadata.title}`}
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80"
                  className="object-cover top-0 right-0 left-0 rounded-3xl overflow-hidden"
                />
              ) : null}
            </div>
          </section>
          <section className="pb-12">
            <div
              className={
                "container-for-reading" + (isTocEmpty ? "" : " mx-[unset]")
              }
            >
              <NotionRenderer listBlockChildren={article} />
            </div>
          </section>
        </article>
        {!isTocEmpty ? (
          <aside className="hidden md:block w-[240px] sticky top-24 max-h-[80vh] overflow-auto px-5 pb-12 space-y-3">
            <h2 className="text-base font-semibold tracking-[-0.35px]">
              Telusuri Isi:
            </h2>
            <nav className="[&_a]:text-sm [&_a]:text-gray-600 [&_ul,&_ul_li]:space-y-1 [&_a]:inline-block">
              <ul className="[&_ul]:pl-4">
                {toc.map(({ title, children }, index) => (
                  <li key={index}>
                    <a href={`#${title}`}>{title}</a>
                    {children.length ? (
                      <ul>
                        {children.map(({ title, children }, index) => (
                          <li key={`sub-${index}`}>
                            <a href={`#${title}`}>{title}</a>
                            {children.length ? (
                              <ul>
                                {children.map(({ title }, index) => (
                                  <li key={`sub-sub-${index}`}>
                                    <a href={`#${title}`}>{title}</a>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        ) : null}
      </div>
      <ContactCTA />
    </>
  );
}
