import { toast } from 'sonner';
import { instance } from '../lib/axios';
import { removeCookie } from '../lib/cookies';

export const deleteAccount = async () => {
  try {
    await instance.delete('/member');
    removeCookie('accessToken');
    removeCookie('refreshToken');
    toast.success('회원탈퇴에 성공했습니다');
  } catch (error) {
    toast.error('회원탈퇴에 실패했습니다');
    throw error;
  }
};
