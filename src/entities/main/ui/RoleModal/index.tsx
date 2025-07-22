'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
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

interface EditRoleDialogProps {
  open: boolean;
  userName: string;
  setShow: (v: boolean) => void;
}

const roleOptions = ['코디네이터', '관리자', '운영진'];

export default function RoleModal({
  userName,
  open,
  setShow,
}: EditRoleDialogProps) {
  return (
    <div className="bg-[rgba(17, 17, 17, 0.60) fixed inset-0 z-40">
      <Dialog open={open} onOpenChange={setShow}>
        <DialogContent className="z-50 rounded-xl bg-white sm:max-w-[400px] dark:bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg">역할 수정</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-black">{userName}</span>님의
              역할을 수정합니다
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label>역할</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="역할을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="mt-6 w-full" variant="outline">
            저장하기
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
