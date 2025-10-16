import { z } from 'zod';

export interface ValidationErrors {
  nickname: string;
  password: string;
}

export const userSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, '별칭을 입력해주세요')
    .regex(/^[가-힣]+$/, '별칭은 한글만 사용 가능합니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export type SignInFormData = z.infer<typeof userSchema>;

export const getFieldSchema = (fieldName: keyof SignInFormData) => {
  const schemas = {
    nickname: userSchema.shape.nickname,
    password: userSchema.shape.password,
  } as const;

  return schemas[fieldName];
};

export const validateSignInForm = (
  data: SignInFormData,
): { isValid: boolean; errors: ValidationErrors } => {
  const result = userSchema.safeParse(data);

  if (result.success) {
    return {
      isValid: true,
      errors: { nickname: '', password: '' },
    };
  }

  const errors: ValidationErrors = { nickname: '', password: '' };

  result.error.errors.forEach((error) => {
    const field = error.path[0] as keyof ValidationErrors;
    if (field === 'nickname' || field === 'password') {
      errors[field] = error.message;
    }
  });

  return {
    isValid: false,
    errors,
  };
};

export interface PasswordResetValidationErrors {
  phoneNumber: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

const phoneNumberSchema = z
  .string()
  .trim()
  .min(1, '전화번호를 입력해주세요')
  .regex(/^010\d{8}$/, '올바른 전화번호 형식을 입력해주세요');

const verificationCodeSchema = z
  .string()
  .trim()
  .min(1, '인증번호를 입력해주세요')
  .length(6, '인증번호는 6자리입니다');

const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/,
    '비밀번호는 영문, 숫자를 포함해야 합니다',
  );

export const passwordResetPhoneSchema = z.object({
  phoneNumber: phoneNumberSchema,
});

export const passwordResetVerificationSchema = z.object({
  phoneNumber: phoneNumberSchema,
  code: verificationCodeSchema,
});

export const passwordResetNewPasswordSchema = z
  .object({
    phoneNumber: phoneNumberSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, '비밀번호를 재입력해주세요'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type PasswordResetPhoneData = z.infer<typeof passwordResetPhoneSchema>;
export type PasswordResetVerificationData = z.infer<
  typeof passwordResetVerificationSchema
>;
export type PasswordResetNewPasswordData = z.infer<
  typeof passwordResetNewPasswordSchema
>;

export const getPasswordResetFieldSchema = <
  T extends keyof PasswordResetValidationErrors,
>(
  fieldName: T,
): z.ZodSchema => {
  const schemas: Record<keyof PasswordResetValidationErrors, z.ZodSchema> = {
    phoneNumber: phoneNumberSchema,
    code: verificationCodeSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, '비밀번호를 재입력해주세요'),
  };

  return schemas[fieldName];
};

export const validatePasswordResetPhone = (
  data: PasswordResetPhoneData,
): {
  isValid: boolean;
  errors: Pick<PasswordResetValidationErrors, 'phoneNumber'>;
} => {
  const result = passwordResetPhoneSchema.safeParse(data);

  if (result.success) {
    return {
      isValid: true,
      errors: { phoneNumber: '' },
    };
  }

  const errors: Pick<PasswordResetValidationErrors, 'phoneNumber'> = {
    phoneNumber: '',
  };

  result.error.errors.forEach((error) => {
    const field = error.path[0] as 'phoneNumber';
    if (field === 'phoneNumber') {
      errors[field] = error.message;
    }
  });

  return {
    isValid: false,
    errors,
  };
};

export const validatePasswordResetVerification = (
  data: PasswordResetVerificationData,
): {
  isValid: boolean;
  errors: Pick<PasswordResetValidationErrors, 'phoneNumber' | 'code'>;
} => {
  const result = passwordResetVerificationSchema.safeParse(data);

  if (result.success) {
    return {
      isValid: true,
      errors: { phoneNumber: '', code: '' },
    };
  }

  const errors: Pick<PasswordResetValidationErrors, 'phoneNumber' | 'code'> = {
    phoneNumber: '',
    code: '',
  };

  result.error.errors.forEach((error) => {
    const field = error.path[0] as 'phoneNumber' | 'code';
    if (field === 'phoneNumber' || field === 'code') {
      errors[field] = error.message;
    }
  });

  return {
    isValid: false,
    errors,
  };
};

export const validatePasswordResetNewPassword = (
  data: PasswordResetNewPasswordData,
): {
  isValid: boolean;
  errors: Pick<
    PasswordResetValidationErrors,
    'phoneNumber' | 'newPassword' | 'confirmPassword'
  >;
} => {
  const result = passwordResetNewPasswordSchema.safeParse(data);

  if (result.success) {
    return {
      isValid: true,
      errors: { phoneNumber: '', newPassword: '', confirmPassword: '' },
    };
  }

  const errors: Pick<
    PasswordResetValidationErrors,
    'phoneNumber' | 'newPassword' | 'confirmPassword'
  > = {
    phoneNumber: '',
    newPassword: '',
    confirmPassword: '',
  };

  result.error.errors.forEach((error) => {
    const field = error.path[0] as
      | 'phoneNumber'
      | 'newPassword'
      | 'confirmPassword';
    if (
      field === 'phoneNumber' ||
      field === 'newPassword' ||
      field === 'confirmPassword'
    ) {
      errors[field] = error.message;
    }
  });

  return {
    isValid: false,
    errors,
  };
};
