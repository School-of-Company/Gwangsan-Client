import { render, screen, fireEvent } from '@testing-library/react';
import GraphView from '../index';
import { useGetHeadGraph } from '@/features/show-graph/model/useGetHeadGraph';
import { useGetPlacegraph } from '@/features/show-graph/model/useGetPlaceGraph';
import { getExcel } from '@/features/show-graph/api/getExcel';

jest.mock('@/features/show-graph/model/useGetHeadGraph');
jest.mock('@/features/show-graph/model/useGetPlaceGraph');
jest.mock('@/features/show-graph/api/getExcel');

jest.mock('chart.js', () => {
  const ChartMock = jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
  }));
  (ChartMock as any).register = jest.fn();
  return {
    Chart: ChartMock,
    ArcElement: jest.fn(),
    Tooltip: jest.fn(),
    Legend: jest.fn(),
    PieController: jest.fn(),
  };
});

describe('GraphView Component', () => {
  beforeEach(() => {
    (useGetHeadGraph as jest.Mock).mockReturnValue({
      data: [{ place: { name: 'P1' }, tradeCount: 10 }],
    });
    (useGetPlacegraph as jest.Mock).mockReturnValue({
      data: null,
    });
    
    const getContextMock = jest.fn(() => ({}));
    HTMLCanvasElement.prototype.getContext = getContextMock as any;
  });

  it('renders filters', () => {
    render(<GraphView />);
    expect(screen.getByText('오늘')).toBeInTheDocument();
    const comboboxes = screen.getAllByRole('combobox');
    expect(comboboxes.length).toBeGreaterThanOrEqual(3);
    
    expect(screen.getByText('지점을 선택하세요')).toBeInTheDocument();
    expect(screen.getByText('엑셀출력')).toBeInTheDocument();
  });

  it('initializes chart with head data', () => {
      render(<GraphView />);
      expect(useGetHeadGraph).toHaveBeenCalledWith('DAY', '1');
  });

  it('handles excel export', () => {
    render(<GraphView />);
    const btn = screen.getByText('엑셀출력');
    fireEvent.click(btn);
    expect(getExcel).toHaveBeenCalled();
  });
});
