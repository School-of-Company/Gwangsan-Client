'use client';

import Image from 'next/image';
import TextLogo from '@/shared/asset/png/textLogo.png';
import { cn } from '@/shared/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Header() {
  const R = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    R.push('/');
  }, [R]);

  if (pathname === '/signin') return;
  return (
    <header>
      <Image
        className={cn('mt-[78px] h-7 w-[189px] pl-[19px]')}
        src={TextLogo}
        alt="로고"
        onClick={handleClick}
      />
    </header>
  );
}
