import { Metadata } from "next";
import React from "react";

import { ArticleFilter } from "./ArticleFilter";
import { ArticlesList } from "./ArticlesList";
import { ContactCTASection } from "@/app/(main)/components/sections/ContactCTASection";
import { isCategoryValid } from "./lib/utils";

export const metadata: Metadata = {
  title: "Artikel | HiRahmat",
  description: "Kumpulan tulisan, blog, dan jurnal proyek.",
};

export const revalidate = 60;

export default async function ArticlesPage({
  searchParams,
}: PageProps<"/articles">) {
  let { category } = await searchParams;

  if (!isCategoryValid(category)) {
    category = undefined;
  }

  return (
    <main>
      <section className="container pt-4 sm:pt-12 pb-20 min-h-screen">
        <div className="space-y-10">
          <div className="space-y-2">
            <h1 className="text-3xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold">
              Artikel
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-[60ch]">
              Berbagai tulisan tentang pengembangan web, teknologi, dan
              pembelajaran.
            </p>
          </div>

          <div className="space-y-8">
            <ArticleFilter />
            <React.Suspense fallback={<ArticlesList.Skeleton />} key={category}>
              <ArticlesList category={category} key={category} />
            </React.Suspense>
          </div>
        </div>
      </section>
      <ContactCTASection />
    </main>
  );
}
