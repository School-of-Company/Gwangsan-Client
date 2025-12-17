import { useQuery } from '@tanstack/react-query';
import { getPlaceGraph } from '../api/getPlaceGraph';

interface Response {
  count: number;
}

export const useGetPlacegraph = (
  period: string | undefined,
  place: number | undefined,
) => {
  return useQuery<Response>({
    queryKey: ['graph', place, period],
    queryFn: () => getPlaceGraph(period, place!),
    enabled: Boolean(place),
  });
};
