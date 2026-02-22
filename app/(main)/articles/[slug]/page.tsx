import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { AnimatedArticleWrapper } from "./components/AnimatedArticleWrapper";
import { AnimatedTOCWrapper } from "./components/AnimatedTOCWrapper";
import { ContactCTASection } from "@/app/(main)/components/sections/ContactCTASection";
import {
  fetchAllArticles,
  fetchArticleByBlockId,
  fetchArticleMetadataBySlug,
  fetchArticleTOCByBlockId,
} from "@/app/services/notion";
import { formatDate } from "@/app/lib/dayjs";
import { NotionRenderer } from "@/app/(main)/components/NotionRenderer";
import { RichText } from "@/app/(main)/components/NotionRenderer/common/RichText";
import { SITE_NAME } from "@/app/config/constants";

export const revalidate = 60;

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
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_240px] container-wider px-0">
        <AnimatedArticleWrapper>
          <header className="pt-4 space-y-6">
            <div
              className={"container space-y-6" + (isTocEmpty ? "" : " mx-0")}
            >
              <div className="space-y-4">
                <Link
                  href="/articles"
                  className="group animated-header-element invisible inline-block px-1 -mx-1"
                >
                  <div className="flex gap-1 sm:gap-1.5 items-center text-text-accent font-semibold group-animate-hover">
                    <ArrowLeft className="size-4 sm:size-5 stroke-[2.25]" />
                    <span className="text-sm sm:text-base">Artikel</span>
                  </div>
                </Link>
                <div className="space-y-2">
                  <h1 className="animated-header-element invisible text-3xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold">
                    <RichText items={blockMetadata.rawTitle} />
                  </h1>
                  <p className="animated-header-element invisible text-base/normal sm:text-lg/normal -tracking-[.2px] text-gray-500">
                    <RichText items={blockMetadata.rawDesc} />
                  </p>
                </div>
                <p className="text-xs/[20px] sm:text-sm/[24px] tracking-[-0.15px]">
                  <span className="animated-header-element invisible inline-block text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                    {blockMetadata.category || "-"}
                  </span>
                  <span className="animated-header-element invisible inline-block text-zinc-500">
                    &ensp;•&ensp;
                  </span>
                  <strong className="animated-header-element invisible inline-block font-medium text-zinc-600">
                    {formatDate(blockMetadata.publishedOn) || "-"}
                  </strong>
                  <span className="animated-header-element invisible inline-block text-zinc-500">
                    &ensp;•&ensp;
                  </span>{" "}
                  <span className="animated-header-element invisible inline-block text-zinc-500">
                    Diperbarui{" "}
                    <strong className="font-medium text-zinc-600">
                      {formatDate(blockMetadata.updatedOn) || "-"}
                    </strong>
                  </span>
                </p>
              </div>
            </div>
            <div
              className={
                "container animated-header-element invisible" +
                (isTocEmpty ? "" : " mx-[unset]")
              }
            >
              {blockMetadata.cover ? (
                <Image
                  src={blockMetadata.cover}
                  alt={blockMetadata.cover_alt}
                  width={1280}
                  height={720}
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80"
                  className="object-cover top-0 right-0 left-0 rounded-2xl border border-gray-200"
                />
              ) : null}
            </div>
          </header>
          <section className="animated-content-element invisible pb-8 sm:pb-12">
            <div className={"container-for-reading" + (isTocEmpty ? "" : "")}>
              <NotionRenderer listBlockChildren={article} />
            </div>
          </section>
        </AnimatedArticleWrapper>
        {!isTocEmpty ? (
          <AnimatedTOCWrapper>
            <h2 className="animated-toc-element invisible text-base font-semibold tracking-[-0.35px]">
              Telusuri Isi:
            </h2>
            <nav className="[&_a]:text-sm/[18px] [&_a]:text-text-gray [&_a]:hover:text-text-accent [&_a]:animate-hover [&_ul,&_ul_li]:space-y-2.5 [&_a]:inline-block">
              <ul className="[&_ul]:pl-4">
                {toc.map(({ title, children }, index) => (
                  <li key={index} className="animated-toc-element invisible">
                    <a href={`#${title}`}>{title}</a>
                    {children.length ? (
                      <ul>
                        {children.map(({ title, children }, index) => (
                          <li
                            key={`sub-${index}`}
                            className="animated-toc-element invisible"
                          >
                            <a href={`#${title}`}>{title}</a>
                            {children.length ? (
                              <ul>
                                {children.map(({ title }, index) => (
                                  <li
                                    key={`sub-sub-${index}`}
                                    className="animated-toc-element invisible"
                                  >
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
          </AnimatedTOCWrapper>
        ) : null}
      </div>
      <ContactCTASection />
    </>
  );
}
