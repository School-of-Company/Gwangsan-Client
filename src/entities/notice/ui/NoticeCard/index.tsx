'use client';

import { Button } from '@/shared/components/ui/button';
import { Notices } from '@/shared/types/noticeType';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { deletePost } from '../../api/deletePost';
import { cn } from '@/shared/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';

export default function NoticeCard({ title, id, content, isMe }: Notices) {
  const R = useRouter();
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    R.push('/detail/' + id);
  }, [R, id]);

  const handleDelete = useCallback(() => {
    deletePost(String(id));
    setOpen(false);
  }, [id]);

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
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <Trash2 color="#DF454A" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                이 공지는 삭제 후 되돌릴 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </article>
  );
}
