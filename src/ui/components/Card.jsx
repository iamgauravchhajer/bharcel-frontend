import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'bg-white border border-slate-200 shadow-sm',
    glass: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-sm',
    orange: 'bg-orange-50 border border-orange-100',
  };

  return (
    <div 
      className={twMerge(
        "rounded-2xl overflow-hidden",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
