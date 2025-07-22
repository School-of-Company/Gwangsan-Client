import { AxiosError } from 'axios';
import { instance } from '../lib/axios';
import { MEMBER_STATUS } from '../types/memberType';
import { toast } from 'sonner';

export const changeStatus = async (
  id: string,
  MEMBER_STATUS: MEMBER_STATUS,
) => {
  try {
    const res = await instance.patch('/admin/status/' + id, {
      status: MEMBER_STATUS,
    });
    if (res.status === 204) toast.success('상태 변경에 성공했습니다');
  } catch (error) {
    toast.error('상태 변경에 실패했습니다');
    throw error;
  }
};
