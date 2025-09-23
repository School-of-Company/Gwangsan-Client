'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetDetailNotice } from '../../model/useGetDetailNotice';
import { cn } from '@/shared/lib/utils';
import { handleRoleName } from '../../lib/handleRoleName';
import { MemberRole } from '@/shared/const/role';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ImageSlider } from '@/entities/detail';
import { handleDate } from '@/shared/lib/handleDate';
import { toast } from 'sonner';
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
import { Button } from '@/shared/components/ui/button';
import { deletePost } from '@/entities/notice/api/deletePost';

export default function DetailView() {
  const { id } = useParams();
  const { data, isError, error } = useGetDetailNotice(String(id));
  const R = useRouter();
  const [open, setOpen] = useState(false);

  if (isError) toast.error(error.message ?? '게시물을 가져오는데 실패했습니다');

  const handleClick = useCallback(() => {
    R.back();
  }, [R]);

  const handleDelete = useCallback(() => {
    deletePost(String(id));
    setOpen(false);
    R.push('/notice');
  }, [id, R]);
  return (
    <div className={cn('flex flex-col items-center')}>
      <div className={cn('flex w-full max-w-[1000px] flex-col gap-6')}>
        <div>
          <div
            onClick={handleClick}
            className={cn('mb-[51px] mt-[69px] flex gap-6')}
          >
            <ArrowLeft />
            <span className={cn('text-body1')}>뒤로가기</span>
          </div>
          <h1 className={cn('mb-4 text-titleLarge')}>{data?.title}</h1>
          <div className={cn('flex gap-[42px] text-body2 text-gray-600')}>
            <small>{handleRoleName(data?.role as MemberRole)}</small>
            <small>{handleDate(data?.createdAt)}</small>
          </div>
          {data?.isMe && (
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
                className="bg-white"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    정말 삭제하시겠습니까?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    이 공지는 삭제 후 되돌릴 수 없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        {data?.images && <ImageSlider images={data?.images} />}
        <p className={cn('text-body2')}>{data?.content}</p>
      </div>
    </div>
  );
}
