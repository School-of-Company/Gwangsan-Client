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
