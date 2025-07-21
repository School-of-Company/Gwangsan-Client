import { instance } from '@/shared/lib/axios';
import { toast } from 'sonner';

export const acceptTrade = async (id: string) => {
  try {
    const res = await instance.post('/admin/trade-complete/' + id);
    toast.success('거래 승인 성공했습니다');
    return res;
  } catch (error) {
    toast.error('거래 승인 실패했습니다');
    throw error;
  }
};
