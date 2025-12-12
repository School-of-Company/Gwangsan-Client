import { NoticeSchema } from '../model/noticeSchema';
import { postNotice } from '../api/postNotice';
import { toast } from 'sonner';
import { editNotice } from '../api/editNotice';
import { PlaceValueType } from '@/shared/const/place';

export const handlePostNotice = async (
  formData: FormData,
  id: string | null,
) => {
  const imageIdsRaw = formData.getAll('imageIds');
  const imageIds = imageIdsRaw
    .map((id) => Number(id))
    .filter((id) => !isNaN(id));
  const value = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    placeName: formData.get('placeName') as PlaceValueType,
    imageIds,
  };

  const result = NoticeSchema.safeParse(value);
  if (result.success) {
    const res = id ? await editNotice(value, id) : await postNotice(value);
    if (res) {
      if (res.status === 201 || res.status === 200) {
        toast.success(id ? '공지가 수정되었습니다' : '공지가 작성되었습니다');
        setTimeout(() => {
          window.location.href = '/notice';
        }, 1000);
      } else {
        toast.error(
          res.status === 403
            ? '공지 작성 권한이 없는 지역입니다'
            : id
              ? '공지 수정에 실패하였습니다'
              : '공지 등록에 실패하였습니다',
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
