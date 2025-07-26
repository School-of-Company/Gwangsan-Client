import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/shared/lib/query';
import './globals.css';
import { cn } from '@/shared/lib/utils';
import Header from '@/shared/components/ui/header';

export const metadata: Metadata = {
  title: '시민 화페 광산',
  description: '광산구 시민 화폐 광산의 어드민 페이지입니다',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={cn(`flex items-center antialiased`)}>
        <div className={cn('h-full w-full max-w-[1400px] overflow-hidden')}>
          <Header />
          <QueryProvider>
            {children}
            <Toaster position="top-center" expand={true} richColors />
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
