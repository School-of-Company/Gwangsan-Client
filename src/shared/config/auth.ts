type AuthConfig = {
  signInPage: string;
  protectedPages: readonly string[];
  publicPages: readonly string[];
};

export const authConfig: AuthConfig = {
  signInPage: '/signin',
  protectedPages: ['/main'],
  publicPages: ['/signin'],
} as const;
