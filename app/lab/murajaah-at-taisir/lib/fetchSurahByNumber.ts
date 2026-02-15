type SurahByNumberResponse = {
  code: number;
  status: string;
  data: Surah;
};

type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
};

type Ayah = {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
};

export async function fetchSurahByNumber(
  number: number
): Promise<SurahByNumberResponse> {
  return fetch(`https://api.alquran.cloud/v1/surah/${number}`).then((res) =>
    res.json()
  );
}
