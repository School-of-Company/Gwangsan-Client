'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import {
  SignInRequest,
  signIn,
  saveTokens,
  validateSignInForm,
  handleSignInError,
  ValidationErrors,
  getFieldSchema,
} from '@/entities/user';
import { debounce } from '@/shared/lib/debounce';
import { storage } from '@/shared/lib/storage';

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<SignInRequest>({
    nickname: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({
    nickname: '',
    password: '',
  });

  const debouncedValidateField = useMemo(
    () =>
      debounce((name: keyof SignInRequest, value: string) => {
        const fieldSchema = getFieldSchema(name);
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

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (response) => {
      saveTokens(response.token);
      storage.setItem('role', response.role);

      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user'] }),
        queryClient.invalidateQueries({ queryKey: ['auth'] }),
      ]);

      toast.success('로그인에 성공했습니다.');

      setErrors({ nickname: '', password: '' });

      router.push('/');
      router.refresh();
    },
    onError: (error) => {
      const errorResult = handleSignInError(error);
      toast.error(errorResult.message);
      setErrors(errorResult.fieldErrors);
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
    mutationKey: ['signIn'],
  });

  const updateField = useCallback(
    (name: keyof SignInRequest, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (value.trim() && errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }

      debouncedValidateField(name, value);
    },
    [errors, debouncedValidateField],
  );

  const handleSubmit = useCallback(async () => {
    if (signInMutation.isPending) return;

    const validation = validateSignInForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);

      const firstErrorField = Object.keys(validation.errors).find(
        (key) => validation.errors[key as keyof ValidationErrors],
      );
      if (firstErrorField) {
        toast.error(
          `${firstErrorField === 'nickname' ? '아이디' : '비밀번호'}를 확인해주세요.`,
        );
      }
      return;
    }

    signInMutation.mutate(formData);
  }, [formData, signInMutation]);

  const reset = useCallback(() => {
    signInMutation.reset();
    setErrors({ nickname: '', password: '' });
    setFormData({ nickname: '', password: '' });
  }, [signInMutation]);

  const formState = useMemo(
    () => ({
      hasErrors: Object.values(errors).some((error) => error.length > 0),
      isFormValid:
        formData.nickname.trim().length > 0 && formData.password.length > 0,
      canSubmit:
        formData.nickname.trim().length > 0 &&
        formData.password.length > 0 &&
        !signInMutation.isPending &&
        !Object.values(errors).some((error) => error.length > 0),
    }),
    [formData, errors, signInMutation.isPending],
  );

  return {
    formData,
    errors,
    isLoading: signInMutation.isPending,
    isError: signInMutation.isError,
    isSuccess: signInMutation.isSuccess,

    ...formState,

    updateField,
    handleSubmit,
    reset,
  };
};
