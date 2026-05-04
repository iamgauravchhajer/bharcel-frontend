import React from 'react';
import { twMerge } from 'tailwind-merge';

const Badge = ({ 
  children, 
  variant = 'default',
  className 
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600',
    primary: 'bg-orange-100 text-orange-600',
    success: 'bg-emerald-100 text-emerald-600',
    warning: 'bg-amber-100 text-amber-600',
    error: 'bg-red-100 text-red-600',
    info: 'bg-sky-100 text-sky-600',
  };

  return (
    <span className={twMerge(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
