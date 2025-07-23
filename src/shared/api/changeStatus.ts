import { AxiosResponse } from 'axios';
import { instance } from '../lib/axios';
import { MEMBER_STATUS } from '../types/memberType';

export const changeStatus = async (
  id: string,
  MEMBER_STATUS: MEMBER_STATUS,
): Promise<AxiosResponse | null> => {
  try {
    const res = await instance.patch('/admin/status/' + id, {
      status: MEMBER_STATUS,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
