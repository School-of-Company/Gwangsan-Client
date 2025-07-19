import { instance } from '@/shared/lib/axios';
import { UserToken } from '../model/types';

export interface SignInRequest {
  nickname: string;
  password: string;
}

export interface SignInResponse {
  token: UserToken;
  role: string;
}

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await instance.post<SignInResponse>('/admin/signin', data);
  return response.data;
};
