import { instance } from '@/shared/lib/axios';

export const getNotifications = async () => {
  try {
    const res = await instance.get('/admin/alert');
    return res.data;
  } catch (error) {
    throw error;
  }
};
