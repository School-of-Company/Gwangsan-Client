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
import { useCallback, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRef } from 'react';
import Modal from '@/entities/main/ui/Modal';
import { toast } from 'sonner';
import { MoreHorizontal, SearchIcon } from 'lucide-react';
import {
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/shared/components/ui/select';
import { PLACES } from '@/shared/const/place';
import { Input } from '@/shared/components/ui/input';
import { storage } from '@/shared/lib/storage';

export default function Member() {
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState({ nickname: '', placeName: '' });
  const { data, isError, error } = useGetMembers(
    filter.nickname,
    filter.placeName,
  );
  const [modalState, setModalState] = useState({
    role: false,
    status: false,
  });
  const [selected, setSelected] = useState({
    name: '',
    id: '',
    status: '',
    role: '',
  });
  const [selectedMoreId, setSelectedMoreId] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = storage.getItem('role');
    setRole(storedRole);
  }, []);

  useEffect(() => {
    if (!selectedMoreId) return;
    const handle = () => setSelectedMoreId(null);
    window.addEventListener('scroll', handle, true);
    window.addEventListener('resize', handle);
    const clickListener = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(target)
      ) {
        setSelectedMoreId(null);
      }
    };
    document.addEventListener('click', clickListener, { once: true });
    return () => {
      window.removeEventListener('scroll', handle, true);
      window.removeEventListener('resize', handle);
    };
  }, [selectedMoreId]);

  if (isError)
    toast.error(error.message ?? '회원 목록을 가져오는데 실패했습니다');

  const openMenuAt = useCallback((id: string, el: HTMLElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.bottom + 8;
    const left = rect.right - 128;
    setSelectedMoreId(id);
    setMenuPos({ x: Math.max(8, left), y: Math.max(8, top) });
  }, []);

  const openRoleModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, role: true }));
    setSelectedMoreId(null);
  }, []);

  const openStatusModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, status: true }));
    setSelectedMoreId(null);
  }, []);

  const initValue = useCallback(() => {
    setFilter({ nickname: '', placeName: '' });
  }, []);
  return (
    <div className="mb-[24px] mt-[96px] min-h-28 w-full">
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
            name="placeName"
            value={filter.placeName}
            onValueChange={(value) =>
              setFilter((prev) => ({ ...prev, placeName: value }))
            }
          >
            <SelectTrigger className="focus:outline-none focus:ring-0 focus-visible:ring-0">
              <SelectValue placeholder="대상 지점을 선택해주세요" />
            </SelectTrigger>
            <SelectContent className={cn('w-full bg-white outline-none')}>
              <SelectGroup id="placeName">
                {PLACES.map((v) => (
                  <SelectItem
                    className={cn('w-full bg-white')}
                    value={v}
                    key={v}
                  >
                    {v}
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
                    <div className="inline-block">
                      <span
                        onClick={(e) => {
                          setSelected({
                            name: member.name,
                            id: member.memberId,
                            status: member.status,
                            role: member.role,
                          });
                          openMenuAt(
                            member.memberId,
                            e.currentTarget as HTMLElement,
                          );
                        }}
                        className="inline-flex"
                      >
                        <MoreHorizontal className="text-muted-foreground h-4 w-4 cursor-pointer" />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {selectedMoreId &&
          menuPos &&
          createPortal(
            <div
              ref={menuContainerRef}
              style={{
                position: 'fixed',
                top: menuPos.y,
                left: menuPos.x,
                zIndex: 9999,
                width: 128,
              }}
              className="rounded-md border bg-white shadow-md"
            >
              <ul className="w-32">
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      openStatusModal();
                      setSelectedMoreId(null);
                    }}
                  >
                    상태 변경
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      openRoleModal();
                      setSelectedMoreId(null);
                    }}
                  >
                    역할 변경
                  </Button>
                </li>
              </ul>
            </div>,
            document.body,
          )}
        <Modal
          setShow={(value) =>
            setModalState((prev) => ({ ...prev, role: value }))
          }
          type="role"
          open={modalState.role}
          selected={selected}
        />
        <Modal
          type="status"
          setShow={(value) =>
            setModalState((prev) => ({ ...prev, status: value }))
          }
          selected={selected}
          open={modalState.status}
        />
      </div>
      <GoNotice />
    </div>
  );
}
