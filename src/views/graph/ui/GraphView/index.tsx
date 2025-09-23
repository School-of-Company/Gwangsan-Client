'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
import { headOptions } from '@/shared/const/place';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { placeOptions } from '../../model/place';
import { periodOptions } from '../../model/period';
import { useGetHeadGraph } from '@/features/show-graph/model/useGetHeadGraph';
import { useGetPlacegraph } from '@/features/show-graph/model/useGetPlaceGraph';
import { Button } from '@/shared/components/ui/button';
import { getExcel } from '@/features/show-graph/api/getExcel';

Chart.register(PieController, ArcElement, Tooltip, Legend);

// 차트와 하단 legend 사이 여백을 강제로 확보하는 플러그인
const legendMarginPlugin = {
  id: 'legendMargin',
  beforeInit(chart: any, _args: any, pluginOptions: { margin?: number }) {
    const fit = chart.legend && chart.legend.fit;
    if (!fit) return;
    chart.legend.fit = function fitWithMargin() {
      fit.bind(chart.legend)();
      // legend 높이에 margin을 추가해 그래프와의 간격을 벌림
      // pluginOptions.margin이 없으면 기본 24px
      this.height += pluginOptions?.margin ?? 24;
    };
  },
};

export default function GraphView() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [period, setPeriod] = useState<string>('DAY');
  const [head, setHead] = useState<string>('1');
  const [place, setPlace] = useState<string | undefined>(undefined);
  const { data: headData } = useGetHeadGraph(period, head);
  const { data: placeData } = useGetPlacegraph(period, place);

  const handleExcel = useCallback(() => {
    getExcel(period, head);
  }, [period, head]);
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const labels = placeData
      ? [placeOptions.find((p) => p.value === place)?.label ?? '선택 지점']
      : (headData?.map((d) => d.place.name) ?? []);

    const values = placeData
      ? [placeData.count]
      : (headData?.map((d) => d.tradeCount) ?? []);

    if (!labels.length || !values.length) {
      chartRef.current?.destroy();
      chartRef.current = null;
      return;
    }

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: '거래 통계',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)',
              'rgba(255, 99, 71, 0.6)',
              'rgba(0, 128, 0, 0.6)',
              'rgba(0, 206, 209, 0.6)',
              'rgba(255, 215, 0, 0.6)',
            ],
          },
        ],
      },
      plugins: [legendMarginPlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 16,
            },
          },
          tooltip: {
            enabled: true,
            mode: 'nearest',
            intersect: false,
          },
        },
      },
    });

    return () => {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
      chartRef.current = null;
    };
  }, [headData, placeData, place]);

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="mb-10 flex w-full gap-6 p-6">
        <Select value={period} onValueChange={(e) => setPeriod(e)}>
          <SelectTrigger>
            <SelectValue placeholder="기간을 선택하세요" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {periodOptions.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={head} onValueChange={(e) => setHead(e)}>
          <SelectTrigger>
            <SelectValue placeholder="본점을 선택하세요" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {headOptions.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={place} onValueChange={(e) => setPlace(e)}>
          <SelectTrigger>
            <SelectValue placeholder="지점을 선택하세요" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {placeOptions.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleExcel} variant="outline">
          엑셀출력
        </Button>
      </div>
      <div className="h-2/3">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
