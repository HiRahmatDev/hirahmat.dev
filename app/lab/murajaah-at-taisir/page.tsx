import { notFound } from "next/navigation";

import { fetchQuranPage } from "./lib/fetchQuranPage";
import { QuranPageRenderer } from "./components/QuranPageRenderer";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const MIN_PAGE = 1;
const MAX_PAGE = 604;

export default async function MurajaahAtTaisirPage({
  searchParams,
}: PageProps) {
  const page = Number((await searchParams).page || "1");

  if (!page || isNaN(page) || page > MAX_PAGE || page < MIN_PAGE) {
    notFound();
  }

  const isRightPage = page % 2 === 1;
  const pageN = await fetchQuranPage(page);

  return <QuranPageRenderer pageN={pageN} isRightPage={isRightPage} />;
}
