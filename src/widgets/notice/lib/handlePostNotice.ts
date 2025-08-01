import { Place } from '@/shared/const/place';
import { MemberRole } from '@/shared/const/role';
import { NoticeSchema } from '../model/noticeSchema';
import { postNotice } from '../api/postNotice';
import { toast } from 'sonner';

export const handlePostNotice = async (formData: FormData) => {
  const imageIdsRaw = formData.getAll('imageIds');
  const imageIds = imageIdsRaw
    .map((id) => Number(id))
    .filter((id) => !isNaN(id));
  const value = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    placeName: formData.get('placeName') as Place,
    imageIds,
    role: formData.get('role') as MemberRole,
  };

  const result = NoticeSchema.safeParse(value);
  if (result.success) {
    const res = await postNotice(value);
    if (res) {
      if (res.status === 201) {
        toast.success('공지가 작성되었습니다');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(
          res.status === 403
            ? '공지 작성 권한이 없는 지역입니다'
            : '공지 작성 실패했습니다',
        );
      }
    }
  } else {
    const fieldErrors = result.error.flatten().fieldErrors;
    Object.values(fieldErrors).forEach((messages) => {
      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          if (msg) toast.error(msg);
        });
      }
    });
  }
};
