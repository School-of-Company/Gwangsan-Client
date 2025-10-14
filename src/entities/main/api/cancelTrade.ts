import { instance } from '@/shared/lib/axios';

export const cancelTrade = async (alert_id: string) => {
  try {
    const res = await instance.patch('/admin/trade/' + { alert_id });
    return res;
  } catch (error) {
    throw error;
  }
};
