import { useQuery } from '@tanstack/react-query';
import { getPlaceGraph } from '../api/getPlaceGraph';

interface Response {
  count: number;
}

export const useGetPlacegraph = (period: string, place: string) => {
  return useQuery<Response>({
    queryKey: ['graph', place],
    queryFn: () => getPlaceGraph(period, place),
    enabled: Boolean(place),
  });
};
