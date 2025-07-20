import { instance } from '@/shared/lib/axios';
import { Notice } from '../model/noticeSchema';

export const postNotice = async (data: Notice) => {
  try {
    const res = await instance.post('/notice', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
