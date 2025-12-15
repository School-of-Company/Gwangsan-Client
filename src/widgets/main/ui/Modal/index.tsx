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
import { headOptions, placeOptions } from '@/shared/const/place';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/shared/components/ui/button';

interface BaseDialogProps {
  open: boolean;
  setShow: (v: boolean) => void;
  setValue: Dispatch<
    SetStateAction<{
      name: string;
      id: string;
      status: string;
      role: string;
      place: number;
    }>
  >;
  selected: {
    name: string;
    id: string;
    status: string;
    role: string;
    place: number;
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

  const isHeadAdmin = selected.role === 'ROLE_HEAD_ADMIN';
  const isPlaceAdmin = selected.role === 'ROLE_PLACE_ADMIN';

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

        {(isPlaceAdmin || isHeadAdmin) && (
          <div className="space-y-2">
            <Label htmlFor="place-modal-select">
              {isHeadAdmin ? '본점' : '지점'}
            </Label>
            <Select
              value={selected.place ? String(selected.place) : undefined}
              onValueChange={(e) => {
                setValue((prev) => ({ ...prev, place: Number(e) }));
              }}
            >
              <SelectTrigger id="place-modal-select">
                <SelectValue
                  placeholder={
                    isHeadAdmin ? '본점을 선택하세요' : '지점을 선택하세요'
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {(isHeadAdmin ? headOptions : placeOptions).map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={() => setShow(false)}>취소</Button>
          <Button
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
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function StatusModal({ open, setShow, selected }: BaseDialogProps) {
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
