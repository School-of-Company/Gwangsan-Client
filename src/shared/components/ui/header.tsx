'use client';

import Image from 'next/image';
import TextLogo from '@/shared/asset/png/textLogo.png';
import { cn } from '@/shared/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from './button';
import { signout } from '@/shared/api/signout';
import { deleteAccount } from '@/shared/api/deleteAccount';

export default function Header() {
  const R = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    R.push('/');
  }, [R]);

  const handleGraphClick = useCallback(() => {
    R.push('/graph');
  }, [R]);

  const handleGwangsanClick = useCallback(() => {
    R.push('/gwangsan');
  }, [R]);

  if (pathname === '/signin' || pathname.includes('/detail') || pathname.includes('/profile')) return;
  return (
    <header className="mt-[78px] flex items-center justify-between">
      <Image
        className={cn('h-7 w-[189px] pl-[19px]')}
        src={TextLogo}
        alt="로고"
        onClick={handleClick}
      />
      <div className="flex items-center gap-2">
        <Button onClick={signout} variant="outline">
          로그아웃
        </Button>
        <Button onClick={deleteAccount} variant="outline">
          회원탈퇴
        </Button>
        <Button onClick={handleGraphClick} variant="outline">
          통계
        </Button>
        <Button onClick={handleGwangsanClick} variant="outline">
          광산관리
        </Button>
      </div>
    </header>
  );
}
