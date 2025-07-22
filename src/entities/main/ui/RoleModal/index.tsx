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

interface EditRoleDialogProps {
  open: boolean;
  setShow: (v: boolean) => void;
  id: string;
  name: string;
}

export default function RoleModal({
  open,
  setShow,
  name,
  id,
}: EditRoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState<MemberRole | undefined>(
    undefined,
  );

  const handleSave = () => {
    if (!selectedRole) return;
    changeRole(id, selectedRole);
    setShow(false);
  };

  return (
    <Dialog open={open} onOpenChange={setShow}>
      <DialogContent className="z-50 rounded-xl bg-white sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg">역할 수정</DialogTitle>
          <DialogDescription>
            {name + '님의 역할을 수정합니다'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label>역할</Label>
          <Select
            value={selectedRole}
            onValueChange={(e) => setSelectedRole(e as MemberRole)}
          >
            <SelectTrigger>
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

        <Button
          onClick={handleSave}
          className="mt-6 w-full"
          variant="outline"
          disabled={!selectedRole}
        >
          저장하기
        </Button>
      </DialogContent>
    </Dialog>
  );
}
