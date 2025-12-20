import { useQuery } from '@tanstack/react-query';
import { getMember } from '../api/getMember';
import { PlaceValueType } from '@/shared/const/place';
import { MEMBER_STATUS } from '@/shared/types/memberType';
import { MemberRole } from '@/shared/const/role';

export interface Member {
  memberId: number;
  nickname: string;
  placeName: PlaceValueType;
  light: number;
  description: string;
  specialties: string[];
  name: string;
  phoneNumber: string;
  role: MemberRole;
  status: MEMBER_STATUS;
  joinedAt: string;
  gwangsan: number;
}

export const useGetMember = (memberId: string) => {
  return useQuery<Member>({
    queryKey: ['member', memberId],
    queryFn: () => getMember(memberId),
    enabled: !!memberId,
  });
};
