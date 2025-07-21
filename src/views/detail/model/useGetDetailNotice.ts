import { useQuery } from '@tanstack/react-query';
import { getDetailNotice } from '../api/getDetailNotice';
import { DetailNotice } from '@/shared/types/noticeType';

export const useGetDetailNotice = (id: string) => {
  return useQuery<DetailNotice>({
    queryKey: ['detailNotice', id],
    queryFn: () => getDetailNotice(id),
  });
};
