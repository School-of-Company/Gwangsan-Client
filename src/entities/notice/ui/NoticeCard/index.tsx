'use client';

import { Notices } from '@/shared/types/noticeType';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { cn } from '@/shared/lib/utils';

type NoticesWithRefetch = Notices & {
  refetch: () => void;
};
export default function NoticeCard({ title, id, content }: NoticesWithRefetch) {
  const R = useRouter();

  const handleClick = useCallback(() => {
    R.push('/detail/' + id);
  }, [R, id]);

  return (
    <article
      className={cn('flex justify-between rounded-xl border p-6')}
      onClick={handleClick}
    >
      <div>
        <h3 className={cn('text-titleSmall')}>{title}</h3>
        <p className={cn('text-gray-300')}>{content}</p>
      </div>
    </article>
  );
}
