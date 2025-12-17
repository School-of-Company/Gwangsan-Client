import { instance } from '@/shared/lib/axios';

export const getMembers = async (
  nickname: string | undefined,
  placeId: number | undefined,
) => {
  try {
    const res = await instance.get('/member/all', {
      params: {
        ...(nickname ? { nickname } : {}),
        ...(placeId ? { placeId } : {}),
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
