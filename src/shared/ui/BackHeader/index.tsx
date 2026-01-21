'use client';

import { cn } from '@/shared/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function BackHeader() {
  const R = useRouter();

  const handleClick = useCallback(() => {
    R.back();
  }, [R]);

  return (
    <header
      onClick={handleClick}
      className={cn('mb-[51px] mt-[69px] w-full flex gap-6')}
    >
      <ArrowLeft />
      <span className={cn('text-body1')}>뒤로가기</span>
    </header>
  );
}
