"use client";

import React, { useRef, useState, useCallback } from 'react';
import './SpotlightCard.css';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  as?: React.ElementType;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(0, 51, 255, 0.15)',
  spotlightSize = 350,
  as: Component = 'div',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const handleMouseEnter = useCallback(() => setIsFocused(true), []);
  const handleMouseLeave = useCallback(() => setIsFocused(false), []);

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`spotlight-card-wrapper ${className}`}
      {...props}
    >
      <div className="relative z-10 w-full h-full">{children}</div>
      <div
        className="spotlight-card-overlay z-20 pointer-events-none"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />
    </Component>
  );
};

export default SpotlightCard;

