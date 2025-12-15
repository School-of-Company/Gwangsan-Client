import { MemberRole } from '../const/role';
import { ImageType } from './imageType';
import { PlaceValueType } from '../const/place';

export interface Notices {
  id: number;
  title: string;
  content: string;
  images?: ImageType[];
}

export interface DetailNotice extends Notices {
  place: PlaceValueType;
  createdAt: string;
  role: MemberRole;
  isMe: boolean;
}
