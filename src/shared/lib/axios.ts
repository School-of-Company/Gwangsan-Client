import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { authConfig } from '../config/auth';
import { storage } from './storage';
import { AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY } from '@/entities/user';

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
      const token = storage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = storage.getItem(AUTH_REFRESH_TOKEN_KEY);
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await instance.post<{ token: string }>(
          '/auth/refresh',
          {
            refreshToken,
          },
        );

        const { token } = response.data;
        storage.setItem(AUTH_TOKEN_KEY, token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return instance(originalRequest);
      } catch (error) {
        storage.removeItem(AUTH_TOKEN_KEY);
        storage.removeItem(AUTH_REFRESH_TOKEN_KEY);
        window.location.href = authConfig.signInPage;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
