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
import { useCallback, useState } from 'react';
import Modal from '@/entities/main/ui/Modal';
import { toast } from 'sonner';
import { MoreHorizontal } from 'lucide-react';
import {
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/shared/components/ui/select';
import { PLACES } from '@/shared/const/place';

export default function Member() {
  const { data, isError, error } = useGetMembers();
  const [roleModalShow, setRoleModalShow] = useState(false);
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [selected, setSelected] = useState({
    name: '',
    id: '',
    status: '',
    role: '',
  });
  const [selectedMoreId, setSelectedMoreId] = useState<string | null>(null);

  if (isError)
    toast.error(error.message ?? '회원 목록을 가져오는데 실패했습니다');

  const toggleMore = useCallback((id: string) => {
    setSelectedMoreId((prev) => (prev === id ? null : id));
  }, []);

  const handleChange = useCallback(() => {
    setRoleModalShow(true);
    setSelectedMoreId(null);
  }, []);
  return (
    <div className="w-full">
      <h2 className={cn('mb-[28px] mt-[96px] text-titleMedium2')}>회원목록</h2>
      <div>
        <label className={cn('mb-1 block text-sm font-medium')}>
          대상 지점
        </label>
        <Select name="placeName">
          <SelectTrigger>
            <SelectValue placeholder="대상 지점을 선택해주세요" />
          </SelectTrigger>
          <SelectContent className={cn('w-full bg-white')}>
            <SelectGroup id="placeName">
              {PLACES.map((v) => (
                <SelectItem className={cn('w-full bg-white')} value={v} key={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
                    <div className="relative inline-block">
                      <MoreHorizontal
                        onClick={() => {
                          setSelected({
                            name: member.name,
                            id: member.memberId,
                            status: member.status,
                            role: member.role,
                          });
                          toggleMore(member.memberId);
                        }}
                        className="text-muted-foreground h-4 w-4 cursor-pointer"
                      />
                      {selectedMoreId === member.memberId && (
                        <ul className="absolute right-0 z-10 mt-2 w-32 rounded-md border bg-white shadow-md">
                          <li>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={handleChange}
                            >
                              상태 변경
                            </Button>
                          </li>
                          <li>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={handleChange}
                            >
                              역할 변경
                            </Button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Modal
          setShow={setRoleModalShow}
          type="role"
          open={roleModalShow}
          selected={selected}
        />
        <Modal
          type="status"
          setShow={setStatusModalShow}
          selected={selected}
          open={statusModalShow}
        />
      </div>
      <GoNotice />
    </div>
  );
}
