import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'pink' | 'lavender' | 'peach' | 'yellow' | 'mint' | 'black' | 'outline';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-[#FFE4E8] text-[#E11D48] border border-black/15',
    pink: 'bg-[#FFE4E8] text-[#FF2A6D] border border-black/15',
    lavender: 'bg-[#ECEBFE] text-[#4F46E5] border border-black/15',
    peach: 'bg-[#FFEADB] text-[#C2410C] border border-black/15',
    yellow: 'bg-[#FEF08A] text-[#854D0E] border border-black/15',
    mint: 'bg-[#D2F9E3] text-[#15803D] border border-black/15',
    black: 'bg-black text-white border border-black',
    outline: 'border-2 border-black bg-white text-black',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black select-none tracking-tight',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
