'use client';

import { Member } from '../../model/useGetMember';
import { MEMBER_STATUS_KOR } from '@/shared/types/memberType';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { handleRoleName } from '@/views/detail/lib/handleRoleName';

export default function Information({
  data,
  onEditRole,
  onEditStatus,
}: {
  data: Member | undefined;
  onEditRole?: () => void;
  onEditStatus?: () => void;
}) {
  return (
    <section className='flex flex-col gap-[60px]'>
      <div className='flex gap-6'>
        <label>이름 :</label>
        <p className='font-semibold'>{data?.name}</p>
      </div>
      <div className='flex gap-6'>
        <label>별칭 :</label>
        <p className='font-semibold'>{data?.nickname}</p>
      </div>
      <div className='flex gap-6'>
        <label>전화번호 :</label>
        <p className='font-semibold'>{data?.phoneNumber}</p>
      </div>
      <div className='flex gap-6'>
        <div className="flex items-center gap-2">
          <label>역할 :</label>
          <p className='font-semibold'>{handleRoleName(data?.role)}</p>
        </div>
      </div>
      <div className='flex gap-6'>
        <div className="flex items-center gap-2">
          <label>상태 :</label>
          <p
            className={cn(
              data?.status === 'ACTIVE' ? 'text-sub-500' : 'text-error-500',
              'font-semibold'
            )}
          >
            {data?.status ? MEMBER_STATUS_KOR[data.status] : null}
          </p>
        </div>
      </div>
        <div className='flex gap-4'>
          {onEditStatus && (
            <Button variant="outline" onClick={onEditStatus}>
              상태 수정
            </Button>
          )}
          {onEditRole && (
            <Button variant="outline" onClick={onEditRole}>
              역할 수정
            </Button>
          )}
        </div>
    </section>
  );
}
