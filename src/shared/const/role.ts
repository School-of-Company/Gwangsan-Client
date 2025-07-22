export const MEMBER_ROLES = [
  'ROLE_USER',
  'ROLE_PLACE_ADMIN',
  'ROLE_HEAD_ADMIN',
] as const;

export type MemberRole = (typeof MEMBER_ROLES)[number];
