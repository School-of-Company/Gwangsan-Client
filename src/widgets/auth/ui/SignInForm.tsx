'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { useSignIn } from '@/features/auth';

export const SignInForm = () => {
  const { formData, errors, isLoading, canSubmit, updateField, handleSubmit } =
    useSignIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name as 'nickname' | 'password', value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Card className="mx-auto w-full max-w-md py-8">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">로그인</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="nickname"
              className="mb-1 block text-sm font-medium"
            >
              아이디
            </label>
            <Input
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              className={errors.nickname ? 'border-red-500' : ''}
            />
            <div className="mt-1 h-4">
              {errors.nickname && (
                <p className="text-xs text-red-500">{errors.nickname}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              비밀번호
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              className={errors.password ? 'border-red-500' : ''}
            />
            <div className="mt-1 h-4">
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="outline"
            className="mt-6 w-full"
            disabled={!canSubmit}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
