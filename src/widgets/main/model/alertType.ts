import { Place } from '@/shared/const/place';
import { ImageType } from '@/shared/types/imageType';

type REPORT_TYPE = 'FRAUD' | 'BAD_LANGUAGE' | 'MEMBER' | 'ETC';

export interface Trade {
  nickname: string;
  title: string;
  placeName: Place;
  createdAt: string;
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
    images: ImageType[];
  };
}

export interface SignUp {
  memberId: number;
  nickname: string;
  title: string;
  placeName: Place;
  recommenderNickname: string;
  created_at: string;
}

export interface Reports {
  reportId: number;
  nickname: string;
  reportedMemberId: number;
  reportedMemberName: string;
  title: string;
  placeName: Place;
  createdAt: string;
  report: Report[];
}

export interface Report {
  reportType: REPORT_TYPE;
  content: string;
  images: ImageType[];
}
