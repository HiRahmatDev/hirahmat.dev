import { Metadata } from "next";
import { Suspense } from "react";

import { ArticlesList } from "./ArticlesList";
import { ArticlesSkeleton } from "./ArticlesSkeleton";
import { ContactCTASection } from "../components/sections/ContactCTASection";
import { fetchAllArticles } from "@/app/services/notion";

export const metadata: Metadata = {
  title: "Artikel | HiRahmat",
  description: "Kumpulan tulisan, blog, dan jurnal proyek.",
};

export default async function ArticlesPage() {
  const articles = await fetchAllArticles();

  return (
    <>
      <main className="container pt-4 sm:pt-12 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-2">
            <h1 className="text-3xl/[36px] sm:text-4xl/[44px] tracking-[-0.5px] sm:tracking-[-1px] font-bold">
              Artikel
            </h1>
            <p className="text-base/normal sm:text-lg/normal -tracking-[.2px] text-gray-600">
              Tulisan mengenai pemikiran, pengalaman, dan catatan perjalanan
              dalam membangun proyek-proyek digital.
            </p>
          </div>

          <Suspense fallback={<ArticlesSkeleton />}>
            <ArticlesList articles={articles || []} />
          </Suspense>
        </div>
      </main>
      <ContactCTASection />
    </>
  );
}
