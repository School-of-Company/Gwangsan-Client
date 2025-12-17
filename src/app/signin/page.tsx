import { SignInForm } from '@/widgets/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 | 시민화폐 광산 어드민',
  description: '광산구 시민화폐 관리자 로그인',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://gwangsan.io.kr/signin',
  },
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignInForm />
    </div>
  );
}
