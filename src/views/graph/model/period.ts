export const PERIODS = ['DAY', 'WEEK', 'MONTH', 'YEAR'] as const;

export type Period = (typeof PERIODS)[number];

export const PERIOD_KOR: Record<Period, string> = {
  DAY: '오늘',
  WEEK: '1주',
  MONTH: '1달',
  YEAR: '1년',
} as const;

export const periodOptions = Object.entries(PERIOD_KOR).map(
  ([value, label]) => ({
    value: value as Period,
    label,
  }),
);
