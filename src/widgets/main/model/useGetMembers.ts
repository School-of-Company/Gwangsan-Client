import { useQuery } from '@tanstack/react-query';
import { getMembers } from '../api/getMembers';
import { MemberType } from '@/shared/types/memberType';

export const useGetMembers = (
  nickname?: string | undefined,
  placeName?: string | undefined,
) => {
  return useQuery<MemberType[]>({
    queryKey: ['members', nickname, placeName],
    queryFn: () => getMembers(nickname, placeName),
  });
};
