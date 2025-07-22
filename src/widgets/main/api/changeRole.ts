import { MemberRole } from '@/shared/const/role';
import { instance } from '@/shared/lib/axios';

export const changeRole = async (id: string, role: MemberRole) => {
  try {
    const res = await instance.patch('/admin/role/' + id, {
      role,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
