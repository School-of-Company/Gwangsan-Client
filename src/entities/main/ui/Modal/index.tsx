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

interface DialogProps {
  open: boolean;
  setShow: (v: boolean) => void;
  type: 'role' | 'status';
  selected: { name: string; id: string; status: string; role: string };
}

export default function Modal({ open, setShow, type, selected }: DialogProps) {
  const { mutate: changeStatus } = useChangeStatus();
  const { mutate: changeRole } = useChangeRole();
  return (
    <Dialog open={open} onOpenChange={setShow}>
      <DialogContent className="z-50 rounded-xl bg-white sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {type === 'role' ? '역할 수정' : '상태 수정'}
          </DialogTitle>
          <DialogDescription>
            {`${selected.name}님의 ${type === 'role' ? '역할' : '상태'}을 수정합니다`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label>{type === 'role' ? '역할' : '상태'}</Label>
          <Select
            value={type === 'role' ? selected.role : selected.status}
            onValueChange={(e) => {
              if (type === 'role') {
                changeRole({ id: String(selected.id), role: e as MemberRole });
              } else {
                changeStatus({ id: selected.id, status: e as MEMBER_STATUS });
              }
              setShow(false);
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={`${type === 'role' ? '역할을' : '상태를'} 선택하세요`}
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
      </DialogContent>
    </Dialog>
  );
}
