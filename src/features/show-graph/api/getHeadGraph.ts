import { instance } from '@/shared/lib/axios';

export const getGraph = async (period: string, head: string) => {
  try {
    const res = await instance.get(
      `/trade/graph?period=${period}&head_id=${head}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
