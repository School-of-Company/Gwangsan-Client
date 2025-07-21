import { instance } from '@/shared/lib/axios';

export const acceptTrade = async (id: string) => {
  try {
    const res = await instance.post('/admin/trade-complete/' + id);
    return res;
  } catch (error) {
    throw error;
  }
};
