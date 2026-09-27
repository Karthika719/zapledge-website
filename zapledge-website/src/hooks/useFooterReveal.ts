"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Drives the layered footer reveal.
 *
 * The page content lives inside an element marked `data-reveal-curtain`
 * (see layout.tsx). The footer sits *behind* it (sticky, bottom: 0, lower
 * z-index). As the curtain scrolls up, this hook measures how much of the
 * footer is uncovered (0 → 1) and writes CSS custom properties — no React
 * re-render per frame:
 *
 *   on the footer:  --reveal-dim, --row1-o, --row1-y, --row2-o, --row2-y, --row3-o, --row3-y
 *   on the curtain: --curtain-shadow
 *
 * Returns `sticky`: false when the footer is taller than the viewport
 * (e.g. small phones in landscape) so it falls back to normal flow.
 */

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// [start, end, travel multiplier] for each staggered footer row
const ROWS: ReadonlyArray<readonly [number, number, number]> = [
  [0.05, 0.6, 1],
  [0.15, 0.8, 0.8],
  [0.35, 1, 0.5],
];

export function useFooterReveal(footerRef: RefObject<HTMLElement | null>) {
  const [sticky, setSticky] = useState(true);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const curtain = document.querySelector<HTMLElement>("[data-reveal-curtain]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const apply = (p: number) => {
      const e = easeOut(p);
      const w = window.innerWidth;
      const travel = w < 768 ? 70 : w < 1024 ? 110 : 140;

      footer.style.setProperty("--reveal-dim", (0.7 * (1 - e)).toFixed(3));
      ROWS.forEach(([start, end, factor], i) => {
        const t = easeOut(clamp((p - start) / (end - start)));
        footer.style.setProperty(`--row${i + 1}-o`, t.toFixed(3));
        footer.style.setProperty(`--row${i + 1}-y`, `${(travel * factor * (1 - t)).toFixed(1)}px`);
      });
      curtain?.style.setProperty("--curtain-shadow", (0.28 * clamp(p * 4)).toFixed(3));
    };

    const update = () => {
      frame = 0;
      if (reducedMotion.matches || !curtain) {
        apply(1);
        return;
      }
      const vh = window.innerHeight;
      const revealDistance = Math.min(footer.offsetHeight, vh);
      const uncovered = vh - curtain.getBoundingClientRect().bottom;
      apply(revealDistance > 0 ? clamp(uncovered / revealDistance) : 1);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const measure = () => {
      setSticky(footer.offsetHeight <= window.innerHeight);
      onScroll();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(footer);

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", onScroll);
    };
  }, [footerRef]);

  return { sticky };
}