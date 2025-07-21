import { Place } from '@/shared/const/place';
import { MemberRole } from '@/shared/const/role';
import { NoticeSchema } from '../model/noticeSchema';
import { postNotice } from '../api/postNotice';
import { toast } from 'sonner';
import { uploadImage } from '../api/uploadImage';

export const handlePostNotice = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const imageFile = await uploadImage([formData.get('imageIds') as File]);

  const value = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    placeName: formData.get('placeName') as Place,
    imageIds: imageFile,
    role: formData.get('role') as MemberRole,
  };

  const result = NoticeSchema.safeParse(value);
  if (result.success) {
    const res = await postNotice(value);
    if (res) {
      if (res.status === 201) {
        toast.success('공지가 작성되었습니다');
        e.currentTarget.reset();
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
    toast.error(fieldErrors.content);
    toast.error(fieldErrors.imageIds);
    toast.error(fieldErrors.placeName);
    toast.error(fieldErrors.title);
  }
};
