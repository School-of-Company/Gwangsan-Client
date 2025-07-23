export const MEMBER_ROLES = [
  'ROLE_USER',
  'ROLE_PLACE_ADMIN',
  'ROLE_HEAD_ADMIN',
] as const;

export type MemberRole = (typeof MEMBER_ROLES)[number];

export const MEMBER_ROLE_KOR: Record<MemberRole, string> = {
  ROLE_USER: '일반 유저',
  ROLE_PLACE_ADMIN: '코디네이터',
  ROLE_HEAD_ADMIN: '사무국',
} as const;

export const memberRoleOptions = Object.entries(MEMBER_ROLE_KOR).map(
  ([value, label]) => ({
    value: value as MemberRole,
    label,
  }),
);
