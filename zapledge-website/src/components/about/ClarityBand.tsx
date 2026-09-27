import { hero } from '@/content/about';
import { Rich } from './primitives';

const TANGLE_STROKE = { fill: 'none', stroke: 'rgba(0,0,60,0.2)', strokeWidth: 1.4 } as const;

const DESKTOP_TANGLE = [
  'M0 30 C 80 30, 90 190, 170 170 S 250 60, 324 104',
  'M0 70 C 60 120, 140 10, 200 60 S 270 150, 324 112',
  'M0 110 C 70 60, 110 220, 180 140 S 280 100, 324 120',
  'M0 150 C 90 210, 120 40, 220 110 S 290 150, 324 128',
  'M0 190 C 50 140, 150 230, 210 180 S 280 120, 324 136',
  'M0 225 C 100 200, 60 90, 150 90 S 250 190, 324 124',
  'M20 0 C 60 80, 160 40, 190 100 S 290 130, 324 116',
  'M0 50 C 120 20, 100 150, 240 150 S 300 120, 324 108',
];
const DESKTOP_TANGLE_DOTS = [[170, 170], [200, 60], [180, 140], [220, 110], [210, 180], [150, 90], [190, 100], [240, 150]];
const DESKTOP_CLEAN = [
  'M924 104 C 970 104, 980 40, 1030 40 L1248 40',
  'M924 112 C 970 112, 980 80, 1030 80 L1248 80',
  'M924 120 L1248 120',
  'M924 128 C 970 128, 980 160, 1030 160 L1248 160',
  'M924 136 C 970 136, 980 200, 1030 200 L1248 200',
];
const DESKTOP_NODES = [[1100, 40], [1100, 120], [1100, 200], [1180, 80], [1180, 160]];

const MOBILE_TANGLE = [
  'M20 0 C 20 40, 150 20, 120 55 S 150 100, 155 110',
  'M70 0 C 110 30, 20 50, 80 70 S 160 90, 163 110',
  'M130 0 C 90 40, 230 30, 200 60 S 170 95, 171 110',
  'M200 0 C 260 30, 150 50, 250 70 S 180 95, 179 110',
  'M270 0 C 230 40, 320 45, 280 65 S 190 100, 187 110',
  'M322 6 C 300 60, 60 30, 110 80 S 165 100, 167 110',
  'M0 40 C 60 20, 90 90, 190 50 S 200 100, 175 110',
];
const MOBILE_FROM = [155, 163, 171, 179, 187];
const MOBILE_TO = [51, 111, 171, 231, 291];

/** "We engineer clarity into complexity": tangled lines resolve through the statement card. */
export default function ClarityBand() {
  return (
    <>
      {/* Desktop / tablet: horizontal, 1248×240 artboard scaled to the container */}
      <div className="@container relative mt-8 hidden aspect-[1248/240] w-full max-w-[1040px] md:block">
        <svg aria-hidden="true" viewBox="0 0 1248 240" className="absolute inset-0 size-full">
          <defs>
            <linearGradient id="clarity-grad" gradientUnits="userSpaceOnUse" x1="924" y1="0" x2="1248" y2="0">
              <stop offset="0" stopColor="#0033FF" />
              <stop offset="1" stopColor="#0033FF" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {DESKTOP_TANGLE.map((d, i) => (
            <path key={d} d={d} {...TANGLE_STROKE} strokeDasharray={i % 2 ? '3 6' : undefined} />
          ))}
          {DESKTOP_TANGLE_DOTS.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.5} fill="#FFFFFF" stroke="rgba(0,0,60,0.3)" />
          ))}
          <path d="M1100 40 V200 M1180 80 V160" fill="none" stroke="rgba(0,51,255,0.18)" strokeWidth={1.5} />
          {DESKTOP_CLEAN.map((d) => (
            <path key={d} d={d} fill="none" stroke="url(#clarity-grad)" strokeWidth={2} />
          ))}
          {DESKTOP_NODES.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={5} fill="#FFFFFF" stroke="#0033FF" strokeWidth={2} />
          ))}
          {[40, 80, 120, 160, 200].map((cy) => (
            <circle key={cy} cx={1240} cy={cy} r={5} fill="#0033FF" />
          ))}
        </svg>
        {/* Card at 324,78 · 600×84 in artboard units */}
        <div className="absolute top-[32.5%] left-[25.96%] flex h-[35%] w-[48.08%] items-center justify-center rounded-full border border-[rgba(0,51,255,0.18)] bg-white shadow-[0_24px_60px_rgba(0,20,160,0.14)]">
          <span aria-hidden="true" className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rounded-full border-2 border-[rgba(0,0,60,0.35)] bg-white" />
          <p className="m-0 px-[4%] text-center text-[clamp(13px,2cqw,21px)] leading-tight font-bold tracking-[-0.02em] text-navy">
            <Rich text={hero.statement} />
          </p>
          <span aria-hidden="true" className="absolute top-1/2 -right-1.5 size-3 -translate-y-1/2 rounded-full bg-accent" />
        </div>
      </div>

      {/* Mobile: vertical, 342×300 artboard */}
      <div className="@container relative mx-auto mt-6 aspect-[342/300] w-full max-w-[360px] md:hidden">
        <svg aria-hidden="true" viewBox="0 0 342 300" className="absolute inset-0 size-full">
          <defs>
            <linearGradient id="clarity-grad-m" gradientUnits="userSpaceOnUse" x1="0" y1="212" x2="0" y2="300">
              <stop offset="0" stopColor="#0033FF" />
              <stop offset="1" stopColor="#0033FF" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {MOBILE_TANGLE.map((d, i) => (
            <path key={d} d={d} {...TANGLE_STROKE} strokeDasharray={i % 2 ? '3 6' : undefined} />
          ))}
          <path d="M51 276 H291" fill="none" stroke="rgba(0,51,255,0.18)" strokeWidth={1.5} />
          {MOBILE_FROM.map((sx, i) => {
            const ex = MOBILE_TO[i];
            const d = sx === ex ? `M${sx} 212 L${ex} 300` : `M${sx} 212 C ${sx} 236, ${ex} 236, ${ex} 258 L${ex} 300`;
            return <path key={d} d={d} fill="none" stroke="url(#clarity-grad-m)" strokeWidth={2} />;
          })}
          {MOBILE_TO.map((cx, i) =>
            i % 2 === 0 ? (
              <circle key={cx} cx={cx} cy={276} r={4.5} fill="#0033FF" />
            ) : (
              <circle key={cx} cx={cx} cy={276} r={4.5} fill="#FFFFFF" stroke="#0033FF" strokeWidth={2} />
            ),
          )}
        </svg>
        {/* Card at top 110 · height 102 in artboard units */}
        <div className="absolute inset-x-0 top-[36.67%] flex h-[34%] items-center justify-center rounded-[28px] border border-[rgba(0,51,255,0.18)] bg-white px-7 shadow-[0_24px_60px_rgba(0,20,160,0.14)]">
          <p className="m-0 text-center text-[clamp(16px,5.5cqw,20px)] leading-[1.3] font-bold tracking-[-0.02em] text-navy">
            <Rich text={hero.statement} />
          </p>
        </div>
      </div>
    </>
  );
}
