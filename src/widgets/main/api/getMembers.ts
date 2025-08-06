import { instance } from '@/shared/lib/axios';

export const getMembers = async (
  nickname: string | undefined,
  placeName: string | undefined,
) => {
  try {
    const res = await instance.get('/member/all', {
      params: {
        nickname,
        placeName,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
