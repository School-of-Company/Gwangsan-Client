'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { REPORT_TYPE, REPORT_TYPE_KOR } from '../../model/alertType';
import { ImageType } from '@/shared/types/imageType';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { MEMBER_STATUS, memberStatusOptions } from '@/shared/types/memberType';
import { Button } from '@/shared/components/ui/button';
import { changeStatus } from '@/shared/api/changeStatus';
import { toast } from 'sonner';
import { deleteNotification } from '@/shared/api/deleteNotification';
import { refuseNotifications } from '../../api/refuseNotification';

interface ReportModalProps {
  open: boolean;
  setShow: (v: boolean) => void;
  reportedMemberName: string;
  nickname: string;
  content: string;
  reportType: REPORT_TYPE;
  images: ImageType[];
  memberId: number;
  notificationId: string;
}

export default function ReportModal({
  open,
  setShow,
  reportedMemberName,
  nickname,
  content,
  reportType,
  memberId,
  notificationId,
}: ReportModalProps) {
  const handleReport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get('MEMBER_STATUS');
    if (type) {
      const res = await changeStatus(String(memberId), type as MEMBER_STATUS);
      if (res && res.status === 204) {
        toast.success('상태 변경에 성공했습니다');
        deleteNotification(notificationId);
      } else {
        toast.error('상태 변경에 실패했습니다');
      }
    }
    setShow(false);
  };

  return (
    <Dialog open={open} onOpenChange={setShow}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>신고 처리</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleReport} className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <small>신고자</small>
              <span>{nickname}</span>
            </div>
            <div className="flex justify-between">
              <small>신고대상</small>
              <span>{reportedMemberName}</span>
            </div>
            <div className="flex justify-between">
              <small>신고 유형</small>
              <span>{REPORT_TYPE_KOR[reportType]}</span>
            </div>
          </div>

          <div>
            <small>신고 내용</small>
            <p className="whitespace-pre-wrap">{content}</p>
          </div>

          <Select name="MEMBER_STATUS">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {memberStatusOptions.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => refuseNotifications(notificationId)}
              variant="outline"
            >
              신고 기각
            </Button>
            <Button type="submit">적용하기</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
