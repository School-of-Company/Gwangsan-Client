import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../api/getNotifications';
import { Reports, SignUp, Trade } from './alertType';

interface Response {
  reports: Reports[];
  signUps: SignUp[];
  trades: Trade[];
}

export const useGetNotifications = () => {
  return useQuery<Response>({
    queryKey: ['notification'],
    queryFn: getNotifications,
  });
};
