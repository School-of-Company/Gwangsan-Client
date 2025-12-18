import { render, screen, fireEvent } from '@testing-library/react';
import DetailView from '../index';
import { useRouter, useParams } from 'next/navigation';
import { deletePost } from '@/entities/notice/api/deletePost';
import { useGetDetailNotice } from '@/views/detail/model/useGetDetailNotice';

jest.mock('@/views/detail/model/useGetDetailNotice');
jest.mock('@/entities/notice/api/deletePost');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('@/entities/detail', () => ({
  ImageSlider: ({ images }: any) => (
    <div data-testid="image-slider">{images.length} images</div>
  ),
}));

jest.mock('@/shared/components/ui/alert-dialog', () => ({
  AlertDialog: ({ children, open }: any) => (
    <div>
      {open ? 'Open' : 'Closed'}
      {children}
    </div>
  ),
  AlertDialogTrigger: ({ children }: any) => (
    <div data-testid="alert-trigger">{children}</div>
  ),
  AlertDialogContent: ({ children }: any) => (
    <div data-testid="alert-content">{children}</div>
  ),
  AlertDialogHeader: ({ children }: any) => <div>{children}</div>,
  AlertDialogTitle: ({ children }: any) => <div>{children}</div>,
  AlertDialogDescription: ({ children }: any) => <div>{children}</div>,
  AlertDialogFooter: ({ children }: any) => <div>{children}</div>,
  AlertDialogCancel: ({ children }: any) => <button>{children}</button>,
  AlertDialogAction: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe('DetailView Component', () => {
  const mockRouter = { push: jest.fn(), back: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useGetDetailNotice as jest.Mock).mockReturnValue({
      data: {
        title: 'Detail Title',
        content: 'Detail Content',
        role: 'ROLE_ADMIN',
        place: 'Headquarters',
        createdAt: '2023-01-01',
        images: ['img1.jpg', 'img2.jpg'],
        isMe: true,
      },
      isError: false,
      error: null,
    });
  });

  it('renders details', () => {
    render(<DetailView />);
    expect(screen.getByText('Detail Title')).toBeInTheDocument();
    expect(screen.getByText('Detail Content')).toBeInTheDocument();
    expect(screen.getByTestId('image-slider')).toBeInTheDocument();
  });

  it('navigates back', () => {
    render(<DetailView />);
    fireEvent.click(screen.getByText('뒤로가기'));
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it('navigates to edit', () => {
    const { container } = render(<DetailView />);
    const buttons = container.querySelectorAll('button');
    fireEvent.click(buttons[0]);
    expect(mockRouter.push).toHaveBeenCalledWith('/notice?id=123');
  });

  it('handles delete flow', () => {
    const { container } = render(<DetailView />);

    const buttons = container.querySelectorAll('button');
    fireEvent.click(buttons[1]);

    expect(screen.getByText('Open')).toBeInTheDocument();

    fireEvent.click(screen.getByText('삭제'));

    expect(deletePost).toHaveBeenCalledWith('123');
    expect(mockRouter.push).toHaveBeenCalledWith('/notice');
  });
});
