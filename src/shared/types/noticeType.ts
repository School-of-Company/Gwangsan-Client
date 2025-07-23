import { Place } from '../const/place';
import { MemberRole } from '../const/role';
import { ImageType } from './imageType';

export interface Notices {
  id: number;
  title: string;
  content: string;
  images?: ImageType[];
  isMe: boolean;
}

export interface DetailNotice extends Notices {
  place: Place;
  createdAt: string;
  role: MemberRole;
}
