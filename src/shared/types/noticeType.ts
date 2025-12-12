import { PLACES } from '@/views/graph/model/place';
import { MemberRole } from '../const/role';
import { ImageType } from './imageType';

export interface Notices {
  id: number;
  title: string;
  content: string;
  images?: ImageType[];
}

export interface DetailNotice extends Notices {
  place: (typeof PLACES)[keyof typeof PLACES];
  createdAt: string;
  role: MemberRole;
  isMe: boolean;
}
