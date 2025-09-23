import { instance } from '@/shared/lib/axios';

export const getExcel = async (period: string | undefined, head_id: string) => {
  try {
    const res = await instance.get(
      `/trade/excel?period=${period}&head_id=${head_id}`,
      {
        responseType: 'blob',
        headers: {
          Accept:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      },
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `trade_${period}_${head_id}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    throw error;
  }
};
