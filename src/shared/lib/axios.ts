import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { authConfig } from '../config/auth';
import {
  AUTH_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  getCookie,
  setCookie,
  clearTokens,
} from '@/entities/user';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const accessToken = getCookie(AUTH_TOKEN_KEY);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _retryCount?: number;
    };

    // 재시도 횟수 제한: 2회
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }
    if (originalRequest._retryCount >= 2) {
      return Promise.reject(error);
    }

    if (
      originalRequest.url?.includes('/admin/signin') &&
      error.response?.status === 401
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      originalRequest._retryCount += 1;

      try {
        const refreshToken = getCookie(AUTH_REFRESH_TOKEN_KEY);
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await instance.post<{ accessToken: string }>(
          '/auth/refresh',
          {
            refreshToken,
          },
        );

        const { accessToken } = response.data;
        setCookie(AUTH_TOKEN_KEY, accessToken, 604800);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (error) {
        clearTokens();
        window.location.href = authConfig.signInPage;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
