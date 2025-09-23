'use client';

import { cn } from '@/shared/lib/utils';
import { useGetNotifications } from '../../model/useGetNotifications';
import { NotificationCard } from '@/entities/main';
import { toast } from 'sonner';
import { useMemo } from 'react';

export default function Notification() {
  const { data, isError, error, refetch } = useGetNotifications();

  if (isError) toast.error(error.message ?? '알림을 가져오는데 실패했습니다');

  const entire = useMemo(() => {
    if (!data) return [];
    return [...(data.reports ?? []), ...(data.signUps ?? [])];
  }, [data]);

  return (
    <div className={cn('mx-6 w-full')}>
      <h2 className={cn('mb-[28px] ml-6 mt-[96px] text-titleMedium2')}>알림</h2>
      <div className={cn('max-h-[600px] overflow-y-auto rounded-md')}>
        {entire.length === 0 ? (
          <div className="py-8 text-center text-gray-400">알림이 없습니다.</div>
        ) : (
          <>
            {data?.reports.map((v) => (
              <NotificationCard
                refetch={refetch}
                key={v.id}
                data={v}
                type="REPORT"
              />
            ))}
            {data?.signUps.map((v) => (
              <NotificationCard
                refetch={refetch}
                key={v.memberId}
                data={v}
                type="SIGN_UP"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
