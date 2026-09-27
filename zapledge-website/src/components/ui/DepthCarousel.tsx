"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export interface DepthCarouselItem {
  image: string;
  alt: string;
  title?: string;
}

export interface DepthCarouselProps {
  items: DepthCarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: 'left' | 'right';
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}



export const DepthCarousel: React.FC<DepthCarouselProps> = ({
  items,
  cardWidth = 280,
  cardHeight = 360,
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  autoplay = true,
  loop = true,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const total = items.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (loop ? (prev + 1) % total : Math.min(prev + 1, total - 1)));
  }, [loop, total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (loop ? (prev - 1 + total) % total : Math.max(prev - 1, 0)));
  }, [loop, total]);

  // Autoplay management
  useEffect(() => {
    if (!autoplay || total <= 1) return;
    autoplayTimer.current = setInterval(() => {
      nextSlide();
    }, 3200);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [autoplay, nextSlide, total]);

  // GSAP 3D depth and tilt update
  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Calculate shortest distance in loop
      let diff = index - activeIndex;
      if (loop) {
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
      }

      const absDiff = Math.abs(diff);
      const isVisible = absDiff <= visibleCards;

      if (!isVisible) {
        gsap.to(card, {
          opacity: 0,
          scale: 0.6,
          duration: 0.5,
          pointerEvents: 'none',
        });
        return;
      }

      const xPos = diff * spread;
      const zPos = -absDiff * depth;
      const rotationY = diff * tilt * (tiltDirection === 'right' ? 1 : -1);
      const cardScale = Math.max(0.4, 1 - absDiff * falloff);
      const cardBlur = diff === 0 ? 0 : Math.min(blur, absDiff * (blur / 2));
      const cardOpacity = Math.max(0.1, 1 - absDiff * 0.25);
      const zIndex = 50 - absDiff * 5;

      gsap.to(card, {
        x: xPos,
        z: zPos,
        rotationY,
        scale: cardScale,
        opacity: cardOpacity,
        filter: `blur(${cardBlur}px)`,
        zIndex,
        duration: 0.6,
        ease: 'power2.out',
        pointerEvents: diff === 0 ? 'auto' : 'none',
      });
    });
  }, [activeIndex, items, depth, spread, tilt, tiltDirection, visibleCards, falloff, blur, loop, total]);

  // Touch / Drag event handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDragging.current = true;
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const distance = endX - startX.current;

    if (distance < -40) {
      nextSlide();
    } else if (distance > 40) {
      prevSlide();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden flex flex-col items-center justify-center py-6 select-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        minHeight: `${cardHeight + 60}px`,
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, idx) => (
          <div
            key={`${item.alt}-${idx}`}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            onClick={() => setActiveIndex(idx)}
            className="absolute inset-0 rounded-2xl overflow-hidden border border-[#E5E5E5]/60 bg-[#00003C] shadow-xl cursor-pointer"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              transformOrigin: 'center center',
            }}
          >
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 280px, 320px"
                className="object-cover"
              />
              {/* Bottom Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00003C] via-[#00003C]/70 to-transparent" />

              {/* Title Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-left z-10">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0033FF] bg-white/90 px-2 py-0.5 rounded mb-2">
                  Industry Practice
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {item.alt}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-8 z-30">
        {items.map((_, i) => (
          <button
            key={`dot-${i}`}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-6 bg-[#0033FF]' : 'w-1.5 bg-[#E5E5E5]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DepthCarousel;

