import { MemberRole } from '@/shared/const/role';
import { instance } from '@/shared/lib/axios';

export const changeRole = async (
  id: string,
  role: MemberRole,
  placeId: number,
) => {
  try {
    const res = await instance.patch('/admin/role/' + id, {
      role,
      placeId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
