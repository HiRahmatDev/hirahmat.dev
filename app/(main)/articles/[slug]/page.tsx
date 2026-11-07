import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { CSSProperties } from "react";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

import { ContactCTASection } from "@/app/(main)/components/sections/ContactCTASection";
import {
  extractArticleTOC,
  fetchAllArticles,
  fetchArticleByBlockId,
  fetchArticleMetadataBySlug,
} from "@/app/services/notion";
import { formatDate } from "@/app/lib/dayjs";
import { NotionRenderer } from "@/app/(main)/components/NotionRenderer";
import { RichText } from "@/app/(main)/components/NotionRenderer/common/RichText";
import { SITE_NAME } from "@/app/config/constants";

const TOC_STAGGER_CAP = 8;

/** Stagger slot for `.reveal-in` (70ms per slot, see components.css). */
function revealOrder(order: number): CSSProperties {
  return { "--reveal-order": order } as CSSProperties;
}

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
  "use cache";
  cacheLife("hours");

  const { slug } = await params;
  const blockMetadata = await fetchArticleMetadataBySlug(slug);

  if (!blockMetadata?.slug) {
    notFound();
  }

  const article = await fetchArticleByBlockId(blockMetadata.blockId);
  const toc = extractArticleTOC(article);
  const isTocEmpty = !toc || !toc?.length;
  // Content starts together with the last header element, like the old GSAP "-=0.6".
  const contentOrder = blockMetadata.cover ? 8 : 7;
  let tocOrder = 0;
  const nextTocOrder = () =>
    revealOrder(Math.min(++tocOrder, TOC_STAGGER_CAP));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_240px] container-wider px-0 overflow-x-clip">
        <article>
          <header className="pt-2 space-y-6 mb-8 md:mb-10">
            <div className={"container" + (isTocEmpty ? "" : " mx-0")}>
              <Link
                href="/articles"
                style={revealOrder(0)}
                className="group reveal-in inline-block px-1 -mx-1 mb-8 md:mb-10"
              >
                <div className="flex gap-1 sm:gap-1.5 items-center text-text-accent font-semibold group-back-hover">
                  <ArrowLeft className="size-3.5 sm:size-4 stroke-[2.75]" />
                  <span className="text-sm sm:text-base">Artikel</span>
                </div>
              </Link>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1
                    style={revealOrder(1)}
                    className="reveal-in text-3xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold"
                  >
                    <RichText items={blockMetadata.rawTitle} />
                  </h1>
                  <p
                    style={revealOrder(2)}
                    className="reveal-in text-base/normal sm:text-lg/normal -tracking-[.2px] text-gray-500"
                  >
                    <RichText items={blockMetadata.rawDesc} />
                  </p>
                </div>
                <p className="text-xs/[20px] sm:text-sm/[24px] tracking-[-0.15px]">
                  <span
                    style={revealOrder(3)}
                    className="reveal-in inline-block text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200"
                  >
                    {blockMetadata.category || "-"}
                  </span>
                  <span
                    style={revealOrder(4)}
                    className="reveal-in inline-block text-zinc-500"
                  >
                    &ensp;•&ensp;
                  </span>
                  <strong
                    style={revealOrder(5)}
                    className="reveal-in inline-block font-medium text-zinc-600"
                  >
                    {formatDate(blockMetadata.publishedOn) || "-"}
                  </strong>
                  <span
                    style={revealOrder(6)}
                    className="reveal-in inline-block text-zinc-500"
                  >
                    &ensp;•&ensp;
                  </span>{" "}
                  <span
                    style={revealOrder(7)}
                    className="reveal-in inline-block text-zinc-500"
                  >
                    Diperbarui{" "}
                    <strong className="font-medium text-zinc-600">
                      {formatDate(blockMetadata.updatedOn) || "-"}
                    </strong>
                  </span>
                </p>
              </div>
            </div>
            {blockMetadata.cover ? (
              <div
                style={revealOrder(8)}
                className={
                  "container reveal-in" + (isTocEmpty ? "" : " mx-[unset]")
                }
              >
                <Image
                  src={blockMetadata.cover}
                  alt={blockMetadata.cover_alt}
                  width={1280}
                  height={720}
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
                  className="object-cover top-0 right-0 left-0 rounded-2xl border border-gray-200"
                />
              </div>
            ) : null}
          </header>
          <section
            style={revealOrder(contentOrder)}
            className="reveal-in pb-8 sm:pb-12"
          >
            <div className={"container-for-reading" + (isTocEmpty ? "" : "")}>
              <NotionRenderer listBlockChildren={article} />
            </div>
          </section>
        </article>
        {!isTocEmpty ? (
          <aside
            style={{ "--reveal-offset": "600ms" } as CSSProperties}
            className="hidden md:block sticky top-24 max-h-[80vh] overflow-y-auto overflow-x-hidden px-5 pb-12 space-y-3"
          >
            <h2
              style={revealOrder(0)}
              className="reveal-in text-base font-semibold tracking-[-0.35px]"
            >
              Telusuri Isi:
            </h2>
            <nav className="[&_a]:text-sm/[18px] [&_a]:text-text-gray [&_a]:hover:text-text-accent [&_a]:animate-hover [&_ul,&_ul_li]:space-y-2.5 [&_a]:inline-block">
              <ul className="[&_ul]:pl-4">
                {toc.map(({ title, children }, index) => (
                  <li key={index} style={nextTocOrder()} className="reveal-in">
                    <a href={`#${title}`}>{title}</a>
                    {children.length ? (
                      <ul>
                        {children.map(({ title, children }, index) => (
                          <li
                            key={`sub-${index}`}
                            style={nextTocOrder()}
                            className="reveal-in"
                          >
                            <a href={`#${title}`}>{title}</a>
                            {children.length ? (
                              <ul>
                                {children.map(({ title }, index) => (
                                  <li
                                    key={`sub-sub-${index}`}
                                    style={nextTocOrder()}
                            className="reveal-in"
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
          </aside>
        ) : null}
      </div>
      <ContactCTASection />
    </>
  );
}
