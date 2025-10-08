import { cn } from '@/shared/lib/utils';
import { Notification, Member } from '@/widgets/main';

export default function MainView() {
  return (
    <div
      className={cn(
        'flex h-screen w-full flex-col overflow-y-scroll md:flex-row',
      )}
    >
      <Notification />
      <Member />
    </div>
  );
}
