'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/shared/components/ui/select';
import { MemberRole, memberRoleOptions } from '@/shared/const/role';
import { MEMBER_STATUS, memberStatusOptions } from '@/shared/types/memberType';
import { useChangeStatus } from '@/shared/model/useChangeStatus';
import { useChangeRole } from '@/widgets/main/model/useChangeRole';
import { allPlaceOptions } from '@/shared/const/place';
import { Dispatch, SetStateAction } from 'react';

interface BaseDialogProps {
  open: boolean;
  setShow: (v: boolean) => void;
  setValue: Dispatch<
    SetStateAction<{
      name: string;
      id: string;
      status: string;
      role: string;
      place: string | number;
    }>
  >;
  selected: {
    name: string;
    id: string;
    status: string;
    role: string;
    place: string | number;
  };
}

export function RoleModal({
  open,
  setShow,
  selected,
  setValue,
}: BaseDialogProps) {
  const { mutate: changeRole } = useChangeRole();
  const rawValue = selected.role;
  const selectValue = memberRoleOptions.some((o) => o.value === rawValue)
    ? rawValue
    : undefined;

  return (
    <Dialog open={open} onOpenChange={setShow}>
      <DialogContent className="z-50 rounded-xl bg-white sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg">역할 수정</DialogTitle>
          <DialogDescription>{`${selected.name}님의 역할을 수정합니다`}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="role-modal-select">역할</Label>
          <Select
            value={selectValue}
            onValueChange={(e) => {
              setValue((prev) => ({ ...prev, role: e }));
            }}
          >
            <SelectTrigger id="role-modal-select">
              <SelectValue placeholder="역할을 선택하세요" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {memberRoleOptions.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(selected.role === 'ROLE_PLACE_ADMIN' ||
          selected.role === 'ROLE_HEAD_ADMIN') && (
          <div className="space-y-2">
            <Label htmlFor="place-modal-select">지점 또는 본점</Label>
            <Select
              value={selected.place ? String(selected.place) : undefined}
              onValueChange={(e) => {
                setValue((prev) => ({ ...prev, place: e }));
              }}
            >
              <SelectTrigger id="place-modal-select">
                <SelectValue placeholder="지점 또는 본점을 선택하세요" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {allPlaceOptions.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <button
            className="rounded-md bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
            onClick={() => setShow(false)}
          >
            취소
          </button>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            onClick={() => {
              if (selectValue) {
                changeRole({
                  id: selected.id,
                  role: selectValue as MemberRole,
                  place: Number(selected.place),
                });
                setShow(false);
              }
            }}
          >
            확인
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function StatusModal({
  open,
  setShow,
  selected,
  setValue,
}: BaseDialogProps) {
  const { mutate: changeStatus } = useChangeStatus();
  const rawValue = selected.status;
  const selectValue = memberStatusOptions.some((o) => o.value === rawValue)
    ? rawValue
    : undefined;

  return (
    <Dialog open={open} onOpenChange={setShow}>
      <DialogContent className="z-50 rounded-xl bg-white sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg">상태 수정</DialogTitle>
          <DialogDescription>{`${selected.name}님의 상태를 수정합니다`}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="status-modal-select">상태</Label>
          <Select
            value={selectValue}
            onValueChange={(e) => {
              changeStatus({ id: selected.id, status: e as MEMBER_STATUS });
              setShow(false);
            }}
          >
            <SelectTrigger id="status-modal-select">
              <SelectValue placeholder="상태를 선택하세요" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {memberStatusOptions.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
}
