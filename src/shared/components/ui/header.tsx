'use client';

import Image from 'next/image';
import TextLogo from '@/shared/asset/png/textLogo.png';
import { cn } from '@/shared/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Button } from './button';
import { signout } from '@/shared/api/signout';
import { deleteAccount } from '@/shared/api/deleteAccount';

export default function Header() {
  const R = useRouter();
  const pathname = usePathname();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleClick = useCallback(() => {
    R.push('/');
  }, [R]);

  const handleGraphClick = useCallback(() => {
    R.push('/graph');
  }, [R]);

  const handleGwangsanClick = useCallback(() => {
    R.push('/gwangsan');
  }, [R]);

  const handleWithdrawal = useCallback(async () => {
    await deleteAccount();
    setIsConfirmOpen(false);
  }, []);

  if (pathname === '/signin' || pathname.includes('/detail') || pathname.includes('/profile')) return;
  return (
    <>
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
          <Button onClick={() => setIsConfirmOpen(true)} variant="outline">
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
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-80 flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
            <p className="text-base font-semibold">회원탈퇴</p>
            <p className="text-sm text-gray-500">
              정말로 탈퇴하시겠습니까?
              <br />
              탈퇴 시 모든 데이터가 삭제됩니다.
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsConfirmOpen(false)} variant="outline">
                취소
              </Button>
              <Button onClick={handleWithdrawal}>탈퇴</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
