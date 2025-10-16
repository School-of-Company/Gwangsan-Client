import { AxiosError } from 'axios';
import { ValidationErrors, PasswordResetValidationErrors } from './userSchema';

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

export const handleSendVerificationCodeError = (
  error: unknown,
): { message: string; fieldError: string } => {
  if (error instanceof AxiosError && error.response) {
    const responseData = error.response.data as ApiErrorResponse;
    const serverMessage =
      responseData?.message || '인증번호 발송에 실패했습니다.';
    const status = error.response.status;

    if (status === 400) {
      return {
        message: '올바른 전화번호 형식을 입력해주세요.',
        fieldError: '올바른 전화번호 형식을 입력해주세요.',
      };
    } else if (status === 429) {
      return {
        message: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.',
        fieldError: '너무 많은 요청을 보냈습니다.',
      };
    } else {
      return {
        message: serverMessage,
        fieldError: serverMessage,
      };
    }
  }

  return {
    message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    fieldError: '',
  };
};

export const handleVerifyCodeError = (
  error: unknown,
): { message: string; fieldError: string } => {
  if (error instanceof AxiosError && error.response) {
    const responseData = error.response.data as ApiErrorResponse;
    const serverMessage =
      responseData?.message || '인증번호 확인에 실패했습니다.';
    const status = error.response.status;

    if (status === 400) {
      return {
        message: '올바른 전화번호 형식을 입력해주세요.',
        fieldError: '올바른 전화번호 형식을 입력해주세요.',
      };
    } else if (status === 401) {
      return {
        message: '인증번호가 일치하지 않거나 만려되었습니다.',
        fieldError: '올바른 인증번호를 입력해주세요.',
      };
    } else {
      return {
        message: serverMessage,
        fieldError: serverMessage,
      };
    }
  }

  return {
    message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    fieldError: '',
  };
};

export const handleResetPasswordError = (
  error: unknown,
): {
  message: string;
  fieldErrors: Pick<
    PasswordResetValidationErrors,
    'newPassword' | 'confirmPassword'
  >;
} => {
  if (error instanceof AxiosError && error.response) {
    const responseData = error.response.data as ApiErrorResponse;
    const serverMessage =
      responseData?.message || '비밀번호 재설정에 실패했습니다.';
    const status = error.response.status;

    if (status === 400) {
      return {
        message: serverMessage,
        fieldErrors: {
          newPassword: serverMessage,
          confirmPassword: '',
        },
      };
    } else if (status === 401) {
      return {
        message: '인증번호가 일치하지 않거나 만료되었습니다.',
        fieldErrors: {
          newPassword: '',
          confirmPassword: '',
        },
      };
    } else {
      return {
        message: serverMessage,
        fieldErrors: {
          newPassword: serverMessage,
          confirmPassword: '',
        },
      };
    }
  }

  return {
    message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    fieldErrors: {
      newPassword: '',
      confirmPassword: '',
    },
  };
};
