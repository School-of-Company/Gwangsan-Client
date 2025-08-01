import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../api/getNotifications';
import { Reports, SignUp, Trade } from './alertType';

export interface NotificationResponse {
  reports: Reports[];
  signUps: SignUp[];
  trades: Trade[];
}

export const useGetNotifications = () => {
  return useQuery<NotificationResponse>({
    queryKey: ['notification'],
    queryFn: getNotifications,
  });
};
