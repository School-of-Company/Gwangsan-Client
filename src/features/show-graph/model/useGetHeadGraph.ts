import { useQuery } from '@tanstack/react-query';
import { getHeadGraph } from '../api/getHeadGraph';

interface Response {
  place: {
    id: number;
    name: string;
  };
  tradeCount: number;
}

export const useGetHeadGraph = (period: string | undefined, head: string) => {
  return useQuery<Response[]>({
    queryKey: ['graph', head, period],
    queryFn: () => getHeadGraph(period, head),
    enabled: Boolean(head),
  });
};
