'use client';

import { cn } from '@/shared/lib/utils';
import { useGetNotices } from '../../model/useGetNotices';
import { NoticeCard } from '@/entities/notice';

export default function PostedNotice() {
  const { data } = useGetNotices();
  return (
    <div className={cn('w-full px-11')}>
      <h2 className={cn('text-titleMedium2')}>게시된 공지사항</h2>
      <div
        className={cn(
          'mt-[28px] flex h-[100vh] flex-col gap-3 overflow-y-visible',
        )}
      >
        {data?.map((v) => {
          return (
            <NoticeCard
              title={v.title}
              content={v.content}
              key={v.id}
              id={v.id}
            />
          );
        })}
      </div>
    </div>
  );
}
