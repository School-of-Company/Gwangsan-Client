export interface User {
  id: string;
  nickname: string;
  role: string;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface AuthState {
  user: User | null;
  token: UserToken | null;
  isAuthenticated: boolean;
}

export interface SendVerificationCodeRequest {
  phoneNumber: string;
}

export interface SendVerificationCodeResponse {
  message?: string;
  success?: boolean;
}

export interface VerifyCodeRequest {
  phoneNumber: string;
  code: string;
}

export interface VerifyCodeResponse {
  message?: string;
  success?: boolean;
  verified?: boolean;
}

export interface ResetPasswordRequest {
  phoneNumber: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message?: string;
  success?: boolean;
}
