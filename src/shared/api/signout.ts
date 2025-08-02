import { toast } from 'sonner';
import { instance } from '../lib/axios';
import { removeCookie } from '../lib/cookies';

export const signout = async () => {
  try {
    instance.delete('/auth/signout');
    removeCookie('accessToken');
    removeCookie('refreshToken');
    toast.success('로그아웃에 성공했습니다');
  } catch (error) {
    toast.error('로그아웃에 실패했습니다');
    throw error;
  }
};
