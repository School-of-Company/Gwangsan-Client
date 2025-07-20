import { instance } from '@/shared/lib/axios';

export const getNotices = async () => {
  try {
    const res = await instance.get('/notice');
    return res.data;
  } catch (error) {
    throw error;
  }
};
