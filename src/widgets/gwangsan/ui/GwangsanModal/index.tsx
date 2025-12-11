'use client';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useRef } from 'react';
import { toast } from 'sonner';
import { adjustGwangsan } from '../../api/adjustGwangsan';

interface BaseDialogProps {
  open: boolean;
  isAdd: boolean;
  setShow: (v: boolean) => void;
  userId: string;
  refetch: () => void;
}

export default function GwangsanModal({
  isAdd,
  open,
  setShow,
  refetch,
  userId,
}: BaseDialogProps) {
  const gwangsanRef = useRef<HTMLInputElement>(null);
  const text = isAdd ? '추가' : '차감';

  const handleButtonClick = async () => {
    const input = gwangsanRef.current?.value;
    if (!input) {
      toast.error('광산을 입력해주세요');
      return;
    }
    let value;
    if (isAdd) {
      value = input;
    } else {
      value = '-' + input;
    }
    const res = await adjustGwangsan(userId, value);
    if (res.status === 200) {
      toast.success(`광산이 ${text}되었습니다`);
      refetch();
    } else {
      toast.error(`광산${text}에 실패하였습니다`);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setShow}>
      <DialogOverlay className="data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>광산 {text}</DialogTitle>
          <DialogDescription>{text}할 광산을 입력해주세요</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label>광산</Label>
          <Input type="number" ref={gwangsanRef} />
        </div>
        <DialogFooter>
          <Button onClick={handleButtonClick}>{text}하기</Button>
          <DialogClose>취소하기</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
