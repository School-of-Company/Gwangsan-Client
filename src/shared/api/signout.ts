import { redirect } from 'next/navigation';
import { removeCookie } from '../lib/cookies';

export const signout = () => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
  window.location.href = '/signin';
};
