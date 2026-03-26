import { instance } from '@/shared/lib/axios';

export const getMember = async (memberId: string) => {
  return (await instance.get(`/member/${memberId}`)).data;
};
