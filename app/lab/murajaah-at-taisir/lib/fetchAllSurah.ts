type AllSurahResponse = {
  code: number;
  status: string;
  data: Surah[];
};

type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

export async function fetchAllSurah(): Promise<AllSurahResponse> {
  return fetch("https://api.alquran.cloud/v1/surah").then((res) => res.json());
}
