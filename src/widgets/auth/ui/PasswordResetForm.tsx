'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { usePasswordReset } from '@/features/auth/model/usePasswordReset';

export const PasswordResetForm = () => {
  const {
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
  } = usePasswordReset();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(
      name as 'phoneNumber' | 'code' | 'newPassword' | 'confirmPassword',
      value,
    );
  };

  const renderPhoneStep = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendCode();
      }}
      className="space-y-4"
      noValidate
    >
      <div>
        <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium">
          전화번호
        </label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={errors.phoneNumber ?? 'border-red-500'}
          disabled={isLoading}
        />
        <div className="mt-1 h-4">
          {errors.phoneNumber && (
            <p className="text-xs text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="outline"
        className="mt-6 w-full"
        disabled={!canSubmitPhone}
      >
        {isLoading ? '발송 중...' : '인증번호 발송'}
      </Button>
    </form>
  );

  const renderVerificationStep = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleVerifyCode();
      }}
      className="space-y-4"
      noValidate
    >
      <div>
        <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium">
          전화번호
        </label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          disabled
          className="bg-gray-100"
        />
        <div className="mt-1 h-4" />
      </div>

      <div>
        <label htmlFor="code" className="mb-1 block text-sm font-medium">
          인증번호
        </label>
        <Input
          id="code"
          name="code"
          type="text"
          value={formData.code}
          onChange={handleChange}
          placeholder="인증번호 6자리"
          maxLength={6}
          className={errors.code ?? 'border-red-500'}
          disabled={isLoading}
        />
        <div className="mt-1 h-4">
          {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          variant="outline"
          className="flex-1"
          disabled={!canSubmitVerification}
        >
          {isLoading ? '확인 중...' : '인증 확인'}
        </Button>
      </div>
    </form>
  );

  const renderNewPasswordStep = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleResetPassword();
      }}
      className="space-y-4"
      noValidate
    >
      <div>
        <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium">
          전화번호
        </label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          disabled
          className="bg-gray-100"
        />
        <div className="mt-1 h-4" />
      </div>

      <div>
        <label htmlFor="newPassword" className="mb-1 block text-sm font-medium">
          새 비밀번호
        </label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="영문, 숫자 포함 8자 이상"
          className={errors.newPassword ?? 'border-red-500'}
          disabled={isLoading}
        />
        <div className="mt-1 h-4">
          {errors.newPassword && (
            <p className="text-xs text-red-500">{errors.newPassword}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1 block text-sm font-medium"
        >
          비밀번호 확인
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력하세요"
          className={errors.confirmPassword ?? 'border-red-500'}
          disabled={isLoading}
        />
        <div className="mt-1 h-4">
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          variant="outline"
          className="flex-1"
          disabled={!canSubmitNewPassword}
        >
          {isLoading ? '재설정 중...' : '비밀번호 재설정'}
        </Button>
      </div>
    </form>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 'phone':
        return '비밀번호 재설정';
      case 'verification':
        return '인증번호 확인';
      case 'newPassword':
        return '새 비밀번호 설정';
      default:
        return '비밀번호 재설정';
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'phone':
        return renderPhoneStep();
      case 'verification':
        return renderVerificationStep();
      case 'newPassword':
        return renderNewPasswordStep();
      default:
        return renderPhoneStep();
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md py-8">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold">{getStepTitle()}</h1>
        <p className="mt-2 text-sm text-gray-600">
          {currentStep === 'phone' && '가입 시 등록한 전화번호를 입력해주세요'}
          {currentStep === 'verification' &&
            '전화번호로 발송된 인증번호를 입력해주세요'}
          {currentStep === 'newPassword' && '새로운 비밀번호를 설정해주세요'}
        </p>
      </CardHeader>
      <CardContent>{renderCurrentStep()}</CardContent>
    </Card>
  );
};
