'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/shared/components/ui/select';
import { useState } from 'react';
import { changeRole } from '@/widgets/main/api/changeRole';
import { MemberRole, memberRoleOptions } from '@/shared/const/role';
import { MEMBER_STATUS, memberStatusOptions } from '@/shared/types/memberType';
import { changeStatus } from '@/shared/api/changeStatus';

interface EditRoleDialogProps {
  open: boolean;
  setShow: (v: boolean) => void;
  id: string;
  name: string;
  type: 'role' | 'status';
}

export default function Modal({
  open,
  setShow,
  name,
  id,
  type,
}: EditRoleDialogProps) {
  const [selected, setSelected] = useState<
    MEMBER_STATUS | MemberRole | undefined
  >(undefined);

  const handleSave = () => {
    if (!selected) return;
    type === 'role'
      ? changeRole(id, selected as MemberRole)
      : changeStatus(id, selected as MEMBER_STATUS);
    setShow(false);
  };

  return (
    <Dialog open={open} onOpenChange={setShow}>
      <DialogContent className="z-50 rounded-xl bg-white sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {type === 'role' ? '역할 수정' : '상태 수정'}
          </DialogTitle>
          <DialogDescription>
            {`${name}님의 ${type === 'role' ? '역할' : '상태'}을 수정합니다`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label>{type === 'role' ? '역할' : '상태'}</Label>
          <Select
            value={selected}
            onValueChange={(e) => setSelected(e as MemberRole)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  type === 'role' ? '역할을' : '상태를' + ' 선택하세요'
                }
              />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {type === 'role'
                ? memberRoleOptions.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))
                : memberStatusOptions.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSave}
          className="mt-6 w-full"
          variant="outline"
          disabled={!selected}
        >
          저장하기
        </Button>
      </DialogContent>
    </Dialog>
  );
}
