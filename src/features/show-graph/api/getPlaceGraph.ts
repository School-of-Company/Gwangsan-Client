import { instance } from '@/shared/lib/axios';

export const getPlaceGraph = async (
  period: string | undefined,
  place: string,
) => {
  try {
    const res = await instance.get(
      `/trade/graph/place?period=${period}&place_id=${place}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
