'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetDetailNotice } from '../../model/useGetDetailNotice';
import { cn } from '@/shared/lib/utils';
import { MemberRole } from '@/shared/const/role';
import { Edit, Trash2 } from 'lucide-react';
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
import BackHeader from '@/shared/ui/BackHeader';
import { handleRoleName } from '@/shared/lib/handleRoleName';

export default function DetailView() {
  const { id } = useParams();
  const { data, isError, error } = useGetDetailNotice(String(id));
  const R = useRouter();
  const [open, setOpen] = useState(false);

  if (isError) toast.error(error.message ?? '게시물을 가져오는데 실패했습니다');

  const handleModalOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleEdit = useCallback(() => {
    R.push('/notice?id=' + id);
  }, [R, id]);

  const handleDelete = useCallback(() => {
    deletePost(String(id));
    setOpen(false);
    R.push('/notice');
  }, [id, R]);
  return (
    <div className={cn('flex flex-col items-center')}>
      <div className={cn('flex w-full max-w-[1000px] flex-col gap-6')}>
        <div>
          <BackHeader />
          <h1 className={cn('mb-4 text-titleLarge')}>{data?.title}</h1>
          <div className="flex justify-between">
            <div className={cn('flex gap-[42px] text-body2 text-gray-600')}>
              <small>{handleRoleName(data?.role as MemberRole)}</small>
              <small>{data?.place}</small>
              <small>{handleDate(data?.createdAt)}</small>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleEdit}>
                <Edit />
              </Button>
              <Button variant="outline" onClick={handleModalOpen}>
                <Trash2 color="#DF454A" />
              </Button>
            </div>
          </div>
          {(data?.isMe || true) && (
            <div className={cn('mt-4 flex gap-2')}>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild></AlertDialogTrigger>
                <AlertDialogContent
                  className="bg-white"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      정말 삭제하시겠습니까?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      이 공지는 삭제 후 되돌릴 수
                      없습니다.
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
            </div>
          )}
        </div>
        {data?.images && <ImageSlider images={data?.images} />}
        <p className={cn('text-body2')}>{data?.content}</p>
      </div>
    </div>
  );
}
