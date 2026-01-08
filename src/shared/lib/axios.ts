import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
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

const refreshClient = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

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
  (error: AxiosError) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (typeof window === 'undefined') return Promise.reject(error);

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401) return Promise.reject(error);

    const url = originalRequest.url ?? '';

    const SKIP_PATHS = [
      '/api/admin/signin',
      '/api/signin',
      '/api/auth/reissue',
      '/auth/reissue',
    ];

    if (SKIP_PATHS.some((p) => url.includes(p))) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) return Promise.reject(error);
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = getCookie(AUTH_REFRESH_TOKEN_KEY);
      if (!refreshToken) throw new Error('No refresh token available');

      const res = await refreshClient.patch<{ accessToken: string }>(
        '/api/auth/reissue',
        null,
        {
          headers: {
            refreshtoken: refreshToken,
          },
        },
      );

      const { accessToken } = res.data;

      setCookie(AUTH_TOKEN_KEY, accessToken, 86400);

      processQueue(null, accessToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return instance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearTokens();

      const currentPath = window.location.pathname;
      const isProtectedPage = authConfig.protectedPages.some((path: string) =>
        currentPath.startsWith(path),
      );

      if (isProtectedPage) {
        window.location.replace(authConfig.signInPage);
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
