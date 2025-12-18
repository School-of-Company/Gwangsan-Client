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
import { handleRoleName } from '@/views/detail/lib/handleRoleName';
import { Button } from '@/shared/components/ui/button';
import { useCallback, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { SearchIcon } from 'lucide-react';
import {
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/shared/components/ui/select';
import { placeOptions } from '@/shared/const/place';
import { Input } from '@/shared/components/ui/input';
import { storage } from '@/shared/lib/storage';
import { useRouter } from 'next/navigation';

export default function Member() {
  const [filter, setFilter] = useState<{
    nickname: string;
    placeId?: number;
  }>({ nickname: '', placeId: undefined });
  const { data, isError, error } = useGetMembers(
    filter.nickname,
    filter.placeId,
  );
  const [role, setRole] = useState<string | null>(null);
  const R = useRouter();

  useEffect(() => {
    const storedRole = storage.getItem('role');
    setRole(storedRole);
  }, []);

    const handleRowClick = useCallback((id: string) => {
    R.push(`/profile/${id}`);
  }, [R]);

  if (isError)
    toast.error(error.message ?? '회원 목록을 가져오는데 실패했습니다');

  const initValue = useCallback(() => {
    setFilter({ nickname: '', placeId: undefined });
  }, []);
  return (
    <div className="mb-[24px] mt-[96px] h-full min-h-28 w-full overflow-scroll">
      <header className="mb-6 flex items-center justify-between">
        <h2 className={cn(' text-titleMedium2')}>회원목록</h2>
        <Button onClick={initValue} variant="outline">
          초기화
        </Button>
      </header>
      <label className={cn('mb-1 block text-sm font-medium')}>
        닉네임 검색
      </label>
      <div className="relative">
        <span className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </span>
        <Input
          placeholder="닉네임을 입력하세요"
          className="mb-6 focus:outline-none focus:ring-0 focus-visible:ring-0"
          value={filter.nickname}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, nickname: e.target.value }))
          }
        />
      </div>
      {role !== null && role !== 'ROLE_PLACE_ADMIN' && (
        <div>
          <label className={cn('mb-1 block text-sm font-medium')}>
            대상 지점
          </label>
          <Select
            name="placeId"
            value={filter.placeId ? String(filter.placeId) : undefined}
            onValueChange={(value) =>
              setFilter((prev) => ({ ...prev, placeId: Number(value) }))
            }
          >
            <SelectTrigger className="focus:outline-none focus:ring-0 focus-visible:ring-0">
              <SelectValue placeholder="대상 지점을 선택해주세요" />
            </SelectTrigger>
            <SelectContent className={cn('w-full bg-white outline-none')}>
              <SelectGroup id="placeId">
                {placeOptions.map((v) => (
                  <SelectItem
                    className={cn('w-full bg-white')}
                    value={v.value}
                    key={v.value}
                  >
                    {v.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="mt-6 max-h-[600px] overflow-y-auto rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead>회원</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>상태</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((member, idx) => (
                <TableRow
                  key={member.memberId}
                  onClick={() => handleRowClick(member.memberId)}
                >
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <GoNotice />
    </div>
  );
}
