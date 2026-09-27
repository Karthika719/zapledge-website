"use client";

import React from 'react';
import Link from 'next/link';

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  icon,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-9 px-4 text-xs font-semibold',
    md: 'h-11 px-6 text-sm font-semibold',
    lg: 'h-13 px-8 text-base font-semibold',
  }[size];

  const variantClasses = {
    primary: 'bg-[#0033FF] hover:bg-[#0022CC] text-white shadow-sm hover:shadow transition-all duration-200',
    secondary: 'bg-[#00003C] hover:bg-[#000028] text-white transition-all duration-200',
    gradient: 'bg-gradient-to-r from-[#0033FF] to-[#00003C] hover:opacity-95 text-white shadow-sm hover:shadow-md transition-all duration-200',
    outline: 'border border-[#E5E5E5] bg-white text-[#333333] hover:border-[#0033FF] hover:text-[#0033FF] transition-all duration-200',
    ghost: 'bg-transparent text-[#333333] hover:bg-[#0033FF]/5 hover:text-[#0033FF] transition-all duration-200',
  }[variant];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-full cursor-pointer tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20 focus-visible:outline-offset-2 select-none active:scale-[0.98] ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        <span>{children}</span>
        {icon && <span>{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      <span>{children}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default AnimatedButton;

