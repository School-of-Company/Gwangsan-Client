'use client';

import { GoNotice } from '@/entities/main';
import { cn } from '@/shared/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Badge } from '@/shared/components/ui/badge';
import { useGetMembers } from '../../model/useGetMembers';
import { MEMBER_STATUS_KOR } from '@/shared/types/memberType';
import { handleDate } from '@/shared/lib/handleDate';
import { handleRoleName } from '@/views/detail/lib/handleRoleName';
import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';
import RoleModal from '@/entities/main/ui/RoleModal';
import { toast } from 'sonner';

export default function Member() {
  const { data, isError, error } = useGetMembers();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({ name: '', id: '' });
  if (isError)
    toast.error(error.message ?? '회원 목록을 가져오는데 실패했습니다');
  return (
    <div className="w-full">
      <h2 className={cn('mb-[28px] mt-[96px] text-titleMedium2')}>회원목록</h2>

      <div className="max-h-[600px] overflow-y-auto rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead>회원</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>가입일</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((member, idx) => (
                <TableRow key={idx}>
                  <TableCell className={cn('whitespace-nowrap')}>
                    <div className={cn('flex flex-col')}>
                      <span>
                        {member.nickname} | <span>{member.name}</span>
                      </span>
                      <span className={cn('text-muted-foreground text-sm')}>
                        {member.phoneNumber}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{handleRoleName(member.role)}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        member.status === 'ACTIVE'
                          ? 'text-sub-500'
                          : 'text-error-500',
                      )}
                    >
                      {MEMBER_STATUS_KOR[member.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{handleDate(member.joinedAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => {
                        setSelected({ name: member.name, id: member.memberId });
                        setShow(true);
                      }}
                      variant="outline"
                    >
                      역할 변경
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <RoleModal
        setShow={setShow}
        id={selected.id}
        name={selected.name}
        open={show}
      />
      <GoNotice />
    </div>
  );
}
