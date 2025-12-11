import { instance } from '@/shared/lib/axios';

export const acceptSignup = async (id: string) => {
  try {
    const res = await instance.patch('admin/verify/signup/' + id);
    return res;
  } catch (error) {
    throw error;
  }
};
