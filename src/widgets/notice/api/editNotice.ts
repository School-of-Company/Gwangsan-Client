import { instance } from '@/shared/lib/axios';
import { Notice } from '../model/noticeSchema';

export const editNotice = async (data: Notice, id: string) => {
  try {
    const res = await instance.patch('/notice/' + id, data);
    return res;
  } catch (error) {
    throw error;
  }
};
