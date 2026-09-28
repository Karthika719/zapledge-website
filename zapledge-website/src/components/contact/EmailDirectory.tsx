import { contactGradientVertical, focusRing, outfitFont } from './shared';

const ROWS = [
  { label: 'GENERAL', email: 'info@zapledge.com' },
  { label: 'SALES', email: 'sales@zapledge.com' },
  { label: 'CAREERS', email: 'hr@zapledge.com' },
] as const;

export function EmailDirectory() {
  return (
    <div className="relative pl-6">
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-0 w-px"
        style={{ backgroundImage: contactGradientVertical }}
      />

      {ROWS.map((row, i) => (
        <div
          key={row.email}
          className={`relative flex flex-col gap-3 border-border-subtle py-5 md:flex-row md:items-center md:gap-4 ${
            i !== 0 ? 'border-t' : ''
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute top-9 -left-6 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:top-1/2"
            style={{
              border: `2px solid ${
                i === 0 ? '#0033FF' : i === 1 ? '#7C5CFF' : '#22C3EE'
              }`,
            }}
          />

          <span className="text-text-secondary w-[120px] shrink-0 text-[13px] font-semibold tracking-[0.08em] uppercase">
            {row.label}
          </span>

          <a
            href={`mailto:${row.email}`}
            className={`${outfitFont} text-navy min-w-0 whitespace-nowrap rounded-sm text-[20px] font-normal underline-offset-4 hover:underline md:flex-1 md:text-[24px] xl:text-[26px] ${focusRing}`}
          >
            {row.email}
          </a>
        </div>
      ))}
    </div>
  );
}