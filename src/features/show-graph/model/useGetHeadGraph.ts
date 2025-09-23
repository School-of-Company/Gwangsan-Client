import { useQuery } from '@tanstack/react-query';
import { getGraph } from '../api/getHeadGraph';

interface Response {
  place: {
    id: number;
    name: string;
  };
  tradeCount: number;
}

export const useGetGraph = (period: string, head: string) => {
  return useQuery<Response[]>({
    queryKey: ['graph'],
    queryFn: () => getGraph(period, head),
    enabled: Boolean(head),
  });
};
