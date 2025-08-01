import { cn } from '@/shared/lib/utils';
import PostedNotice from '@/widgets/notice/ui/PostedNotice';
import WriteNotice from '@/widgets/notice/ui/WriteNotice';

export default function NoticeView() {
  return (
    <div
      className={cn(
        'mt-[89px] flex min-h-screen w-full flex-col overflow-y-auto md:flex-row',
      )}
    >
      <PostedNotice />
      <div className={cn('h-full w-[1px] bg-[#828387]')} />
      <WriteNotice />
    </div>
  );
}
