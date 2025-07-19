'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { toast } from 'sonner';
import { SignInRequest, signIn, saveTokens } from '@/entities/user';

export const SignInForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignInRequest>({
    nickname: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    nickname: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = { nickname: '', password: '' };
    let isValid = true;

    if (!formData.nickname.trim()) {
      newErrors.nickname = '아이디를 입력해주세요';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const response = await signIn(formData);
      
      saveTokens(response.token);
      
      toast.success('로그인에 성공했습니다.');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error('로그인에 실패했습니다.');
      console.error('로그인 에러:', error);
      setErrors({
        nickname: '아이디 또는 비밀번호가 올바르지 않습니다',
        password: '아이디 또는 비밀번호가 올바르지 않습니다',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border rounded-md">
      <CardHeader className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">로그인</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="nickname" className="block text-sm">
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
            />
            {errors.nickname && (
              <p className="text-xs text-red-500">{errors.nickname}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm">
              비밀번호
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            로그인
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 