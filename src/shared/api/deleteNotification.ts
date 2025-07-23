import { toast } from 'sonner';
import { instance } from '../lib/axios';

export const deleteNotification = async (id: string) => {
  try {
    await instance.delete('/admin/' + id);
  } catch (error) {
    toast.error('알림 삭제 실패했습니다');
    throw error;
  }
};
