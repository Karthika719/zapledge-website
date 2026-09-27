import type { ElementType, ReactNode } from 'react';
import type { Emphasis, RichText } from '@/content/about';

const EMPHASIS: Record<Emphasis, string> = {
  accent: 'text-accent',
  accentBold: 'text-accent font-bold',
  navyBold: 'text-navy font-bold',
  navySemibold: 'text-navy font-semibold',
};

/** Renders a copy sentence, wrapping emphasised runs in span/strong. */
export function Rich({ text }: { text: RichText }) {
  return (
    <>
      {text.map((part, i) => {
        if (typeof part === 'string') return part;
        const Tag = part.emphasis === 'accent' ? 'span' : 'strong';
        return (
          <Tag key={i} className={EMPHASIS[part.emphasis]}>
            {part.text}
          </Tag>
        );
      })}
    </>
  );
}

export const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

/** Horizontal page container: 1248px content, 96px desktop gutters. */
export const CONTAINER = 'mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-24';

/** Matches the homepage type scale and section rhythm. */
export const SECTION_Y = 'py-20 sm:py-24 lg:py-28';

export const H2 =
  'text-3xl leading-[1.18] font-extrabold tracking-[-0.03em] text-navy sm:text-4xl lg:text-[42px]';

export const INTRO = 'mt-4 max-w-3xl text-lg leading-relaxed font-medium text-navy sm:text-xl';

export function EyebrowPill({ children, as: Tag = 'p', id }: { children: ReactNode; as?: ElementType; id?: string }) {
  return (
    <Tag
      id={id}
      className="m-0 inline-flex items-center gap-2.5 rounded-full border border-[rgba(0,51,255,0.22)] bg-[rgba(0,51,255,0.07)] px-4 py-1.5 text-xs leading-[1.4] font-semibold tracking-[0.06em] text-accent-strong uppercase"
    >
      <span aria-hidden="true" className="size-[7px] shrink-0 rounded-full bg-accent" />
      {children}
    </Tag>
  );
}

export function PrimaryCta({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#0033FF_0%,#001BA8_55%,#00003C_100%)] px-8 py-4 text-base leading-none font-semibold text-white shadow-[0_12px_30px_rgba(0,30,200,0.22)] transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,30,200,0.32)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS_RING} ${className}`}
    >
      {children}
      <svg
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  );
}

/** Decorative concentric rings centred on (x, y) of the parent. */
export function Rings({ diameters, x = '50%', y = '50%' }: { diameters: number[]; x?: string; y?: string }) {
  return (
    <>
      {diameters.map((d) => (
        <span
          key={d}
          aria-hidden="true"
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(0,51,255,0.07)]"
          style={{ left: x, top: y, width: d, height: d }}
        />
      ))}
    </>
  );
}
