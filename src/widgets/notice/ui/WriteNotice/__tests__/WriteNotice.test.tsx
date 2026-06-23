import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WriteNotice from '../index';
import { handlePostNotice } from '../../../lib/handlePostNotice';
import { uploadImage } from '../../../api/uploadImage';
import { useSearchParams } from 'next/navigation';
import { useGetDetailNotice } from '@/views/detail/model/useGetDetailNotice';

jest.mock('../../../lib/handlePostNotice');
jest.mock('../../../api/uploadImage');
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));
jest.mock('@/views/detail/model/useGetDetailNotice');

describe('WriteNotice Component', () => {
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useGetDetailNotice as jest.Mock).mockReturnValue({ data: null });
    (handlePostNotice as jest.Mock).mockResolvedValue(undefined);
    (uploadImage as jest.Mock).mockResolvedValue([1, 2]);
  });

  it('renders correctly', () => {
    render(<WriteNotice />);
    expect(screen.getByText('공지사항 작성')).toBeInTheDocument();
  });

  it('submits form with data', async () => {
    render(<WriteNotice />);

    fireEvent.change(screen.getByLabelText('제목'), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByLabelText('내용'), {
      target: { value: 'Test Content' },
    });

    fireEvent.click(screen.getByText('게시하기'));

    await waitFor(() => {
      expect(handlePostNotice).toHaveBeenCalled();
    });
  });

  it('handles file upload', async () => {
    const { container } = render(<WriteNotice />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(uploadImage).toHaveBeenCalled();
    });
  });

  it('prefills data when editing', () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('id=123'),
    );
    (useGetDetailNotice as jest.Mock).mockReturnValue({
      data: { title: 'Old Title', content: 'Old Content', place: '광주 본점' },
    });

    render(<WriteNotice />);
    expect(screen.getByDisplayValue('Old Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Old Content')).toBeInTheDocument();
    expect(screen.getByText('수정하기')).toBeInTheDocument();
  });
});
