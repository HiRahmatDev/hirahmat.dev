export type AyahData = {
  text: string;
  page: number;
  numberInSurah: number;
};

export async function fetchAyahBySurahNAyah({
  surah,
  ayah,
}: {
  surah: number;
  ayah: number;
}): Promise<AyahData> {
  const res = await fetch(
    `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}`
  ).then((res) => res.json());

  return {
    text: res.data.text,
    page: res.data.page,
    numberInSurah: res.data.numberInSurah,
  };
}
