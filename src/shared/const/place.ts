export const PLACES = [
  '수완세영',
  '수완에너지',
  '신가',
  '신창',
  '도산',
  '우산',
  '월곡1',
  '첨단1',
  '평동',
  '월곡2',
  '하남',
] as const;

export type Place = (typeof PLACES)[number];

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
