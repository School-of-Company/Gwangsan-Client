import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/shared/lib/query';
import './globals.css';
import { cn } from '@/shared/lib/utils';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={cn(`flex items-center antialiased`)}>
        <div className={cn('w-full max-w-[600px]')}>
          <QueryProvider>
            {children}
            <Toaster position="top-center" expand={true} richColors />
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
