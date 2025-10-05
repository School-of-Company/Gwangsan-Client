import { removeCookie } from '../lib/cookies';

export const signout = () => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
};
