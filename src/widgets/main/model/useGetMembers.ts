import { useQuery } from '@tanstack/react-query';
import { getMembers } from '../api/getMembers';
import { MemberType } from '@/shared/types/memberType';

export const useGetMembers = () => {
  return useQuery<MemberType[]>({
    queryKey: ['members'],
    queryFn: getMembers,
  });
};
