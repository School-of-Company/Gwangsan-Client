import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../api/getNotifications';
import { Reports, SignUp } from './alertType';

export interface NotificationResponse {
  reports: Reports[];
  signUps: SignUp[];
}

export const useGetNotifications = () => {
  return useQuery<NotificationResponse>({
    queryKey: ['notification'],
    queryFn: getNotifications,
  });
};
