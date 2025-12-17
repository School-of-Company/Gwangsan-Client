import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Member from '../index';
import { useGetMembers } from '../../../model/useGetMembers';
import { storage } from '@/shared/lib/storage';

jest.mock('../../../model/useGetMembers');
jest.mock('@/shared/lib/storage', () => ({
  storage: {
    getItem: jest.fn(),
  },
}));
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('@/entities/main', () => ({
  GoNotice: () => <div data-testid="go-notice">GoNotice</div>,
}));

jest.mock('@/widgets/main/ui/Modal', () => ({
  RoleModal: ({ open, setShow }: any) =>
    open ? (
      <div data-testid="role-modal">
        RoleModal <button onClick={() => setShow(false)}>Close</button>
      </div>
    ) : null,
  StatusModal: ({ open, setShow }: any) =>
    open ? (
      <div data-testid="status-modal">
        StatusModal <button onClick={() => setShow(false)}>Close</button>
      </div>
    ) : null,
}));

describe('Member Component', () => {
  const mockData = [
    {
      memberId: '1',
      nickname: 'User1',
      name: 'Name1',
      phoneNumber: '010-1234-5678',
      role: 'ROLE_MEMBER',
      status: 'ACTIVE',
      joinedAt: '2023-01-01',
    },
    {
      memberId: '2',
      nickname: 'User2',
      name: 'Name2',
      phoneNumber: '010-8765-4321',
      role: 'ROLE_ADMIN',
      status: 'STOP',
      joinedAt: '2023-02-01',
    },
  ];

  beforeEach(() => {
    (useGetMembers as jest.Mock).mockReturnValue({
      data: mockData,
      isError: false,
      error: null,
    });
    (storage.getItem as jest.Mock).mockReturnValue('ROLE_ADMIN');
  });

  it('renders member list correctly', () => {
    render(<Member />);
    expect(screen.getByText('회원목록')).toBeInTheDocument();
    expect(screen.getByText('User1 |')).toBeInTheDocument();
    expect(screen.getByText('Name1')).toBeInTheDocument();
    expect(screen.getByText('User2 |')).toBeInTheDocument();
  });

  it('filters by nickname', () => {
    render(<Member />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'User1' } });

    expect(useGetMembers).toHaveBeenCalledWith('User1', '');
  });

  it('shows branch select for admin', () => {
    (storage.getItem as jest.Mock).mockReturnValue('ROLE_ADMIN');
    render(<Member />);
    expect(screen.getByText('대상 지점')).toBeInTheDocument();
  });

  it('hides branch select for place admin (ROLE_PLACE_ADMIN)', () => {
    (storage.getItem as jest.Mock).mockReturnValue('ROLE_PLACE_ADMIN');
    render(<Member />);
    expect(screen.queryByText('대상 지점')).not.toBeInTheDocument();
  });

  it('opens role and status modals', async () => {
    const { container } = render(<Member />);

    const moreBtn =
      container.querySelector('.lucide-more-horizontal') ||
      container.querySelector('.lucide-ellipsis');

    if (moreBtn && moreBtn.parentElement) {
      fireEvent.click(moreBtn.parentElement);
    } else {
      throw new Error('More button not found');
    }

    const statusBtn = await screen.findByText('상태 변경');
    fireEvent.click(statusBtn);
    expect(await screen.findByTestId('status-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));

    const moreBtn2 =
      container.querySelector('.lucide-more-horizontal') ||
      container.querySelector('.lucide-ellipsis');
    if (moreBtn2 && moreBtn2.parentElement) {
      fireEvent.click(moreBtn2.parentElement);
    }

    const roleBtn = await screen.findByText('역할 변경');
    fireEvent.click(roleBtn);
    expect(await screen.findByTestId('role-modal')).toBeInTheDocument();
  });

  it('initializes filter when button clicked', () => {
    render(<Member />);
    const initBtn = screen.getByText('초기화');
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Something' } });
    expect(useGetMembers).toHaveBeenCalledWith('Something', '');

    fireEvent.click(initBtn);
    expect(useGetMembers).toHaveBeenCalledWith('', '');
  });
});
