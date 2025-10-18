import { instance } from '@/shared/lib/axios';

export const adjustGwangsan = async (memberId: string, gwangsan: string) => {
  try {
    const res = await instance.patch('/admin/gwangsan/' + memberId, {
      gwangsan,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
