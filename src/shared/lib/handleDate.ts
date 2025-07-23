export const handleDate = (data?: string) => {
  if (data) return data.split('T')[0].replaceAll('-', '.');
};
