import { Place } from '@/shared/const/place';
import { MemberRole } from '@/shared/const/role';
import { storage } from '@/shared/lib/storage';
import { NoticeSchema } from '../model/noticeSchema';
import { postNotice } from '../api/postNotice';
import { toast } from 'sonner';

type NoticeError = {
  title?: string[];
  content?: string[];
  placeName?: string[];
  imageIds?: string[];
};

type NoticeState = {
  success: boolean;
  error: NoticeError;
};

export const handlePostNotice = async (
  state: NoticeState,
  formData: FormData,
): Promise<NoticeState> => {
  const value = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    placeName: formData.get('placeName') as Place,
    imageIds: formData.get('imageIds') as File,
    role: storage.getItem('role') as MemberRole,
  };

  const result = NoticeSchema.safeParse(value);
  if (result.success) {
    const res = await postNotice(value);
    if (res) {
      if (res.status === 201) toast.success('공지가 작성되었습니다');
      else
        toast.error(
          res?.status === 403
            ? '공지 작성 권한이 없는 지역입니다'
            : '공지 작성 실패했습니다',
        );
    }
    return { ...state, success: true, error: {} };
  } else {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      ...state,
      success: false,
      error: {
        title: fieldErrors.title,
        content: fieldErrors.content,
        placeName: fieldErrors.placeName,
        imageIds: fieldErrors.imageIds,
      },
    };
  }
};
