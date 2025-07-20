import { AxiosError } from 'axios';
import { ValidationErrors } from './userSchema';

interface ApiErrorResponse {
  message?: string;
  code?: string;
  details?: Record<string, string>;
}

export const handleSignInError = (
  error: unknown,
): { message: string; fieldErrors: ValidationErrors } => {
  if (error instanceof AxiosError && error.response) {
    const responseData = error.response.data as ApiErrorResponse;
    const serverMessage = responseData?.message || '로그인에 실패했습니다.';
    const status = error.response.status;

    if (status === 404) {
      return {
        message: serverMessage,
        fieldErrors: {
          nickname: serverMessage,
          password: '',
        },
      };
    } else if (status === 401) {
      return {
        message: serverMessage,
        fieldErrors: {
          nickname: '',
          password: serverMessage,
        },
      };
    } else {
      return {
        message: serverMessage,
        fieldErrors: {
          nickname: serverMessage,
          password: serverMessage,
        },
      };
    }
  }

  if (error instanceof AxiosError && error.code === 'ERR_NETWORK') {
    return {
      message: '네트워크 연결을 확인해주세요.',
      fieldErrors: {
        nickname: '',
        password: '',
      },
    };
  }

  return {
    message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    fieldErrors: {
      nickname: '',
      password: '',
    },
  };
};
