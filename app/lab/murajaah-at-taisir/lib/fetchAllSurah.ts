export type SurahNumber = number & { readonly __brand: "SurahNumber" };

export function isSurahNumber(n: number): n is SurahNumber {
  return n >= 1 && n <= 114 && Number.isInteger(n);
}

export function toSurahNumber(n: number): SurahNumber {
  if (!isSurahNumber(n)) {
    throw new Error(`Invalid surah number: ${n}. Must be between 1-114.`);
  }
  return n;
}

type AllSurahResponse = {
  code: number;
  status: string;
  data: Surah[];
};

export type Surah = {
  number: SurahNumber;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

export async function fetchAllSurah(): Promise<AllSurahResponse> {
  return fetch("https://api.alquran.cloud/v1/surah").then((res) => res.json());
}
