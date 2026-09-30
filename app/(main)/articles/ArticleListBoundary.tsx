import React from "react";

import { ArticlesList } from "./ArticlesList";
import { isCategoryValid } from "./lib/utils";

export async function ArticlesListBoundary({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { category } = await searchParams;
  const validCategory = isCategoryValid(category) ? category : undefined;

  return (
    <React.Suspense
      key={validCategory ?? "All"}
      fallback={<ArticlesList.Skeleton />}
    >
      <ArticlesList category={validCategory} />
    </React.Suspense>
  );
}
