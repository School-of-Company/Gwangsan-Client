'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetDetailNotice } from '../../model/useGetDetailNotice';
import { cn } from '@/shared/lib/utils';
import { handleRoleName } from '../../lib/handleRoleName';
import { MemberRole } from '@/shared/const/role';
import { ArrowLeft } from 'lucide-react';
import { useCallback } from 'react';
import { ImageSlider } from '@/entities/detail';

export default function DetailView() {
  const { id } = useParams();
  const { data } = useGetDetailNotice(String(id));
  const R = useRouter();

  const handleClick = useCallback(() => {
    R.back();
  }, [R]);
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
            <small>{data?.createdAt.split('T')[0].replaceAll('-', '.')}</small>
          </div>
        </div>
        {data?.images && <ImageSlider images={data?.images} />}
        <p className={cn('text-body2')}>{data?.content}</p>
      </div>
    </div>
  );
}
