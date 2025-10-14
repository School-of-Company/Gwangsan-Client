'use client';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import {
  REPORT_TYPE_KOR,
  Reports,
  SignUp,
  TradeCancel,
} from '@/widgets/main/model/alertType';
import { ReportModal } from '@/widgets/main';
import { useCallback, useState } from 'react';
import { acceptSignup } from '../../api/acceptSignup';
import { cancelTrade } from '../../api/cancelTrade';
import { toast } from 'sonner';

export type NotificationProps =
  | { type: 'REPORT'; data: Reports; refetch: () => void }
  | { type: 'TRADE_CANCEL'; data: TradeCancel; refetch: () => void }
  | { type: 'SIGN_UP'; data: SignUp; refetch: () => void };

export default function NotificationCard({
  type,
  data,
  refetch,
}: NotificationProps) {
  const [show, setShow] = useState(false);
  const handleReportClick = useCallback(() => {
    setShow(true);
  }, []);

  const handleSignupClick = useCallback(
    async (id: string) => {
      const res = await acceptSignup(id);
      if (res.status === 204) {
        setTimeout(refetch, 1000);
        toast.success('회원가입 승인 성공했습니다');
      } else {
        toast.error(res.data.message ?? '회원가입 승인 실패했습니다');
      }
    },
    [refetch],
  );

  const handleTradeCancelClick = useCallback(
    async (id: string) => {
      const res = await cancelTrade(id);
      if (res.status === 200) {
        setTimeout(refetch, 1000);
        toast.success('거래철회 승인 성공했습니다');
      } else {
        toast.error(res.data.message ?? '거래철회 승인에 실패했습니다');
      }
    },
    [refetch],
  );

  switch (type) {
    case 'REPORT':
      return (
        <div className={cn('flex justify-between px-3 py-6')}>
          <div>
            <div className="flex items-center gap-6">
              <Badge variant="outline" className={cn('px-4')}>
                신고
              </Badge>
              <h3 className={cn('text-body1')}>{data.nickname}</h3>
            </div>
            <div className="ml-2 mt-[14px]">
              <span className={cn('text-gray-600')}>
                {REPORT_TYPE_KOR[data.report.reportType]}
              </span>
              <span className={cn('text-gray-600')}> / </span>
              <span className={cn('text-error-500')}>
                신고대상 : {data.reportedMemberName}
              </span>
            </div>
          </div>

          <Button onClick={handleReportClick} variant="outline">
            확인
          </Button>
          <ReportModal
            open={show}
            images={data.report.images}
            reportType={data.report.reportType}
            setShow={setShow}
            nickname={data.nickname}
            reportedMemberName={data.reportedMemberName}
            content={data.report.content}
            memberId={data.reportedMemberId}
            notificationId={String(data.id)}
            refetch={refetch}
          />
        </div>
      );
    case 'SIGN_UP':
      return (
        <div className={cn('flex w-full justify-between px-3 py-6')}>
          <div>
            <div className={cn('flex gap-6')}>
              <Badge variant="outline" className={cn('px-4')}>
                회원가입
              </Badge>
              <strong className={cn('text-titleSmall')}>{data.nickname}</strong>
            </div>
            <span className={cn('mt-[14px] text-body2 text-gray-600')}>
              회원가입 요청
            </span>
          </div>
          <Button
            onClick={() => handleSignupClick(data.id.toString())}
            className={cn('bg-main-500')}
          >
            ✓ 승인
          </Button>
        </div>
      );
    case 'TRADE_CANCEL':
      return (
        <div className={cn('flex w-full justify-between px-3 py-6')}>
          <div>
            <div className={cn('flex gap-6')}>
              <Badge variant="outline" className={cn('px-4')}>
                거래철회
              </Badge>
              <strong className={cn('text-titleSmall')}>{data.nickname}</strong>
            </div>
            <span className={cn('mt-[14px] text-body2 text-gray-600')}>
              {data.title}
            </span>
          </div>
          <Button
            onClick={() => handleTradeCancelClick(data.id.toString())}
            className={cn('bg-error-500')}
          >
            거래철회
          </Button>
        </div>
      );
    default:
      return null;
  }
}
