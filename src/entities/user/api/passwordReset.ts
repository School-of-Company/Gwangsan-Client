import { instance } from '@/shared/lib/axios';
import type {
  SendVerificationCodeRequest,
  SendVerificationCodeResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../model/types';

export const sendVerificationCode = async (
  data: SendVerificationCodeRequest,
): Promise<SendVerificationCodeResponse> => {
  const response = await instance.post<SendVerificationCodeResponse>(
    '/sms/password',
    data,
  );
  return response.data;
};

export const verifyCode = async (
  data: VerifyCodeRequest,
): Promise<VerifyCodeResponse> => {
  const response = await instance.post<VerifyCodeResponse>(
    '/sms/password/verify',
    data,
  );
  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const response = await instance.patch<ResetPasswordResponse>(
    '/auth/password',
    data,
  );
  return response.data;
};
