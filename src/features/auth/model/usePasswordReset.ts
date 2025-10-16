'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import {
  sendVerificationCode,
  verifyCode,
  resetPassword,
  validatePasswordResetPhone,
  validatePasswordResetVerification,
  validatePasswordResetNewPassword,
  getPasswordResetFieldSchema,
  handleSendVerificationCodeError,
  handleVerifyCodeError,
  handleResetPasswordError,
  PasswordResetValidationErrors,
} from '@/entities/user';
import { debounce } from '@/shared/lib/debounce';

type PasswordResetStep = 'phone' | 'verification' | 'newPassword';

interface PasswordResetFormData {
  phoneNumber: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export const usePasswordReset = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<PasswordResetStep>('phone');
  const [formData, setFormData] = useState<PasswordResetFormData>({
    phoneNumber: '',
    code: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<PasswordResetValidationErrors>({
    phoneNumber: '',
    code: '',
    newPassword: '',
    confirmPassword: '',
  });

  const debouncedValidateField = useMemo(
    () =>
      debounce((name: keyof PasswordResetFormData, value: string) => {
        const fieldSchema = getPasswordResetFieldSchema(name);
        const result = fieldSchema.safeParse(value);

        if (result.success) {
          setErrors((prev) => ({ ...prev, [name]: '' }));
        } else {
          const firstError = result.error.errors[0];
          setErrors((prev) => ({
            ...prev,
            [name]: firstError?.message || '입력값이 올바르지 않습니다.',
          }));
        }
      }, 300),
    [],
  );

  const sendCodeMutation = useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      toast.success('인증번호가 발송되었습니다.');
      setCurrentStep('verification');
      setErrors((prev) => ({ ...prev, phoneNumber: '' }));
    },
    onError: (error) => {
      const errorResult = handleSendVerificationCodeError(error);
      toast.error(errorResult.message);
      setErrors((prev) => ({ ...prev, phoneNumber: errorResult.fieldError }));
    },
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response) {
        const status = error.response.status;
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
  });

  const verifyCodeMutation = useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      toast.success('인증이 완료되었습니다.');
      setCurrentStep('newPassword');
      setErrors((prev) => ({ ...prev, code: '' }));
    },
    onError: (error) => {
      const errorResult = handleVerifyCodeError(error);
      toast.error(errorResult.message);
      setErrors((prev) => ({ ...prev, code: errorResult.fieldError }));
    },
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response) {
        const status = error.response.status;
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('비밀번호가 재설정되었습니다. 로그인해주세요.');
      router.push('/signin');
      router.refresh();
    },
    onError: (error) => {
      const errorResult = handleResetPasswordError(error);
      toast.error(errorResult.message);
      setErrors((prev) => ({
        ...prev,
        newPassword: errorResult.fieldErrors.newPassword,
        confirmPassword: errorResult.fieldErrors.confirmPassword,
      }));
    },
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response) {
        const status = error.response.status;
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
  });

  const updateField = useCallback(
    (name: keyof PasswordResetFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (value.trim() && errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }

      debouncedValidateField(name, value);
    },
    [errors, debouncedValidateField],
  );

  const handleSendCode = useCallback(async () => {
    if (sendCodeMutation.isPending) return;

    const validation = validatePasswordResetPhone({
      phoneNumber: formData.phoneNumber,
    });

    if (!validation.isValid) {
      setErrors((prev) => ({ ...prev, ...validation.errors }));
      toast.error('전화번호를 확인해주세요.');
      return;
    }

    sendCodeMutation.mutate({ phoneNumber: formData.phoneNumber });
  }, [formData.phoneNumber, sendCodeMutation]);

  const handleVerifyCode = useCallback(async () => {
    if (verifyCodeMutation.isPending) return;

    const validation = validatePasswordResetVerification({
      phoneNumber: formData.phoneNumber,
      code: formData.code,
    });

    if (!validation.isValid) {
      setErrors((prev) => ({ ...prev, ...validation.errors }));
      toast.error('입력값을 확인해주세요.');
      return;
    }

    verifyCodeMutation.mutate({
      phoneNumber: formData.phoneNumber,
      code: formData.code,
    });
  }, [formData.phoneNumber, formData.code, verifyCodeMutation]);

  const handleResetPassword = useCallback(async () => {
    if (resetPasswordMutation.isPending) return;

    const validation = validatePasswordResetNewPassword({
      phoneNumber: formData.phoneNumber,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });

    if (!validation.isValid) {
      setErrors((prev) => ({ ...prev, ...validation.errors }));
      toast.error('입력값을 확인해주세요.');
      return;
    }

    resetPasswordMutation.mutate({
      phoneNumber: formData.phoneNumber,
      newPassword: formData.newPassword,
    });
  }, [
    formData.phoneNumber,
    formData.newPassword,
    formData.confirmPassword,
    resetPasswordMutation,
  ]);

  const goBack = useCallback(() => {
    if (currentStep === 'verification') {
      setCurrentStep('phone');
      setFormData((prev) => ({ ...prev, code: '' }));
      setErrors((prev) => ({ ...prev, code: '' }));
    } else if (currentStep === 'newPassword') {
      setCurrentStep('verification');
      setFormData((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));
      setErrors((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));
    }
  }, [currentStep]);

  const canSubmitPhone = useMemo(
    () =>
      formData.phoneNumber.trim().length > 0 &&
      !errors.phoneNumber &&
      !sendCodeMutation.isPending,
    [formData.phoneNumber, errors.phoneNumber, sendCodeMutation.isPending],
  );

  const canSubmitVerification = useMemo(
    () =>
      formData.code.trim().length > 0 &&
      !errors.code &&
      !verifyCodeMutation.isPending,
    [formData.code, errors.code, verifyCodeMutation.isPending],
  );

  const canSubmitNewPassword = useMemo(
    () =>
      formData.newPassword.length > 0 &&
      formData.confirmPassword.length > 0 &&
      !errors.newPassword &&
      !errors.confirmPassword &&
      !resetPasswordMutation.isPending,
    [
      formData.newPassword,
      formData.confirmPassword,
      errors.newPassword,
      errors.confirmPassword,
      resetPasswordMutation.isPending,
    ],
  );

  const isLoading = useMemo(
    () =>
      sendCodeMutation.isPending ||
      verifyCodeMutation.isPending ||
      resetPasswordMutation.isPending,
    [
      sendCodeMutation.isPending,
      verifyCodeMutation.isPending,
      resetPasswordMutation.isPending,
    ],
  );

  return {
    currentStep,
    formData,
    errors,
    isLoading,

    canSubmitPhone,
    canSubmitVerification,
    canSubmitNewPassword,

    updateField,
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
    goBack,
  };
};
