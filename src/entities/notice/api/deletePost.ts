import { instance } from '@/shared/lib/axios';
import { toast } from 'sonner';

export const deletePost = async (id: string) => {
  try {
    const res = await instance.delete('notice/' + id);
    toast.success('게시글이 삭제되었습니다');
    return res;
  } catch (error) {
    toast.error('게시글 삭제 실패했습니다');
    throw error;
  }
};
