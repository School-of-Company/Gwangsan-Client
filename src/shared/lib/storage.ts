'use client';

export const storage = {
  getItem: (key: string): string | null => {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie.split('; ');
    const found = cookies.find((c) => c.startsWith(`${key}=`));
    return found ? decodeURIComponent(found.split('=')[1]) : null;
  },

  setItem: (key: string, value: string): void => {
    if (typeof document === 'undefined') return;
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/`;
  },

  removeItem: (key: string): void => {
    if (typeof document === 'undefined') return;
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },

  clear: (): void => {
    if (typeof document === 'undefined') return;
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const key = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  },
};
