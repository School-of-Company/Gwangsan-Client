import { instance } from '@/shared/lib/axios';

export const uploadImage = async (files: File[]): Promise<number[]> => {
  try {
    const responses = await Promise.all(
      files.map(async (file) => {
        const { data } = await instance.postForm(
          `/image`,
          { file },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        return data.imageId as number;
      }),
    );
    return responses;
  } catch (e) {
    throw e;
  }
};
