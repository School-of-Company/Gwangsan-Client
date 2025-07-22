'use client';

import { cn } from '@/shared/lib/utils';
import { useGetNotifications } from '../../model/useGetNotifications';
import { NotificationCard } from '@/entities/main';

export default function Notification() {
  const { data } = useGetNotifications();
  return (
    <div>
      <h2 className={cn('text-titleMedium2')}>알림</h2>
      <div>
        {data?.reports.flatMap((v) => (
          <NotificationCard key={v.id} data={v} type="REPORT" />
        ))}
        {data?.signUps.map((v) => {
          return <NotificationCard key={v.memberId} data={v} type="SIGN_UP" />;
        })}
        {data?.trades.map((v) => {
          return <NotificationCard data={v} key={v.product.id} type="TRADE" />;
        })}
      </div>
    </div>
  );
}
