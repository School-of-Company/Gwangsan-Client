import { instance } from '@/shared/lib/axios';

export const getDetailNotice = async (id: string) => {
  try {
    const res = await instance.get('/notice/' + id);
    return res.data;
  } catch (error) {
    throw error;
  }
};
