import { cn } from '@/shared/lib/utils';
import { ArrowLeft } from 'lucide-react';

export default function BackHeader() {
  return (
    <header className={cn('mb-[51px] mt-[69px] flex gap-6')}>
      <ArrowLeft />
      <span className={cn('text-body1')}>뒤로가기</span>
    </header>
  );
}
