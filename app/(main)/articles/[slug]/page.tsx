import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { ContactCTASection } from "@/app/(main)/components/sections/ContactCTASection";
import {
  fetchAllArticles,
  fetchArticleByBlockId,
  fetchArticleMetadataBySlug,
  fetchArticleTOCByBlockId,
} from "@/app/services/notion";
import { formatDate } from "@/app/lib/dayjs";
import { NotionRenderer } from "@/app/(main)/components/NotionRenderer";
import { SITE_NAME } from "@/app/config/constants";
import { RichText } from "@/app/(main)/components/NotionRenderer/common/RichText";

export async function generateStaticParams() {
  const allArticles = await fetchAllArticles();
  return (allArticles || []).map(({ slug }) => ({ slug: slug || "" }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blockMetadata = await fetchArticleMetadataBySlug(slug);

  return {
    title: `${blockMetadata?.title || "Artikel"} | HiRahmat.Dev`,
    description: `${blockMetadata?.desc || ""}`,
    openGraph: {
      title: `${blockMetadata?.title || "Artikel"} | HiRahmat.Dev`,
      description: `${blockMetadata?.desc || ""}`,
      siteName: SITE_NAME,
      url: `/articles/${blockMetadata?.slug || ""}`,
      images: `${blockMetadata?.cover}`,
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
          <section className="pt-4 space-y-6">
            <div
              className={
                "container space-y-6" + (isTocEmpty ? "" : " mx-[unset]")
              }
            >
              <header className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold">
                    <RichText items={blockMetadata.rawTitle} />
                  </h1>
                  <p className="text-base/normal sm:text-lg/normal -tracking-[.2px] text-gray-500">
                    <RichText items={blockMetadata.rawDesc} />
                  </p>
                </div>
                <p className="text-xs/[20px] sm:text-sm/[24px] tracking-[-0.15px]">
                  <span className="font-medium px-2 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                    {blockMetadata.category || "-"}
                  </span>
                  <span className="text-zinc-500">&ensp;•&ensp;</span>
                  <strong className="font-medium">
                    {formatDate(blockMetadata.publishedOn) || "-"}
                  </strong>
                  <span className="text-text-gray">
                    &ensp;•&ensp;Diperbarui
                  </span>{" "}
                  <strong className="font-medium">
                    {formatDate(blockMetadata.updatedOn) || "-"}
                  </strong>
                </p>
              </header>
            </div>
            <div className={"container" + (isTocEmpty ? "" : " mx-[unset]")}>
              {blockMetadata.cover ? (
                <Image
                  src={blockMetadata.cover}
                  alt={blockMetadata.cover_alt}
                  width={1280}
                  height={720}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80"
                  className="object-cover top-0 right-0 left-0 rounded-2xl"
                />
              ) : null}
            </div>
          </section>
          <section className="pb-8 sm:pb-12">
            <div className={"container-for-reading" + (isTocEmpty ? "" : "")}>
              <NotionRenderer listBlockChildren={article} />
            </div>
          </section>
        </article>
        {!isTocEmpty ? (
          <aside className="hidden md:block w-60 sticky top-24 max-h-[80vh] overflow-auto px-5 pb-12 space-y-3">
            <h2 className="text-base font-semibold tracking-[-0.35px]">
              Telusuri Isi:
            </h2>
            <nav className="[&_a]:text-sm/[18px] [&_a]:text-text-gray [&_a]:hover:text-accent [&_a]:animate-hover [&_ul,&_ul_li]:space-y-2.5 [&_a]:inline-block">
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
      <ContactCTASection />
    </>
  );
}
