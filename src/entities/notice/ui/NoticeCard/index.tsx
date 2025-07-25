'use client';

import { Button } from '@/shared/components/ui/button';
import { Notices } from '@/shared/types/noticeType';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { deletePost } from '../../api/deletePost';
import { cn } from '@/shared/lib/utils';

export default function NoticeCard({ title, id, content, isMe }: Notices) {
  const R = useRouter();
  const handleClick = useCallback(() => {
    R.push('/detail/' + id);
  }, [R, id]);

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      deletePost(String(id));
    },
    [id],
  );
  return (
    <article
      className={cn('flex justify-between rounded-xl border p-6')}
      onClick={handleClick}
    >
      <div>
        <h3 className={cn('text-titleSmall')}>{title}</h3>
        <p className={cn('text-gray-300')}>{content}</p>
      </div>
      {isMe && (
        <Button onClick={handleDelete} variant="outline">
          <Trash2 color="#DF454A" />
        </Button>
      )}
    </article>
  );
}
