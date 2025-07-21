import { useQuery } from '@tanstack/react-query';
import { getDetailNotice } from '../api/getDetailNotice';
import { Notice } from '@/widgets/notice/model/noticeSchema';
import { Place } from '@/shared/const/place';
import { MemberRole } from '@/shared/const/role';
import { ImageType } from '@/shared/types/imageType';

interface DetailResponse extends Notice {
  place: Place;
  createdAt: string;
  role: MemberRole;
  images: ImageType[];
}

export const useGetDetailNotice = (id: string) => {
  return useQuery<DetailResponse>({
    queryKey: ['detailNotice', id],
    queryFn: () => getDetailNotice(id),
  });
};
