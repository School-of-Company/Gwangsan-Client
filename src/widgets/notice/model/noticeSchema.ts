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
  placeId: z.number().int().positive(),
  imageIds: z.array(z.number().int().positive()),
});

export type Notice = z.infer<typeof NoticeSchema>;
