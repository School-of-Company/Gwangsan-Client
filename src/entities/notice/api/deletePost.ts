import { instance } from '@/shared/lib/axios';

export const deletePost = (id: string) => {
  try {
    const res = instance.delete('notice/' + id);
    return res;
  } catch (error) {
    throw error;
  }
};
