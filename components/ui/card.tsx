import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'yellow' | 'lavender' | 'peach' | 'pink' }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantStyles = {
    default: 'bg-white text-black border-2 border-black shadow-[3px_3px_0px_#121212]',
    yellow: 'bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#121212]',
    lavender: 'bg-[#ECEBFE] text-black border-2 border-black shadow-[3px_3px_0px_#121212]',
    peach: 'bg-[#FFEADB] text-black border-2 border-black shadow-[3px_3px_0px_#121212]',
    pink: 'bg-[#FFE4E8] text-black border-2 border-black shadow-[3px_3px_0px_#121212]',
  };

  return (
    <div
      ref={ref}
      className={cn('rounded-3xl overflow-hidden transition-all', variantStyles[variant], className)}
      {...props}
    />
  );
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-4 sm:p-5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-black text-xl sm:text-2xl text-black tracking-tight leading-snug', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs sm:text-sm text-gray-600 font-medium leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4 sm:p-5 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-4 sm:p-5 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
