'use client';

import { UserToken } from '@/entities/user';

export const AUTH_TOKEN_KEY = 'accessToken';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';

const getCookieOptions = (maxAge?: number) => ({
  path: '/',
  secure: false,
  sameSite: 'lax' as const,
  ...(maxAge && { 'max-age': maxAge }),
});

export const setCookie = (name: string, value: string, maxAge?: number): void => {
  if (typeof document === 'undefined') return;
  
  const options = getCookieOptions(maxAge);
  const optionsString = Object.entries(options)
    .filter(([, val]) => val !== undefined)
    .map(([key, val]) => `${key}=${val}`)
    .join('; ');
  
  document.cookie = `${name}=${value}; ${optionsString}`;
  
  console.log('Setting cookie:', {
    name,
    value: value.substring(0, 10) + '...',
    fullCookie: `${name}=${value}; ${optionsString}`,
  });
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const removeCookie = (name: string): void => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};

export const saveTokens = (token: UserToken): void => {
  setCookie(AUTH_TOKEN_KEY, token.accessToken, 604800);
  setCookie(AUTH_REFRESH_TOKEN_KEY, token.refreshToken, 604800);
  
  console.log('Tokens saved, current cookies:', {
    accessToken: getCookie(AUTH_TOKEN_KEY) ? 'present' : 'missing',
    refreshToken: getCookie(AUTH_REFRESH_TOKEN_KEY) ? 'present' : 'missing',
  });
};

export const getTokens = (): { accessToken: string | null; refreshToken: string | null } => {
  return {
    accessToken: getCookie(AUTH_TOKEN_KEY),
    refreshToken: getCookie(AUTH_REFRESH_TOKEN_KEY),
  };
};

export const clearTokens = (): void => {
  removeCookie(AUTH_TOKEN_KEY);
  removeCookie(AUTH_REFRESH_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getCookie(AUTH_TOKEN_KEY);
}; 