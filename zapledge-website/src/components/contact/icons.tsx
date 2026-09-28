interface IconProps {
  className?: string;
}

const base = 'stroke-current fill-none';

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={`${base} ${className ?? ''}`} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={`${base} ${className ?? ''}`} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="7" width="9.5" height="9.5" rx="2" />
      <path d="M13 7V5.5A1.5 1.5 0 0011.5 4h-6A1.5 1.5 0 004 5.5v6A1.5 1.5 0 005.5 13H7" />
    </svg>
  );
}

export function SpinnerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" className="stroke-current opacity-20" fill="none" strokeWidth={2.5} />
      <path d="M21 12a9 9 0 00-9-9" className="stroke-current" fill="none" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  );
}

export function HeadsetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13.5v-2a8 8 0 0116 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19.5a4 4 0 01-4 3.5h-2" />
    </svg>
  );
}

export function MessageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v9A1.5 1.5 0 0118.5 16H9l-4 4v-4H5.5A1.5 1.5 0 014 14.5v-9z" />
      <path d="M8 8.5h8M8 12h5" />
    </svg>
  );
}

export function MegaphoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ''}`} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5v3a1 1 0 001 1h1.8L15 19v-14l-9.2 4.5H4a1 1 0 00-1 1z" />
      <path d="M18 9.5a3 3 0 010 5" />
      <path d="M8 14.5l1.2 4.2a1.3 1.3 0 001.25.98H12" />
    </svg>
  );
}
