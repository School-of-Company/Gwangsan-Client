import { render, screen } from '@testing-library/react';
import Notification from '../index';
import { useGetNotifications } from '../../../model/useGetNotifications';

jest.mock('../../../model/useGetNotifications');
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('@/entities/main', () => ({
  NotificationCard: ({ data, type }: any) => (
    <div data-testid="notification-card">
      {type}: {data.id || data.memberId}
    </div>
  ),
}));

describe('Notification Component', () => {
  beforeEach(() => {
    (useGetNotifications as jest.Mock).mockReturnValue({
      data: {
        reports: [],
        signUps: [],
      },
      isError: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  it('renders title', () => {
    render(<Notification />);
    expect(screen.getByText('알림')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<Notification />);
    expect(screen.getByText('알림이 없습니다.')).toBeInTheDocument();
  });

  it('renders notifications (reports and signups)', () => {
    (useGetNotifications as jest.Mock).mockReturnValue({
      data: {
        reports: [{ id: 'report1' }],
        signUps: [{ memberId: 'signup1' }],
      },
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<Notification />);
    expect(screen.queryByText('알림이 없습니다.')).not.toBeInTheDocument();
    
    const cards = screen.getAllByTestId('notification-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('REPORT: report1')).toBeInTheDocument();
    expect(screen.getByText('SIGN_UP: signup1')).toBeInTheDocument();
  });

  it('shows toast error on failure', () => {
    const { toast } = require('sonner');
    (useGetNotifications as jest.Mock).mockReturnValue({
      data: null,
      isError: true,
      error: { message: 'Error fetching' },
      refetch: jest.fn(),
    });

    render(<Notification />);
    expect(toast.error).toHaveBeenCalledWith('Error fetching');
  });
});
