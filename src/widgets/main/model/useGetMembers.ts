import { useQuery } from '@tanstack/react-query';
import { getMembers } from '../api/getMembers';
import { MemberType } from '@/shared/types/memberType';

export const useGetMembers = (
  nickname?: string | undefined,
  placeId?: number | undefined,
) => {
  return useQuery<MemberType[]>({
    queryKey: ['members', nickname, placeId],
    queryFn: () => getMembers(nickname, placeId),
  });
};
