import { cn } from '@/shared/lib/utils';
import { Notification, Member } from '@/widgets/main';

export default function MainView() {
  return (
    <div className={cn('flex w-full')}>
      <Notification />
      <Member />
    </div>
  );
}
