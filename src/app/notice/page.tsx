import { Suspense } from 'react';
import { NoticeView } from '@/views/notice';

export default function NoticePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NoticeView />
    </Suspense>
  );
}
