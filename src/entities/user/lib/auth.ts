'use client';

import { storage } from '@/shared/lib/storage';
import { UserToken } from '../model/types';

export const AUTH_TOKEN_KEY = 'token';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';

export const saveTokens = (token: UserToken): void => {
  storage.setItem(AUTH_TOKEN_KEY, token.accessToken);
  storage.setItem(AUTH_REFRESH_TOKEN_KEY, token.refreshToken);
};

export const getTokens = (): { token: string | null; refreshToken: string | null } => {
  return {
    token: storage.getItem(AUTH_TOKEN_KEY),
    refreshToken: storage.getItem(AUTH_REFRESH_TOKEN_KEY),
  };
};

export const clearTokens = (): void => {
  storage.removeItem(AUTH_TOKEN_KEY);
  storage.removeItem(AUTH_REFRESH_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!storage.getItem(AUTH_TOKEN_KEY);
}; 