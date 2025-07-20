'use client';

import { useCallback } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { useSignIn } from '@/features/auth';

export const SignInForm = () => {
  const { formData, errors, isLoading, canSubmit, updateField, handleSubmit } =
    useSignIn();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit();
    },
    [handleSubmit],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      updateField(name as 'nickname' | 'password', value);
    },
    [updateField],
  );

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">로그인</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <div className="space-y-2">
            <label htmlFor="nickname" className="block text-sm font-medium">
              아이디
            </label>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              required
              aria-invalid={!!errors.nickname}
              aria-describedby={errors.nickname ? 'nickname-error' : undefined}
              className={
                errors.nickname ? 'border-red-500 focus:border-red-500' : ''
              }
            />
            {errors.nickname && (
              <p
                id="nickname-error"
                className="text-xs text-red-500"
                role="alert"
              >
                {errors.nickname}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              비밀번호
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={
                errors.password ? 'border-red-500 focus:border-red-500' : ''
              }
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-xs text-red-500"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            variant="outline"
            disabled={!canSubmit}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>로그인 중...</span>
              </div>
            ) : (
              '로그인'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
