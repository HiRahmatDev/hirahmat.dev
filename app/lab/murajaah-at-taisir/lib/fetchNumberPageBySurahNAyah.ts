export async function fetchNumberPageBySurahNAyah({
  surah,
  ayah,
}: {
  surah: number;
  ayah: number;
}): Promise<number> {
  const res = await fetch(
    `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}`
  ).then((res) => res.json());
  return res.data.page;
}
