import { instance } from '@/shared/lib/axios';
import { toast } from 'sonner';

export const acceptSignup = async (id: string) => {
  try {
    const res = await instance.patch('admin/verify/signup/' + id);
    toast.success('회원가입 승인 성공했습니다');
    return res;
  } catch (error) {
    toast.error('회원가입 승인 실패했습니다');
    throw error;
  }
};
