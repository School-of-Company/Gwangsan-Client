import { useQuery } from '@tanstack/react-query';
import { getHeadGraph } from '../api/getHeadGraph';

interface Response {
  place: {
    id: number;
    name: string;
  };
  tradeCount: number;
}

export const useGetHeadGraph = (period: string, head: string) => {
  return useQuery<Response[]>({
    queryKey: ['graph'],
    queryFn: () => getHeadGraph(period, head),
    enabled: Boolean(head),
  });
};
