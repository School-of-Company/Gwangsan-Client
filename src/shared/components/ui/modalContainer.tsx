import { cn } from '@/shared/lib/utils';
import { Close } from '@radix-ui/react-dialog';
import React from 'react';

interface ModalContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModalContainer({
  children,
  className,
}: ModalContainerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,17,17,0.6)]">
      <div
        className={cn(
          'w-full max-w-lg rounded-xl bg-white p-6 shadow-xl',
          className,
        )}
      >
        <Close className={cn('ml-auto')} />
        {children}
      </div>
    </div>
  );
}
