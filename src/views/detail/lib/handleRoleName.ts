import { MemberRole } from '@/shared/const/role';

export const handleRoleName = (name?: MemberRole) => {
  switch (name) {
    case 'ROLE_HEAD_ADMIN':
      return '본점 관리자';
    case 'ROLE_PLACE_ADMIN':
      return '코디네이터';
    case 'ROLE_USER':
      return '일반 회원';
  }
};
