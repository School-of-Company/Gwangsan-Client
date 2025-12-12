export const PLACES = {
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
} as const;

export const PLACE_RECORD: Record<number, string> = PLACES;
export type PlaceRecordType = keyof typeof PLACE_RECORD;

export type HeadType = keyof typeof HEAD;

export const HEAD: Record<number, string> = {
  12: '광산구도시재생공동체센터',
  13: '광산구자원봉사센터',
  14: '광산구지역사회보장협의체',
  15: '투게더광산나눔문화센터',
} as const;

export const headOptions = Object.entries(HEAD).map(([value, label]) => ({
  value,
  label,
}));

export const placeOptions = Object.entries(PLACES).map(([value, label]) => ({
  value,
  label,
}));

export type PlaceValueType = (typeof PLACES)[keyof typeof PLACES];
