import { Place } from '@/shared/const/place';
import { ImageType } from '@/shared/types/imageType';

export type REPORT_TYPE = 'FRAUD' | 'BAD_LANGUAGE' | 'MEMBER' | 'ETC';

export const REPORT_TYPE_KOR: Record<REPORT_TYPE, string> = {
  FRAUD: '사기 신고',
  BAD_LANGUAGE: '욕설 신고',
  MEMBER: '회원 신고',
  ETC: '기타 신고',
} as const;

export const reportTypeOptions = Object.entries(REPORT_TYPE_KOR).map(
  ([value, label]) => ({
    value: value as REPORT_TYPE,
    label,
  }),
);

export type ALERT_TYPE = 'REPORT' | 'SIGN_UP';

export interface SignUp {
  id: string;
  memberId: number;
  nickname: string;
  title: string;
  placeName: Place;
  recommenderNickname: string;
  created_at: string;
}

export interface Reports {
  id: number;
  nickname: string;
  reportedMemberId: number;
  reportedMemberName: string;
  title: string;
  placeName: Place;
  createdAt: string;
  report: Report;
}

export interface Report {
  reportType: REPORT_TYPE;
  content: string;
  reportId: number;
  images: ImageType[];
}

export interface TradeCancel {
  id: number;
  nickname: string;
  title: string;
  reason: string;
  placeName: Place;
  createdAt: string;
  images: ImageType[];
  product: {
    id: number;
    title: string;
    content: string;
    gwangsan: number;
    type: 'OBJECT' | 'SERVICE';
    mode: 'GIVER' | 'RECEIVER';
    member: {
      memberId: number;
      nickname: string;
      placeName: Place;
      light: number;
    };
    images: ImageType;
  };
}
