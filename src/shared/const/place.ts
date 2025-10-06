export const PLACES = [
  '고실마을',
  '수완마을',
  '신가',
  '신창',
  '도산',
  '우산',
  '월곡1',
  '첨단2',
  '평동',
  '월곡2',
  '하남',
  '도시재생공동체센터',
] as const;

export type Place = (typeof PLACES)[number];

export type HeadType = keyof typeof HEAD;

export const HEAD: Record<number, string> = {
  1: '광산구도시재생공동체센터',
  2: '광산구자원봉사센터',
  3: '광산구지역사회보장협의체',
  4: '투게더광산나눔문화센터',
} as const;

export const headOptions = Object.entries(HEAD).map(([value, label]) => ({
  value,
  label,
}));

export const ALL_PLACES: Record<number, string> = {
  1: '수완마을',
  2: '고실마을',
  3: '신가',
  4: '신창',
  5: '도산',
  6: '우산',
  7: '월곡1',
  8: '첨단2',
  9: '월곡2',
  10: '하남',
  11: '평동',
  12: '광산구도시재생공동체센터',
  13: '광산구자원봉사센터',
  14: '광산구지역사회보장협의체',
  15: '투게더광산나눔문화센터',
} as const;

export type AllPlaceType = keyof typeof ALL_PLACES;

export const allPlaceOptions = Object.entries(ALL_PLACES).map(
  ([value, label]) => ({
    value,
    label,
  }),
);
