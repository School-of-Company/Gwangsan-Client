import { instance } from '@/shared/lib/axios';

export const getMembers = async () => {
  try {
    const res = await instance.get('/member/all');
    return res.data;
  } catch (error) {
    throw error;
  }
};
