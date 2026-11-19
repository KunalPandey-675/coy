import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'yellow' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', disabled, ...props }, ref) => {
    const variantStyles = {
      default:
        'bg-[#FF2A6D] text-white border-2 border-black shadow-[2px_2px_0px_#121212] hover:bg-[#E61C5B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none',
      secondary:
        'bg-white text-black border-2 border-black shadow-[2px_2px_0px_#121212] hover:bg-gray-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none',
      yellow:
        'bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#121212] hover:bg-[#FFD800] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none',
      outline:
        'border-2 border-black bg-white hover:bg-gray-100 active:translate-x-[1px] active:translate-y-[1px]',
      ghost:
        'hover:bg-gray-100 text-black',
      destructive:
        'bg-red-500 text-white border-2 border-black shadow-[2px_2px_0px_#121212] hover:bg-red-600 active:translate-x-[1px] active:translate-y-[1px]',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs font-black rounded-full',
      default: 'px-5 py-2.5 text-sm font-black rounded-full',
      lg: 'px-6 py-3.5 text-base font-black rounded-full',
      'icon-sm': 'w-8 h-8 rounded-full p-0 flex items-center justify-center',
      icon: 'w-10 h-10 rounded-full p-0 flex items-center justify-center',
      'icon-lg': 'w-14 h-14 rounded-full p-0 flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center select-none cursor-pointer font-bold transition-all disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
