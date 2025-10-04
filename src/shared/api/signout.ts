import { toast } from 'sonner';
import { instance } from '../lib/axios';
import { removeCookie } from '../lib/cookies';

export const signout = async () => {
  try {
    await instance.delete('/auth/signout');
    toast.success('로그아웃에 성공했습니다');
  } catch (error) {
    toast.error('로그아웃에 실패했습니다');
    throw error;
  } finally {
    removeCookie('accessToken');
    removeCookie('refreshToken');
  }
};
