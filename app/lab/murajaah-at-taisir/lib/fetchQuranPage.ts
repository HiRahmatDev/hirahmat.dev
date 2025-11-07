export type QuranPageResponse = {
  code: number;
  status: string;
  data: Data;
};

type Data = {
  number: number;
  ayahs: Ayah[];
  surahs: Surahs;
  edition: Edition;
};

export type Ayah = {
  number: number;
  text: string;
  surah: Surah;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
};

type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
};

type Surahs = {
  [key: string]: SurahN;
};

type SurahN = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
};

type Edition = {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
};

export async function fetchQuranPage(page: number): Promise<QuranPageResponse> {
  return fetch(`https://api.alquran.cloud/v1/page/${page}`).then((res) =>
    res.json()
  );
}
