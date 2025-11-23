import { Metadata } from "next";
import { Suspense } from "react";

import { ArticlesList } from "./ArticlesList";
import { ArticlesSkeleton } from "./ArticlesSkeleton";
import { ContactCTA } from "../components/ContactCTA";
import { fetchAllArticles } from "@/app/services/notion";

export const metadata: Metadata = {
  title: "Artikel | HiRahmat",
  description: "Kumpulan tulisan, blog, dan jurnal proyek.",
};

export default async function ArticlesPage() {
  const articles = await fetchAllArticles();

  return (
    <>
      <main className="container mx-auto px-4 pt-8 sm:pt-20 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Artikel
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl">
              Tulisan mengenai pemikiran, pengalaman, dan catatan perjalanan dalam
              membangun proyek-proyek digital.
            </p>
          </div>

          <Suspense fallback={<ArticlesSkeleton />}>
            <ArticlesList articles={articles || []} />
          </Suspense>
        </div>
      </main>
      <ContactCTA />
    </>
  );
}
