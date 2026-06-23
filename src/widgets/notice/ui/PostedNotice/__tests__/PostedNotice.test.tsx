import { render, screen } from '@testing-library/react';
import PostedNotice from '../index';
import { useGetNotices } from '../../../model/useGetNotices';
import { toast } from 'sonner';

jest.mock('../../../model/useGetNotices');
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('@/entities/notice', () => ({
  NoticeCard: ({ title, content }: any) => (
    <div data-testid="notice-card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  ),
}));

describe('PostedNotice Component', () => {
  beforeEach(() => {
    (useGetNotices as jest.Mock).mockReturnValue({
      data: [],
      isError: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  it('renders title', () => {
    render(<PostedNotice />);
    expect(screen.getByText('게시된 공지사항')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<PostedNotice />);
    expect(screen.getByText('공지사항이 없습니다')).toBeInTheDocument();
  });

  it('renders list of notices', () => {
    (useGetNotices as jest.Mock).mockReturnValue({
      data: [
        { id: '1', title: 'Notice 1', content: 'Content 1' },
        { id: '2', title: 'Notice 2', content: 'Content 2' },
      ],
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<PostedNotice />);
    expect(screen.queryByText('공지사항이 없습니다')).not.toBeInTheDocument();
    
    expect(screen.getAllByTestId('notice-card')).toHaveLength(2);
    expect(screen.getByText('Notice 1')).toBeInTheDocument();
    expect(screen.getByText('Notice 2')).toBeInTheDocument();
  });

  it('shows error toast', () => {
    (useGetNotices as jest.Mock).mockReturnValue({
      data: null,
      isError: true,
      error: { message: 'Failed' },
      refetch: jest.fn(),
    });

    render(<PostedNotice />);
    expect(toast.error).toHaveBeenCalledWith('Failed');
  });
});
