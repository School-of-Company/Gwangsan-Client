import { instance } from '@/shared/lib/axios';
import { toast } from 'sonner';

export const refuseNotifications = async (id: string) => {
  try {
    const res = await instance.delete('/admin/' + id);
    if (res.status === 204) toast.success('알림 기각에 성공했습니다');
  } catch (error) {
    toast.error('알림 기각 실패했습니다');
    throw error;
  }
};
