import { Place } from '../const/place';
import { MemberRole } from '../const/role';
import { ImageType } from './imageType';

export interface Notices {
  id: number;
  title: string;
  content: string;
  images?: ImageType[];
}

export interface DetailNotice extends Notices {
  place: Place;
  createdAt: string;
  role: MemberRole;
  isMe: boolean;
}
