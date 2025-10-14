export const PLACES: Record<number, string> = {
  1: '수완마을',
  2: '고실마을',
  3: '신가',
  4: '신창',
  5: '도산',
  6: '우산',
  7: '월곡1',
  8: '첨단1',
  9: '평동',
  10: '월곡2',
  11: '하남',
} as const;

export type PlaceType = keyof typeof PLACES;

export const placeOptions = Object.entries(PLACES).map(([value, label]) => ({
  value,
  label,
}));
