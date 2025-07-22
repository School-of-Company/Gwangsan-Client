'use client';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import {
  REPORT_TYPE_KOR,
  Reports,
  SignUp,
  Trade,
} from '@/widgets/main/model/alertType';
import { acceptTrade } from '../../api/acceptTrade';
import { changeStatus } from '@/shared/api/changeStatus';
import { ReportModal } from '@/widgets/main';
import { useCallback, useState } from 'react';

export type NotificationProps =
  | { type: 'REPORT'; data: Reports }
  | { type: 'SIGN_UP'; data: SignUp }
  | { type: 'TRADE'; data: Trade };

export default function NotificationCard({ type, data }: NotificationProps) {
  const [show, setShow] = useState(false);
  const handleReportClick = useCallback(() => {
    setShow(true);
  }, []);
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
            onClick={() => changeStatus(String(data.memberId), 'ACTIVE')}
            className={cn('bg-main-500')}
          >
            ✓ 승인
          </Button>
        </div>
      );
    case 'TRADE':
      return (
        <div className={cn('flex w-full justify-between px-3 py-6')}>
          <div className={cn('flex gap-6')}>
            <Badge variant="outline" className={cn('px-4')}>
              거래완료
            </Badge>
            <strong className={cn('mt-[14px] text-titleSmall text-gray-600')}>
              {data.nickname}
            </strong>
          </div>
          <Button
            onClick={() => acceptTrade(String(data.product.id))}
            className={cn('bg-main-500')}
          >
            거래완료
          </Button>
        </div>
      );
    default:
      return null;
  }
}
