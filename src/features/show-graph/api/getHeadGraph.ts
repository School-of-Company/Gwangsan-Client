import { instance } from '@/shared/lib/axios';

export const getHeadGraph = async (
  period: string | undefined,
  head: string,
) => {
  try {
    const res = await instance.get(
      `/trade/graph/head?period=${period}&head_id=${head}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
