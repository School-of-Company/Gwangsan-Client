import { useQuery } from '@tanstack/react-query';
import { getNotices } from '../api/getNotices';

export const useGetNotice = () => {
  return useQuery({
    queryKey: ['notice'],
    queryFn: getNotices,
  });
};
