'use client';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function GoNotice() {
  const R = useRouter();
  const handleClick = useCallback(() => {
    R.push('/notice');
  }, [R]);
  return (
    <div className={cn('w-full')}>
      <h2 className={cn('mt-[52px] text-titleMedium2')}>공지</h2>
      <Button onClick={handleClick} variant="outline">
        공지작성하러 가기
      </Button>
    </div>
  );
}
