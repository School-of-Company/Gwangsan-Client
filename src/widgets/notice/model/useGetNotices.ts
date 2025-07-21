import { useQuery } from '@tanstack/react-query';
import { getNotices } from '../api/getNotices';
import { Notices } from '@/shared/types/noticeType';

export const useGetNotices = () => {
  return useQuery<Notices>({
    queryKey: ['notice'],
    queryFn: getNotices,
  });
};
