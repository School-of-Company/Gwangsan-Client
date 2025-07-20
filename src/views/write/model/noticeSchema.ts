import { PLACES } from '@/shared/const/place';
import { MEMBER_ROLES } from '@/shared/const/role';
import z from 'zod';

export const NoticeSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(100, '최대 100자까지만 입력 가능합니다.'),
  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(1000, '최대 1000자까지만 입력 가능합니다.'),
  place: z.enum(PLACES),
  imageIds: z.number(),
  role: z.enum(MEMBER_ROLES).nullable(),
});

export type Notice = z.infer<typeof NoticeSchema>;
