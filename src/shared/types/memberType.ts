import { MemberRole } from '../const/role';

export type MEMBER_STATUS = 'ACTIVE' | 'SUSPENDED' | 'PENDING' | 'WITHDRAWN';

export const MEMBER_STATUS_KOR: Record<MEMBER_STATUS, string> = {
  ACTIVE: '활동',
  SUSPENDED: '정지',
  PENDING: '대기',
  WITHDRAWN: '탈퇴',
} as const;

export const memberStatusOptions = Object.entries(MEMBER_STATUS_KOR).map(
  ([value, label]) => ({
    value: value as MEMBER_STATUS,
    label,
  }),
);

export interface MemberType {
  memberId: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  role: MemberRole;
  status: MEMBER_STATUS;
  joinedAt: string;
  gwangsan: number;
}
